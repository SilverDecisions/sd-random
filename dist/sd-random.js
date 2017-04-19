require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var menuList = exports.menuList = ["Uniform(0.0,1.0)", "Exponential(1.0)", "Normal(0.0,1.0)", "Pareto(1.0,1.0)", "Weibull(1.0,1.0)", "Triangular(0.0,1.0,0.5)", "Trapezoidal(0,1,0.25,0.75)", "LogNormal(0.0,1.0)", "Gamma(1.0,1.0)", "Loglogistic(1.0,0.5)", "Erlang(4,0.5)", "Bernoulli(0.5)", "Binomial(2,0.5)", "Geometric(0.5)", "Poisson(2)"];

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

},{}],"sd-random":[function(require,module,exports){
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

},{"./src/sd-random":1}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNkLXJhbmRvbS5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7USxBQzRCZ0IsVSxBQUFBO1EsQUFZQSxjLEFBQUE7USxBQWNBLFMsQUFBQTtRLEFBZ0JBLFMsQUFBQTtRLEFBY0EsYyxBQUFBO1EsQUFlQSxVLEFBQUE7USxBQWNBLFMsQUFBQTtRLEFBb0JBLGEsQUFBQTtRLEFBd0JBLGMsQUFBQTtRLEFBMEJBLFksQUFBQTtRLEFBY0EsWSxBQUFBO1EsQUFnQkEsVyxBQUFBO1EsQUFpQkEsWSxBQUFBO1EsQUFXQSxVLEFBQUE7USxBQXVCQSxRLEFBQUE7QUF4UVQsSUFBTSw4QkFBVyxDQUFBLEFBQUMsb0JBQUQsQUFBcUIsb0JBQXJCLEFBQ0MsbUJBREQsQUFDb0IsbUJBRHBCLEFBRUMsb0JBRkQsQUFFcUIsMkJBRnJCLEFBR0MsOEJBSEQsQUFJQyxzQkFKRCxBQUl1QixrQkFKdkIsQUFLQyx3QkFMRCxBQUt3QixpQkFMeEIsQUFNQyxrQkFORCxBQU1rQixtQkFObEIsQUFPQyxrQkFQbEIsQUFBaUIsQUFPbUI7O0FBRXBDLElBQU0sOENBQW1CLENBQUEsQUFBQyxXQUFELEFBQVksZUFBWixBQUNDLFVBREQsQUFDVyxVQURYLEFBRUMsV0FGRCxBQUVZLGNBRlosQUFHQyxlQUhELEFBSUMsYUFKRCxBQUljLFNBSmQsQUFLQyxlQUxELEFBS2UsVUFMZixBQU1DLGFBTkQsQUFNYSxZQU5iLEFBT0MsYUFQMUIsQUFBeUIsQUFPYzs7QUFHdkMsSUFBTSwwQkFBUyxLQUFmLEFBQW9COztBQUUzQjs7Ozs7OztBQU9PLFNBQUEsQUFBUyxRQUFULEFBQWlCLEdBQWpCLEFBQW9CLEdBQUcsQUFDMUI7UUFBSSxLQUFKLEFBQVMsTUFBTSxJQUFBLEFBQUksQUFDbkI7UUFBSSxLQUFKLEFBQVMsTUFBTSxJQUFBLEFBQUksQUFDdEI7UUFBSSxJQUFKLEFB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QUosQUFBUSxBQUNSO2VBQU8sTUFBUCxBQUFZLE1BQU0sQUFDZDtpQkFBQSxBQUFJLEFBQ1A7QUFDRDtlQUFPLENBQUMsS0FBQSxBQUFLLElBQU4sQUFBQyxBQUFTLE1BQWpCLEFBQXNCLEFBQ3pCO0FBTk0sS0FBQSxNQU1BLEFBQ0g7WUFBSSxVQUFKLEFBQ0E7ZUFBQSxBQUFPLE1BQU0sQUFDVDtnQkFBSSxNQUFKLEFBQVE7Z0JBQ0osSUFBSSxDQUFDLEtBQUEsQUFBSyxJQUFOLEFBQVUsU0FBUyxLQUQzQixBQUNnQztnQkFDNUIsSUFBSSxJQUZSLEFBRVksQUFDWjtnQkFBSSxLQUFKLEFBQVMsS0FBSyxBQUNWO3FCQUFJLEtBQUEsQUFBSyxJQUFMLEFBQVMsR0FBRyxNQUFoQixBQUFJLEFBQWtCLEFBQ3pCO0FBRkQsbUJBRU8sQUFDSDtxQkFBSSxDQUFDLEtBQUEsQUFBSyxJQUFJLENBQUMsSUFBRCxBQUFLLEtBQW5CLEFBQUssQUFBbUIsQUFDM0I7QUFDRDtnQkFBTSxNQUFOLEFBQVcsQUFFWDs7Z0JBQUksSUFBSixBQUFRLEtBQUssQUFDVDtvQkFBSSxPQUFNLEtBQUEsQUFBSyxJQUFMLEFBQVMsSUFBSSxRQUF2QixBQUFVLEFBQXFCLE1BQU8sQUFDbEM7QUFDSDtBQUNKO0FBSkQsbUJBSU8sSUFBSSxPQUFNLEtBQUEsQUFBSyxJQUFJLENBQW5CLEFBQVUsQUFBVSxLQUFJLEFBQzNCO0FBQ0g7QUFDSjtBQUNEO2VBQU8sS0FBUCxBQUFXLEFBQ2Q7QUFDSjs7Ozs7Ozs7Ozs7O0FDNVRELDhDQUFBO2lEQUFBOztnQkFBQTt3QkFBQTt1QkFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IG1lbnVMaXN0ID0gW1wiVW5pZm9ybSgwLjAsMS4wKVwiLCBcIkV4cG9uZW50aWFsKDEuMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiTm9ybWFsKDAuMCwxLjApXCIsIFwiUGFyZXRvKDEuMCwxLjApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIldlaWJ1bGwoMS4wLDEuMClcIiwgXCJUcmlhbmd1bGFyKDAuMCwxLjAsMC41KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJUcmFwZXpvaWRhbCgwLDEsMC4yNSwwLjc1KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJMb2dOb3JtYWwoMC4wLDEuMClcIiwgXCJHYW1tYSgxLjAsMS4wKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJMb2dsb2dpc3RpYygxLjAsMC41KVwiLFwiRXJsYW5nKDQsMC41KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJCZXJub3VsbGkoMC41KVwiLFwiQmlub21pYWwoMiwwLjUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIkdlb21ldHJpYygwLjUpXCIsIFwiUG9pc3NvbigyKVwiXTtcclxuXHJcbmV4cG9ydCBjb25zdCBmdW5jdGlvbk5hbWVMaXN0ID0gW1wiVW5pZm9ybVwiLCBcIkV4cG9uZW50aWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTm9ybWFsXCIsIFwiUGFyZXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiV2VpYnVsbFwiLCBcIlRyaWFuZ3VsYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcmFwZXpvaWRhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ05vcm1hbFwiLCBcIkdhbW1hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nbG9naXN0aWNcIixcIkVybGFuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJlcm5vdWxsaVwiLFwiQmlub21pYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHZW9tZXRyaWNcIiwgXCJQb2lzc29uXCJdO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbTtcclxuXHJcbi8qKlxyXG4gKiBVbmlmb3JtIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbi5cclxuICogTW9yZSBkZXRhaWxzIGF0IEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ1MlxyXG4gKiBAcGFyYW0gYSBsb3dlciBib3VuZFxyXG4gKiBAcGFyYW0gYiB1cHBlciBib3VuZCwgYiA+PSBhXHJcbiAqIEByZXR1cm5zIFVuaWZvcm0gZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gVW5pZm9ybShhLCBiKSB7XHJcbiAgICBpZiAoYSA9PSBudWxsKSBhID0gMC4wO1xyXG4gICAgaWYgKGIgPT0gbnVsbCkgYiA9IDEuMDtcclxuXHRpZiAoYiA8IGEpIHJldHVybiBOYU47XHJcbiAgICByZXR1cm4gYSArIChiIC0gYSkqTWF0aC5yYW5kb20oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4cG9uZW50aWFsIGRpc3RyaWJ1dGlvbiBtcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ1MiBcclxuICogQHBhcmFtIGJldGEgc2hhcGUgcGFyYW1ldGVyLCBiZXRhID4gMCwgIGxhbWJkYSA9IDEvYmV0YS4gRm9yIGV4cG9uZW50aWFsIGRpc3RyaWJ1dGlvbiBiZXRhIGlzIGVxdWFsIHRvIHRoZSBtZWFuLlxyXG4gKiBAcmV0dXJucyBFeHBvbmVudGlhbGx5IGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEV4cG9uZW50aWFsKGJldGEpIHtcclxuXHRpZiAoYmV0YT09bnVsbCkgYmV0YSA9PSAxO1xyXG5cdGlmIChiZXRhPD0wKSByZXR1cm4gTmFOO1x0XHJcbiAgICByZXR1cm4gLWJldGEgKiBNYXRoLmxvZyhNYXRoLnJhbmRvbSgpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQm94IGFuZCBNdWxsZXIgKDE5NTgpIGFsZ29yaXRobVxyXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGluIG9yZGVyIHRvIG5vdCB0byBzdG9yZSBzdGF0ZSBpbiB0aGlzIGxpYnJhcnkgd2UgdXNlIG9ubHkgb2RkIHZhbHVlc1xyXG4gKiBGb3IgZGlzY3Vzc2lvbiBzZWUgQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDU3XHJcbiAqIEBwYXJhbSBtZWFuIG1lYW4gdmFsdWVcclxuICogQHBhcmFtIHN0ZCBzdGFuZGFyZCBkZXZpYXRpb24sIHN0ZD49MFxyXG4gKiBAcmV0dXJucyBOb3JtYWxseSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBOb3JtYWwobWVhbiwgc3RkKSB7XHJcbiAgICBpZiAobWVhbiA9PSBudWxsKSBtZWFuID0gMC4wO1xyXG4gICAgaWYgKHN0ZCA9PSBudWxsKSBzdGQgPSAxLjA7XHJcbiAgICBpZiAoc3RkIDwgMCkgcmV0dXJuIE5hTjtcclxuXHJcbiAgICBsZXQgbiA9IE1hdGguc3FydCgtMi4wICogTWF0aC5sb2coTWF0aC5yYW5kb20oKSkpICogTWF0aC5jb3MoMi4wICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCkpO1xyXG4gICAgcmV0dXJuIG4gKiBzdGQgKyBtZWFuO1xyXG59XHJcbi8qKlxyXG4gKiBQYXJldG8gZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIFxyXG4gKiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYXJldG9fZGlzdHJpYnV0aW9uI1JhbmRvbV9zYW1wbGVfZ2VuZXJhdGlvblxyXG4gKiBcclxuICogQHBhcmFtIGFscGhhIHNoYXBlIHBhcmFtZXRlciwgYWxwaGEgPiAwXHJcbiAqIEBwYXJhbSBtaW5pbXVtIHNjYWxlIHBhcmFtZXRlciwgbWluaW11bSA+IDBcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBQYXJldG8oYWxwaGEsIG1pbmltdW0pIHtcclxuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XHJcblx0aWYgKG1pbmltdW0gPT0gbnVsbCkgbWluaW11bSA9IDEuMDtcclxuXHRpZiAoYWxwaGEgPD0gMCB8fCBtaW5pbXVtIDw9IDApIHJldHVybiBOYU47XHJcbiAgICByZXR1cm4gbWluaW11bSAvIE1hdGgucG93KE1hdGgucmFuZG9tKCksIDEuMCAvIGFscGhhKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBMb2ctbG9naXN0aWMgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ2MFxyXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyLCBhbHBoYSA+IDBcclxuICogQHBhcmFtIGJldGEgc2NhbGUgcGFyYW1ldGVyLCBiZXRhID4gMFxyXG4gKiBAcmV0dXJucyBMb2ctbG9naXN0aWMgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTG9nbG9naXN0aWMoYWxwaGEsIGJldGEpIHtcclxuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XHJcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcclxuXHRpZiAoYmV0YSA8PSAwIHx8IGFscGhhIDw9IDApIHJldHVybiBOYU47XHJcblx0dmFyIHUgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdHJldHVybiBiZXRhICogTWF0aC5wb3codS8oMS11KSwgMS9hbHBoYSk7XHRcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBXZWlidWxsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTZcclxuICogQHBhcmFtIGFscGhhIHNoYXBlIHBhcmFtZXRlciwgYWxwaGEgPiAwXHJcbiAqIEBwYXJhbSBiZXRhIHNjYWxlIHBhcmFtZXRlciwgYmV0YSA+IDBcclxuICogQHJldHVybnMgV2VpYnVsbCBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBXZWlidWxsKGFscGhhLCBiZXRhKSB7XHJcblx0aWYgKGFscGhhID09IG51bGwpIGFscGhhID0gMS4wO1xyXG5cdGlmIChiZXRhID09IG51bGwpIGJldGEgPSAxLjA7XHJcblx0aWYgKGJldGEgPD0gMCB8fCBhbHBoYSA8PSAwKSByZXR1cm4gTmFOO1x0XHJcbiAgICByZXR1cm4gYmV0YSAqIE1hdGgucG93KC1NYXRoLmxvZygxLjAgLSBNYXRoLnJhbmRvbSgpKSwgMS4wIC8gYWxwaGEpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEVybGFuZyBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDUzXHJcbiAqIEBwYXJhbSBrIHNoYXBlIHBhcmFtZXRlciwgayA9IDEsMiwzLC4uLlxyXG4gKiBAcGFyYW0gYmV0YSBzY2FsZSBwYXJhbWV0ZXIsIGJldGEgPiAwLCBiZXRhID0gMS9sYW1iZGEuIEZvciBFcmxhbmcgZGlzdHJpYnV0aW9uIGJldGEgaXMgZXF1YWwgdG8gdGhlIG1lYW4gdmFsdWUuXHJcbiAqIEByZXR1cm5zIEVybGFuZyBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBFcmxhbmcoaywgYmV0YSkge1xyXG5cdGlmIChrID09IG51bGwpIGsgPSAxO1xyXG5cdGlmIChiZXRhID09IG51bGwpIGJldGEgPSAxLjA7XHJcblx0dmFyIG0gPSBrIHwgMDtcclxuXHRpZiAoYmV0YSA8PSAwIHx8IG0gPD0gMCkgcmV0dXJuIE5hTjtcclxuXHR2YXIgbXVsdCA9IDEuMDtcclxuXHRmb3IgKHZhciBpPTA7aTxtO2krKykge1xyXG5cdFx0bXVsdCAqPSBNYXRoLnJhbmRvbSgpO1xyXG5cdH1cclxuICAgIHJldHVybiAtYmV0YS9tKk1hdGgubG9nKG11bHQpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRyaWFuZ3VsYXIgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uXHJcbiAqIEBwYXJhbSBhIGxlZnQgc2lkZVxyXG4gKiBAcGFyYW0gYiByaWdodCBzaWRlLCBiID49IGFcclxuICogQHBhcmFtIG0gdHJpYW5nbGUgcGVhayAobW9kZSksIGEgPD0gbSA8PSBiXHJcbiAqIEByZXR1cm5zIFRyaWFuZ3VsYXIgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gVHJpYW5ndWxhcihhLCBiLCBtKSB7XHJcbiAgICBpZiAoYSA9PSBudWxsKSBhID0gMC4wO1xyXG4gICAgaWYgKGIgPT0gbnVsbCkgYiA9IDEuMDtcclxuICAgIGlmIChtID09IG51bGwpIG0gPSAwLjU7XHJcbiAgICBpZiAoYT5iIHx8IG0gPCBhIHx8IG0gPiBiKSByZXR1cm4gTmFOO1xyXG5cdGlmIChhPT1iKSByZXR1cm4gYTtcclxuICAgIHZhciBjID0gKG0gLSBhKSAvIChiIC0gYSk7XHJcbiAgICB2YXIgcCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBpZiAocCA8PSBjKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQocCAqIChiIC0gYSkgKiAobSAtIGEpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGIgLSBNYXRoLnNxcnQoKDEgLSBwKSAqIChiIC0gYSkgKiAoYiAtIG0pKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUcmFwZXpvaWRhbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb25cclxuICogQHBhcmFtIGEgbGVmdCBzaWRlXHJcbiAqIEBwYXJhbSBiIHJpZ2h0IHNpZGUsIGIgPj0gYVxyXG4gKiBAcGFyYW0gYyBsZWZ0IHRyYXBlem9pZCBwZWFrIChtb2RlKVxyXG4gKiBAcGFyYW0gZCByaWdodCB0cmFwZXpvaWQgcGVhayAobW9kZSksIGEgPD0gYyA8PSBkIDw9IGJcclxuICogQHJldHVybnMgVHJhcGV6b2lkYWwgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gVHJhcGV6b2lkYWwoYSwgYiwgYywgZCkge1xyXG4gICAgaWYgKGEgPT0gbnVsbCkgYSA9IDAuMDtcclxuICAgIGlmIChiID09IG51bGwpIGIgPSAxLjA7XHJcbiAgICBpZiAoYyA9PSBudWxsKSBjID0gMC4yNTtcclxuICAgIGlmIChkID09IG51bGwpIGQgPSAwLjc1O1xyXG4gICAgaWYgKGEgPiBiIHx8IGMgPCBhIHx8IGMgPiBkIHx8IGQgPiBiKSByZXR1cm4gTmFOO1xyXG5cdGlmIChhPT1iKSByZXR1cm4gYTtcclxuICAgIHZhciBwMSA9IChjIC0gYSkgLyAoIChiIC0gYSkrKGQgLSBjKSk7XHJcbiAgICB2YXIgcDIgPSAoYiAtIGQpIC8gKCAoYiAtIGEpKyhkIC0gYykpO1xyXG4gICAgdmFyIHAgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgXHJcbiAgICBpZiAocCA8PSBwMSkge1xyXG4gICAgICAgIHJldHVybiBhICsgTWF0aC5zcXJ0KHAgKiAoKGIgLSBhKSsoZCAtIGMpKSAqIChjIC0gYSkgKTtcclxuICAgIH0gZWxzZSBpZiAocCA+IDEtcDIpIHtcclxuICAgICAgICByZXR1cm4gYiAtIE1hdGguc3FydCgoMSAtIHApICogKChiIC0gYSkrKGQgLSBjKSkgKiAoYiAtIGQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICBcdHJldHVybiBjICsgKGQtYykqKHAtcDEpLygxLjAgLSBwMSAtIHAyKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIExvZ25vcm1hbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDU4XHJcbiAqIEBwYXJhbSBtZWFuIG1lYW4gdmFsdWVcclxuICogQHBhcmFtIHN0ZCBzdGFuZGFyZCBkZXZpYXRpb25cclxuICogQHJldHVybnMgTG9nbm9ybWFsbHkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTG9nTm9ybWFsKG1lYW4sIHN0ZCkge1xyXG4gICAgaWYgKG1lYW4gPT0gbnVsbCkgbWVhbiA9IDAuMDtcclxuICAgIGlmIChzdGQgPT0gbnVsbCkgc3RkID0gMS4wO1xyXG4gICAgaWYgKHN0ZCA8IDApIHJldHVybiBOYU47XHJcbiAgICByZXR1cm4gTWF0aC5leHAoTm9ybWFsKG1lYW4sIHN0ZCkpXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEJlcm5vdWxsaSBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDY0XHJcbiAqIEBwYXJhbSBwIHByb2JhYmlsaXR5IG9mIDFcclxuICogQHJldHVybnMgQmVybm91bGxpIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSAoemVybyBvciBvbmUpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gQmVybm91bGxpKHApIHtcclxuXHRpZiAocD09bnVsbCkgcCA9IDAuNTtcclxuXHRpZiAocDwwLjAgfCBwID4gMS4wKSByZXR1cm4gTmFOO1xyXG4gICAgaWYgKE1hdGgucmFuZG9tKCk8PXApXHJcbiAgICBcdHJldHVybiAxO1xyXG4gICAgZWxzZSBcclxuICAgIFx0cmV0dXJuIDA7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQmlub21pYWwgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ2OVxyXG4gKiBAcGFyYW0gbiBudW1iZXIgb2YgdHJpYWxzXHJcbiAqIEBwYXJhbSBwIHN1Y2Nlc3MgcHJvYmFiaWxpdHkgaW4gZWFjaCB0cmlhbFxyXG4gKiBAcmV0dXJucyBCaW5vbWlhbCBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUgKDAsMSwuLi4sbilcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCaW5vbWlhbChuLHApIHtcclxuXHRpZiAobj09bnVsbCkgbiA9IDE7XHJcblx0aWYgKHA9PW51bGwpIHAgPSAwLjU7XHRcclxuXHR2YXIgdCA9IG4gfCAwO1xyXG5cdGlmICggcCA8IDAuMCB8IHAgPiAxLjAgfCB0IDw9IDApIHJldHVybiBOYU47XHJcblx0dmFyIHN1bSA9IDA7XHJcblx0Zm9yICh2YXIgaT0wO2k8dDtpKyspIHtcclxuXHRcdHN1bSArPSBCZXJub3VsbGkocCk7XHJcblx0fVxyXG4gICAgcmV0dXJuIHN1bTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlb21ldHJpYyBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDY5XHJcbiAqIEBwYXJhbSBwIHN1Y2Nlc3MgcHJvYmFiaWxpdHkgXHJcbiAqIEByZXR1cm5zIEdlb21ldHJpYyBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gR2VvbWV0cmljKHApIHtcclxuXHRpZiAocD09bnVsbCkgcCA9IDAuNTtcdFxyXG5cdGlmICggcCA8PSAwLjAgfCBwID49IDEuMCApIHJldHVybiBOYU47XHRcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgubG9nKE1hdGgucmFuZG9tKCkpL01hdGgubG9nKDEtcCkgKSB8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQb2lzc29uIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NzBcclxuICogQHBhcmFtIGxhbWJkYSBtZWFuIHZhbHVlIFxyXG4gKiBAcmV0dXJucyBQb2lzc29uIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBQb2lzc29uKGxhbWJkYSkge1xyXG5cdGlmIChsYW1iZGE9PW51bGwpIGxhbWJkYSA9IDEuMDtcdFxyXG5cdGlmICggbGFtYmRhIDw9IDAuMCApIHJldHVybiBOYU47XHRcclxuXHR2YXIgYSA9IE1hdGguZXhwKC1sYW1iZGEpO1xyXG5cdHZhciBiID0gMS4wO1xyXG5cdHZhciBpID0gMDtcdFxyXG5cdHdoaWxlICh0cnVlKSB7XHJcblx0XHR2YXIgdSA9IE1hdGgucmFuZG9tKCk7XHJcblx0XHRiICo9IHU7XHJcblx0XHRpZiAoYiA8IGEpIHJldHVybiBpO1xyXG5cdFx0aSArPSAxO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdhbW1hIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbi5cclxuICogVGhpcyBjb2RlIGhhcyBiZWVuIGNvcGllZCBmcm9tXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9idGVsbGVzL3NpbWpzLXVwZGF0ZWQvXHJcbiAqIHNpbWpzLXVwZGF0ZWQgaXMgbGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlIExpY2Vuc2UgdGVybW5zIFxyXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyXHJcbiAqIEBwYXJhbSBiZXRhIHJhdGUgcGFyYW1ldGVyIFxyXG4gKiBAcmV0dXJucyBHYW1tYSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtbWEoYWxwaGEsIGJldGEpIHtcclxuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XHJcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcclxuICAgIGlmIChhbHBoYSA+IDEuMCkge1xyXG4gICAgICAgIGxldCBhaW52ID0gTWF0aC5zcXJ0KDIuMCAqIGFscGhhIC0gMS4wKSxcclxuICAgICAgICAgICAgYmJiID0gYWxwaGEgLSBNYXRoLmxvZyg0LjApLFxyXG4gICAgICAgICAgICBjY2MgPSBhbHBoYSArIGFpbnY7XHJcblxyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxyXG4gICAgICAgICAgICBsZXQgdTEgPSByYW5kb20oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgodTEgPCAxZS03KSB8fCAodSA+IDAuOTk5OTk5OSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB1MiA9IDEuMCAtIHJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgdiA9IE1hdGgubG9nKHUxIC8gKDEuMCAtIHUxKSkgLyBhaW52LFxyXG4gICAgICAgICAgICAgICAgeCA9IGFscGhhICogTWF0aC5leHAodiksXHJcbiAgICAgICAgICAgICAgICB6ID0gdTEgKiB1MSAqIHUyLFxyXG4gICAgICAgICAgICAgICAgciA9IGJiYiArIGNjYyAqIHYgLSB4O1xyXG4gICAgICAgICAgICBpZiAoKHIgKyBNYXRoLmxvZyg0LjUpIC0gMy41ICogeiA+PSAwLjApIHx8IChyID49IE1hdGgubG9nKHopKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggKiBiZXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChhbHBoYSA9PSAxLjApIHtcclxuICAgICAgICBsZXQgdSA9IHJhbmRvbSgpO1xyXG4gICAgICAgIHdoaWxlICh1IDw9IDFlLTcpIHtcclxuICAgICAgICAgICAgdSA9IHJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLU1hdGgubG9nKHUpICogYmV0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHg7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IHUgPSByYW5kb20oKSxcclxuICAgICAgICAgICAgICAgIGIgPSAoTWF0aC5FICsgYWxwaGEpIC8gTWF0aC5FLFxyXG4gICAgICAgICAgICAgICAgcCA9IGIgKiB1O1xyXG4gICAgICAgICAgICBpZiAocCA8PSAxLjApIHtcclxuICAgICAgICAgICAgICAgIHggPSBNYXRoLnBvdyhwLCAxLjAgLyBhbHBoYSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLU1hdGgubG9nKChiIC0gcCkgLyBhbHBoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdTEgPSByYW5kb20oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwID4gMS4wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodTEgPD0gTWF0aC5wb3coeCwgKGFscGhhIC0gMS4wKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1MSA8PSBNYXRoLmV4cCgteCkpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4ICogYmV0YTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9zZC1yYW5kb20nO1xuIl19
