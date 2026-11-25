#!/usr/bin/env bash
# HEOSAT skill — pull the target repo into a /tmp scratch directory.
#
# Usage:
#   clone-repo.sh https://github.com/owner/repo
#   clone-repo.sh owner/repo
#   clone-repo.sh webcomponents                     # bare name -> local HAXtheweb checkout
#   clone-repo.sh haxtheweb/haxcms-php              # -> local HAXtheweb checkout
#   clone-repo.sh https://github.com/haxtheweb/create
#   clone-repo.sh https://gitlab.com/group/project.git
#   clone-repo.sh /path/to/local/repo               # used in place, no clone
#
# Local-first for HAXtheweb projects: the full HAXtheweb ecosystem is checked
# out under ~/Documents/git/haxtheweb/ (override with HEOSAT_HAXTHEWEB_ROOT).
# When the target names a HAXtheweb repo — a bare name (e.g. "webcomponents"),
# haxtheweb/<repo>, or a github.com/haxtheweb/<repo> URL — and a local checkout
# exists at <root>/<repo>, the clone step is SKIPPED and the local checkout is
# assessed in place (REUSED=local). A bare name with no local checkout falls
# back to cloning github.com/haxtheweb/<name>; haxtheweb/<repo> with no local
# checkout clones from GitHub normally. Non-haxtheweb targets always clone.
#
# The scratch directory (scores.json / report.md) always lives under /tmp —
# never inside the projects tree — so local-first assessment never writes
# into the checkout. The checkout is read-only: static review only.
#
# Re-runs are safe: if the scratch dir already contains a clone, it is reused.
# Clone depth defaults to 50 (recent history is evidence for operations and
# cadence questions); override with HEOSAT_CLONE_DEPTH (0 = full clone).
#
# Prints machine-parsable KEY=value lines (SCRATCH, REPO, REUSED, ...) followed
# by a quick inventory of the repo so the calling agent can start surveying.
set -euo pipefail

target="${1:?usage: clone-repo.sh <github-url | owner/repo | bare-haxtheweb-name | git-url | local-path>}"
depth="${HEOSAT_CLONE_DEPTH:-50}"
haxroot="${HEOSAT_HAXTHEWEB_ROOT:-$HOME/Documents/git/haxtheweb}"

# --- shared inventory (works on a clone or a local checkout) -----------------
print_inventory() {
  local repo_dir="$1" slug="$2"
  cd "$repo_dir"
  echo "SLUG=$slug"
  echo "HEAD=$(git rev-parse --short HEAD)"
  echo "BRANCH=$(git rev-parse --abbrev-ref HEAD)"
  echo "TRACKED_FILES=$(git ls-files | wc -l | tr -d ' ')"
  echo "LAST_COMMIT=$(git log -1 --format='%cs %an: %s')"
  echo "RECENT_COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo '?')"
  echo "DIRTY_FILES=$(git status --porcelain | wc -l | tr -d ' ')"

  echo "TOP_LEVEL:"
  git ls-files | awk -F/ '{print $1}' | sort -u | head -40

  echo "KEY_FILES:"
  for f in README README.md LICENSE LICENSE.md LICENSE.txt COPYING CONTRIBUTING.md \
           GOVERNANCE.md GOVERNANCE CODE_OF_CONDUCT.md SECURITY.md SUPPORT.md \
           CHANGELOG.md FUNDING.yml THIRD_PARTY_NOTICES.md llms.txt llms-full.txt \
           package.json pyproject.toml go.mod Cargo.toml composer.json; do
    if [ -f "$f" ]; then echo "  $f"; fi
  done
  if [ -d ".github" ]; then echo "  .github/:"; ls .github; fi
}

# Use a repo in place (local path or local HAXtheweb checkout). The scratch
# dir stays in /tmp so assessment artifacts never land inside the projects tree.
use_local() {
  local repo_dir="$1" slug="$2" tag="$3"
  echo "SCRATCH=/tmp/heosat-$(printf '%s' "$slug" | tr '/' '-')"
  echo "REPO=$repo_dir"
  echo "REUSED=$tag"
  print_inventory "$repo_dir" "$slug"
}

# --- Explicit local path: use in place -----------------------------------------
if [ -d "$target" ]; then
  repo="$(cd "$target" && pwd)"
  use_local "$repo" "$(basename "$repo")" "local"
  exit 0
fi

# --- Normalize the target into a clone URL + slug ------------------------------
strip_url() {
  printf '%s' "$1" | sed -E 's#^[a-zA-Z][a-zA-Z0-9+.-]*://##; s#^www\.##; s#\.git/?$##; s#/$##; s#/tree/.*##; s#/$##'
}

raw="$(strip_url "$target")"
slug=""
clone_url=""

if printf '%s' "$raw" | grep -Eq '^github\.com/([^/]+)/([^/]+)$'; then
  slug="${raw#github.com/}"
  clone_url="https://github.com/${slug}.git"
elif printf '%s' "$raw" | grep -Eq '^([^./]+)/([^/]+)$'; then
  # owner/repo shorthand -> GitHub
  slug="$raw"
  clone_url="https://github.com/${slug}.git"
elif printf '%s' "$raw" | grep -Eq '^([^./]+)$'; then
  # bare name (no slash, no dot): treat as a HAXtheweb ecosystem project
  slug="haxtheweb/$raw"
  clone_url="https://github.com/${slug}.git"
else
  # Any other git host: clone as given; slug from the last two path segments.
  clone_url="$target"
  slug="$(printf '%s' "$raw" | awk -F/ '{ if (NF>=2) print $(NF-1) "/" $NF; else print $NF }')"
fi

[ -n "$slug" ] || { echo "error: could not derive a repo slug from: $target" >&2; exit 1; }

# --- HAXtheweb local-first: skip the clone when a local checkout exists ---------
case "$slug" in
  haxtheweb/*)
    repo_name="${slug#haxtheweb/}"
    if [ -d "$haxroot/$repo_name/.git" ]; then
      use_local "$haxroot/$repo_name" "$slug" "local-haxtheweb"
      exit 0
    fi
    # no local checkout — fall through and clone from GitHub normally
    ;;
esac

scratch="/tmp/heosat-$(printf '%s' "$slug" | tr '/' '-')"
repo_dir="$scratch/repo"

# --- Clone (or reuse) -----------------------------------------------------------
if [ -d "$repo_dir/.git" ]; then
  echo "SCRATCH=$scratch"
  echo "REPO=$repo_dir"
  echo "REUSED=clone"
else
  mkdir -p "$scratch"
  if [ "$depth" = "0" ]; then
    git clone "$clone_url" "$repo_dir" --quiet
  else
    git clone "$clone_url" "$repo_dir" --quiet --depth "$depth"
  fi
  echo "SCRATCH=$scratch"
  echo "REPO=$repo_dir"
  echo "REUSED=no"
fi

print_inventory "$repo_dir" "$slug"
