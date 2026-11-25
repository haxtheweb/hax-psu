#!/usr/bin/env python3
"""HEOSAT skill — validate scores and render the scorecard report.

Usage:
  python3 aggregate.py <scratch-dir>/scores.json [<output-report.md>]

Reads the agent-written scores.json:

  {
    "repo": "owner/repo",
    "repoUrl": "https://github.com/owner/repo",
    "assessedAt": "2026-09-30",
    "context": "optional 1-2 sentences about the project",
    "scores": {
      "LL1": {"score": 4, "evidence": ["LICENSE (MIT) at repo root"], "notes": "..."},
      ...
    },
    "strengths": ["optional"],
    "recommendations": [
      {"priority": "high", "title": "...", "detail": "...", "learn": "https://..."}
    ]
  }

Validation (HEOSAT evidence discipline):
  - every rubric question must be scored exactly once; scores are ints 0-5
  - a score of 2+ with no evidence is downgraded to 0 (an unevidenced claim
    cannot earn "Documented" or above)
  - a score of 1 with neither evidence nor notes is downgraded to 0
All downgrades are reported so they can be fixed by adding real evidence.

Writes <report.md> (default: alongside scores.json as report.md) and prints a
summary: section averages, overall score, and any validation warnings.
"""

import json
import sys
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent
RUBRIC_PATH = SKILL_ROOT / "references" / "rubric.json"


def load_rubric():
    with open(RUBRIC_PATH, encoding="utf-8") as f:
        return json.load(f)


