// Keep the no-JS / AI-facing copies of the homepage in sync with the page.
//
// src/hax-psu.js is the source of truth for homepage copy. Its content lives
// in shadow DOM, so crawlers and AI fetchers that don't run JavaScript can't
// see it. This script renders the real component in headless Chromium, walks
// its shadow DOM, and regenerates everything that would otherwise drift:
//
//   index.html  - the light-DOM copy between the sync:static-content markers
//   index.html  - the FAQPage node of the JSON-LD (questions/answers)
//   llms-full.txt - the full homepage as Markdown
//   llms.txt    - the examples list between the sync:examples markers
//                 (from src/examples.mjs, which the page also renders)
//
// Usage:
//   node scripts/sync-static-content.mjs           # write files
//   node scripts/sync-static-content.mjs --check   # exit 1 if anything drifted
//
// Uses the Playwright Chromium the screenshot pipeline already needs. Set
// CHROMIUM_PATH to point at a specific Chromium binary if needed.

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { startDevServer } from '@web/dev-server';
import { examples } from '../src/examples.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const SITE = 'https://hax.psu.edu/';
const CHECK = process.argv.includes('--check');

const files = {
  index: path.join(repoRoot, 'index.html'),
  llms: path.join(repoRoot, 'llms.txt'),
  llmsFull: path.join(repoRoot, 'llms-full.txt'),
};

// ---------------------------------------------------------------------------
// 1. Render the component and extract a small content tree from shadow DOM
// ---------------------------------------------------------------------------

async function extractTree() {
  const server = await startDevServer({
    config: {
      rootDir: repoRoot,
      port: 0,
      hostname: 'localhost',
      nodeResolve: { exportConditions: ['browser', 'production'] },
      watch: false,
    },
    readCliArgs: false,
    readFileConfig: false,
    logStartMessage: false,
  });
  // port 0 = any free port; read back the one the OS picked
  const address = server.server.address();
  const origin = `http://localhost:${address.port}`;
  const launchOpts = {};
  if (process.env.CHROMIUM_PATH) {
    launchOpts.executablePath = process.env.CHROMIUM_PATH;
  }
  const browser = await chromium.launch(launchOpts);
  try {
    // reduced motion keeps the h1 word-swap animation from changing text
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    // only our own dev server: no analytics, fonts, stats API or YouTube,
    // so the output is deterministic (the live usage stats are left out)
    await page.route('**/*', (route) =>
      route.request().url().startsWith(origin) ? route.continue() : route.abort(),
    );
    await page.goto(`${origin}/index.html`);
    await page.waitForFunction(() => {
      const el = document.querySelector('hax-psu');
      return el && el.shadowRoot && el.shadowRoot.querySelector('#section-9 details');
    }, null, { timeout: 60000 });
    return await page.evaluate(extractInPage);
  } finally {
    await browser.close();
    await server.stop();
  }
}

