import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';

import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
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
          src: 'assets/',
          dest: `${outputDir}/assets`,
          flatten: false
        },
        {
          src: 'node_modules/@haxtheweb/rpg-character/lib/',
          dest: `${outputDir}`,
          flatten: false
        },
        {
          src: ['node_modules/@haxtheweb/simple-icon/lib/svgs/*', '!elements/simple-icon/lib/svgs/elmsln-custom'],
          dest: `${outputDir}/svgs`,
          flatten: false
        },
        {
          src: 'node_modules/@haxtheweb/hax-iconset/lib/svgs/*',
          dest: `${outputDir}/svgs`,
          flatten: false
        },
        {
          src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
          dest: path.resolve(__dirname, 'dist/shoelace'),
          flatten: false
        },
      ],
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS */
    terser(),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
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
