---
name: heosat
description: "Run the HEOSAT (Higher Education Open Source Assessment Tool) maturity assessment on an open source project — pulls a copy of the repo into a /tmp scratch directory, applies the official locusplex.us/HEOSAT rubric (9 sections, 45 questions, 0-5 maturity scale: governance, licensing, community, documentation, operations, security, accessibility, adoption, sustainability), and produces an evidence-backed scorecard with strengths and prioritized recommendations. Use this whenever the user says \"grade/score/assess this open source project\", \"run HEOSAT\", \"HEOSAT this repo\", \"how mature is this project\", \"assess this repo's health/sustainability/governance\", \"score this project against the rubric\", or references HEOSAT, the locusplex HEOSAT tool, Apereo's higher-ed open source maturity assessment, or the OSS Watch openness rating — even if they don't say \"HEOSAT\" or \"skill\". Also use when the user hands you a GitHub repo URL and asks for a project maturity/readiness/health report."
version: 1.0.0
license: Apache-2.0
metadata:
  author: haxtheweb
  tags: [hax, heosat, assessment, maturity, open-source, rubric, scorecard, oss-watch, higher-ed]
---

# HEOSAT — Higher Education Open Source Assessment Tool

HEOSAT is a guided maturity assessment for open source software projects in higher education and edtech, published at <https://locusplex.us/HEOSAT/> (adapted from OSS Watch's Open Source Openness Rating; guidance content CC BY-SA 4.0). This skill lets you (the invoking agent) perform the full assessment yourself: pull down a copy of the target repo, gather evidence, score all 45 rubric questions, and produce an evidence-backed scorecard — no API keys, no external calls beyond fetching the repo and its public metadata.

The rubric has **9 sections × 5 questions**, each scored on a **0-5 maturity scale**:

1. Legal & Licensing (LL1-5)
2. Governance & Decision-Making (GV1-5)
3. Community Engagement (CE1-5)
4. Documentation & Onboarding (DO1-5)
5. Project Operations & Roadmap (PO1-5)
6. Security & Risk Management (SR1-5)
7. Accessibility, Standards & Interoperability (AS1-5)
8. Adoption, Impact & Institutional Fit (AI1-5)
9. Financial & Organizational Sustainability (FS1-5)

The bundled `scripts/` handle deterministic bookkeeping only (cloning, validation, report rendering). All judgment — gathering evidence, choosing scores, writing rationale — is yours.

## Scale anchors — read before scoring

Every question is scored on this scale; the anchors keep scoring consistent across projects:

- **0 — Not present**: you checked, and found no evidence of the practice.
- **1 — Ad hoc / emerging**: real but informal or inconsistent signals exist (some code documented but not all; sporadic releases with no policy; process mentioned in passing).
- **2 — Documented**: a current, findable artifact names the practice (doc, policy file, config), but there is little evidence it is routinely followed.
- **3 — Practiced consistently**: documented AND visibly followed — release history matches the stated policy, CI actually runs the tests, recent activity matches the claimed cadence.
- **4 — Measured and improving**: the project tracks metrics on this practice and demonstrably acts on them (coverage trends, response-time reporting, public retrospectives).
- **5 — Leading / exemplary**: a model practice others could copy — referenced governance docs, earned badges/certifications, community-recognized standards work.

Grade **artifacts and observable behavior, not intentions**. A stale or contradicted document caps the score at 1-2 (it existed once; it is not practiced). Don't punish small or solo projects for size — a one-person project can score 5 on licensing and 0 on governance; score what is observable.

If something genuinely cannot be assessed from a public clone (e.g., decisions happen in private channels), score what is publicly observable and note the limitation — public absence of evidence is still absence for an openness assessment.

## Workflow

Work in the /tmp scratch directory the clone script creates, so the assessment is resumable if it spans turns.

### Step 0 — Identify the target