// Runs in the browser. Returns { hero, sections, footer, faq }.
// Block nodes:  {t:'h', level, c}  {t:'p', c}  {t:'ul', items:[c]}  {t:'pre', v}
//               {t:'examples'}  (placeholder filled from examples.mjs)
// Inline nodes: {t:'text', v}  {t:'strong'|'em', c}  {t:'code', v}  {t:'a', href, c}
function extractInPage() {
  const root = document.querySelector('hax-psu').shadowRoot;
  const SKIP = new Set([
    'HR', 'IMG', 'SIMPLE-IMG', 'RPG-CHARACTER', 'COUNT-UP', 'SCROLL-BUTTON',
    'SCRIPT', 'STYLE', 'TEMPLATE',
  ]);

  function inline(node) {
    const out = [];
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        out.push({ t: 'text', v: n.textContent });
        return;
      }
      if (n.nodeType !== Node.ELEMENT_NODE || SKIP.has(n.tagName)) return;
      switch (n.tagName) {
        case 'STRONG':
        case 'B':
          out.push({ t: 'strong', c: inline(n) });
          break;
        case 'EM':
        case 'I':
          out.push({ t: 'em', c: inline(n) });
          break;
        case 'CODE':
          out.push({ t: 'code', v: n.textContent });
          break;
        case 'A':
          out.push({ t: 'a', href: n.getAttribute('href'), c: inline(n) });
          break;
        case 'SIMPLE-CTA':
          out.push({ t: 'a', href: n.getAttribute('link'), c: inline(n) });
          break;
        case 'BR':
          out.push({ t: 'text', v: ' ' });
          break;
        default:
          out.push(...inline(n));
      }
    });
    return out;
  }

  function blocks(node, ctx) {
    const out = [];
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        if (n.textContent.trim()) out.push({ t: 'p', c: [{ t: 'text', v: n.textContent }] });
        return;
      }
      if (n.nodeType !== Node.ELEMENT_NODE || SKIP.has(n.tagName)) return;
      const tag = n.tagName;
      const h = /^H([1-6])$/.exec(tag);
      if (h) {
        ctx.level = parseInt(h[1], 10);
        out.push({ t: 'h', level: ctx.level, c: inline(n) });
      } else if (tag === 'P') {
        out.push({ t: 'p', c: inline(n) });
      } else if (tag === 'UL' || tag === 'OL') {
        out.push({ t: 'ul', items: [...n.children].map((li) => inline(li)) });
      } else if (tag === 'PRE') {
        out.push({ t: 'pre', v: n.textContent });
      } else if (tag === 'DETAILS') {
        const summary = n.querySelector('summary');
        const level = Math.min(ctx.level + 1, 6);
        out.push({ t: 'h', level, c: summary ? inline(summary) : [] });
        const body = document.createElement('div');
        [...n.childNodes].forEach((c) => {
          if (c !== summary) body.appendChild(c.cloneNode(true));
        });
        out.push(...blocks(body, { level }));
      } else if (tag === 'PLAY-LIST' && n.id === 'examplestemplate') {
        out.push({ t: 'examples' });
      } else if (tag === 'VIDEO-PLAYER') {
        out.push({
          t: 'p',
          c: [
            { t: 'text', v: 'Watch: ' },
            {
              t: 'a',
              href: n.getAttribute('source'),
              c: [{ t: 'text', v: n.getAttribute('media-title') || 'video' }],
            },
          ],
        });
      } else if (tag === 'SIMPLE-CTA') {
        out.push({ t: 'p', c: inline({ childNodes: [n] }) });
      } else {
        // div, grid-plate, page-section wrappers, etc: keep walking
        out.push(...blocks(n, ctx));
      }
    });
    return out;
  }

  // plain-text answer for JSON-LD: link text plus its target in parentheses
  function plain(node) {
    let s = '';
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) s += n.textContent;
      else if (n.nodeType !== Node.ELEMENT_NODE || SKIP.has(n.tagName)) return;
      else if (n.tagName === 'A') {
        const href = n.getAttribute('href') || '';
        const text = plain(n).trim();
        const target = href.startsWith('mailto:')
          ? href.slice(7)
          : new URL(href, 'https://hax.psu.edu/').href;
        s += text === target ? text : `${text} (${target})`;
      } else if (n.tagName === 'P' || n.tagName === 'DIV') s += ' ' + plain(n) + ' ';
      else s += plain(n);
    });
    return s;
  }

  const hero = root.querySelector('#section-1');
  const heroLinks = [...hero.querySelectorAll('simple-cta')].map((cta) => ({
    href: cta.getAttribute('link'),
    text: cta.textContent.trim(),
  }));

  const sections = [];
  root.querySelectorAll('main > page-section').forEach((sec) => {
    // hero is mirrored by the hand-written loading state; usage stats are
    // live numbers from an API, not static content
    if (sec.id === 'section-1' || sec.id === 'section-3') return;
    const c = blocks(sec, { level: 1 });
    if (c.length) sections.push({ id: sec.id, c });
  });

  const footer = [...root.querySelectorAll('footer a')]
    .filter((a) => a.textContent.trim())
    .map((a) => ({ href: a.getAttribute('href'), text: a.textContent.replace(/\s+/g, ' ').trim() }));

  const faq = [...root.querySelectorAll('#section-9 details')].map((d) => {
    const summary = d.querySelector('summary');
    const body = document.createElement('div');
    [...d.childNodes].forEach((c) => {
      if (c !== summary) body.appendChild(c.cloneNode(true));
    });
    return { q: summary.textContent, a: plain(body) };
  });

  return { heroLinks, sections, footer, faq };
}

// ---------------------------------------------------------------------------
// 2. Normalize + render
// ---------------------------------------------------------------------------

const squash = (s) => s.replace(/\s+/g, ' ');

