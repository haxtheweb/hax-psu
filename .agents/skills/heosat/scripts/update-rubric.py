#!/usr/bin/env python3
"""HEOSAT skill — re-sync references/ from the upstream HEOSAT tool.

The HEOSAT web app (https://locusplex.us/HEOSAT/) is a static page whose rubric
lives embedded as a `window.HEOSAT_DATA = {...}` object inside
assets/js/heosat.js. This script fetches that JS (or reads a local copy), peels
out the data object, and writes:

  references/rubric.json  — raw extracted data + provenance
  references/rubric.md    — readable rubric (scale, sections, questions,
                            evidence checklists, learn links)

Usage:
  python3 update-rubric.py                    # fetch from locusplex.us
  python3 update-rubric.py path/to/heosat.js  # use an already-downloaded copy
"""

import json
import re
import sys
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent
REFS_DIR = SKILL_ROOT / "references"
HEOSAT_JS_URL = "https://locusplex.us/HEOSAT/assets/js/heosat.js"


# ---------------------------------------------------------------- HTML -> text

class _WhyText(HTMLParser):
    """Convert the rubric's `why` HTML into readable plain text."""

    def __init__(self):
        super().__init__()
        self.parts = []
        self.href = None

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.href = dict(attrs).get("href")
        elif tag in ("p", "ul", "ol"):
            self.parts.append("\n\n")
        elif tag == "li":
            self.parts.append("\n- ")
        elif tag == "br":
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag == "a":
            self.href = None

    def handle_data(self, data):
        text = data.strip()
        if not text:
            return
        self.parts.append(data)
        if self.href and text:
            self.parts.append(f" <{self.href}>")

    def result(self):
        out = "".join(self.parts)
        out = re.sub(r"[ \t]+\n", "\n", out)
        out = re.sub(r"\n{3,}", "\n\n", out)
        return out.strip()


def html_to_text(html):
    parser = _WhyText()
    parser.feed(html)
    return parser.result()


# ---------------------------------------------------------------- extraction

def extract_data(js_text):
    """Pull the window.HEOSAT_DATA object out of the app JS."""
    marker = "window.HEOSAT_DATA"
    idx = js_text.find(marker)
    if idx == -1:
        raise SystemExit("error: no window.HEOSAT_DATA found — upstream layout changed")
    start = js_text.index("{", idx)
    data, _ = json.JSONDecoder().raw_decode(js_text[start:])
    return data


# ---------------------------------------------------------------- render .md

def render_markdown(rubric, fetched_from, fetched_at):
    lines = []
    lines.append(f"# {rubric['title']}")
    lines.append("")
    lines.append(f"> {rubric['subtitle']}")
    lines.append("")
    lines.append(f"Rubric version: **{rubric['version']}**")
    lines.append(f"Source: <{fetched_from}> (extracted {fetched_at})")
    lines.append("")
    lines.append("## Maturity scale")
    lines.append("")
    lines.append("Every question is scored on this 6-level scale (0-5):")
    lines.append("")
    for i, name in enumerate(rubric["scale"]):
        lines.append(f"- **{i} — {name}**")
    lines.append("")

    lines.append("## Contents")
    lines.append("")
    for i, section in enumerate(rubric["sections"], 1):
        qids = ", ".join(q["id"] for q in section["questions"])
        lines.append(f"- {i}. {section['title']} ({qids})")
    lines.append("")

    for i, section in enumerate(rubric["sections"], 1):
        lines.append(f"## {i}. {section['title']}")
        lines.append("")
        lines.append(section["description"])
        lines.append("")
        for q in section["questions"]:
            lines.append(f"### {q['id']} — {q['text']}")
            lines.append("")
            why = q.get("guidance", {}).get("why")
            if why:
                lines.append(html_to_text(why))
                lines.append("")
            evidence = q.get("guidance", {}).get("evidence") or []
            if evidence:
                lines.append("**Evidence to look for:**")
                lines.append("")
                for item in evidence:
                    lines.append(f"- {item}")
                lines.append("")
            learn = q.get("guidance", {}).get("learn") or []
            if learn:
                lines.append("**Learn more:**")
                lines.append("")
                for ref in learn:
                    lines.append(f"- [{ref['title']}]({ref['url']})")
                lines.append("")

    attrib = rubric.get("attributions", {})
    lines.append("## Attribution")
    lines.append("")
    if attrib.get("license"):
        lines.append(attrib["license"])
        lines.append("")
    for item in attrib.get("items", []):
        note = f" — {item['note']}" if item.get("note") else ""
        lines.append(f"- [{item['title']}]({item['url']}){note}")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------- main

def main():
    if len(sys.argv) > 1:
        js_text = Path(sys.argv[1]).read_text(encoding="utf-8")
    else:
        req = urllib.request.Request(HEOSAT_JS_URL, headers={"User-Agent": "heosat-skill/1.0"})
        with urllib.request.urlopen(req, timeout=30) as res:
            js_text = res.read().decode("utf-8")

    data = extract_data(js_text)
    fetched_at = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    questions = sum(len(s["questions"]) for s in data["sections"])
    if not data.get("sections") or not questions:
        raise SystemExit("error: extracted data has no sections/questions — refusing to write")

    REFS_DIR.mkdir(parents=True, exist_ok=True)

    (REFS_DIR / "rubric.json").write_text(
        json.dumps(
            {
                "source": HEOSAT_JS_URL,
                "fetchedAt": fetched_at,
                "data": data,
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )

    (REFS_DIR / "rubric.md").write_text(
        render_markdown(data, HEOSAT_JS_URL, fetched_at) + "\n", encoding="utf-8"
    )

    print(f"HEOSAT rubric synced: {data['version']}")
    print(f"  sections: {len(data['sections'])}, questions: {questions}")
    print(f"  wrote {REFS_DIR / 'rubric.json'}")
    print(f"  wrote {REFS_DIR / 'rubric.md'}")


if __name__ == "__main__":
    main()
