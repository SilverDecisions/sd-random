# Changelog

## Unreleased

Changes since `0.1.4`. The version number is not changed yet, and the
committed `dist/` is still the `0.1.4` build.

### Behaviour changes (bug fixes)

- `Gamma(alpha, beta)` with `alpha > 1` threw `ReferenceError: u is not
  defined` in every build (the rejection test used `u` instead of `u1`). It
  now returns values; the algorithm (Cheng's GB) is the one of CPython's
  `random.gammavariate` and gives the same values for the same draws. In
  SilverDecisions such formulas were rejected by the sensitivity analysis
  dialog and failed in expressions.
- `Exponential()` / `Exponential(null)` returned `NaN` (`beta == 1` instead of
  `beta = 1`); `beta` now defaults to 1 like the other parameters. Calls with
  `beta` are unchanged.

All other results are unchanged for the same `Math.random` draws.

### Open (not changed, needs a decision)

- `Gamma` does not validate its parameters, unlike the other functions that
  return `NaN`: `Gamma(0, 1)` returns 0, `Gamma(0.5, -2)` negative values, and
  `alpha <= -e` loops forever (e.g. `Gamma(-3, 1)`).
- The JSDoc of `Gamma` calls `beta` a rate parameter, but it is used as a
  scale (`x * beta`, mean `alpha * beta`), as in `random.gammavariate`.
- `LogNormal(mean, std)` takes the mean and standard deviation of the
  underlying normal distribution; the JSDoc says "mean value".

### Build

- The bundles are built with Rollup and Babel 7 instead of gulp/browserify,
  with the same formats, global names and ES5 output. `npm run docs` replaces
  the gulp `doc` task; documentation.js 14 writes `doc/API.md` in a newer
  layout (table of contents), so it is regenerated with the next release.
