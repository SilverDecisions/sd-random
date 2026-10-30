// Export contract: sd-expression-engine imports every name of functionNameList
// into Math.js and offers menuList in its UI.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {R, target} = require('./load');

const FUNCTIONS = ['Uniform', 'Exponential', 'Normal', 'Pareto', 'Weibull', 'Triangular', 'Trapezoidal',
    'LogNormal', 'Gamma', 'Loglogistic', 'Erlang', 'Bernoulli', 'Binomial', 'Geometric', 'Poisson'];

test('export names', () => {
    assert.deepEqual(Object.keys(R).sort(), FUNCTIONS.concat(['functionNameList', 'menuList', 'random']).sort());
    assert.equal(R.__esModule, true, target + ': __esModule interop flag');
});

test('functionNameList: every name is an exported function, in menu order', () => {
    assert.deepEqual(R.functionNameList, FUNCTIONS);
    for (const name of R.functionNameList) {
        assert.equal(typeof R[name], 'function', name);
    }
});

test('menuList: one default call per function', () => {
    assert.deepEqual(R.menuList, ['Uniform(0.0,1.0)', 'Exponential(1.0)', 'Normal(0.0,1.0)', 'Pareto(1.0,1.0)',
        'Weibull(1.0,1.0)', 'Triangular(0.0,1.0,0.5)', 'Trapezoidal(0.0,1.0,0.25,0.75)', 'LogNormal(0.0,1.0)',
        'Gamma(1.0,1.0)', 'Loglogistic(1.0,0.5)', 'Erlang(4,0.5)', 'Bernoulli(0.5)', 'Binomial(2,0.5)',
        'Geometric(0.5)', 'Poisson(2.0)']);
    assert.deepEqual(R.menuList.map(s => s.slice(0, s.indexOf('('))), FUNCTIONS);
});

test('random is a function returning numbers in [0, 1)', () => {
    assert.equal(typeof R.random, 'function');
    for (let i = 0; i < 100; i++) {
        const v = R.random();
        assert.ok(v >= 0 && v < 1);
    }
});

test('menuList entries evaluate with their arguments', () => {
    for (const entry of R.menuList) {
        const name = entry.slice(0, entry.indexOf('('));
        const args = entry.slice(entry.indexOf('(') + 1, -1).split(',').map(Number);
        const v = R[name].apply(null, args);
        assert.equal(typeof v, 'number', entry);
        assert.ok(Number.isFinite(v), entry + ' = ' + v);
    }
});
