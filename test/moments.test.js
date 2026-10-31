// Sample moments against the theoretical ones (scipy.stats mean/std), from a
// seeded Math.random: the samples are the same on every run, so the check cannot
// fail by chance. The tolerance is 5 standard errors of the sample mean.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {R} = require('./load');
const {seeded} = require('./random');

const N = 20000;

// name: [sampler, mean, std]
const CASES = {
    'Uniform(2,5)': [() => R.Uniform(2, 5), 3.5, 0.8660254037844386],
    'Exponential(2)': [() => R.Exponential(2), 2.0, 2.0],
    'Normal(10,2)': [() => R.Normal(10, 2), 10.0, 2.0],
    'Pareto(3,2)': [() => R.Pareto(3, 2), 3.0, 1.7320508075688772],
    'Weibull(2,3)': [() => R.Weibull(2, 3), 2.658680776358274, 1.3897541255283132],
    'Triangular(1,5,2)': [() => R.Triangular(1, 5, 2), 2.666666666666667, 0.8498365855987975],
    'Trapezoidal(0,10,2,6)': [() => R.Trapezoidal(0, 10, 2, 6), 4.571428571428571, 2.216205005375258],
    'LogNormal(1,0.5)': [() => R.LogNormal(1, 0.5), 3.080216848918031, 1.6415718456238662],
    'Loglogistic(4,3)': [() => R.Loglogistic(4, 3), 3.3321622036187737, 1.7417984929171755],
    'Erlang(3,2)': [() => R.Erlang(3, 2), 2.0, 1.1547005383792515],
    'Gamma(1,2)': [() => R.Gamma(1, 2), 2.0, 2.0],
    'Gamma(0.5,3)': [() => R.Gamma(0.5, 3), 1.5, 2.1213203435596424],
    'Bernoulli(0.3)': [() => R.Bernoulli(0.3), 0.3, 0.458257569495584],
    'Binomial(10,0.3)': [() => R.Binomial(10, 0.3), 3.0, 1.449137674618944],
    'Geometric(0.25)': [() => R.Geometric(0.25), 3.0, 3.4641016151377544],
    'Poisson(3.5)': [() => R.Poisson(3.5), 3.5, 1.8708286933869707]
};

function checkMoments(t, name, [sample, mean, std], seed) {
    seeded(t, seed);
    let sum = 0;
    let sumSq = 0;
    for (let i = 0; i < N; i++) {
        const v = sample();
        sum += v;
        sumSq += v * v;
    }
    const m = sum / N;
    const sd = Math.sqrt(sumSq / N - m * m);
    const se = std / Math.sqrt(N);
    assert.ok(Math.abs(m - mean) <= 5 * se, name + ': sample mean ' + m + ', expected ' + mean + ' +- ' + 5 * se);
    // loose check of the spread: catches a wrong scale parameter
    assert.ok(Math.abs(sd - std) <= 0.1 * std, name + ': sample std ' + sd + ', expected ' + std);
}

let seed = 1;
for (const [name, c] of Object.entries(CASES)) {
    const s = seed++;
    test('moments of ' + name, (t) => checkMoments(t, name, c, s));
}

test('moments of Gamma(2.5,2)', (t) => {
    checkMoments(t, 'Gamma(2.5,2)', [() => R.Gamma(2.5, 2), 5.0, 3.1622776601683795], 99);
});