// collapse whitespace across an inline run and trim its ends
function tidy(inl) {
  const flat = JSON.parse(JSON.stringify(inl));
  // merge adjacent text nodes first so whitespace collapses across them
  // (e.g. "link</a>.<br/>\n  All" -> "link. All", not "link.  All")
  const merge = (nodes) => {
    for (let i = nodes.length - 1; i > 0; i--) {
      if (nodes[i].t === 'text' && nodes[i - 1].t === 'text') {
        nodes[i - 1].v += nodes[i].v;
        nodes.splice(i, 1);
      }
    }
    nodes.forEach((n) => {
      if (n.c) merge(n.c);
    });
  };
  merge(flat);
  const walk = (nodes) =>
    nodes.forEach((n) => {
      if (n.t === 'text' || n.t === 'code') n.v = squash(n.v);
      if (n.c) walk(n.c);
    });
  walk(flat);
  // trim leading/trailing whitespace of the whole run
  const edge = (nodes, first) => {
    const n = first ? nodes[0] : nodes[nodes.length - 1];
    if (!n) return;
    if (n.t === 'text' || n.t === 'code') n.v = first ? n.v.replace(/^ /, '') : n.v.replace(/ $/, '');
    else if (n.c) edge(n.c, first);
  };
  edge(flat, true);
  edge(flat, false);
  return flat;
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inlineHtml(nodes) {
  return nodes
    .map((n) => {
      switch (n.t) {
        case 'text': return esc(n.v);
        case 'code': return `<code>${esc(n.v)}</code>`;
        case 'strong': return `<strong>${inlineHtml(n.c)}</strong>`;
        case 'em': return `<em>${inlineHtml(n.c)}</em>`;
        case 'a': return `<a href="${esc(n.href)}">${inlineHtml(n.c)}</a>`;
        default: return '';
      }
    })
    .join('');
}

const absolute = (href) => (href.startsWith('mailto:') ? href : new URL(href, SITE).href);
const mdText = (s) => s.replace(/([\\`*_[\]])/g, '\\$1');

function inlineMd(nodes) {
  return nodes
    .map((n) => {
      switch (n.t) {
        case 'text': return mdText(n.v);
        case 'code': return '`' + n.v + '`';
        case 'strong': return `**${inlineMd(n.c).trim()}**`;
        case 'em': return `*${inlineMd(n.c).trim()}*`;
        case 'a': return `[${inlineMd(n.c).trim()}](${absolute(n.href)})`;
        default: return '';
      }
    })
    .join('');
}

const examplesBlocks = () => [
  {
    t: 'ul',
    items: examples.map((ex) => [
      { t: 'a', href: ex.url, c: [{ t: 'text', v: ex.title }] },
      { t: 'text', v: ` (${ex.type}): ${ex.description}` },
    ]),
  },
];

function expand(blocks) {
  return blocks.flatMap((b) => (b.t === 'examples' ? examplesBlocks() : [b]));
}

function renderHtml(data, indent) {
  const lines = [];
  const pad = (n) => indent + '  '.repeat(n);
  data.sections.forEach((sec) => {
    lines.push(`${pad(0)}<section>`);
    expand(sec.c).forEach((b) => {
      if (b.t === 'h') lines.push(`${pad(1)}<h${b.level}>${inlineHtml(tidy(b.c))}</h${b.level}>`);
      else if (b.t === 'p') {
        const body = inlineHtml(tidy(b.c));
        if (body) lines.push(`${pad(1)}<p>${body}</p>`);
      } else if (b.t === 'pre') lines.push(`${pad(1)}<pre><code>${esc(b.v.trim())}</code></pre>`);
      else if (b.t === 'ul') {
        lines.push(`${pad(1)}<ul>`);
        b.items.forEach((it) => lines.push(`${pad(2)}<li>${inlineHtml(tidy(it))}</li>`));
        lines.push(`${pad(1)}</ul>`);
      }
    });
    lines.push(`${pad(0)}</section>`);
  });
  const footer = data.footer
    .map((l) => `<a href="${esc(l.href)}">${esc(l.text)}</a>`)
    .join(' &middot; ');
  lines.push(`${pad(0)}<p class="static-footer">${footer}</p>`);
  return lines.join('\n');
}

function renderMd(data, meta) {
  const out = [];
  out.push(`# ${meta.siteName}`, '', `> ${meta.description}`, '');
  out.push(
    `This is the full text of the ${new URL(SITE).host} homepage as Markdown, for AI assistants and other clients that do not run JavaScript. Canonical page: ${SITE}. A shorter link map is at ${SITE}llms.txt.`,
    '',
    '<!-- Generated by scripts/sync-static-content.mjs from src/hax-psu.js. Do not hand-edit. -->',
    '',
  );
  out.push('## Quick links', '');
  data.heroLinks.forEach((l) => out.push(`- [${mdText(l.text)}](${absolute(l.href)})`));
  out.push('');
  data.sections.forEach((sec) => {
    expand(sec.c).forEach((b) => {
      if (b.t === 'h') out.push(`${'#'.repeat(b.level)} ${inlineMd(tidy(b.c))}`, '');
      else if (b.t === 'p') {
        const body = inlineMd(tidy(b.c));
        if (body) out.push(body, '');
      } else if (b.t === 'pre') out.push('```', b.v.trim(), '```', '');
      else if (b.t === 'ul') {
        b.items.forEach((it) => out.push(`- ${inlineMd(tidy(it))}`));
        out.push('');
      }
    });
  });
  out.push('## Footer', '');
  out.push(data.footer.map((l) => `[${mdText(l.text)}](${absolute(l.href)})`).join(' · '), '');
  return out.join('\n');
}

function renderExamplesMd() {
  return examples
    .map((ex) => `- [${mdText(ex.title)}](${ex.url}): ${ex.type}, ${ex.description}`)
    .join('\n');
}

// ---------------------------------------------------------------------------
// 3. Splice into files
// ---------------------------------------------------------------------------

function between(text, name, body, file) {
  const start = `<!-- sync:${name}:start -->`;
  const end = `<!-- sync:${name}:end -->`;
  const re = new RegExp(`([ \\t]*)${start}[\\s\\S]*?${end}`);
  const m = re.exec(text);
  if (!m) throw new Error(`${file}: missing ${start} / ${end} markers`);
  const indent = m[1];
  const inner = typeof body === 'function' ? body(indent) : body;
  return text.replace(re, `${indent}${start}\n${inner}\n${indent}${end}`);
}

function replaceFaqJsonLd(html, faq) {
  const re = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/;
  const m = re.exec(html);
  if (!m) throw new Error('index.html: no JSON-LD block found');
  const data = JSON.parse(m[2]);
  const graph = data['@graph'] || [];
  const node = graph.find((n) => n['@type'] === 'FAQPage');
  if (!node) throw new Error('index.html: JSON-LD has no FAQPage node');
  node.mainEntity = faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: squash(q).trim(),
    acceptedAnswer: { '@type': 'Answer', text: squash(a).trim() },
  }));
  const json = JSON.stringify(data, null, 2)
    .split('\n')
    .map((l) => '  ' + l)
    .join('\n');
  return html.replace(re, `$1\n${json}\n  $3`);
}

