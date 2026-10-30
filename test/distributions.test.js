// Contract tests of the distributions with a controlled Math.random.
// Expected values are independent references (scripts and sources noted per value):
// scipy.stats quantile functions for the inverse-transform methods, mpmath for
// Box-Muller, CPython's random.gammavariate (same algorithms) for Gamma, and
// exact arithmetic for the discrete distributions.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {R} = require('./load');
const {sequence} = require('./random');

const close = (actual, expected, rel = 1e-12) =>
    assert.ok(Math.abs(actual - expected) <= rel * Math.max(1, Math.abs(expected)),
        'expected ' + expected + ', got ' + actual);

// value of fn for the given draws; also checks that exactly these draws were used
function draw(t, values, fn) {
    const s = sequence(t, values);
    const v = fn();
    assert.equal(s.draws(), values.length, 'number of Math.random calls');
    return v;
}

// invalid parameters give NaN without drawing
function invalid(t, fn) {
    const s = sequence(t, []);
    assert.ok(Number.isNaN(fn()));
    assert.equal(s.draws(), 0);
}

test('Uniform(a, b)', (t) => {
    close(draw(t, [0.25], () => R.Uniform(2, 5)), 2.75); // scipy uniform.ppf(0.25, 2, 3)
    t.mock.restoreAll();
    assert.equal(draw(t, [0.4], () => R.Uniform()), 0.4);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.4], () => R.Uniform(null, null)), 0.4);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.4], () => R.Uniform(3, 3)), 3);
    t.mock.restoreAll();
    invalid(t, () => R.Uniform(5, 2));
});

test('Exponential(beta): -beta ln(u)', (t) => {
    close(draw(t, [0.25], () => R.Exponential(2)), 2.772588722239781); // scipy expon.ppf(0.75, scale=2)
    t.mock.restoreAll();
    invalid(t, () => R.Exponential(0));
    t.mock.restoreAll();
    invalid(t, () => R.Exponential(-1));
});

test('Exponential() defaults to beta = 1', {todo: 'known bug: `beta == 1` instead of `beta = 1`, returns NaN'}, (t) => {
    close(draw(t, [0.25], () => R.Exponential()), 1.3862943611198906); // scipy expon.ppf(0.75)
    t.mock.restoreAll();
    close(draw(t, [0.25], () => R.Exponential(null)), 1.3862943611198906);
});

test('Normal(mean, std): Box-Muller, first draw u1, second u2', (t) => {
    // mpmath: sqrt(-2 ln 0.3) cos(2 pi 0.6)
    close(draw(t, [0.3, 0.6], () => R.Normal(10, 2)), 7.489206610150558);
    t.mock.restoreAll();
    close(draw(t, [0.3, 0.6], () => R.Normal()), -1.255396694924721);
    t.mock.restoreAll();
    close(draw(t, [0.6065306597126334, 0], () => R.Normal(5, 3)), 8); // u1 = e^-0.5, u2 = 0 -> z = 1
    t.mock.restoreAll();
    assert.equal(draw(t, [0.3, 0.6], () => R.Normal(4, 0)), 4);
    t.mock.restoreAll();
    invalid(t, () => R.Normal(0, -1));
});

test('LogNormal(mean, std) = exp(Normal(mean, std))', (t) => {
    close(draw(t, [0.3, 0.6], () => R.LogNormal(1, 0.5)), 1.4510706344194186); // mpmath exp(1 + 0.5 z)
    t.mock.restoreAll();
    close(draw(t, [0.3, 0.6], () => R.LogNormal()), Math.exp(-1.255396694924721));
    t.mock.restoreAll();
    invalid(t, () => R.LogNormal(0, -1));
});

test('Pareto(alpha, minimum)', (t) => {
    close(draw(t, [0.25], () => R.Pareto(3, 2)), 3.1748021039363987); // scipy pareto.ppf(0.75, b=3, scale=2)
    t.mock.restoreAll();
    assert.equal(draw(t, [0.5], () => R.Pareto()), 2);
    for (const args of [[0, 1], [1, 0], [-1, 1]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Pareto(...args));
    }
});

