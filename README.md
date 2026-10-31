# sd-random
Tools  for generating random numbers from various distributions

## Usage

The package entry point is the source: `index.js` exports the distribution
functions (`Uniform`, `Exponential`, `Normal`, `Pareto`, `Weibull`,
`Triangular`, `Trapezoidal`, `LogNormal`, `Gamma`, `Loglogistic`, `Erlang`,
`Bernoulli`, `Binomial`, `Geometric`, `Poisson`), `functionNameList`,
`menuList` and `random`. See [doc/API.md](doc/API.md). All functions draw from
`Math.random`; invalid parameters give `NaN` (except `Gamma`, see
[CHANGELOG.md](CHANGELOG.md)). sd-expression-engine imports the functions of
`functionNameList` into Math.js.

Consumers bundle the package with browserify; the `browserify.transform` field
compiles it with Babel to ES5. Prebuilt bundles in `dist/`:

| File | Format |
|---|---|
| `dist/sd-random(.min).js` | assigns a global `require`; `require('sd-random')` returns the exports (format of browserify's `require` option, loaded by the tests of sd-computations, also in their job worker) |
| `dist/standalone/sd-random(.min).js` | UMD: the exports as `module.exports`, AMD module or global `SilverDecisions.Random` |

The plain files have inline source maps, the minified files external `.map` files.

## Development

Node 24 (`.nvmrc`); CI also builds and tests on Node 22. The library itself
runs in browsers (ES5 output) and does not require a Node version.

```bash
npm ci
npm run build        # clean dist/, Rollup (rollup.config.mjs) with Babel 7
npm test             # node:test contract tests against dist/ (run the build first)
npm run test:build   # isolated build check, see scripts/check-build.js
npm run docs         # regenerate doc/API.md (documentation.js)
```

`npm test` tests `dist/standalone/sd-random.js` by default. `SD_RANDOM_TARGET`
selects another bundle: `module` (`dist/sd-random.js`), `standalone.min` and
`module.min` (the minified files), or a CommonJS file exporting the module
(used for a browserify bundle of the packed package). Tests mock
`Math.random` per test (`t.mock.method`, restored after each test) and
compare with independent reference values (scipy, mpmath, CPython's
`random.gammavariate`); the sample moment checks use a seeded generator, so
they give the same result on every run.

`npm run test:build` (CI on Linux) copies the working tree, runs `npm ci` and
the build, checks the six artifacts (ES5, parsed source maps) and that nothing
outside `dist/` changed, runs the tests against the four bundles (plain and
minified), packs the package, installs the tarball into an empty consumer that
bundles it with browserify + babelify like SilverDecisions and tests that
bundle, and checks that a syntax error fails the build with a non-zero exit
code. Windows CI runs a smoke build, the tests on the four bundles and the
check without the consumer install.

`dist/` is committed and rebuilt by the release (`release-it` runs
`npm run build` after the version bump). Until then it is the build of the
last release, which predates the fixes in [CHANGELOG.md](CHANGELOG.md), so
test changes on a fresh build (`npm run build`, `npm run test:build`).
