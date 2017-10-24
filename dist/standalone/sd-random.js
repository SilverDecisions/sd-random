(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.SilverDecisions || (g.SilverDecisions = {})).Random = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Uniform = Uniform;
exports.Exponential = Exponential;
exports.Normal = Normal;
exports.Pareto = Pareto;
exports.Loglogistic = Loglogistic;
exports.Weibull = Weibull;
exports.Erlang = Erlang;
exports.Triangular = Triangular;
exports.Trapezoidal = Trapezoidal;
exports.LogNormal = LogNormal;
exports.Bernoulli = Bernoulli;
exports.Binomial = Binomial;
exports.Geometric = Geometric;
exports.Poisson = Poisson;
exports.Gamma = Gamma;
var menuList = exports.menuList = ["Uniform(0.0,1.0)", "Exponential(1.0)", "Normal(0.0,1.0)", "Pareto(1.0,1.0)", "Weibull(1.0,1.0)", "Triangular(0.0,1.0,0.5)", "Trapezoidal(0.0,1.0,0.25,0.75)", "LogNormal(0.0,1.0)", "Gamma(1.0,1.0)", "Loglogistic(1.0,0.5)", "Erlang(4,0.5)", "Bernoulli(0.5)", "Binomial(2,0.5)", "Geometric(0.5)", "Poisson(2.0)"];

var functionNameList = exports.functionNameList = ["Uniform", "Exponential", "Normal", "Pareto", "Weibull", "Triangular", "Trapezoidal", "LogNormal", "Gamma", "Loglogistic", "Erlang", "Bernoulli", "Binomial", "Geometric", "Poisson"];

var random = exports.random = Math.random;

/**
 * Uniform distribution implementation.
 * More details at A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 452
 * @param a lower bound
 * @param b upper bound, b >= a
 * @returns Uniform distributed random value
 */
function Uniform(a, b) {
    if (a == null) a = 0.0;
    if (b == null) b = 1.0;
    if (b < a) return NaN;
    return a + (b - a) * Math.random();
}

/**
 * Exponential distribution mplementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 452 
 * @param beta shape parameter, beta > 0,  lambda = 1/beta. For exponential distribution beta is equal to the mean.
 * @returns Exponentially distributed random value
 */
function Exponential(beta) {
    if (beta == null) beta == 1;
    if (beta <= 0) return NaN;
    return -beta * Math.log(Math.random());
}

/**
 * Normal distribution implementation based on Box and Muller (1958) algorithm
 * Please note that in order to not to store state in this library we use only odd values
 * For discussion see A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 457
 * @param mean mean value
 * @param std standard deviation, std>=0
 * @returns Normally distributed random value
 */
function Normal(mean, std) {
    if (mean == null) mean = 0.0;
    if (std == null) std = 1.0;
    if (std < 0) return NaN;

    var n = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
    return n * std + mean;
}
/**
 * Pareto distribution implementation based on 
 * https://en.wikipedia.org/wiki/Pareto_distribution#Random_sample_generation
 * 
 * @param alpha shape parameter, alpha > 0
 * @param minimum scale parameter, minimum > 0
 * @returns
 */
function Pareto(alpha, minimum) {
    if (alpha == null) alpha = 1.0;
    if (minimum == null) minimum = 1.0;
    if (alpha <= 0 || minimum <= 0) return NaN;
    return minimum / Math.pow(Math.random(), 1.0 / alpha);
}

/**
 * Log-logistic distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 460
 * @param alpha shape parameter, alpha > 0
 * @param beta scale parameter, beta > 0
 * @returns Log-logistic distributed random value
 */
function Loglogistic(alpha, beta) {
    if (alpha == null) alpha = 1.0;
    if (beta == null) beta = 1.0;
    if (beta <= 0 || alpha <= 0) return NaN;
    var u = Math.random();
    return beta * Math.pow(u / (1 - u), 1 / alpha);
}

/**
 * Weibull distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 456
 * @param alpha shape parameter, alpha > 0
 * @param beta scale parameter, beta > 0
 * @returns Weibull distributed random value
 */
function Weibull(alpha, beta) {
    if (alpha == null) alpha = 1.0;
    if (beta == null) beta = 1.0;
    if (beta <= 0 || alpha <= 0) return NaN;
    return beta * Math.pow(-Math.log(1.0 - Math.random()), 1.0 / alpha);
}

/**
 * Erlang distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 453
 * @param k shape parameter, k = 1,2,3,...
 * @param beta scale parameter, beta > 0, beta = 1/lambda. For Erlang distribution beta is equal to the mean value.
 * @returns Erlang distributed random value
 */
