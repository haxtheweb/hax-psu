/**
 * Copy the locale files of bundled HAX elements to where they look for them.
 *
 * A HAX element finds its translations at runtime: the i18n manager fetches
 * `${localesPath}/<namespace>.<lang>.json`. A bundler cannot see those
 * fetches, so without this step a bundled site only has English.
 *
 * Where localesPath lands after bundling depends on how the element wrote it:
 * - anchored on a shipped file (the convention, haxtheweb/issues#3402):
 *   `new URL("./locales/<tag>.en.json", import.meta.url).href + "/../"`.
 *   import-meta-assets emits the anchor as an asset, so the folder is the
 *   asset folder (`assetDir`, the output root for this site).
 * - the older folder form, `new URL("./locales/", import.meta.url)`, and
 *   `registerLocalization({ basePath: import.meta.url })` (which the manager
 *   turns into `<module>/../locales`) stay as written and resolve against the
 *   chunk, so `locales/` beside the chunks. A `../locales/` from a lib/
 *   file lands there too: chunks sit at the output root, and `../` above the
 *   root of a site served at its domain root (hax.psu.edu) stays at the root.
 *   Anchors whose file name is built at runtime (`${this.tag}`) are left as
 *   written the same way.
 *
 * Only namespaces whose element module is in the bundle are copied, and never
 * `<tag>.haxProperties.<lang>.json` (HAX editor labels; this site has no
 * editor).
 */
import fs from 'fs';
import path from 'path';

const PKG = /[\\/]node_modules[\\/]@haxtheweb[\\/]([^\\/]+)[\\/]/;
// "./locales/" or `../locales` and friends: the folder form
const FOLDER = /new URL\(\s*["'`]((?:\.\.?\/)+locales)\/?["'`]\s*,\s*import\.meta\.url/;
// "./locales/<file>.json": the anchored form
const ANCHORED = /new URL\(\s*["'`]((?:\.\.?\/)+locales\/[^"'`$]+\.json)["'`]\s*,\s*import\.meta\.url/;
// `../locales/${this.tag}.es.json`: a file name built at runtime
const DYNAMIC = /new URL\(\s*`((?:\.\.?\/)+locales)\/[^`]*\$\{/;
// registerLocalization({ basePath: import.meta.url }): <module dir>/locales
const BASE_PATH = /basePath:\s*import\.meta\.url/;
const LANG_FILE = /^(.+)\.([A-Za-z_-]+)\.json$/;

export function elementLocales({ assetDir = '' } = {}) {
  return {
    name: 'hax-element-locales',
    generateBundle() {
      // locales folder + destination -> namespaces bundled from it
      const folders = new Map();
      for (const id of this.getModuleIds()) {
        // read the published source: by now import-meta-assets has rewritten
        // the anchor in the transformed code
        if (!PKG.test(id) || !id.endsWith('.js') || !fs.existsSync(id)) {
          continue;
        }
        const source = fs.readFileSync(id, 'utf8');
        const here = path.dirname(id);
        const anchor = source.match(ANCHORED);
        const folder = source.match(FOLDER) || source.match(DYNAMIC);
        let rel;
        let dest;
        if (anchor && fs.existsSync(path.resolve(here, anchor[1]))) {
          // emitted as an asset, so the folder is the asset folder
          rel = path.dirname(anchor[1]);
          dest = assetDir;
        } else if (anchor || folder || BASE_PATH.test(source)) {
          // left as written (a folder, a basePath, or an anchor on a file the
          // element never shipped): resolves beside the chunk
          rel = anchor ? path.dirname(anchor[1]) : folder ? folder[1] : './locales';
          dest = 'locales';
        } else {
          continue;
        }
        // keyed by folder and destination: two elements can share a locales
        // folder and still resolve it differently
        const dir = path.resolve(here, rel);
        const key = `${dir}|${dest}`;
        const entry = folders.get(key) || { dir, namespaces: new Set(), dest };
        entry.namespaces.add(path.basename(id, '.js'));
        folders.set(key, entry);
      }
      const emitted = new Set();
      for (const { dir, namespaces, dest } of folders.values()) {
        if (!fs.existsSync(dir)) {
          continue;
        }
        for (const file of fs.readdirSync(dir)) {
          const m = file.match(LANG_FILE);
          if (!m || file.includes('.haxProperties.') || !namespaces.has(m[1])) {
            continue;
          }
          const fileName = dest ? `${dest}/${file}` : file;
          if (emitted.has(fileName)) {
            continue;
          }
          emitted.add(fileName);
          this.emitFile({
            type: 'asset',
            fileName,
            source: fs.readFileSync(path.join(dir, file)),
          });
        }
      }
      console.log(
        `hax-element-locales: ${emitted.size} locale files from ${folders.size} folders`,
      );
    },
  };
}
