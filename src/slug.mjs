// Shared path logic for build-time screenshots.
// Imported by BOTH the browser component (src/hax-psu.js) and the Node
// build script (scripts/screenshot.mjs) so the on-disk filename and the
// referenced <img src> can never drift.
//
// Keep this module free of Node-only imports (no fs/path) so it bundles
// cleanly into the browser build.

// "IST 256" -> "ist-256", "Eberly OER Courses" -> "eberly-oer-courses"
export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Path of the screenshot relative to the assets/ directory, e.g.
// "screenshots/ist-256.jpg".
//
// Browser: wrap with makeUrl(...) -> new URL(`../assets/${rel}`, import.meta.url)
// Node:    path.join(repoRoot, 'assets', rel)
export function screenshotRelPath(item) {
  return `screenshots/${slugify(item.title)}.jpg`;
}
