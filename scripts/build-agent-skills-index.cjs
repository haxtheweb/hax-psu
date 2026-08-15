#!/usr/bin/env node
/**
 * Build .well-known/agent-skills/ for the hax.psu.edu homepage.
 *
 * Copies a curated allowlist of HAX skills (the "normal HAX site" set) from the
 * sibling ../praw/skills/<name>/ into self-contained .well-known/agent-skills/<name>/
 * and writes an agentskills.io discovery v0.2.0 index.json with sha256 digests.
 *
 * Implements the agentskills.io discovery spec v0.2.0:
 *   https://github.com/cloudflare/agent-skills-discovery-rfc
 *
 * - url is relative ("{name}/SKILL.md") so it resolves against each index's own
 *   location per RFC 3986, whether served from hax.psu.edu or elsewhere.
 * - files[] (non-standard) enumerates auxiliary sibling files (references/**, etc.)
 *   with per-file sha256 digests, so clients can verify every declared file.
 *   Spec clients ignore files[].
 * - Only declarative content is shipped: SKILL.md plus auxiliary .md/.json/.txt
 *   files. Executable artifacts (.js/.cjs/.mjs/.sh/.php/.py/...) are NEVER copied
 *   so they cannot land on a live web server via this directory.
 *
 * No external dependencies — Node built-ins only.
 * Run: npm run build:agent-skills
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SCHEMA_URI = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json';
const NAME_RE = /^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$/;
const MAX_DESC = 1024;
// Only declarative content is shipped in .well-known/agent-skills/. Executable
// artifacts are never listed in files[]/copied so they cannot land on a live
// web server via this step. SKILL.md (.md) and index.json (.json) are always
// covered; aux files are restricted to these exts.
const ALLOWED_AUX_EXT = new Set(['md', 'json', 'txt']);

// The "normal HAX site" skill set — mirrors haxcms-php/.well-known/agent-skills.
// To change the curated set, edit this list and re-run npm run build:agent-skills.
const CURATED_SKILLS = [
  'hax-a11y-audit',
  'hax-claudehax',
  'hax-content-authoring',
  'hax-content-chunking-audit',
  'hax-design-system',
  'hax-managed-files',
  'hax-site-building',
  'hax-site-structure',
  'hax-ubd-backward-design',
  'hax-ubd-essential-questions',
  'hax-ubd-grasps',
  'hax-ubd-six-facets',
  'hax-ubd-stage1',
  'hax-ubd-stage2',
  'hax-ubd-stage3',
  'hax-ubd-unit-audit',
  'hax-udl-audit',
  'hax-webcomponent-dev',
  'oerschema-audit',
  'oerschema-integration-finder',
];

const repoRoot = path.resolve(__dirname, '..');
const prawSkillsDir = path.resolve(repoRoot, '..', 'praw', 'skills');
const outDir = path.join(repoRoot, '.well-known', 'agent-skills');
const indexPath = path.join(outDir, 'index.json');

function sha256(buf) {
  return 'sha256:' + crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Minimal YAML frontmatter parser for the fields we need (name, description).
 * Handles folded (>) and literal (|) block scalars plus simple key: value lines.
 * Nested keys (metadata:) are ignored — we do not need them.
 */
function parseFrontmatter(text) {
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;
  const lines = fmMatch[1].split(/\r?\n/);
  const out = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      let value = kv[2];
      if (value === '>' || value === '|') {
        const fold = value === '>';
        const block = [];
        i++;
        while (i < lines.length && (/^[ \t]+/.test(lines[i]) || lines[i].trim() === '')) {
          block.push(lines[i].replace(/^[ \t]+/, ''));
          i++;
        }
        value = fold ? block.join(' ').replace(/\s+/g, ' ').trim() : block.join('\n').trim();
        out[key] = value;
        continue;
      }
      out[key] = value.trim();
    }
    i++;
  }
  return out;
}

/**
 * Recursively list auxiliary files in a skill dir (everything except SKILL.md).
 * Returns { aux, skipped }:
 *   aux     — allowed content files (.md/.json/.txt) as { path, full }
 *   skipped — executable/non-content files excluded from files[] (for warnings)
 */
function walkAuxFiles(skillDir) {
  const aux = [];
  const skipped = [];
  function walk(dir, rel) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (let e = 0; e < entries.length; e++) {
      const entry = entries[e];
      if (entry.name === 'SKILL.md') continue;
      const full = path.join(dir, entry.name);
      const relPath = rel ? rel + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        walk(full, relPath);
      } else if (entry.isFile()) {
        const ext = entry.name.split('.').pop().toLowerCase();
        if (ALLOWED_AUX_EXT.has(ext)) {
          aux.push({ path: relPath, full: full });
        } else {
          skipped.push(relPath);
        }
      }
    }
  }
  walk(skillDir, '');
  return { aux: aux, skipped: skipped };
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// Clean slate — regenerate the whole directory each run.
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(prawSkillsDir)) {
  console.error('Could not find sibling praw skills dir: ' + prawSkillsDir);
  console.error('Ensure haxtheweb/praw is cloned next to hax-psu before running.');
  process.exit(1);
}

const skills = [];
const warnings = [];

for (let s = 0; s < CURATED_SKILLS.length; s++) {
  const dirName = CURATED_SKILLS[s];
  const skillDir = path.join(prawSkillsDir, dirName);
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) {
    warnings.push('MISSING SKILL.md in ../praw/skills/' + dirName);
    continue;
  }
  const content = fs.readFileSync(skillMdPath);
  const fm = parseFrontmatter(content.toString('utf8'));
  const name = fm && fm.name ? fm.name : dirName;
  const description = fm && fm.description ? fm.description : '';

  if (!NAME_RE.test(name)) {
    warnings.push('INVALID NAME "' + name + '" in ' + dirName + '/ (must be 1-64 chars, lowercase alnum + hyphens, no leading/trailing hyphen)');
  }
  if (description.length > MAX_DESC) {
    warnings.push('LONG DESCRIPTION (' + description.length + ' > ' + MAX_DESC + ') in ' + name);
  }
  if (!description) {
    warnings.push('MISSING DESCRIPTION in ' + name);
  }

  // Copy SKILL.md + aux into .well-known/agent-skills/<name>/
  const destSkillDir = path.join(outDir, dirName);
  fs.mkdirSync(destSkillDir, { recursive: true });
  copyFile(skillMdPath, path.join(destSkillDir, 'SKILL.md'));

  const walked = walkAuxFiles(skillDir);
  walked.skipped.forEach(function (sk) {
    console.log('  excluded ' + dirName + '/' + sk + ' (non-content; not shipped to .well-known)');
  });
  const files = walked.aux
    .map(function (a) {
      copyFile(a.full, path.join(destSkillDir, a.path));
      return { path: a.path, digest: sha256(fs.readFileSync(a.full)) };
    })
    .sort(function (a, b) {
      return a.path.localeCompare(b.path);
    });

  const skill = {
    name: name,
    type: 'skill-md',
    description: description,
    url: name + '/SKILL.md',
    digest: sha256(content),
  };
  if (files.length > 0) {
    skill.files = files;
  }
  skills.push(skill);
}

skills.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

const index = { '$schema': SCHEMA_URI, skills: skills };

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');

console.log('Wrote ' + path.relative(repoRoot, indexPath) + ' (' + skills.length + ' skills)');
if (warnings.length > 0) {
  console.warn('\nWarnings:');
  warnings.forEach(function (w) {
    console.warn('  - ' + w);
  });
  process.exit(2);
}