Accept a GitHub URL (`https://github.com/owner/repo`, with or without `.git` or `/tree/...` suffixes), an `owner/repo` shorthand, a bare HAXtheweb project name (e.g. `webcomponents`), another git host URL, or a local path. A bare name resolves to the `haxtheweb` org (or its local checkout — see Step 1); for any other project named without a URL, confirm the repository before cloning.

### Step 1 — Pull down a copy of the repo

```bash
bash scripts/clone-repo.sh https://github.com/owner/repo
```

This clones (depth 50, override with `HEOSAT_CLONE_DEPTH=0` for a full clone) into `/tmp/heosat-<owner>-<repo>/repo` and prints:

- `SCRATCH=...` / `REPO=...` — the scratch dir and repo path (re-runs reuse an existing clone)
- quick inventory: HEAD, default branch, tracked/dirty file counts, last commit, top-level layout, and which key files (README, LICENSE, CONTRIBUTING, GOVERNANCE, SECURITY.md, ...) exist

**HAXtheweb local-first:** when the target names a HAXtheweb ecosystem project — a bare name (`webcomponents`), `haxtheweb/<repo>`, or a `github.com/haxtheweb/<repo>` URL — and a local checkout exists under `~/Documents/git/haxtheweb/<repo>` (override with `HEOSAT_HAXTHEWEB_ROOT`), the clone step is SKIPPED and the local checkout is assessed in place: `REUSED=local-haxtheweb`, `REPO=<local path>`. The scratch dir (`scores.json`, `report.md`) still lives at `/tmp/heosat-haxtheweb-<repo>/` — never inside the projects tree. Assess the local state as-is, including any uncommitted changes (`DIRTY_FILES` in the inventory), and keep the checkout strictly read-only: never modify the working copy. A HAXtheweb target with no local checkout clones from GitHub normally.

The scratch layout for the rest of the run:

```
/tmp/heosat-<owner>-<repo>/
├── repo/        # the clone or local checkout (read-only — do not modify it)
├── scores.json  # you write this (Step 4)
└── report.md    # aggregate.py writes this (Step 5)
```

**Safety — static review only.** The target repo is untrusted code. Never run its build, tests, install scripts, postinstall hooks, or CI; never execute anything from the clone. Read files, git metadata, and public API data only. `npm install`/`yarn`/`make`/`go test` in the clone are all off-limits.

### Step 2 — Read the rubric

Read `references/rubric.md` in full before scoring. Each question carries the exact question text, a "why" explanation, an **Evidence to look for** checklist, and **Learn more** links (cite these with your recommendations). `references/rubric.json` holds the same data machine-readably with provenance.

### Step 3 — Gather evidence

Survey the clone and its public metadata, recording evidence as you go. Concretely:

