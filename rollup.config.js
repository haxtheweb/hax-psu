import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';

import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import { elementLocales } from './scripts/rollup-plugin-element-locales.mjs';
import terser from '@rollup/plugin-terser';
import { generateSW } from 'rollup-plugin-workbox';
import pkg from 'rollup-plugin-copy';
const copy = pkg;
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const outputDir = 'dist';
export default {
  input: 'index.html',
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'dist',
  },
  preserveEntrySignatures: false,

  plugins: [
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: true,
      injectServiceWorker: true,
      serviceWorkerPath: 'dist/sw.js',
    }),
    copy({
      targets: [
        {
          src: 'assets/',
          dest: `${outputDir}/`,
          flatten: false
        },
        {
          src: 'null',
          dest: `${outputDir}/`,
          flatten: false
        },
        {
          src: 'node_modules/@haxtheweb/rpg-character/lib/',
          dest: `${outputDir}`,
          flatten: false
        },
        {
          src: ['node_modules/@haxtheweb/simple-icon/lib/svgs/*', '!node_modules/@haxtheweb/simple-icon/lib/svgs/elmsln-custom'],
          dest: `${outputDir}/svgs`,
          flatten: false
        },
        {
          // DDD serves its fonts itself (no Google): the families this page
          // uses, beside the bundle where d-d-d/lib/fonts.js looks for them
          src: [
            'roboto',
            'roboto-slab',
            'roboto-condensed',
            'press-start-2p',
          ].map((f) => `node_modules/@haxtheweb/d-d-d/lib/fonts/${f}`),
          dest: `${outputDir}/fonts`,
          flatten: false
        },
        {
          src: 'node_modules/@haxtheweb/hax-iconset/lib/svgs/*',
          dest: `${outputDir}/svgs`,
          flatten: false
        },
      ],
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS */
    terser(),
    /** Bundle assets references via import.meta.url */
    // warnOnError until the installed elements carry the anchored locale
    // URLs (haxtheweb/issues#3402): older ones point at their `locales/`
    // folder (EISDIR) or, in hax-consent-gate 26.11.0, a file it never
    // shipped (ENOENT). Those references are left as written
    importMetaAssets({ warnOnError: true }),
    /** Copy bundled elements' translations to where they fetch them */
    elementLocales(),
    /** Compile JS to a lower language target */
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: [
              'last 3 Chrome major versions',
              'last 3 Firefox major versions',
              'last 3 Edge major versions',
              'last 3 Safari major versions',
            ],
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-template-html-minifier'),
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
    /** Create and inject a service worker */
    generateSW({
      //navigateFallback: '/index.html',
      // where to output the generated sw
      swDest: path.join('dist', 'sw.js'),
      // directory to match patterns against to be precached
      globDirectory: path.join('dist'),
      // cache any html js and css by default
      globPatterns: ['**/*.{html,js,css,webmanifest}'],
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
};
