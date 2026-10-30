// Deterministic Math.random for tests. Both helpers use t.mock.method, so
// node:test restores the real Math.random when the test ends, also on failure.
'use strict';

// Math.random returns the given values in order and fails on an extra call.
// draws() is the number of values used so far.
function sequence(t, values) {
    const queue = values.slice();
    t.mock.method(Math, 'random', () => {
        if (!queue.length) {
            throw new Error('Math.random called more often than the ' + values.length + ' values of the test');
        }
        return queue.shift();
    });
    return {draws: () => values.length - queue.length};
}

// Math.random from a seeded generator (mulberry32): the same numbers on every run.
function seeded(t, seed) {
    let a = seed >>> 0;
    t.mock.method(Math, 'random', () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let r = Math.imul(a ^ (a >>> 15), 1 | a);
        r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    });
}

module.exports = {sequence, seeded};
