// Build-time screenshot pipeline for hax.psu.edu example thumbnails.
//
// Replaces the legacy hosted service:
//   https://screenshoturl.open-apis.hax.cloud/api/screenshotUrl?...
// by capturing each example's `captureUrl` locally with Playwright and
// writing JPEGs into assets/screenshots/ (which rollup-plugin-copy ships
// into dist/ and built/).
//
// Capture happens at a desktop viewport (--width/--height, default 1500x900)
// so responsive sites lay out their desktop design, then sharp resizes /
// compresses each frame to the render size (--out-width/--out-height,
// default 400x250) — the dimensions simple-img actually displays. A longer
// settle delay (default 4000ms) gives slower, older-HAX sites time to hydrate.
//
// Usage:
//   node scripts/screenshot.mjs              # cached (7-day TTL)
//   node scripts/screenshot.mjs --force      # re-capture everything
//   node scripts/screenshot.mjs --ttl 0      # same as --force
//   node scripts/screenshot.mjs --settle 6000   # slower sites
//   node scripts/screenshot.mjs --out-width 400 --out-height 250 --out-quality 80
//
// One-time Ubuntu prerequisite for OS libraries (browser binary auto-installs):
//   npx playwright install-deps chromium

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { examples } from '../src/examples.mjs';
import { screenshotRelPath } from '../src/slug.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const assetsDir = path.join(repoRoot, 'assets');
const cacheDir = path.join(repoRoot, '.screenshot-cache');
const manifestPath = path.join(cacheDir, 'manifest.json');

const DAY = 24 * 60 * 60 * 1000;

function parseArgs(argv) {
  const opts = {
    force: false,
    ttl: 7 * DAY,
    // capture viewport (desktop layout)
    width: 1500,
    height: 900,
    // SPA hydration wait cap — older-HAX sites render slower; per-item
    // `settle` in examples.mjs overrides this for known-slow sites.
    settle: 10000,
    // output (render) size + compression
    outWidth: 400,
    outHeight: 250,
    outQuality: 80,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') opts.force = true;
    else if (a === '--ttl') opts.ttl = parseInt(argv[++i], 10) * 1000;
    else if (a === '--width') opts.width = parseInt(argv[++i], 10);
    else if (a === '--height') opts.height = parseInt(argv[++i], 10);
    else if (a === '--settle') opts.settle = parseInt(argv[++i], 10);
    else if (a === '--out-width') opts.outWidth = parseInt(argv[++i], 10);
    else if (a === '--out-height') opts.outHeight = parseInt(argv[++i], 10);
    else if (a === '--out-quality') opts.outQuality = parseInt(argv[++i], 10);
  }
  return opts;
}

// Bundle capture+output params into a cache key so changing the render size
// or quality auto-invalidates stale entries without needing --force.
function signature(opts) {
  return `${opts.width}x${opts.height}->${opts.outWidth}x${opts.outHeight}q${opts.outQuality}`;
}

async function readManifest() {
  try {
    const raw = await fs.readFile(manifestPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch (e) {
    const msg = String((e && e.message) || e);
    if (/Executable doesn't exist|playwright install|chromium-headless-shell/i.test(msg)) {
      console.log('  Chromium not found, installing browser binary...');
      const cli = path.join(repoRoot, 'node_modules', 'playwright', 'cli.js');
      execSync(`node "${cli}" install chromium`, { stdio: 'inherit', cwd: repoRoot });
      return await chromium.launch();
    }
    throw e;
  }
}

async function captureOne(page, item, opts) {
  const rel = screenshotRelPath(item);
  const abs = path.join(assetsDir, rel);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  console.log(`  capturing ${item.captureUrl}`);
  // 'load' (not 'networkidle') — many sites keep long-lived sockets open
  // and never reach networkidle. Some sites (e.g. tsv-dbfp) reset the first
  // headless request but succeed on a follow-up, so retry transient net
  // errors once. On timeout we proceed and capture current state.
  for (let attempt = 1; ; attempt++) {
    try {
      await page.goto(item.captureUrl, { waitUntil: 'load', timeout: 60000 });
      break;
    } catch (e) {
      const msg = String((e && e.message) || e);
      if (/Timeout|timeout/i.test(msg)) {
        console.log(`  (load timed out, capturing current state)`);
        break;
      }
      if (
        attempt < 2 &&
        /ERR_CONNECTION_RESET|ERR_NAME_NOT_RESOLVED|ERR_TIMED_OUT|ERR_NETWORK_CHANGED|ERR_INTERNET_DISCONNECTED/i.test(msg)
      ) {
        console.log(`  (nav failed, retrying) ${msg.split('\n')[0]}`);
        await page.waitForTimeout(1500);
        continue;
      }
      throw e;
    }
  }
  const settle = item.settle != null ? item.settle : opts.settle;
  // Wait until the page has rendered real text content (SPA hydrated from
  // site.json), capped at `settle` ms. Falls through on timeout so a stuck /
  // slow site is still captured after the wait instead of erroring out —
  // this avoids grabbing a blank loading frame on older, slower HAX sites.
  try {
    await page.waitForFunction(
      () => document.body && document.body.innerText.trim().length > 100,
      { timeout: settle },
    );
  } catch {}
  // brief paint settle after content appears / cap elapses
  await page.waitForTimeout(500);
  // Capture lossless at the desktop viewport, then resize/compress to the
  // render size so we ship small files instead of 1500x900 client-scaled.
  const png = await page.screenshot({ type: 'png', fullPage: false });
  await sharp(png)
    .resize(opts.outWidth, opts.outHeight, { fit: 'fill' })
    .jpeg({ quality: opts.outQuality })
    .toFile(abs);
  return {
    capturedAt: Date.now(),
    captureUrl: item.captureUrl,
    file: rel,
    signature: signature(opts),
  };
}

async function main() {
  const opts = parseArgs(process.argv);
  await fs.mkdir(cacheDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });
  const manifest = await readManifest();
  const now = Date.now();

  const todo = [];
  const skip = [];
  for (const item of examples) {
    const rel = screenshotRelPath(item);
    const abs = path.join(assetsDir, rel);
    const entry = manifest[item.captureUrl];
    const fresh =
      !opts.force &&
      entry &&
      entry.captureUrl === item.captureUrl &&
      entry.signature === signature(opts) &&
      now - entry.capturedAt < opts.ttl;
    if (fresh && (await fileExists(abs))) {
      skip.push(item.title);
    } else {
      todo.push(item);
    }
  }

  if (skip.length) {
    console.log(`Skipping ${skip.length} fresh screenshot(s): ${skip.join(', ')}`);
  }
  if (!todo.length) {
    console.log('All screenshots up to date.');
    return;
  }

  console.log(`Capturing ${todo.length} screenshot(s) at ${opts.width}x${opts.height}...`);
  const browser = await launchBrowser();
  try {
    // ignoreHTTPSErrors handles self-signed / expired cert sites (e.g. tsv-dbfp);
    // a fresh page per item stops one failed navigation from contaminating the next.
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: opts.width, height: opts.height },
      // realistic UA — some sites block the default HeadlessChrome UA
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    for (const item of todo) {
      const page = await context.newPage();
      try {
        const res = await captureOne(page, item, opts);
        manifest[item.captureUrl] = res;
        console.log(`  done  ${screenshotRelPath(item)}`);
      } catch (e) {
        console.error(`  FAIL  ${item.title}: ${(e && e.message) || e}`);
      } finally {
        await page.close().catch(() => {});
      }
    }
  } finally {
    await browser.close();
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Done. Manifest updated.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
