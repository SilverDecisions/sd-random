// Loads sd-random the way consumers get it and returns its exports.
//
// SD_RANDOM_TARGET selects what is tested (default: standalone):
//   standalone  dist/standalone/sd-random.js, UMD (CommonJS branch)
//   module      dist/sd-random.js, the bundle that defines a global `require`
//               exposing 'sd-random' (loaded by the sd-computations tests)
//   <file>      a CommonJS file exporting the module namespace, e.g. a Browserify
//               bundle of the installed package (scripts/check-build.js)
// SD_RANDOM_DIST points at another dist/ directory (default: ./dist).
//
// Gamma() calls the `random` export, which is Math.random as read when the module
// is evaluated. The module is therefore evaluated while Math.random is a
// dispatcher to the current Math.random, so tests that mock Math.random control
// Gamma() too. Math.random itself is restored right after loading.
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const target = process.env.SD_RANDOM_TARGET || 'standalone';
const dist = path.resolve(__dirname, '..', process.env.SD_RANDOM_DIST || 'dist');

const originalRandom = Math.random;
function dispatcher() {
    return Math.random === dispatcher ? originalRandom() : Math.random();
}

function loadModuleBundle(file) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, 'require');
    try {
        vm.runInThisContext(fs.readFileSync(file, 'utf8'), {filename: file});
        return globalThis.require('sd-random');
    } finally {
        if (previous) {
            Object.defineProperty(globalThis, 'require', previous);
        } else {
            delete globalThis.require;
        }
    }
}

function load() {
    Math.random = dispatcher;
    try {
        if (target === 'standalone') {
            return require(path.join(dist, 'standalone', 'sd-random.js'));
        }
        if (target === 'module') {
            return loadModuleBundle(path.join(dist, 'sd-random.js'));
        }
        return require(path.resolve(target));
    } finally {
        Math.random = originalRandom;
    }
}

module.exports = {target, R: load()};
