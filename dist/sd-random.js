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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2QtcmFuZG9tLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRLEFDNEJnQixVLEFBQUE7USxBQVlBLGMsQUFBQTtRLEFBY0EsUyxBQUFBO1EsQUFnQkEsUyxBQUFBO1EsQUFjQSxjLEFBQUE7USxBQWVBLFUsQUFBQTtRLEFBY0EsUyxBQUFBO1EsQUFvQkEsYSxBQUFBO1EsQUF3QkEsYyxBQUFBO1EsQUEwQkEsWSxBQUFBO1EsQUFjQSxZLEFBQUE7USxBQWdCQSxXLEFBQUE7USxBQWlCQSxZLEFBQUE7USxBQVdBLFUsQUFBQTtRLEFBdUJBLFEsQUFBQTtBQXhRVCxJQUFNLDhCQUFXLENBQUEsQUFBQyxvQkFBRCxBQUFxQixvQkFBckIsQUFDQyxtQkFERCxBQUNvQixtQkFEcEIsQUFFQyxvQkFGRCxBQUVxQiwyQkFGckIsQUFHQyxrQ0FIRCxBQUlDLHNCQUpELEFBSXVCLGtCQUp2QixBQUtDLHdCQUxELEFBS3dCLGlCQUx4QixBQU1DLGtCQU5ELEFBTWtCLG1CQU5sQixBQU9DLGtCQVBsQixBQUFpQixBQU9tQjs7QUFFcEMsSUFBTSw4Q0FBbUIsQ0FBQSxBQUFDLFdBQUQsQUFBWSxlQUFaLEFBQ0MsVUFERCxBQUNXLFVBRFgsQUFFQyxXQUZELEFBRVksY0FGWixBQUdDLGVBSEQsQUFJQyxhQUpELEFBSWMsU0FKZCxBQUtDLGVBTEQsQUFLZSxVQUxmLEFBTUMsYUFORCxBQU1hLFlBTmIsQUFPQyxhQVAxQixBQUF5QixBQU9jOztBQUd2QyxJQUFNLDBCQUFTLEtBQWYsQUFBb0I7O0FBRTNCOzs7Ozs7O0FBT08sU0FBQSxBQUFTLFFBQVQsQUFBaUIsR0FBakIsQUFBb0IsR0FBRyxBQUMxQjtRQUFJLEtBQUosQUFBUyxNQUFNLElBQUEsQUFBSSxBQUNuQjtRQUFJLEtBQUosQUFBUyxNQUFNLElBQUEsQUFBSSxBQUN0QjtRQUFJLElBQUosQUFB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SixBQUFRLEFBQ1I7ZUFBTyxNQUFQLEFBQVksTUFBTSxBQUNkO2lCQUFBLEFBQUksQUFDUDtBQUNEO2VBQU8sQ0FBQyxLQUFBLEFBQUssSUFBTixBQUFDLEFBQVMsTUFBakIsQUFBc0IsQUFDekI7QUFOTSxLQUFBLE1BTUEsQUFDSDtZQUFJLFVBQUosQUFDQTtlQUFBLEFBQU8sTUFBTSxBQUNUO2dCQUFJLE1BQUosQUFBUTtnQkFDSixJQUFJLENBQUMsS0FBQSxBQUFLLElBQU4sQUFBVSxTQUFTLEtBRDNCLEFBQ2dDO2dCQUM1QixJQUFJLElBRlIsQUFFWSxBQUNaO2dCQUFJLEtBQUosQUFBUyxLQUFLLEFBQ1Y7cUJBQUksS0FBQSxBQUFLLElBQUwsQUFBUyxHQUFHLE1BQWhCLEFBQUksQUFBa0IsQUFDekI7QUFGRCxtQkFFTyxBQUNIO3FCQUFJLENBQUMsS0FBQSxBQUFLLElBQUksQ0FBQyxJQUFELEFBQUssS0FBbkIsQUFBSyxBQUFtQixBQUMzQjtBQUNEO2dCQUFNLE1BQU4sQUFBVyxBQUVYOztnQkFBSSxJQUFKLEFBQVEsS0FBSyxBQUNUO29CQUFJLE9BQU0sS0FBQSxBQUFLLElBQUwsQUFBUyxJQUFJLFFBQXZCLEFBQVUsQUFBcUIsTUFBTyxBQUNsQztBQUNIO0FBQ0o7QUFKRCxtQkFJTyxJQUFJLE9BQU0sS0FBQSxBQUFLLElBQUksQ0FBbkIsQUFBVSxBQUFVLEtBQUksQUFDM0I7QUFDSDtBQUNKO0FBQ0Q7ZUFBTyxLQUFQLEFBQVcsQUFDZDtBQUNKOzs7Ozs7Ozs7Ozs7QUM1VEQsOENBQUE7aURBQUE7O2dCQUFBO3dCQUFBO3VCQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgbWVudUxpc3QgPSBbXCJVbmlmb3JtKDAuMCwxLjApXCIsIFwiRXhwb25lbnRpYWwoMS4wKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiTm9ybWFsKDAuMCwxLjApXCIsIFwiUGFyZXRvKDEuMCwxLjApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJXZWlidWxsKDEuMCwxLjApXCIsIFwiVHJpYW5ndWxhcigwLjAsMS4wLDAuNSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIlRyYXBlem9pZGFsKDAuMCwxLjAsMC4yNSwwLjc1KVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nTm9ybWFsKDAuMCwxLjApXCIsIFwiR2FtbWEoMS4wLDEuMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ2xvZ2lzdGljKDEuMCwwLjUpXCIsXCJFcmxhbmcoNCwwLjUpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJCZXJub3VsbGkoMC41KVwiLFwiQmlub21pYWwoMiwwLjUpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJHZW9tZXRyaWMoMC41KVwiLCBcIlBvaXNzb24oMi4wKVwiXTtcblxuZXhwb3J0IGNvbnN0IGZ1bmN0aW9uTmFtZUxpc3QgPSBbXCJVbmlmb3JtXCIsIFwiRXhwb25lbnRpYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTm9ybWFsXCIsIFwiUGFyZXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldlaWJ1bGxcIiwgXCJUcmlhbmd1bGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRyYXBlem9pZGFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ05vcm1hbFwiLCBcIkdhbW1hXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ2xvZ2lzdGljXCIsXCJFcmxhbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQmVybm91bGxpXCIsXCJCaW5vbWlhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHZW9tZXRyaWNcIiwgXCJQb2lzc29uXCJdO1xuXG5cbmV4cG9ydCBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbTtcblxuLyoqXG4gKiBVbmlmb3JtIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbi5cbiAqIE1vcmUgZGV0YWlscyBhdCBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTJcbiAqIEBwYXJhbSBhIGxvd2VyIGJvdW5kXG4gKiBAcGFyYW0gYiB1cHBlciBib3VuZCwgYiA+PSBhXG4gKiBAcmV0dXJucyBVbmlmb3JtIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gVW5pZm9ybShhLCBiKSB7XG4gICAgaWYgKGEgPT0gbnVsbCkgYSA9IDAuMDtcbiAgICBpZiAoYiA9PSBudWxsKSBiID0gMS4wO1xuXHRpZiAoYiA8IGEpIHJldHVybiBOYU47XG4gICAgcmV0dXJuIGEgKyAoYiAtIGEpKk1hdGgucmFuZG9tKCk7XG59XG5cbi8qKlxuICogRXhwb25lbnRpYWwgZGlzdHJpYnV0aW9uIG1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDUyIFxuICogQHBhcmFtIGJldGEgc2hhcGUgcGFyYW1ldGVyLCBiZXRhID4gMCwgIGxhbWJkYSA9IDEvYmV0YS4gRm9yIGV4cG9uZW50aWFsIGRpc3RyaWJ1dGlvbiBiZXRhIGlzIGVxdWFsIHRvIHRoZSBtZWFuLlxuICogQHJldHVybnMgRXhwb25lbnRpYWxseSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEV4cG9uZW50aWFsKGJldGEpIHtcblx0aWYgKGJldGE9PW51bGwpIGJldGEgPT0gMTtcblx0aWYgKGJldGE8PTApIHJldHVybiBOYU47XHRcbiAgICByZXR1cm4gLWJldGEgKiBNYXRoLmxvZyhNYXRoLnJhbmRvbSgpKTtcbn1cblxuLyoqXG4gKiBOb3JtYWwgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEJveCBhbmQgTXVsbGVyICgxOTU4KSBhbGdvcml0aG1cbiAqIFBsZWFzZSBub3RlIHRoYXQgaW4gb3JkZXIgdG8gbm90IHRvIHN0b3JlIHN0YXRlIGluIHRoaXMgbGlicmFyeSB3ZSB1c2Ugb25seSBvZGQgdmFsdWVzXG4gKiBGb3IgZGlzY3Vzc2lvbiBzZWUgQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDU3XG4gKiBAcGFyYW0gbWVhbiBtZWFuIHZhbHVlXG4gKiBAcGFyYW0gc3RkIHN0YW5kYXJkIGRldmlhdGlvbiwgc3RkPj0wXG4gKiBAcmV0dXJucyBOb3JtYWxseSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE5vcm1hbChtZWFuLCBzdGQpIHtcbiAgICBpZiAobWVhbiA9PSBudWxsKSBtZWFuID0gMC4wO1xuICAgIGlmIChzdGQgPT0gbnVsbCkgc3RkID0gMS4wO1xuICAgIGlmIChzdGQgPCAwKSByZXR1cm4gTmFOO1xuXG4gICAgbGV0IG4gPSBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKE1hdGgucmFuZG9tKCkpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiBNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gbiAqIHN0ZCArIG1lYW47XG59XG4vKipcbiAqIFBhcmV0byBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gXG4gKiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYXJldG9fZGlzdHJpYnV0aW9uI1JhbmRvbV9zYW1wbGVfZ2VuZXJhdGlvblxuICogXG4gKiBAcGFyYW0gYWxwaGEgc2hhcGUgcGFyYW1ldGVyLCBhbHBoYSA+IDBcbiAqIEBwYXJhbSBtaW5pbXVtIHNjYWxlIHBhcmFtZXRlciwgbWluaW11bSA+IDBcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQYXJldG8oYWxwaGEsIG1pbmltdW0pIHtcblx0aWYgKGFscGhhID09IG51bGwpIGFscGhhID0gMS4wO1xuXHRpZiAobWluaW11bSA9PSBudWxsKSBtaW5pbXVtID0gMS4wO1xuXHRpZiAoYWxwaGEgPD0gMCB8fCBtaW5pbXVtIDw9IDApIHJldHVybiBOYU47XG4gICAgcmV0dXJuIG1pbmltdW0gLyBNYXRoLnBvdyhNYXRoLnJhbmRvbSgpLCAxLjAgLyBhbHBoYSk7XG59XG5cblxuLyoqXG4gKiBMb2ctbG9naXN0aWMgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ2MFxuICogQHBhcmFtIGFscGhhIHNoYXBlIHBhcmFtZXRlciwgYWxwaGEgPiAwXG4gKiBAcGFyYW0gYmV0YSBzY2FsZSBwYXJhbWV0ZXIsIGJldGEgPiAwXG4gKiBAcmV0dXJucyBMb2ctbG9naXN0aWMgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMb2dsb2dpc3RpYyhhbHBoYSwgYmV0YSkge1xuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XG5cdGlmIChiZXRhID09IG51bGwpIGJldGEgPSAxLjA7XG5cdGlmIChiZXRhIDw9IDAgfHwgYWxwaGEgPD0gMCkgcmV0dXJuIE5hTjtcblx0dmFyIHUgPSBNYXRoLnJhbmRvbSgpO1xuXHRyZXR1cm4gYmV0YSAqIE1hdGgucG93KHUvKDEtdSksIDEvYWxwaGEpO1x0XG59XG5cblxuLyoqXG4gKiBXZWlidWxsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTZcbiAqIEBwYXJhbSBhbHBoYSBzaGFwZSBwYXJhbWV0ZXIsIGFscGhhID4gMFxuICogQHBhcmFtIGJldGEgc2NhbGUgcGFyYW1ldGVyLCBiZXRhID4gMFxuICogQHJldHVybnMgV2VpYnVsbCBkaXN0cmlidXRlZCByYW5kb20gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFdlaWJ1bGwoYWxwaGEsIGJldGEpIHtcblx0aWYgKGFscGhhID09IG51bGwpIGFscGhhID0gMS4wO1xuXHRpZiAoYmV0YSA9PSBudWxsKSBiZXRhID0gMS4wO1xuXHRpZiAoYmV0YSA8PSAwIHx8IGFscGhhIDw9IDApIHJldHVybiBOYU47XHRcbiAgICByZXR1cm4gYmV0YSAqIE1hdGgucG93KC1NYXRoLmxvZygxLjAgLSBNYXRoLnJhbmRvbSgpKSwgMS4wIC8gYWxwaGEpO1xufVxuXG5cbi8qKlxuICogRXJsYW5nIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBBLkxhdyBcIlNpbXVsYXRpb24gTW9kZWxsaW5nIGFuZCBBbmFseXNpc1wiLCA1ZSwgTWMgR3Jhdy1IaWxsLCAyMDE1LCBwLiA0NTNcbiAqIEBwYXJhbSBrIHNoYXBlIHBhcmFtZXRlciwgayA9IDEsMiwzLC4uLlxuICogQHBhcmFtIGJldGEgc2NhbGUgcGFyYW1ldGVyLCBiZXRhID4gMCwgYmV0YSA9IDEvbGFtYmRhLiBGb3IgRXJsYW5nIGRpc3RyaWJ1dGlvbiBiZXRhIGlzIGVxdWFsIHRvIHRoZSBtZWFuIHZhbHVlLlxuICogQHJldHVybnMgRXJsYW5nIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gRXJsYW5nKGssIGJldGEpIHtcblx0aWYgKGsgPT0gbnVsbCkgayA9IDE7XG5cdGlmIChiZXRhID09IG51bGwpIGJldGEgPSAxLjA7XG5cdHZhciBtID0gayB8IDA7XG5cdGlmIChiZXRhIDw9IDAgfHwgbSA8PSAwKSByZXR1cm4gTmFOO1xuXHR2YXIgbXVsdCA9IDEuMDtcblx0Zm9yICh2YXIgaT0wO2k8bTtpKyspIHtcblx0XHRtdWx0ICo9IE1hdGgucmFuZG9tKCk7XG5cdH1cbiAgICByZXR1cm4gLWJldGEvbSpNYXRoLmxvZyhtdWx0KTtcbn1cblxuXG4vKipcbiAqIFRyaWFuZ3VsYXIgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gYSBsZWZ0IHNpZGVcbiAqIEBwYXJhbSBiIHJpZ2h0IHNpZGUsIGIgPj0gYVxuICogQHBhcmFtIG0gdHJpYW5nbGUgcGVhayAobW9kZSksIGEgPD0gbSA8PSBiXG4gKiBAcmV0dXJucyBUcmlhbmd1bGFyIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJpYW5ndWxhcihhLCBiLCBtKSB7XG4gICAgaWYgKGEgPT0gbnVsbCkgYSA9IDAuMDtcbiAgICBpZiAoYiA9PSBudWxsKSBiID0gMS4wO1xuICAgIGlmIChtID09IG51bGwpIG0gPSAwLjU7XG4gICAgaWYgKGE+YiB8fCBtIDwgYSB8fCBtID4gYikgcmV0dXJuIE5hTjtcblx0aWYgKGE9PWIpIHJldHVybiBhO1xuICAgIHZhciBjID0gKG0gLSBhKSAvIChiIC0gYSk7XG4gICAgdmFyIHAgPSBNYXRoLnJhbmRvbSgpO1xuICAgIGlmIChwIDw9IGMpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQocCAqIChiIC0gYSkgKiAobSAtIGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYiAtIE1hdGguc3FydCgoMSAtIHApICogKGIgLSBhKSAqIChiIC0gbSkpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFRyYXBlem9pZGFsIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIGEgbGVmdCBzaWRlXG4gKiBAcGFyYW0gYiByaWdodCBzaWRlLCBiID49IGFcbiAqIEBwYXJhbSBjIGxlZnQgdHJhcGV6b2lkIHBlYWsgKG1vZGUpXG4gKiBAcGFyYW0gZCByaWdodCB0cmFwZXpvaWQgcGVhayAobW9kZSksIGEgPD0gYyA8PSBkIDw9IGJcbiAqIEByZXR1cm5zIFRyYXBlem9pZGFsIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJhcGV6b2lkYWwoYSwgYiwgYywgZCkge1xuICAgIGlmIChhID09IG51bGwpIGEgPSAwLjA7XG4gICAgaWYgKGIgPT0gbnVsbCkgYiA9IDEuMDtcbiAgICBpZiAoYyA9PSBudWxsKSBjID0gMC4yNTtcbiAgICBpZiAoZCA9PSBudWxsKSBkID0gMC43NTtcbiAgICBpZiAoYSA+IGIgfHwgYyA8IGEgfHwgYyA+IGQgfHwgZCA+IGIpIHJldHVybiBOYU47XG5cdGlmIChhPT1iKSByZXR1cm4gYTtcbiAgICB2YXIgcDEgPSAoYyAtIGEpIC8gKCAoYiAtIGEpKyhkIC0gYykpO1xuICAgIHZhciBwMiA9IChiIC0gZCkgLyAoIChiIC0gYSkrKGQgLSBjKSk7XG4gICAgdmFyIHAgPSBNYXRoLnJhbmRvbSgpO1xuICAgIFxuICAgIGlmIChwIDw9IHAxKSB7XG4gICAgICAgIHJldHVybiBhICsgTWF0aC5zcXJ0KHAgKiAoKGIgLSBhKSsoZCAtIGMpKSAqIChjIC0gYSkgKTtcbiAgICB9IGVsc2UgaWYgKHAgPiAxLXAyKSB7XG4gICAgICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KCgxIC0gcCkgKiAoKGIgLSBhKSsoZCAtIGMpKSAqIChiIC0gZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgXHRyZXR1cm4gYyArIChkLWMpKihwLXAxKS8oMS4wIC0gcDEgLSBwMik7XG4gICAgfVxufVxuXG4vKipcbiAqIExvZ25vcm1hbCBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDU4XG4gKiBAcGFyYW0gbWVhbiBtZWFuIHZhbHVlXG4gKiBAcGFyYW0gc3RkIHN0YW5kYXJkIGRldmlhdGlvblxuICogQHJldHVybnMgTG9nbm9ybWFsbHkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMb2dOb3JtYWwobWVhbiwgc3RkKSB7XG4gICAgaWYgKG1lYW4gPT0gbnVsbCkgbWVhbiA9IDAuMDtcbiAgICBpZiAoc3RkID09IG51bGwpIHN0ZCA9IDEuMDtcbiAgICBpZiAoc3RkIDwgMCkgcmV0dXJuIE5hTjtcbiAgICByZXR1cm4gTWF0aC5leHAoTm9ybWFsKG1lYW4sIHN0ZCkpXG59XG5cblxuXG4vKipcbiAqIEJlcm5vdWxsaSBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDY0XG4gKiBAcGFyYW0gcCBwcm9iYWJpbGl0eSBvZiAxXG4gKiBAcmV0dXJucyBCZXJub3VsbGkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZhbHVlICh6ZXJvIG9yIG9uZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJlcm5vdWxsaShwKSB7XG5cdGlmIChwPT1udWxsKSBwID0gMC41O1xuXHRpZiAocDwwLjAgfCBwID4gMS4wKSByZXR1cm4gTmFOO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpPD1wKVxuICAgIFx0cmV0dXJuIDE7XG4gICAgZWxzZSBcbiAgICBcdHJldHVybiAwO1xufVxuXG5cbi8qKlxuICogQmlub21pYWwgZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ2OVxuICogQHBhcmFtIG4gbnVtYmVyIG9mIHRyaWFsc1xuICogQHBhcmFtIHAgc3VjY2VzcyBwcm9iYWJpbGl0eSBpbiBlYWNoIHRyaWFsXG4gKiBAcmV0dXJucyBCaW5vbWlhbCBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUgKDAsMSwuLi4sbilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJpbm9taWFsKG4scCkge1xuXHRpZiAobj09bnVsbCkgbiA9IDE7XG5cdGlmIChwPT1udWxsKSBwID0gMC41O1x0XG5cdHZhciB0ID0gbiB8IDA7XG5cdGlmICggcCA8IDAuMCB8IHAgPiAxLjAgfCB0IDw9IDApIHJldHVybiBOYU47XG5cdHZhciBzdW0gPSAwO1xuXHRmb3IgKHZhciBpPTA7aTx0O2krKykge1xuXHRcdHN1bSArPSBCZXJub3VsbGkocCk7XG5cdH1cbiAgICByZXR1cm4gc3VtO1xufVxuXG4vKipcbiAqIEdlb21ldHJpYyBkaXN0cmlidXRpb24gaW1wbGVtZW50YXRpb24gYmFzZWQgb24gQS5MYXcgXCJTaW11bGF0aW9uIE1vZGVsbGluZyBhbmQgQW5hbHlzaXNcIiwgNWUsIE1jIEdyYXctSGlsbCwgMjAxNSwgcC4gNDY5XG4gKiBAcGFyYW0gcCBzdWNjZXNzIHByb2JhYmlsaXR5IFxuICogQHJldHVybnMgR2VvbWV0cmljIGRpc3RyaWJ1dGVkIHJhbmRvbSB2YWx1ZSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdlb21ldHJpYyhwKSB7XG5cdGlmIChwPT1udWxsKSBwID0gMC41O1x0XG5cdGlmICggcCA8PSAwLjAgfCBwID49IDEuMCApIHJldHVybiBOYU47XHRcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLmxvZyhNYXRoLnJhbmRvbSgpKS9NYXRoLmxvZygxLXApICkgfCAwO1xufVxuXG4vKipcbiAqIFBvaXNzb24gZGlzdHJpYnV0aW9uIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIEEuTGF3IFwiU2ltdWxhdGlvbiBNb2RlbGxpbmcgYW5kIEFuYWx5c2lzXCIsIDVlLCBNYyBHcmF3LUhpbGwsIDIwMTUsIHAuIDQ3MFxuICogQHBhcmFtIGxhbWJkYSBtZWFuIHZhbHVlIFxuICogQHJldHVybnMgUG9pc3NvbiBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQb2lzc29uKGxhbWJkYSkge1xuXHRpZiAobGFtYmRhPT1udWxsKSBsYW1iZGEgPSAxLjA7XHRcblx0aWYgKCBsYW1iZGEgPD0gMC4wICkgcmV0dXJuIE5hTjtcdFxuXHR2YXIgYSA9IE1hdGguZXhwKC1sYW1iZGEpO1xuXHR2YXIgYiA9IDEuMDtcblx0dmFyIGkgPSAwO1x0XG5cdHdoaWxlICh0cnVlKSB7XG5cdFx0dmFyIHUgPSBNYXRoLnJhbmRvbSgpO1xuXHRcdGIgKj0gdTtcblx0XHRpZiAoYiA8IGEpIHJldHVybiBpO1xuXHRcdGkgKz0gMTtcblx0fVxufVxuXG4vKipcbiAqIEdhbW1hIGRpc3RyaWJ1dGlvbiBpbXBsZW1lbnRhdGlvbi5cbiAqIFRoaXMgY29kZSBoYXMgYmVlbiBjb3BpZWQgZnJvbVxuICogaHR0cHM6Ly9naXRodWIuY29tL2J0ZWxsZXMvc2ltanMtdXBkYXRlZC9cbiAqIHNpbWpzLXVwZGF0ZWQgaXMgbGljZW5zZWQgdW5kZXIgTUlUIE9wZW4gU291cmNlIExpY2Vuc2UgdGVybW5zIFxuICogQHBhcmFtIGFscGhhIHNoYXBlIHBhcmFtZXRlclxuICogQHBhcmFtIGJldGEgcmF0ZSBwYXJhbWV0ZXIgXG4gKiBAcmV0dXJucyBHYW1tYSBkaXN0cmlidXRlZCByYW5kb20gdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHYW1tYShhbHBoYSwgYmV0YSkge1xuXHRpZiAoYWxwaGEgPT0gbnVsbCkgYWxwaGEgPSAxLjA7XG5cdGlmIChiZXRhID09IG51bGwpIGJldGEgPSAxLjA7XG4gICAgaWYgKGFscGhhID4gMS4wKSB7XG4gICAgICAgIGxldCBhaW52ID0gTWF0aC5zcXJ0KDIuMCAqIGFscGhhIC0gMS4wKSxcbiAgICAgICAgICAgIGJiYiA9IGFscGhhIC0gTWF0aC5sb2coNC4wKSxcbiAgICAgICAgICAgIGNjYyA9IGFscGhhICsgYWludjtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgICAgICAgIGxldCB1MSA9IHJhbmRvbSgpO1xuXG4gICAgICAgICAgICBpZiAoKHUxIDwgMWUtNykgfHwgKHUgPiAwLjk5OTk5OTkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdTIgPSAxLjAgLSByYW5kb20oKSxcbiAgICAgICAgICAgICAgICB2ID0gTWF0aC5sb2codTEgLyAoMS4wIC0gdTEpKSAvIGFpbnYsXG4gICAgICAgICAgICAgICAgeCA9IGFscGhhICogTWF0aC5leHAodiksXG4gICAgICAgICAgICAgICAgeiA9IHUxICogdTEgKiB1MixcbiAgICAgICAgICAgICAgICByID0gYmJiICsgY2NjICogdiAtIHg7XG4gICAgICAgICAgICBpZiAoKHIgKyBNYXRoLmxvZyg0LjUpIC0gMy41ICogeiA+PSAwLjApIHx8IChyID49IE1hdGgubG9nKHopKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4ICogYmV0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWxwaGEgPT0gMS4wKSB7XG4gICAgICAgIGxldCB1ID0gcmFuZG9tKCk7XG4gICAgICAgIHdoaWxlICh1IDw9IDFlLTcpIHtcbiAgICAgICAgICAgIHUgPSByYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLU1hdGgubG9nKHUpICogYmV0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGxldCB1ID0gcmFuZG9tKCksXG4gICAgICAgICAgICAgICAgYiA9IChNYXRoLkUgKyBhbHBoYSkgLyBNYXRoLkUsXG4gICAgICAgICAgICAgICAgcCA9IGIgKiB1O1xuICAgICAgICAgICAgaWYgKHAgPD0gMS4wKSB7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGgucG93KHAsIDEuMCAvIGFscGhhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IC1NYXRoLmxvZygoYiAtIHApIC8gYWxwaGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdTEgPSByYW5kb20oKTtcblxuICAgICAgICAgICAgaWYgKHAgPiAxLjApIHtcbiAgICAgICAgICAgICAgICBpZiAodTEgPD0gTWF0aC5wb3coeCwgKGFscGhhIC0gMS4wKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh1MSA8PSBNYXRoLmV4cCgteCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCAqIGJldGE7XG4gICAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvc2QtcmFuZG9tJztcbiJdfQ==