function meta(html) {
  const pick = (re) => {
    const m = re.exec(html);
    return m ? m[1].replace(/&amp;/g, '&') : '';
  };
  return {
    siteName: pick(/<meta property="og:site_name" content="([^"]*)"/),
    description: pick(/<meta name="description" content="([^"]*)"/),
  };
}

async function main() {
  const data = await extractTree();
  if (!data.sections.length) throw new Error('no sections extracted - did the component render?');

  const before = {
    index: await fs.readFile(files.index, 'utf8'),
    llms: await fs.readFile(files.llms, 'utf8'),
    llmsFull: await fs.readFile(files.llmsFull, 'utf8').catch(() => ''),
  };
  let index = between(before.index, 'static-content', (indent) => renderHtml(data, indent), 'index.html');
  index = replaceFaqJsonLd(index, data.faq);
  const after = {
    index,
    llms: between(before.llms, 'examples', renderExamplesMd(), 'llms.txt'),
    llmsFull: renderMd(data, meta(before.index)),
  };

  const changed = Object.keys(files).filter((k) => before[k] !== after[k]);
  if (CHECK) {
    if (changed.length) {
      console.error(
        `Homepage copies are out of date: ${changed.map((k) => path.basename(files[k])).join(', ')}\n` +
          'Run `npm run sync:content` and commit the result.',
      );
      process.exit(1);
    }
    console.log('Homepage copies are in sync.');
    return;
  }
  for (const k of changed) await fs.writeFile(files[k], after[k]);
  console.log(
    changed.length
      ? `Updated ${changed.map((k) => path.basename(files[k])).join(', ')}`
      : 'Already in sync; nothing to write.',
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
