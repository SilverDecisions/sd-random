// JavaScript build (`npm run build`). Each bundle is written as a plain file with
// an inline source map and as a minified file with an external .map, like the
// previous gulp/browserify build:
//   dist/sd-random(.min).js             defines a global `require` that returns the
//                                       exports of index.js for require('sd-random')
//                                       (format of browserify's `require` option, used
//                                       by the tests of sd-computations)
//   dist/standalone/sd-random(.min).js  UMD of standalone.index.js: the exports as
//                                       module.exports, AMD module or SilverDecisions.Random
import {babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import {requireBundle} from './scripts/require-bundle.mjs';

const NAME = 'sd-random';

// The Babel options of the `browserify.transform` field in package.json, which
// consumers use to compile index.js and src/: ES5 (no targets).
const babelPlugin = () => babel({
    babelHelpers: 'bundled',
    babelrc: false,
    configFile: false,
    presets: ['@babel/preset-env']
});

function outputs(file, output) {
    // __esModule as in the previous Babel/browserify bundles
    output = Object.assign({exports: 'named', esModule: true}, output);
    return [
        Object.assign({file: file + '.js', sourcemap: 'inline'}, output),
        Object.assign({file: file + '.min.js', sourcemap: true, plugins: [terser()]}, output)
    ];
}

export default [
    {
        input: 'index.js',
        plugins: [babelPlugin(), requireBundle(NAME)],
        output: outputs('dist/' + NAME, {format: 'cjs'})
    },
    {
        input: 'standalone.index.js',
        plugins: [babelPlugin()],
        output: outputs('dist/standalone/' + NAME, {format: 'umd', name: 'SilverDecisions.Random', extend: true})
    }
];