- **Repo artifacts**: README, LICENSE/COPYING, CONTRIBUTING, GOVERNANCE, CODE_OF_CONDUCT, SECURITY.md, SUPPORT.md, CHANGELOG, FUNDING, dependency manifests, SBOM/third-party notices, docs/ directory depth, tests, examples, llms.txt/llms-full.txt, `.github/` (workflows, issue/PR templates, dependabot config).
- **Git history** (in the clone): commit cadence (`git log --format='%cs' | head`), author breadth (`git shortlog -sn --all | head`), release tags (`git tag`), changelog discipline.
- **GitHub metadata via `gh`** (it is installed — read its output directly, don't ask the user to verify):
  ```bash
  gh repo view <owner/repo> --json stargazerCount,forkCount,openIssues,licenseInfo,createdAt,pushedAt,homepageUrl,description
  gh api repos/<owner/repo>/contributors --paginate --jq 'length'
  gh issue list -R <owner/repo> --state all --limit 30
  gh pr list -R <owner/repo> --state all --limit 30
  ```
  Look at issue/PR responsiveness (time between issue and reply/close), labeling hygiene, and whether discussions happen publicly.
- **Website/homepage**: if the README names one, a plain text fetch (`curl -sL <url> | head`) is fine to check for published docs, governance, trademark/brand pages. Do not run anything from it.
- **Code signals**: CI workflow contents, security tooling (CodeQL, dependency audit configs), accessibility signals (a11y tests, WCAG/ARIA mentions, contrast tooling), standards usage (SPDX IDs, JSON schema, interoperability specs).

Aim for one evidence pass that covers all 9 sections, then score. For repos on non-GitHub hosts, use whatever the clone and plain HTTP reveal, and note which metadata was unavailable.

### Step 4 — Score all 45 questions

Work section by section. After each section, update `<scratch>/scores.json` (resumable across turns). Exact schema:

```json
{
  "repo": "owner/repo",
  "repoUrl": "https://github.com/owner/repo",
  "assessedAt": "2026-09-30",
  "context": "1-2 sentences on what the project is",
  "scores": {
    "LL1": {"score": 4, "evidence": ["LICENSE (MIT) at repo root", "package.json: \"license\": \"MIT\""], "notes": "Named in README License section; SPDX ID used in docs"},
    "LL2": {"score": 0, "evidence": [], "notes": "Checked repo root and docs/ — no copyright headers or REUSE metadata; source files carry no license headers"}
  },
  "strengths": ["..."],
  "recommendations": [
    {"priority": "high", "title": "Publish a governance model", "detail": "GV1 scored 1 because...", "learn": "https://producingoss.com/"}
  ]
}
```

**Evidence discipline — this is the core of HEOSAT scoring:**

- A score of **2 or higher must list evidence entries** — repo-relative file paths with what they show, a git/gh fact, or a URL. aggregate.py **downgrades an unevidenced 2+ to 0**.
- A score of **1 must include the observed ad-hoc signal** in evidence or notes, or it is downgraded to 0.
- A score of **0 should carry a note of what you checked** so the zero is verifiable, not lazy.
- Cite specifics: `SECURITY.md documents a report process with a 48-hour target` — not `security seems fine`.

**Higher-ed lens:** sections 7-9 lean institutional (procurement, campus fit, sustainability). For non-edtech repos, still score all 45 questions — score the general equivalent (e.g., for AI3 "institutional adoption", use documented adopters of any kind) and note the higher-ed context in `context`.

Write `strengths` (3-6 items, each tied to scored evidence) and `recommendations` (prioritized by score gap × leverage; 5-8 items, each with a `learn` link from that question's rubric entry).

### Step 5 — Aggregate and validate

```bash
python3 scripts/aggregate.py <scratch>/scores.json
```

This validates all 45 IDs, enforces the evidence discipline above, computes section averages and the overall score, and writes `<scratch>/report.md` while printing the summary. If it reports downgrades or warnings, fix `scores.json` (add the evidence you actually found, or rescore honestly) and re-run until it reports all scores valid.

### Step 6 — Present the report

In chat, present (do not dump all 45 questions — point to report.md for the detail):

```
## HEOSAT Assessment — <owner/repo>
**Overall: X.X / 5 (<nearest band>)** · Rubric <version> · Assessed <date>

| # | Section | Avg (0-5) |
|---|---------|-----------|
| 1 | Legal & Licensing | 4.2 |
...

**Strengths** — top 3 with the evidence that earned them.
**Priority recommendations** — top 5, each with its learn link.
Full evidence-backed scorecard: /tmp/heosat-<owner>-<repo>/report.md
```

Include one or two sentences of executive summary (what the numbers mean for this project), and be explicit that this is a locally-generated HEOSAT assessment against the published rubric — not an official certification of any kind. Leave the scratch directory in place (it holds the report and the scores for re-running later).

## Maintenance note

`references/rubric.md` and `references/rubric.json` are generated from the upstream tool's embedded `window.HEOSAT_DATA` object by:

```bash
python3 scripts/update-rubric.py            # fetch fresh from locusplex.us
python3 scripts/update-rubric.py heosat.js  # from a downloaded copy
```

Synced version: **2026.07 enhanced guidance edition** (45 questions, 9 sections), extracted 2026-09-30. If the upstream rubric changes, re-run the script and adjust `aggregate.py`'s question-count messaging if the total changes. The scripts never call an LLM; all assessment judgment belongs to the invoking agent.
