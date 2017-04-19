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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNkLXJhbmRvbS5qcyIsInN0YW5kYWxvbmUuaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRLEFDNEJnQixVLEFBQUE7USxBQVlBLGMsQUFBQTtRLEFBY0EsUyxBQUFBO1EsQUFnQkEsUyxBQUFBO1EsQUFjQSxjLEFBQUE7USxBQWVBLFUsQUFBQTtRLEFBY0EsUyxBQUFBO1EsQUFvQkEsYSxBQUFBO1EsQUF3QkEsYyxBQUFBO1EsQUEwQkEsWSxBQUFBO1EsQUFjQSxZLEFBQUE7USxBQWdCQSxXLEFBQUE7USxBQWlCQSxZLEFBQUE7USxBQVdBLFUsQUFBQTtRLEFBdUJBLFEsQUFBQTtBQXhRVCxJQUFNLDhCQUFXLENBQUEsQUFBQyxvQkFBRCxBQUFxQixvQkFBckIsQUFDQyxtQkFERCxBQUNvQixtQkFEcEIsQUFFQyxvQkFGRCxBQUVxQiwyQkFGckIsQUFHQyxrQ0FIRCxBQUlDLHNCQUpELEFBSXVCLGtCQUp2QixBQUtDLHdCQUxELEFBS3dCLGlCQUx4QixBQU1DLGtCQU5ELEFBTWtCLG1CQU5sQixBQU9DLGtCQVBsQixBQUFpQixBQU9tQjs7QUFFcEMsSUFBTSw4Q0FBbUIsQ0FBQSxBQUFDLFdBQUQsQUFBWSxlQUFaLEFBQ0MsVUFERCxBQUNXLFVBRFgsQUFFQyxXQUZELEFBRVksY0FGWixBQUdDLGVBSEQsQUFJQyxhQUpELEFBSWMsU0FKZCxBQUtDLGVBTEQsQUFLZSxVQUxmLEFBTUMsYUFORCxBQU1hLFlBTmIsQUFPQyxhQVAxQixBQUF5QixBQU9jOztBQUd2QyxJQUFNLDBCQUFTLEtBQWYsQUFBb0I7O0FBRTNCOzs7Ozs7O0FBT08sU0FBQSxBQUFTLFFBQVQsQUFBaUIsR0FBakIsQUFBb0IsR0FBRyxBQUMxQjtRQUFJLEtBQUosQUFBUyxNQUFNLElBQUEsQUFBSSxBQUNuQjtRQUFJLEtBQUosQUFBUyxNQUFNLElBQUEsQUFBSSxBQUN0QjtR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Q3JCO1lBQUksS0FBSixBQUFRLEFBQ1I7ZUFBTyxNQUFQLEFBQVksTUFBTSxBQUNkO2lCQUFBLEFBQUksQUFDUDtBQUNEO2VBQU8sQ0FBQyxLQUFBLEFBQUssSUFBTixBQUFDLEFBQVMsTUFBakIsQUFBc0IsQUFDekI7QUFOTSxLQUFBLE1BTUEsQUFDSDtZQUFJLFVBQUosQUFDQTtlQUFBLEFBQU8sTUFBTSxBQUNUO2dCQUFJLE1BQUosQUFBUTtnQkFDSixJQUFJLENBQUMsS0FBQSxBQUFLLElBQU4sQUFBVSxTQUFTLEtBRDNCLEFBQ2dDO2dCQUM1QixJQUFJLElBRlIsQUFFWSxBQUNaO2dCQUFJLEtBQUosQUFBUyxLQUFLLEFBQ1Y7cUJBQUksS0FBQSxBQUFLLElBQUwsQUFBUyxHQUFHLE1BQWhCLEFBQUksQUFBa0IsQUFDekI7QUFGRCxtQkFFTyxBQUNIO3FCQUFJLENBQUMsS0FBQSxBQUFLLElBQUksQ0FBQyxJQUFELEFBQUssS0FBbkIsQUFBSyxBQUFtQixBQUMzQjtBQUNEO2dCQUFNLE1BQU4sQUFBVyxBQUVYOztnQkFBSSxJQUFKLEFBQVEsS0FBSyxBQUNUO29CQUFJLE9BQU0sS0FBQSxBQUFLLElBQUwsQUFBUyxJQUFJLFFBQXZCLEFBQVUsQUFBcUIsTUFBTyxBQUNsQztBQUNIO0FBQ0o7QUFKRCxtQkFJTyxJQUFJLE9BQU0sS0FBQSxBQUFLLElBQUksQ0FBbkIsQUFBVSxBQUFVLEtBQUksQUFDM0I7QUFDSDtBQUNKO0FBQ0Q7ZUFBTyxLQUFQLEFBQVcsQUFDZDtBQUNKOzs7Ozs7Ozs7Ozs7QUM1VEQsOENBQUE7aURBQUE7O2dCQUFBO3dCQUFBO3VCQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgbWVudUxpc3QgPSBbXCJVbmlmb3JtKDAuMCwxLjApXCIsIFwiRXhwb25lbnRpYWwoMS4wKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3JtYWwoMC4wLDEuMClcIiwgXCJQYXJldG8oMS4wLDEuMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiV2VpYnVsbCgxLjAsMS4wKVwiLCBcIlRyaWFuZ3VsYXIoMC4wLDEuMCwwLjUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIlRyYXBlem9pZGFsKDAuMCwxLjAsMC4yNSwwLjc1KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJMb2dOb3JtYWwoMC4wLDEuMClcIiwgXCJHYW1tYSgxLjAsMS4wKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJMb2dsb2dpc3RpYygxLjAsMC41KVwiLFwiRXJsYW5nKDQsMC41KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJCZXJub3VsbGkoMC41KVwiLFwiQmlub21pYWwoMiwwLjUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIkdlb21ldHJpYygwLjUpXCIsIFwiUG9pc3NvbigyLjApXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZ1bmN0aW9uTmFtZUxpc3QgPSBbXCJVbmlmb3JtXCIsIFwiRXhwb25lbnRpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3JtYWxcIiwgXCJQYXJldG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZWlidWxsXCIsIFwiVHJpYW5ndWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRyYXBlem9pZGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nTm9ybWFsXCIsIFwiR2FtbWFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMb2dsb2dpc3RpY1wiLFwiRXJsYW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQmVybm91bGxpXCIsXCJCaW5vbWlhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdlb21ldHJpY1wiLCBcIlBvaXNzb25cIl07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLyoqXHJcbiAqIFVuaWZvcm0gZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uLlxyXG4gKiBNb3JlIGRldGFpbHMgYXQgQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDUyXHJcbiAqIEBwYXJhbSBhIGxvd2VyIGJvdW5kXHJcbiAqIEBwYXJhbSBiIHVwcGVyIGJvdW5kLCBiID49IGFcclxuICogQHJldHVybnMgVW5pZm9ybSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBVbmlmb3JtKGEsIGIpIHtcclxuICAgIGlmIChhID09IG51bGwpIGEgPSAwLjA7XHJcbiAgICBpZiAoYiA9PSBudWxsKSBiID0gMS4wO1xyXG5cdGlmIChiIDwgYSkgcmV0dXJuIE5hTjtcclxuICAgIHJldHVybiBhICsgKGIgLSBhKSpNYXRoLnJhbmRvbSgpO1xyXG59XHJcblxyXG4vKipcclxuICogRXhwb25lbnRpYWwgZGlzdHJpYnV0aW9uIG1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDUyIFxyXG4gKiBAcGFyYW0gYmV0YSBzaGFwZSBwYXJhbWV0ZXIsIGJldGEgPiAwLCAgbGFtYmRhID0gMS9iZXRhLiBGb3IgZXhwb25lbnRpYWwgZGlzdHJpYnV0aW9uIGJldGEgaXMgZXF1YWwgdG8gdGhlIG1lYW4uXHJcbiAqIEByZXR1cm5zIEV4cG9uZW50aWFsbHkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRXhwb25lbnRpYWwoYmV0YSkge1xyXG5cdGlmIChiZXRhPT1udWxsKSBiZXRhID09IDE7XHJcblx0aWYgKGJldGE8PTApIHJldHVybiBOYU47XHRcclxuICAgIHJldHVybiAtYmV0YSAqIE1hdGgubG9nKE1hdGgucmFuZG9tKCkpO1xyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBCb3ggYW5kIE11bGxlciAoMTk1OCkgYWxnb3JpdGhtXHJcbiAqIFBsZWFzZSBub3RlIHRoYXQgaW4gb3JkZXIgdG8gbm90IHRvIHN0b3JlIHN0YXRlIGluIHRoaXMgbGlicmFyeSB3ZSB1c2Ugb25seSBvZGQgdmFsdWVzXHJcbiAqIEZvciBkaXNjdXNzaW9uIHNlZSBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTdcclxuICogQHBhcmFtIG1lYW4gbWVhbiB2YWx1ZVxyXG4gKiBAcGFyYW0gc3RkIHN0YW5kYXJkIGRldmlhdGlvbiwgc3RkPj0wXHJcbiAqIEByZXR1cm5zIE5vcm1hbGx5IGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE5vcm1hbChtZWFuLCBzdGQpIHtcclxuICAgIGlmIChtZWFuID09IG51bGwpIG1lYW4gPSAwLjA7XHJcbiAgICBpZiAoc3RkID09IG51bGwpIHN0ZCA9IDEuMDtcclxuICAgIGlmIChzdGQgPCAwKSByZXR1cm4gTmFOO1xyXG5cclxuICAgIGxldCBuID0gTWF0aC5zcXJ0KC0yLjAgKiBNYXRoLmxvZyhNYXRoLnJhbmRvbSgpKSkgKiBNYXRoLmNvcygyLjAgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICByZXR1cm4gbiAqIHN0ZCArIG1lYW47XHJcbn1cclxuLyoqXHJcbiAqIFBhcmV0byBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gXHJcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhcmV0b19kaXN0cmlidXRpb24jUmFuZG9tX3NhbXBsZV9nZW5lcmF0aW9uXHJcbiAqIFxyXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyLCBhbHBoYSA+IDBcclxuICogQHBhcmFtIG1pbmltdW0gc2NhbGUgcGFyYW1ldGVyLCBtaW5pbXVtID4gMFxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFBhcmV0byhhbHBoYSwgbWluaW11bSkge1xyXG5cdGlmIChhbHBoYSA9PSBudWxsKSBhbHBoYSA9IDEuMDtcclxuXHRpZiAobWluaW11bSA9PSBudWxsKSBtaW5pbXVtID0gMS4wO1xyXG5cdGlmIChhbHBoYSA8PSAwIHx8IG1pbmltdW0gPD0gMCkgcmV0dXJuIE5hTjtcclxuICAgIHJldHVybiBtaW5pbXVtIC8gTWF0aC5wb3coTWF0aC5yYW5kb20oKSwgMS4wIC8gYWxwaGEpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIExvZy1sb2dpc3RpYyBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDYwXHJcbiAqIEBwYXJhbSBhbHBoYSBzaGFwZSBwYXJhbWV0ZXIsIGFscGhhID4gMFxyXG4gKiBAcGFyYW0gYmV0YSBzY2FsZSBwYXJhbWV0ZXIsIGJldGEgPiAwXHJcbiAqIEByZXR1cm5zIExvZy1sb2dpc3RpYyBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBMb2dsb2dpc3RpYyhhbHBoYSwgYmV0YSkge1xyXG5cdGlmIChhbHBoYSA9PSBudWxsKSBhbHBoYSA9IDEuMDtcclxuXHRpZiAoYmV0YSA9PSBudWxsKSBiZXRhID0gMS4wO1xyXG5cdGlmIChiZXRhIDw9IDAgfHwgYWxwaGEgPD0gMCkgcmV0dXJuIE5hTjtcclxuXHR2YXIgdSA9IE1hdGgucmFuZG9tKCk7XHJcblx0cmV0dXJuIGJldGEgKiBNYXRoLnBvdyh1LygxLXUpLCAxL2FscGhhKTtcdFxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFdlaWJ1bGwgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ1NlxyXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyLCBhbHBoYSA+IDBcclxuICogQHBhcmFtIGJldGEgc2NhbGUgcGFyYW1ldGVyLCBiZXRhID4gMFxyXG4gKiBAcmV0dXJucyBXZWlidWxsIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFdlaWJ1bGwoYWxwaGEsIGJldGEpIHtcclxuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XHJcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcclxuXHRpZiAoYmV0YSA8PSAwIHx8IGFscGhhIDw9IDApIHJldHVybiBOYU47XHRcclxuICAgIHJldHVybiBiZXRhICogTWF0aC5wb3coLU1hdGgubG9nKDEuMCAtIE1hdGgucmFuZG9tKCkpLCAxLjAgLyBhbHBoYSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogRXJsYW5nIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTNcclxuICogQHBhcmFtIGsgc2hhcGUgcGFyYW1ldGVyLCBrID0gMSwyLDMsLi4uXHJcbiAqIEBwYXJhbSBiZXRhIHNjYWxlIHBhcmFtZXRlciwgYmV0YSA+IDAsIGJldGEgPSAxL2xhbWJkYS4gRm9yIEVybGFuZyBkaXN0cmlidXRpb24gYmV0YSBpcyBlcXVhbCB0byB0aGUgbWVhbiB2YWx1ZS5cclxuICogQHJldHVybnMgRXJsYW5nIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEVybGFuZyhrLCBiZXRhKSB7XHJcblx0aWYgKGsgPT0gbnVsbCkgayA9IDE7XHJcblx0aWYgKGJldGEgPT0gbnVsbCkgYmV0YSA9IDEuMDtcclxuXHR2YXIgbSA9IGsgfCAwO1xyXG5cdGlmIChiZXRhIDw9IDAgfHwgbSA8PSAwKSByZXR1cm4gTmFOO1xyXG5cdHZhciBtdWx0ID0gMS4wO1xyXG5cdGZvciAodmFyIGk9MDtpPG07aSsrKSB7XHJcblx0XHRtdWx0ICo9IE1hdGgucmFuZG9tKCk7XHJcblx0fVxyXG4gICAgcmV0dXJuIC1iZXRhL20qTWF0aC5sb2cobXVsdCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVHJpYW5ndWxhciBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb25cclxuICogQHBhcmFtIGEgbGVmdCBzaWRlXHJcbiAqIEBwYXJhbSBiIHJpZ2h0IHNpZGUsIGIgPj0gYVxyXG4gKiBAcGFyYW0gbSB0cmlhbmdsZSBwZWFrIChtb2RlKSwgYSA8PSBtIDw9IGJcclxuICogQHJldHVybnMgVHJpYW5ndWxhciBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBUcmlhbmd1bGFyKGEsIGIsIG0pIHtcclxuICAgIGlmIChhID09IG51bGwpIGEgPSAwLjA7XHJcbiAgICBpZiAoYiA9PSBudWxsKSBiID0gMS4wO1xyXG4gICAgaWYgKG0gPT0gbnVsbCkgbSA9IDAuNTtcclxuICAgIGlmIChhPmIgfHwgbSA8IGEgfHwgbSA+IGIpIHJldHVybiBOYU47XHJcblx0aWYgKGE9PWIpIHJldHVybiBhO1xyXG4gICAgdmFyIGMgPSAobSAtIGEpIC8gKGIgLSBhKTtcclxuICAgIHZhciBwID0gTWF0aC5yYW5kb20oKTtcclxuICAgIGlmIChwIDw9IGMpIHtcclxuICAgICAgICByZXR1cm4gYSArIE1hdGguc3FydChwICogKGIgLSBhKSAqIChtIC0gYSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYiAtIE1hdGguc3FydCgoMSAtIHApICogKGIgLSBhKSAqIChiIC0gbSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRyYXBlem9pZGFsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvblxyXG4gKiBAcGFyYW0gYSBsZWZ0IHNpZGVcclxuICogQHBhcmFtIGIgcmlnaHQgc2lkZSwgYiA+PSBhXHJcbiAqIEBwYXJhbSBjIGxlZnQgdHJhcGV6b2lkIHBlYWsgKG1vZGUpXHJcbiAqIEBwYXJhbSBkIHJpZ2h0IHRyYXBlem9pZCBwZWFrIChtb2RlKSwgYSA8PSBjIDw9IGQgPD0gYlxyXG4gKiBAcmV0dXJucyBUcmFwZXpvaWRhbCBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBUcmFwZXpvaWRhbChhLCBiLCBjLCBkKSB7XHJcbiAgICBpZiAoYSA9PSBudWxsKSBhID0gMC4wO1xyXG4gICAgaWYgKGIgPT0gbnVsbCkgYiA9IDEuMDtcclxuICAgIGlmIChjID09IG51bGwpIGMgPSAwLjI1O1xyXG4gICAgaWYgKGQgPT0gbnVsbCkgZCA9IDAuNzU7XHJcbiAgICBpZiAoYSA+IGIgfHwgYyA8IGEgfHwgYyA+IGQgfHwgZCA+IGIpIHJldHVybiBOYU47XHJcblx0aWYgKGE9PWIpIHJldHVybiBhO1xyXG4gICAgdmFyIHAxID0gKGMgLSBhKSAvICggKGIgLSBhKSsoZCAtIGMpKTtcclxuICAgIHZhciBwMiA9IChiIC0gZCkgLyAoIChiIC0gYSkrKGQgLSBjKSk7XHJcbiAgICB2YXIgcCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBcclxuICAgIGlmIChwIDw9IHAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQocCAqICgoYiAtIGEpKyhkIC0gYykpICogKGMgLSBhKSApO1xyXG4gICAgfSBlbHNlIGlmIChwID4gMS1wMikge1xyXG4gICAgICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KCgxIC0gcCkgKiAoKGIgLSBhKSsoZCAtIGMpKSAqIChiIC0gZCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgIFx0cmV0dXJuIGMgKyAoZC1jKSoocC1wMSkvKDEuMCAtIHAxIC0gcDIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogTG9nbm9ybWFsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NThcclxuICogQHBhcmFtIG1lYW4gbWVhbiB2YWx1ZVxyXG4gKiBAcGFyYW0gc3RkIHN0YW5kYXJkIGRldmlhdGlvblxyXG4gKiBAcmV0dXJucyBMb2dub3JtYWxseSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBMb2dOb3JtYWwobWVhbiwgc3RkKSB7XHJcbiAgICBpZiAobWVhbiA9PSBudWxsKSBtZWFuID0gMC4wO1xyXG4gICAgaWYgKHN0ZCA9PSBudWxsKSBzdGQgPSAxLjA7XHJcbiAgICBpZiAoc3RkIDwgMCkgcmV0dXJuIE5hTjtcclxuICAgIHJldHVybiBNYXRoLmV4cChOb3JtYWwobWVhbiwgc3RkKSlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogQmVybm91bGxpIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NjRcclxuICogQHBhcmFtIHAgcHJvYmFiaWxpdHkgb2YgMVxyXG4gKiBAcmV0dXJucyBCZXJub3VsbGkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlICh6ZXJvIG9yIG9uZSlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCZXJub3VsbGkocCkge1xyXG5cdGlmIChwPT1udWxsKSBwID0gMC41O1xyXG5cdGlmIChwPDAuMCB8IHAgPiAxLjApIHJldHVybiBOYU47XHJcbiAgICBpZiAoTWF0aC5yYW5kb20oKTw9cClcclxuICAgIFx0cmV0dXJuIDE7XHJcbiAgICBlbHNlIFxyXG4gICAgXHRyZXR1cm4gMDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBCaW5vbWlhbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDY5XHJcbiAqIEBwYXJhbSBuIG51bWJlciBvZiB0cmlhbHNcclxuICogQHBhcmFtIHAgc3VjY2VzcyBwcm9iYWJpbGl0eSBpbiBlYWNoIHRyaWFsXHJcbiAqIEByZXR1cm5zIEJpbm9taWFsIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSAoMCwxLC4uLixuKVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJpbm9taWFsKG4scCkge1xyXG5cdGlmIChuPT1udWxsKSBuID0gMTtcclxuXHRpZiAocD09bnVsbCkgcCA9IDAuNTtcdFxyXG5cdHZhciB0ID0gbiB8IDA7XHJcblx0aWYgKCBwIDwgMC4wIHwgcCA+IDEuMCB8IHQgPD0gMCkgcmV0dXJuIE5hTjtcclxuXHR2YXIgc3VtID0gMDtcclxuXHRmb3IgKHZhciBpPTA7aTx0O2krKykge1xyXG5cdFx0c3VtICs9IEJlcm5vdWxsaShwKTtcclxuXHR9XHJcbiAgICByZXR1cm4gc3VtO1xyXG59XHJcblxyXG4vKipcclxuICogR2VvbWV0cmljIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NjlcclxuICogQHBhcmFtIHAgc3VjY2VzcyBwcm9iYWJpbGl0eSBcclxuICogQHJldHVybnMgR2VvbWV0cmljIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBHZW9tZXRyaWMocCkge1xyXG5cdGlmIChwPT1udWxsKSBwID0gMC41O1x0XHJcblx0aWYgKCBwIDw9IDAuMCB8IHAgPj0gMS4wICkgcmV0dXJuIE5hTjtcdFxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5sb2coTWF0aC5yYW5kb20oKSkvTWF0aC5sb2coMS1wKSApIHwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBvaXNzb24gZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ3MFxyXG4gKiBAcGFyYW0gbGFtYmRhIG1lYW4gdmFsdWUgXHJcbiAqIEByZXR1cm5zIFBvaXNzb24gZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFBvaXNzb24obGFtYmRhKSB7XHJcblx0aWYgKGxhbWJkYT09bnVsbCkgbGFtYmRhID0gMS4wO1x0XHJcblx0aWYgKCBsYW1iZGEgPD0gMC4wICkgcmV0dXJuIE5hTjtcdFxyXG5cdHZhciBhID0gTWF0aC5leHAoLWxhbWJkYSk7XHJcblx0dmFyIGIgPSAxLjA7XHJcblx0dmFyIGkgPSAwO1x0XHJcblx0d2hpbGUgKHRydWUpIHtcclxuXHRcdHZhciB1ID0gTWF0aC5yYW5kb20oKTtcclxuXHRcdGIgKj0gdTtcclxuXHRcdGlmIChiIDwgYSkgcmV0dXJuIGk7XHJcblx0XHRpICs9IDE7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2FtbWEgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uLlxyXG4gKiBUaGlzIGNvZGUgaGFzIGJlZW4gY29waWVkIGZyb21cclxuICogaHR0cHM6Ly9naXRodWIuY29tL2J0ZWxsZXMvc2ltanMtdXBkYXRlZC9cclxuICogc2ltanMtdXBkYXRlZCBpcyBsaWNlbnNlZCB1bmRlciBNSVQgT3BlbiBTb3VyY2UgTGljZW5zZSB0ZXJtbnMgXHJcbiAqIEBwYXJhbSBhbHBoYSBzaGFwZSBwYXJhbWV0ZXJcclxuICogQHBhcmFtIGJldGEgcmF0ZSBwYXJhbWV0ZXIgXHJcbiAqIEByZXR1cm5zIEdhbW1hIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1tYShhbHBoYSwgYmV0YSkge1xyXG5cdGlmIChhbHBoYSA9PSBudWxsKSBhbHBoYSA9IDEuMDtcclxuXHRpZiAoYmV0YSA9PSBudWxsKSBiZXRhID0gMS4wO1xyXG4gICAgaWYgKGFscGhhID4gMS4wKSB7XHJcbiAgICAgICAgbGV0IGFpbnYgPSBNYXRoLnNxcnQoMi4wICogYWxwaGEgLSAxLjApLFxyXG4gICAgICAgICAgICBiYmIgPSBhbHBoYSAtIE1hdGgubG9nKDQuMCksXHJcbiAgICAgICAgICAgIGNjYyA9IGFscGhhICsgYWludjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXHJcbiAgICAgICAgICAgIGxldCB1MSA9IHJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh1MSA8IDFlLTcpIHx8ICh1ID4gMC45OTk5OTk5KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHUyID0gMS4wIC0gcmFuZG9tKCksXHJcbiAgICAgICAgICAgICAgICB2ID0gTWF0aC5sb2codTEgLyAoMS4wIC0gdTEpKSAvIGFpbnYsXHJcbiAgICAgICAgICAgICAgICB4ID0gYWxwaGEgKiBNYXRoLmV4cCh2KSxcclxuICAgICAgICAgICAgICAgIHogPSB1MSAqIHUxICogdTIsXHJcbiAgICAgICAgICAgICAgICByID0gYmJiICsgY2NjICogdiAtIHg7XHJcbiAgICAgICAgICAgIGlmICgociArIE1hdGgubG9nKDQuNSkgLSAzLjUgKiB6ID49IDAuMCkgfHwgKHIgPj0gTWF0aC5sb2coeikpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCAqIGJldGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGFscGhhID09IDEuMCkge1xyXG4gICAgICAgIGxldCB1ID0gcmFuZG9tKCk7XHJcbiAgICAgICAgd2hpbGUgKHUgPD0gMWUtNykge1xyXG4gICAgICAgICAgICB1ID0gcmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtTWF0aC5sb2codSkgKiBiZXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgeDtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdSA9IHJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgYiA9IChNYXRoLkUgKyBhbHBoYSkgLyBNYXRoLkUsXHJcbiAgICAgICAgICAgICAgICBwID0gYiAqIHU7XHJcbiAgICAgICAgICAgIGlmIChwIDw9IDEuMCkge1xyXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgucG93KHAsIDEuMCAvIGFscGhhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHggPSAtTWF0aC5sb2coKGIgLSBwKSAvIGFscGhhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB1MSA9IHJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHAgPiAxLjApIHtcclxuICAgICAgICAgICAgICAgIGlmICh1MSA8PSBNYXRoLnBvdyh4LCAoYWxwaGEgLSAxLjApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHUxIDw9IE1hdGguZXhwKC14KSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHggKiBiZXRhO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vc3JjL3NkLXJhbmRvbSc7XG4iXX0=