function Erlang(k, beta) {
    if (k == null) k = 1;
    if (beta == null) beta = 1.0;
    var m = k | 0;
    if (beta <= 0 || m <= 0) return NaN;
    var mult = 1.0;
    for (var i = 0; i < m; i++) {
        mult *= Math.random();
    }
    return -beta / m * Math.log(mult);
}

/**
 * Triangular distribution implementation
 * @param a left side
 * @param b right side, b >= a
 * @param m triangle peak (mode), a <= m <= b
 * @returns Triangular distributed random value
 */
function Triangular(a, b, m) {
    if (a == null) a = 0.0;
    if (b == null) b = 1.0;
    if (m == null) m = 0.5;
    if (a > b || m < a || m > b) return NaN;
    if (a == b) return a;
    var c = (m - a) / (b - a);
    var p = Math.random();
    if (p <= c) {
        return a + Math.sqrt(p * (b - a) * (m - a));
    } else {
        return b - Math.sqrt((1 - p) * (b - a) * (b - m));
    }
}

/**
 * Trapezoidal distribution implementation
 * @param a left side
 * @param b right side, b >= a
 * @param c left trapezoid peak (mode)
 * @param d right trapezoid peak (mode), a <= c <= d <= b
 * @returns Trapezoidal distributed random value
 */
function Trapezoidal(a, b, c, d) {
    if (a == null) a = 0.0;
    if (b == null) b = 1.0;
    if (c == null) c = 0.25;
    if (d == null) d = 0.75;
    if (a > b || c < a || c > d || d > b) return NaN;
    if (a == b) return a;
    var p1 = (c - a) / (b - a + (d - c));
    var p2 = (b - d) / (b - a + (d - c));
    var p = Math.random();

    if (p <= p1) {
        return a + Math.sqrt(p * (b - a + (d - c)) * (c - a));
    } else if (p > 1 - p2) {
        return b - Math.sqrt((1 - p) * (b - a + (d - c)) * (b - d));
    } else {
        return c + (d - c) * (p - p1) / (1.0 - p1 - p2);
    }
}

/**
 * Lognormal distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 458
 * @param mean mean value
 * @param std standard deviation
 * @returns Lognormally distributed random value
 */
function LogNormal(mean, std) {
    if (mean == null) mean = 0.0;
    if (std == null) std = 1.0;
    if (std < 0) return NaN;
    return Math.exp(Normal(mean, std));
}

/**
 * Bernoulli distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 464
 * @param p probability of 1
 * @returns Bernoulli distributed random value (zero or one)
 */
function Bernoulli(p) {
    if (p == null) p = 0.5;
    if (p < 0.0 | p > 1.0) return NaN;
    if (Math.random() <= p) return 1;else return 0;
}

/**
 * Binomial distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 469
 * @param n number of trials
 * @param p success probability in each trial
 * @returns Binomial distributed random value (0,1,...,n)
 */
function Binomial(n, p) {
    if (n == null) n = 1;
    if (p == null) p = 0.5;
    var t = n | 0;
    if (p < 0.0 | p > 1.0 | t <= 0) return NaN;
    var sum = 0;
    for (var i = 0; i < t; i++) {
        sum += Bernoulli(p);
    }
    return sum;
}

/**
 * Geometric distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 469
 * @param p success probability 
 * @returns Geometric distributed random value 
 */
function Geometric(p) {
    if (p == null) p = 0.5;
    if (p <= 0.0 | p >= 1.0) return NaN;
    return Math.floor(Math.log(Math.random()) / Math.log(1 - p)) | 0;
}

/**
 * Poisson distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 470
 * @param lambda mean value 
 * @returns Poisson distributed random value 
 */
function Poisson(lambda) {
    if (lambda == null) lambda = 1.0;
    if (lambda <= 0.0) return NaN;
    var a = Math.exp(-lambda);
    var b = 1.0;
    var i = 0;
    while (true) {
        var u = Math.random();
        b *= u;
        if (b < a) return i;
        i += 1;
    }
}

/**
 * Gamma distribution implementation.
 * This code has been copied from
 * https://github.com/btelles/simjs-updated/
 * simjs-updated is licensed under MIT Open Source License termns 
 * @param alpha shape parameter
 * @param beta rate parameter 
 * @returns Gamma distributed random value.
 */