def band_label(scale, value):
    """Nearest scale band for an average value."""
    nearest = max(0, min(len(scale) - 1, round(value)))
    return scale[nearest]


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    scores_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else scores_path.parent / "report.md"

    rubric_doc = load_rubric()
    rubric = rubric_doc["data"]
    scale = rubric["scale"]
    sections = rubric["sections"]

    with open(scores_path, encoding="utf-8") as f:
        doc = json.load(f)

    scores = doc.get("scores", {})
    warnings = []
    downgrades = []

    # --- validate IDs -----------------------------------------------------
    expected = [q["id"] for s in sections for q in s["questions"]]
    missing = [qid for qid in expected if qid not in scores]
    extra = [qid for qid in scores if qid not in expected]
    if missing:
        raise SystemExit(f"error: missing scores for: {', '.join(missing)}")
    if extra:
        raise SystemExit(f"error: unknown question IDs: {', '.join(extra)}")

    # --- validate + enforce evidence discipline ---------------------------
    final = {}
    for s in sections:
        for q in s["questions"]:
            entry = scores[q["id"]]
            score = entry.get("score")
            if not isinstance(score, int) or isinstance(score, bool) or not (0 <= score <= 5):
                raise SystemExit(
                    f"error: {q['id']}: score must be an integer 0-5 (got {score!r})"
                )
            evidence = entry.get("evidence") or []
            notes = (entry.get("notes") or "").strip()
            if score >= 2 and not evidence:
                downgrades.append(
                    f"{q['id']}: {score} -> 0 (score of 2+ requires cited evidence; "
                    "add evidence entries or rescore)"
                )
                score = 0
            elif score == 1 and not evidence and not notes:
                downgrades.append(
                    f"{q['id']}: 1 -> 0 (score of 1 requires an observed ad-hoc signal "
                    "in evidence or notes)"
                )
                score = 0
            if score == 0 and not evidence and not notes:
                warnings.append(
                    f"{q['id']} scored 0 with no note on what was checked — "
                    "add a 'checked X, not found' note so the 0 is verifiable"
                )
            final[q["id"]] = {
                "score": score,
                "evidence": evidence,
                "notes": notes,
                "text": q["text"],
            }

    # --- compute -----------------------------------------------------------
    section_stats = []
    for s in sections:
        vals = [final[q["id"]]["score"] for q in s["questions"]]
        avg = sum(vals) / len(vals)
        section_stats.append({"title": s["title"], "avg": avg, "scores": vals})

    all_vals = [final[qid]["score"] for qid in expected]
    overall = sum(all_vals) / len(all_vals)
    dist = {i: all_vals.count(i) for i in range(len(scale))}

    # --- render -------------------------------------------------------------
    repo = doc.get("repo", "unknown repo")
    lines = []
    lines.append(f"# HEOSAT Assessment — {repo}")
    lines.append("")
    lines.append(
        f"Assessed {doc.get('assessedAt', 'n/a')} · "
        f"Rubric: {rubric['version']} · Scale: 0 (Not present) – 5 (Leading / exemplary)"
    )
    if doc.get("repoUrl"):
        lines.append(f"Repository: {doc['repoUrl']}")
    if doc.get("context"):
        lines.append("")
        lines.append(f"Project context: {doc['context']}")
    lines.append("")

    lines.append("## Summary")
    lines.append("")
    lines.append("| # | Section | Avg (0-5) | Nearest band |")
    lines.append("|---|---------|-----------|--------------|")
    for i, st in enumerate(section_stats, 1):
        lines.append(
            f"| {i} | {st['title']} | {st['avg']:.1f} | {band_label(scale, st['avg'])} |"
        )
    lines.append(
        f"| — | **Overall ({len(expected)} questions)** | **{overall:.1f}** | "
        f"**{band_label(scale, overall)}** |"
    )
    lines.append("")
    level_dist = ", ".join(f"{scale[i]}: {dist[i]}" for i in range(len(scale)))
    lines.append(f"Level distribution — {level_dist}")
    lines.append("")

    lines.append("## Scores by section")
    lines.append("")
    for i, (s, st) in enumerate(zip(sections, section_stats), 1):
        lines.append(f"### {i}. {s['title']} — avg {st['avg']:.1f}")
        lines.append("")
        for q in s["questions"]:
            entry = final[q["id"]]
            lines.append(
                f"- **{q['id']} — {entry['score']}/5 ({scale[entry['score']]})** — "
                f"{entry['text']}"
            )
            for ev in entry["evidence"]:
                lines.append(f"  - Evidence: {ev}")
            if entry["notes"]:
                lines.append(f"  - Notes: {entry['notes']}")
        lines.append("")

    if downgrades:
        lines.append("## Evidence downgrades applied")
        lines.append("")
        for d in downgrades:
            lines.append(f"- {d}")
        lines.append("")

    strengths = doc.get("strengths") or []
    if strengths:
        lines.append("## Strengths")
        lines.append("")
        for st in strengths:
            lines.append(f"- {st}")
        lines.append("")

    recs = doc.get("recommendations") or []
    if recs:
        lines.append("## Prioritized recommendations")
        lines.append("")
        for n, rec in enumerate(recs, 1):
            priority = rec.get("priority", "medium")
            lines.append(f"{n}. **[{priority.upper()}]** {rec.get('title', '')}")
            if rec.get("detail"):
                lines.append(f"   {rec['detail']}")
            if rec.get("learn"):
                lines.append(f"   Learn more: {rec['learn']}")
        lines.append("")

    lines.append("## Attribution")
    lines.append("")
    lines.append(
        f"Scored with the Higher Education Open Source Assessment Tool (HEOSAT), "
        f"rubric version \u201c{rubric['version']}\u201d, adapted from the OSS Watch "
        "Open Source Openness Rating; guidance content CC BY-SA 4.0. "
        f"Source: https://locusplex.us/HEOSAT/"
    )
    lines.append("")

    out_path.write_text("\n".join(lines), encoding="utf-8")

    # --- stdout summary -------------------------------------------------------
    print(f"Report written to {out_path}")
    print()
    print(f"HEOSAT {rubric['version']} — {repo}")
    for i, st in enumerate(section_stats, 1):
        print(f"  {i}. {st['title']:<50} {st['avg']:.1f}")
    print(f"  {'OVERALL':<53} {overall:.1f}  ({band_label(scale, overall)})")
    print()
    if downgrades:
        print("EVIDENCE DOWNGRADES APPLIED (fix scores.json by adding evidence):")
        for d in downgrades:
            print(f"  - {d}")
    if warnings:
        print("Notes to add (0-scores without a 'what I checked' note):")
        for w in warnings:
            print(f"  - {w}")
    if not downgrades and not warnings:
        print("All 45 scores valid; evidence discipline satisfied.")


if __name__ == "__main__":
    main()