test('Loglogistic(alpha, beta)', (t) => {
    close(draw(t, [0.25], () => R.Loglogistic(2, 3)), 1.7320508075688772); // scipy fisk.ppf(0.25, c=2, scale=3)
    t.mock.restoreAll();
    close(draw(t, [0.25], () => R.Loglogistic()), 1 / 3);
    for (const args of [[0, 1], [1, 0]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Loglogistic(...args));
    }
});

test('Weibull(alpha, beta) uses 1 - u', (t) => {
    close(draw(t, [0.25], () => R.Weibull(2, 3)), 1.6090800639079548); // scipy weibull_min.ppf(0.25, c=2, scale=3)
    t.mock.restoreAll();
    close(draw(t, [0.25], () => R.Weibull()), -Math.log(0.75));
    for (const args of [[0, 1], [1, -1]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Weibull(...args));
    }
});

test('Erlang(k, beta): k draws, mean beta', (t) => {
    // scipy: sum of expon.ppf(1 - u, scale=2/3) for u = 0.5, 0.25, 0.125
    close(draw(t, [0.5, 0.25, 0.125], () => R.Erlang(3, 2)), 2.7725887222397807);
    t.mock.restoreAll();
    close(draw(t, [0.5, 0.25, 0.125], () => R.Erlang(3.9, 2)), 2.7725887222397807); // k truncated to 3
    t.mock.restoreAll();
    close(draw(t, [0.5], () => R.Erlang()), Math.LN2);
    for (const args of [[0, 1], [0.5, 1], [2, 0]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Erlang(...args));
    }
});

test('Triangular(a, b, m)', (t) => {
    close(draw(t, [0.1], () => R.Triangular(1, 5, 2)), 1.632455532033676); // scipy triang.ppf(0.1, c=0.25, loc=1, scale=4)
    t.mock.restoreAll();
    close(draw(t, [0.8], () => R.Triangular(1, 5, 2)), 3.450806661517033); // scipy triang.ppf(0.8, ...)
    t.mock.restoreAll();
    close(draw(t, [0.25], () => R.Triangular(1, 5, 2)), 2); // p == c -> the mode
    t.mock.restoreAll();
    close(draw(t, [0.125], () => R.Triangular()), 0.25);
    t.mock.restoreAll();
    // degenerate: no draw
    assert.equal(draw(t, [], () => R.Triangular(3, 3, 3)), 3);
    for (const args of [[5, 1, 2], [1, 5, 0], [1, 5, 6]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Triangular(...args));
    }
});

test('Trapezoidal(a, b, c, d)', (t) => {
    // scipy trapezoid.ppf(p, c=0.2, d=0.6, loc=0, scale=10)
    close(draw(t, [0.05], () => R.Trapezoidal(0, 10, 2, 6)), 1.1832159566199234);
    t.mock.restoreAll();
    close(draw(t, [0.5], () => R.Trapezoidal(0, 10, 2, 6)), 4.5);
    t.mock.restoreAll();
    close(draw(t, [0.95], () => R.Trapezoidal(0, 10, 2, 6)), 8.326679946931847);
    t.mock.restoreAll();
    assert.equal(draw(t, [], () => R.Trapezoidal(4, 4, 4, 4)), 4);
    t.mock.restoreAll();
    close(draw(t, [0.5], () => R.Trapezoidal()), 0.5);
    for (const args of [[10, 0, 2, 6], [0, 10, -1, 6], [0, 10, 7, 6], [0, 10, 2, 11]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Trapezoidal(...args));
    }
});

test('Bernoulli(p): 1 when u <= p', (t) => {
    assert.equal(draw(t, [0.3], () => R.Bernoulli(0.3)), 1);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.30000001], () => R.Bernoulli(0.3)), 0);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.5], () => R.Bernoulli()), 1);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.999], () => R.Bernoulli(1)), 1);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.001], () => R.Bernoulli(0)), 0);
    for (const p of [-0.1, 1.1]) {
        t.mock.restoreAll();
        invalid(t, () => R.Bernoulli(p));
    }
});

test('Binomial(n, p): sum of n Bernoulli draws', (t) => {
    assert.equal(draw(t, [0.1, 0.9, 0.2, 0.5], () => R.Binomial(4, 0.4)), 2);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.1, 0.9, 0.2], () => R.Binomial(3.7, 0.4)), 2); // n truncated
    t.mock.restoreAll();
    assert.equal(draw(t, [0.6], () => R.Binomial()), 0);
    for (const args of [[0, 0.5], [-2, 0.5], [3, 1.5]]) {
        t.mock.restoreAll();
        invalid(t, () => R.Binomial(...args));
    }
});