function Gamma(alpha, beta) {
    if (alpha == null) alpha = 1.0;
    if (beta == null) beta = 1.0;
    if (alpha > 1.0) {
        var ainv = Math.sqrt(2.0 * alpha - 1.0),
            bbb = alpha - Math.log(4.0),
            ccc = alpha + ainv;

        while (true) {
            // eslint-disable-line no-constant-condition
            var u1 = random();

            if (u1 < 1e-7 || u > 0.9999999) {
                continue;
            }
            var u2 = 1.0 - random(),
                v = Math.log(u1 / (1.0 - u1)) / ainv,
                x = alpha * Math.exp(v),
                z = u1 * u1 * u2,
                r = bbb + ccc * v - x;
            if (r + Math.log(4.5) - 3.5 * z >= 0.0 || r >= Math.log(z)) {
                return x * beta;
            }
        }
    } else if (alpha == 1.0) {
        var _u = random();
        while (_u <= 1e-7) {
            _u = random();
        }
        return -Math.log(_u) * beta;
    } else {
        var _x = void 0;
        while (true) {
            var _u2 = random(),
                b = (Math.E + alpha) / Math.E,
                p = b * _u2;
            if (p <= 1.0) {
                _x = Math.pow(p, 1.0 / alpha);
            } else {
                _x = -Math.log((b - p) / alpha);
            }
            var _u3 = random();

            if (p > 1.0) {
                if (_u3 <= Math.pow(_x, alpha - 1.0)) {
                    break;
                }
            } else if (_u3 <= Math.exp(-_x)) {
                break;
            }
        }
        return _x * beta;
    }
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sdRandom = require('./src/sd-random');

Object.keys(_sdRandom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sdRandom[key];
    }
  });
});

},{"./src/sd-random":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2QtcmFuZG9tLmpzIiwic3RhbmRhbG9uZS5pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1EsQUM0QmdCLFUsQUFBQTtRLEFBWUEsYyxBQUFBO1EsQUFjQSxTLEFBQUE7USxBQWdCQSxTLEFBQUE7USxBQWNBLGMsQUFBQTtRLEFBZUEsVSxBQUFBO1EsQUFjQSxTLEFBQUE7USxBQW9CQSxhLEFBQUE7USxBQXdCQSxjLEFBQUE7USxBQTBCQSxZLEFBQUE7USxBQWNBLFksQUFBQTtRLEFBZ0JBLFcsQUFBQTtRLEFBaUJBLFksQUFBQTtRLEFBV0EsVSxBQUFBO1EsQUF1QkEsUSxBQUFBO0FBeFFULElBQU0sOEJBQVcsQ0FBQSxBQUFDLG9CQUFELEFBQXFCLG9CQUFyQixBQUNDLG1CQURELEFBQ29CLG1CQURwQixBQUVDLG9CQUZELEFBRXFCLDJCQUZyQixBQUdDLGtDQUhELEFBSUMsc0JBSkQsQUFJdUIsa0JBSnZCLEFBS0Msd0JBTEQsQUFLd0IsaUJBTHhCLEFBTUMsa0JBTkQsQUFNa0IsbUJBTmxCLEFBT0Msa0JBUGxCLEFBQWlCLEFBT21COztBQUVwQyxJQUFNLDhDQUFtQixDQUFBLEFBQUMsV0FBRCxBQUFZLGVBQVosQUFDQyxVQURELEFBQ1csVUFEWCxBQUVDLFdBRkQsQUFFWSxjQUZaLEFBR0MsZUFIRCxBQUlDLGFBSkQsQUFJYyxTQUpkLEFBS0MsZUFMRCxBQUtlLFVBTGYsQUFNQyxhQU5ELEFBTWEsWUFOYixBQU9DLGFBUDFCLEFBQXlCLEFBT2M7O0FBR3ZDLElBQU0sMEJBQVMsS0FBZixBQUFvQjs7QUFFM0I7Ozs7Ozs7QUFPTyxTQUFBLEFBQVMsUUFBVCxBQUFpQixHQUFqQixBQUFvQixHQUFHLEFBQzFCO1FBQUksS0FBSixBQUFTLE1BQU0sSUFBQSxBQUFJLEFBQ25CO1FBQUksS0FBSixBQUFTLE1BQU0sSUFBQSxBQUFJLEFBQ3RCO1FB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ckI7WUFBSSxLQUFKLEFBQVEsQUFDUjtlQUFPLE1BQVAsQUFBWSxNQUFNLEFBQ2Q7aUJBQUEsQUFBSSxBQUNQO0FBQ0Q7ZUFBTyxDQUFDLEtBQUEsQUFBSyxJQUFOLEFBQUMsQUFBUyxNQUFqQixBQUFzQixBQUN6QjtBQU5NLEtBQUEsTUFNQSxBQUNIO1lBQUksVUFBSixBQUNBO2VBQUEsQUFBTyxNQUFNLEFBQ1Q7Z0JBQUksTUFBSixBQUFRO2dCQUNKLElBQUksQ0FBQyxLQUFBLEFBQUssSUFBTixBQUFVLFNBQVMsS0FEM0IsQUFDZ0M7Z0JBQzVCLElBQUksSUFGUixBQUVZLEFBQ1o7Z0JBQUksS0FBSixBQUFTLEtBQUssQUFDVjtxQkFBSSxLQUFBLEFBQUssSUFBTCxBQUFTLEdBQUcsTUFBaEIsQUFBSSxBQUFrQixBQUN6QjtBQUZELG1CQUVPLEFBQ0g7cUJBQUksQ0FBQyxLQUFBLEFBQUssSUFBSSxDQUFDLElBQUQsQUFBSyxLQUFuQixBQUFLLEFBQW1CLEFBQzNCO0FBQ0Q7Z0JBQU0sTUFBTixBQUFXLEFBRVg7O2dCQUFJLElBQUosQUFBUSxLQUFLLEFBQ1Q7b0JBQUksT0FBTSxLQUFBLEFBQUssSUFBTCxBQUFTLElBQUksUUFBdkIsQUFBVSxBQUFxQixNQUFPLEFBQ2xDO0FBQ0g7QUFDSjtBQUpELG1CQUlPLElBQUksT0FBTSxLQUFBLEFBQUssSUFBSSxDQUFuQixBQUFVLEFBQVUsS0FBSSxBQUMzQjtBQUNIO0FBQ0o7QUFDRDtlQUFPLEtBQVAsQUFBVyxBQUNkO0FBQ0o7Ozs7Ozs7Ozs7OztBQzVURCw4Q0FBQTtpREFBQTs7Z0JBQUE7d0JBQUE7dUJBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCBtZW51TGlzdCA9IFtcIlVuaWZvcm0oMC4wLDEuMClcIiwgXCJFeHBvbmVudGlhbCgxLjApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3JtYWwoMC4wLDEuMClcIiwgXCJQYXJldG8oMS4wLDEuMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIldlaWJ1bGwoMS4wLDEuMClcIiwgXCJUcmlhbmd1bGFyKDAuMCwxLjAsMC41KVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJhcGV6b2lkYWwoMC4wLDEuMCwwLjI1LDAuNzUpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJMb2dOb3JtYWwoMC4wLDEuMClcIiwgXCJHYW1tYSgxLjAsMS4wKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nbG9naXN0aWMoMS4wLDAuNSlcIixcIkVybGFuZyg0LDAuNSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIkJlcm5vdWxsaSgwLjUpXCIsXCJCaW5vbWlhbCgyLDAuNSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIkdlb21ldHJpYygwLjUpXCIsIFwiUG9pc3NvbigyLjApXCJdO1xuXG5leHBvcnQgY29uc3QgZnVuY3Rpb25OYW1lTGlzdCA9IFtcIlVuaWZvcm1cIiwgXCJFeHBvbmVudGlhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3JtYWxcIiwgXCJQYXJldG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiV2VpYnVsbFwiLCBcIlRyaWFuZ3VsYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJhcGV6b2lkYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nTm9ybWFsXCIsIFwiR2FtbWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nbG9naXN0aWNcIixcIkVybGFuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCZXJub3VsbGlcIixcIkJpbm9taWFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdlb21ldHJpY1wiLCBcIlBvaXNzb25cIl07XG5cblxuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tO1xuXG4vKipcbiAqIFVuaWZvcm0gZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uLlxuICogTW9yZSBkZXRhaWxzIGF0IEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ1MlxuICogQHBhcmFtIGEgbG93ZXIgYm91bmRcbiAqIEBwYXJhbSBiIHVwcGVyIGJvdW5kLCBiID49IGFcbiAqIEByZXR1cm5zIFVuaWZvcm0gZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBVbmlmb3JtKGEsIGIpIHtcbiAgICBpZiAoYSA9PSBudWxsKSBhID0gMC4wO1xuICAgIGlmIChiID09IG51bGwpIGIgPSAxLjA7XG5cdGlmIChiIDwgYSkgcmV0dXJuIE5hTjtcbiAgICByZXR1cm4gYSArIChiIC0gYSkqTWF0aC5yYW5kb20oKTtcbn1cblxuLyoqXG4gKiBFeHBvbmVudGlhbCBkaXN0cmlidXRpb24gbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTIgXG4gKiBAcGFyYW0gYmV0YSBzaGFwZSBwYXJhbWV0ZXIsIGJldGEgPiAwLCAgbGFtYmRhID0gMS9iZXRhLiBGb3IgZXhwb25lbnRpYWwgZGlzdHJpYnV0aW9uIGJldGEgaXMgZXF1YWwgdG8gdGhlIG1lYW4uXG4gKiBAcmV0dXJucyBFeHBvbmVudGlhbGx5IGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gRXhwb25lbnRpYWwoYmV0YSkge1xuXHRpZiAoYmV0YT09bnVsbCkgYmV0YSA9PSAxO1xuXHRpZiAoYmV0YTw9MCkgcmV0dXJuIE5hTjtcdFxuICAgIHJldHVybiAtYmV0YSAqIE1hdGgubG9nKE1hdGgucmFuZG9tKCkpO1xufVxuXG4vKipcbiAqIE5vcm1hbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQm94IGFuZCBNdWxsZXIgKDE5NTgpIGFsZ29yaXRobVxuICogUGxlYXNlIG5vdGUgdGhhdCBpbiBvcmRlciB0byBub3QgdG8gc3RvcmUgc3RhdGUgaW4gdGhpcyBsaWJyYXJ5IHdlIHVzZSBvbmx5IG9kZCB2YWx1ZXNcbiAqIEZvciBkaXNjdXNzaW9uIHNlZSBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTdcbiAqIEBwYXJhbSBtZWFuIG1lYW4gdmFsdWVcbiAqIEBwYXJhbSBzdGQgc3RhbmRhcmQgZGV2aWF0aW9uLCBzdGQ+PTBcbiAqIEByZXR1cm5zIE5vcm1hbGx5IGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gTm9ybWFsKG1lYW4sIHN0ZCkge1xuICAgIGlmIChtZWFuID09IG51bGwpIG1lYW4gPSAwLjA7XG4gICAgaWYgKHN0ZCA9PSBudWxsKSBzdGQgPSAxLjA7XG4gICAgaWYgKHN0ZCA8IDApIHJldHVybiBOYU47XG5cbiAgICBsZXQgbiA9IE1hdGguc3FydCgtMi4wICogTWF0aC5sb2coTWF0aC5yYW5kb20oKSkpICogTWF0aC5jb3MoMi4wICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCkpO1xuICAgIHJldHVybiBuICogc3RkICsgbWVhbjtcbn1cbi8qKlxuICogUGFyZXRvIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhcmV0b19kaXN0cmlidXRpb24jUmFuZG9tX3NhbXBsZV9nZW5lcmF0aW9uXG4gKiBcbiAqIEBwYXJhbSBhbHBoYSBzaGFwZSBwYXJhbWV0ZXIsIGFscGhhID4gMFxuICogQHBhcmFtIG1pbmltdW0gc2NhbGUgcGFyYW1ldGVyLCBtaW5pbXVtID4gMFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBhcmV0byhhbHBoYSwgbWluaW11bSkge1xuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XG5cdGlmIChtaW5pbXVtID09IG51bGwpIG1pbmltdW0gPSAxLjA7XG5cdGlmIChhbHBoYSA8PSAwIHx8IG1pbmltdW0gPD0gMCkgcmV0dXJuIE5hTjtcbiAgICByZXR1cm4gbWluaW11bSAvIE1hdGgucG93KE1hdGgucmFuZG9tKCksIDEuMCAvIGFscGhhKTtcbn1cblxuXG4vKipcbiAqIExvZy1sb2dpc3RpYyBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDYwXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyLCBhbHBoYSA+IDBcbiAqIEBwYXJhbSBiZXRhIHNjYWxlIHBhcmFtZXRlciwgYmV0YSA+IDBcbiAqIEByZXR1cm5zIExvZy1sb2dpc3RpYyBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExvZ2xvZ2lzdGljKGFscGhhLCBiZXRhKSB7XG5cdGlmIChhbHBoYSA9PSBudWxsKSBhbHBoYSA9IDEuMDtcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcblx0aWYgKGJldGEgPD0gMCB8fCBhbHBoYSA8PSAwKSByZXR1cm4gTmFOO1xuXHR2YXIgdSA9IE1hdGgucmFuZG9tKCk7XG5cdHJldHVybiBiZXRhICogTWF0aC5wb3codS8oMS11KSwgMS9hbHBoYSk7XHRcbn1cblxuXG4vKipcbiAqIFdlaWJ1bGwgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ1NlxuICogQHBhcmFtIGFscGhhIHNoYXBlIHBhcmFtZXRlciwgYWxwaGEgPiAwXG4gKiBAcGFyYW0gYmV0YSBzY2FsZSBwYXJhbWV0ZXIsIGJldGEgPiAwXG4gKiBAcmV0dXJucyBXZWlidWxsIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gV2VpYnVsbChhbHBoYSwgYmV0YSkge1xuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XG5cdGlmIChiZXRhID09IG51bGwpIGJldGEgPSAxLjA7XG5cdGlmIChiZXRhIDw9IDAgfHwgYWxwaGEgPD0gMCkgcmV0dXJuIE5hTjtcdFxuICAgIHJldHVybiBiZXRhICogTWF0aC5wb3coLU1hdGgubG9nKDEuMCAtIE1hdGgucmFuZG9tKCkpLCAxLjAgLyBhbHBoYSk7XG59XG5cblxuLyoqXG4gKiBFcmxhbmcgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ1M1xuICogQHBhcmFtIGsgc2hhcGUgcGFyYW1ldGVyLCBrID0gMSwyLDMsLi4uXG4gKiBAcGFyYW0gYmV0YSBzY2FsZSBwYXJhbWV0ZXIsIGJldGEgPiAwLCBiZXRhID0gMS9sYW1iZGEuIEZvciBFcmxhbmcgZGlzdHJpYnV0aW9uIGJldGEgaXMgZXF1YWwgdG8gdGhlIG1lYW4gdmFsdWUuXG4gKiBAcmV0dXJucyBFcmxhbmcgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBFcmxhbmcoaywgYmV0YSkge1xuXHRpZiAoayA9PSBudWxsKSBrID0gMTtcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcblx0dmFyIG0gPSBrIHwgMDtcblx0aWYgKGJldGEgPD0gMCB8fCBtIDw9IDApIHJldHVybiBOYU47XG5cdHZhciBtdWx0ID0gMS4wO1xuXHRmb3IgKHZhciBpPTA7aTxtO2krKykge1xuXHRcdG11bHQgKj0gTWF0aC5yYW5kb20oKTtcblx0fVxuICAgIHJldHVybiAtYmV0YS9tKk1hdGgubG9nKG11bHQpO1xufVxuXG5cbi8qKlxuICogVHJpYW5ndWxhciBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSBhIGxlZnQgc2lkZVxuICogQHBhcmFtIGIgcmlnaHQgc2lkZSwgYiA+PSBhXG4gKiBAcGFyYW0gbSB0cmlhbmdsZSBwZWFrIChtb2RlKSwgYSA8PSBtIDw9IGJcbiAqIEByZXR1cm5zIFRyaWFuZ3VsYXIgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcmlhbmd1bGFyKGEsIGIsIG0pIHtcbiAgICBpZiAoYSA9PSBudWxsKSBhID0gMC4wO1xuICAgIGlmIChiID09IG51bGwpIGIgPSAxLjA7XG4gICAgaWYgKG0gPT0gbnVsbCkgbSA9IDAuNTtcbiAgICBpZiAoYT5iIHx8IG0gPCBhIHx8IG0gPiBiKSByZXR1cm4gTmFOO1xuXHRpZiAoYT09YikgcmV0dXJuIGE7XG4gICAgdmFyIGMgPSAobSAtIGEpIC8gKGIgLSBhKTtcbiAgICB2YXIgcCA9IE1hdGgucmFuZG9tKCk7XG4gICAgaWYgKHAgPD0gYykge1xuICAgICAgICByZXR1cm4gYSArIE1hdGguc3FydChwICogKGIgLSBhKSAqIChtIC0gYSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KCgxIC0gcCkgKiAoYiAtIGEpICogKGIgLSBtKSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogVHJhcGV6b2lkYWwgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gYSBsZWZ0IHNpZGVcbiAqIEBwYXJhbSBiIHJpZ2h0IHNpZGUsIGIgPj0gYVxuICogQHBhcmFtIGMgbGVmdCB0cmFwZXpvaWQgcGVhayAobW9kZSlcbiAqIEBwYXJhbSBkIHJpZ2h0IHRyYXBlem9pZCBwZWFrIChtb2RlKSwgYSA8PSBjIDw9IGQgPD0gYlxuICogQHJldHVybnMgVHJhcGV6b2lkYWwgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcmFwZXpvaWRhbChhLCBiLCBjLCBkKSB7XG4gICAgaWYgKGEgPT0gbnVsbCkgYSA9IDAuMDtcbiAgICBpZiAoYiA9PSBudWxsKSBiID0gMS4wO1xuICAgIGlmIChjID09IG51bGwpIGMgPSAwLjI1O1xuICAgIGlmIChkID09IG51bGwpIGQgPSAwLjc1O1xuICAgIGlmIChhID4gYiB8fCBjIDwgYSB8fCBjID4gZCB8fCBkID4gYikgcmV0dXJuIE5hTjtcblx0aWYgKGE9PWIpIHJldHVybiBhO1xuICAgIHZhciBwMSA9IChjIC0gYSkgLyAoIChiIC0gYSkrKGQgLSBjKSk7XG4gICAgdmFyIHAyID0gKGIgLSBkKSAvICggKGIgLSBhKSsoZCAtIGMpKTtcbiAgICB2YXIgcCA9IE1hdGgucmFuZG9tKCk7XG4gICAgXG4gICAgaWYgKHAgPD0gcDEpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQocCAqICgoYiAtIGEpKyhkIC0gYykpICogKGMgLSBhKSApO1xuICAgIH0gZWxzZSBpZiAocCA+IDEtcDIpIHtcbiAgICAgICAgcmV0dXJuIGIgLSBNYXRoLnNxcnQoKDEgLSBwKSAqICgoYiAtIGEpKyhkIC0gYykpICogKGIgLSBkKSk7XG4gICAgfSBlbHNlIHtcbiAgICBcdHJldHVybiBjICsgKGQtYykqKHAtcDEpLygxLjAgLSBwMSAtIHAyKTtcbiAgICB9XG59XG5cbi8qKlxuICogTG9nbm9ybWFsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NThcbiAqIEBwYXJhbSBtZWFuIG1lYW4gdmFsdWVcbiAqIEBwYXJhbSBzdGQgc3RhbmRhcmQgZGV2aWF0aW9uXG4gKiBAcmV0dXJucyBMb2dub3JtYWxseSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExvZ05vcm1hbChtZWFuLCBzdGQpIHtcbiAgICBpZiAobWVhbiA9PSBudWxsKSBtZWFuID0gMC4wO1xuICAgIGlmIChzdGQgPT0gbnVsbCkgc3RkID0gMS4wO1xuICAgIGlmIChzdGQgPCAwKSByZXR1cm4gTmFOO1xuICAgIHJldHVybiBNYXRoLmV4cChOb3JtYWwobWVhbiwgc3RkKSlcbn1cblxuXG5cbi8qKlxuICogQmVybm91bGxpIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NjRcbiAqIEBwYXJhbSBwIHByb2JhYmlsaXR5IG9mIDFcbiAqIEByZXR1cm5zIEJlcm5vdWxsaSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUgKHplcm8gb3Igb25lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gQmVybm91bGxpKHApIHtcblx0aWYgKHA9PW51bGwpIHAgPSAwLjU7XG5cdGlmIChwPDAuMCB8IHAgPiAxLjApIHJldHVybiBOYU47XG4gICAgaWYgKE1hdGgucmFuZG9tKCk8PXApXG4gICAgXHRyZXR1cm4gMTtcbiAgICBlbHNlIFxuICAgIFx0cmV0dXJuIDA7XG59XG5cblxuLyoqXG4gKiBCaW5vbWlhbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDY5XG4gKiBAcGFyYW0gbiBudW1iZXIgb2YgdHJpYWxzXG4gKiBAcGFyYW0gcCBzdWNjZXNzIHByb2JhYmlsaXR5IGluIGVhY2ggdHJpYWxcbiAqIEByZXR1cm5zIEJpbm9taWFsIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSAoMCwxLC4uLixuKVxuICovXG5leHBvcnQgZnVuY3Rpb24gQmlub21pYWwobixwKSB7XG5cdGlmIChuPT1udWxsKSBuID0gMTtcblx0aWYgKHA9PW51bGwpIHAgPSAwLjU7XHRcblx0dmFyIHQgPSBuIHwgMDtcblx0aWYgKCBwIDwgMC4wIHwgcCA+IDEuMCB8IHQgPD0gMCkgcmV0dXJuIE5hTjtcblx0dmFyIHN1bSA9IDA7XG5cdGZvciAodmFyIGk9MDtpPHQ7aSsrKSB7XG5cdFx0c3VtICs9IEJlcm5vdWxsaShwKTtcblx0fVxuICAgIHJldHVybiBzdW07XG59XG5cbi8qKlxuICogR2VvbWV0cmljIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NjlcbiAqIEBwYXJhbSBwIHN1Y2Nlc3MgcHJvYmFiaWxpdHkgXG4gKiBAcmV0dXJucyBHZW9tZXRyaWMgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlIFxuICovXG5leHBvcnQgZnVuY3Rpb24gR2VvbWV0cmljKHApIHtcblx0aWYgKHA9PW51bGwpIHAgPSAwLjU7XHRcblx0aWYgKCBwIDw9IDAuMCB8IHAgPj0gMS4wICkgcmV0dXJuIE5hTjtcdFxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgubG9nKE1hdGgucmFuZG9tKCkpL01hdGgubG9nKDEtcCkgKSB8IDA7XG59XG5cbi8qKlxuICogUG9pc3NvbiBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDcwXG4gKiBAcGFyYW0gbGFtYmRhIG1lYW4gdmFsdWUgXG4gKiBAcmV0dXJucyBQb2lzc29uIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBvaXNzb24obGFtYmRhKSB7XG5cdGlmIChsYW1iZGE9PW51bGwpIGxhbWJkYSA9IDEuMDtcdFxuXHRpZiAoIGxhbWJkYSA8PSAwLjAgKSByZXR1cm4gTmFOO1x0XG5cdHZhciBhID0gTWF0aC5leHAoLWxhbWJkYSk7XG5cdHZhciBiID0gMS4wO1xuXHR2YXIgaSA9IDA7XHRcblx0d2hpbGUgKHRydWUpIHtcblx0XHR2YXIgdSA9IE1hdGgucmFuZG9tKCk7XG5cdFx0YiAqPSB1O1xuXHRcdGlmIChiIDwgYSkgcmV0dXJuIGk7XG5cdFx0aSArPSAxO1xuXHR9XG59XG5cbi8qKlxuICogR2FtbWEgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uLlxuICogVGhpcyBjb2RlIGhhcyBiZWVuIGNvcGllZCBmcm9tXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYnRlbGxlcy9zaW1qcy11cGRhdGVkL1xuICogc2ltanMtdXBkYXRlZCBpcyBsaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2UgTGljZW5zZSB0ZXJtbnMgXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyXG4gKiBAcGFyYW0gYmV0YSByYXRlIHBhcmFtZXRlciBcbiAqIEByZXR1cm5zIEdhbW1hIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdhbW1hKGFscGhhLCBiZXRhKSB7XG5cdGlmIChhbHBoYSA9PSBudWxsKSBhbHBoYSA9IDEuMDtcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcbiAgICBpZiAoYWxwaGEgPiAxLjApIHtcbiAgICAgICAgbGV0IGFpbnYgPSBNYXRoLnNxcnQoMi4wICogYWxwaGEgLSAxLjApLFxuICAgICAgICAgICAgYmJiID0gYWxwaGEgLSBNYXRoLmxvZyg0LjApLFxuICAgICAgICAgICAgY2NjID0gYWxwaGEgKyBhaW52O1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgICAgICAgbGV0IHUxID0gcmFuZG9tKCk7XG5cbiAgICAgICAgICAgIGlmICgodTEgPCAxZS03KSB8fCAodSA+IDAuOTk5OTk5OSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB1MiA9IDEuMCAtIHJhbmRvbSgpLFxuICAgICAgICAgICAgICAgIHYgPSBNYXRoLmxvZyh1MSAvICgxLjAgLSB1MSkpIC8gYWludixcbiAgICAgICAgICAgICAgICB4ID0gYWxwaGEgKiBNYXRoLmV4cCh2KSxcbiAgICAgICAgICAgICAgICB6ID0gdTEgKiB1MSAqIHUyLFxuICAgICAgICAgICAgICAgIHIgPSBiYmIgKyBjY2MgKiB2IC0geDtcbiAgICAgICAgICAgIGlmICgociArIE1hdGgubG9nKDQuNSkgLSAzLjUgKiB6ID49IDAuMCkgfHwgKHIgPj0gTWF0aC5sb2coeikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHggKiBiZXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChhbHBoYSA9PSAxLjApIHtcbiAgICAgICAgbGV0IHUgPSByYW5kb20oKTtcbiAgICAgICAgd2hpbGUgKHUgPD0gMWUtNykge1xuICAgICAgICAgICAgdSA9IHJhbmRvbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtTWF0aC5sb2codSkgKiBiZXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgbGV0IHUgPSByYW5kb20oKSxcbiAgICAgICAgICAgICAgICBiID0gKE1hdGguRSArIGFscGhhKSAvIE1hdGguRSxcbiAgICAgICAgICAgICAgICBwID0gYiAqIHU7XG4gICAgICAgICAgICBpZiAocCA8PSAxLjApIHtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5wb3cocCwgMS4wIC8gYWxwaGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0gLU1hdGgubG9nKChiIC0gcCkgLyBhbHBoYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB1MSA9IHJhbmRvbSgpO1xuXG4gICAgICAgICAgICBpZiAocCA+IDEuMCkge1xuICAgICAgICAgICAgICAgIGlmICh1MSA8PSBNYXRoLnBvdyh4LCAoYWxwaGEgLSAxLjApKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHUxIDw9IE1hdGguZXhwKC14KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4ICogYmV0YTtcbiAgICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9zZC1yYW5kb20nO1xuIl19