test('Geometric(p): failures before the first success', (t) => {
    assert.equal(draw(t, [0.3], () => R.Geometric(0.25)), 4); // scipy geom.ppf(0.7, 0.25) - 1
    t.mock.restoreAll();
    assert.equal(draw(t, [0.9], () => R.Geometric(0.25)), 0);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.2], () => R.Geometric()), 2); // floor(ln 0.2 / ln 0.5)
    for (const p of [0, 1, -0.5]) {
        t.mock.restoreAll();
        invalid(t, () => R.Geometric(p));
    }
});

test('Poisson(lambda): multiply draws until the product is below exp(-lambda)', (t) => {
    // exp(-2) = 0.1353...: 0.5, 0.25 >= it, 0.125 < it -> 2
    assert.equal(draw(t, [0.5, 0.5, 0.5], () => R.Poisson(2)), 2);
    t.mock.restoreAll();
    assert.equal(draw(t, [0.1], () => R.Poisson(2)), 0);
    t.mock.restoreAll();
    // default lambda 1: exp(-1) = 0.3679; 0.9 * 0.5 = 0.45, * 0.5 = 0.225 -> 2
    assert.equal(draw(t, [0.9, 0.5, 0.5], () => R.Poisson()), 2);
    for (const l of [0, -1]) {
        t.mock.restoreAll();
        invalid(t, () => R.Poisson(l));
    }
});

test('Gamma(alpha, beta), alpha == 1: -ln(u) * beta, u <= 1e-7 drawn again', (t) => {
    close(draw(t, [0.25], () => R.Gamma(1, 2)), -2 * Math.log(0.25));
    t.mock.restoreAll();
    close(draw(t, [1e-8, 0, 0.5], () => R.Gamma(1, 3)), 3 * Math.LN2);
    t.mock.restoreAll();
    close(draw(t, [0.5], () => R.Gamma()), Math.LN2); // defaults alpha = 1, beta = 1
});

test('Gamma(alpha, beta), alpha < 1 (algorithm GS, as CPython random.gammavariate)', (t) => {
    close(draw(t, [0.2, 0.1], () => R.Gamma(0.5, 3)), 0.16820559143767147);
    t.mock.restoreAll();
    close(draw(t, [0.9, 0.05], () => R.Gamma(0.5, 3)), 4.321770866807386);
    t.mock.restoreAll();
    close(draw(t, [0.2, 0.99, 0.2, 0.1], () => R.Gamma(0.5, 3)), 0.16820559143767147); // first pair rejected
});

test('Gamma(alpha, beta), alpha > 1 (Cheng GB, as CPython random.gammavariate)', {
    todo: 'known bug: ReferenceError `u is not defined` (u instead of u1)'
}, (t) => {
    close(draw(t, [0.4, 0.3], () => R.Gamma(2.5, 2)), 4.08248290463863);
    t.mock.restoreAll();
    close(draw(t, [0.999, 0.01, 0.5, 0.5], () => R.Gamma(2.5, 2)), 5); // first pair rejected
    t.mock.restoreAll();
    close(draw(t, [0.99999999, 0.6, 0.7], () => R.Gamma(9, 0.5)), 4.965019029414687); // u1 > 0.9999999 skipped
});

test('results are numbers; discrete distributions return integers', (t) => {
    const {seeded} = require('./random');
    seeded(t, 7);
    const discrete = [() => R.Bernoulli(0.4), () => R.Binomial(5, 0.4), () => R.Geometric(0.3), () => R.Poisson(4)];
    for (let i = 0; i < 200; i++) {
        for (const f of discrete) {
            const v = f();
            assert.equal(typeof v, 'number');
            assert.ok(Number.isInteger(v) && v >= 0, String(v));
        }
        for (const v of [R.Uniform(), R.Exponential(1), R.Normal(), R.Pareto(), R.Weibull(), R.Loglogistic(),
            R.Erlang(2, 1), R.Triangular(), R.Trapezoidal(), R.LogNormal(), R.Gamma(0.5, 1), R.Gamma(1, 1)]) {
            assert.equal(typeof v, 'number');
            assert.ok(Number.isFinite(v), String(v));
        }
    }
});
