(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.SilverDecisions || (g.SilverDecisions = {})).Random = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uniform = uniform;
exports.exponential = exponential;
exports.normal = normal;
exports.pareto = pareto;
exports.weibull = weibull;
exports.triangular = triangular;
exports.lognormal = lognormal;
exports.gamma = gamma;
var menuList = exports.menuList = ["random()", "uniform(0.25,0.75)", "exponential(5.0)", "normal(0.5,0.1)", "pareto(0.1,10)", "weibull(0.5,5)", "triangular(0.0,1.0,0.6)", "lognormal(-1,0.2)", "gamma(1,2)"];

var functionNameList = exports.functionNameList = ["uniform", "exponential", "normal", "pareto", "weibull", "triangular", "lognormal", "gamma"];

var random = exports.random = Math.random;

function uniform(lower, upper) {
    return random() * (upper - lower) + lower;
}

function exponential(lambda) {
    return -Math.log(Math.random()) / lambda;
}

function normal(mean, std) {
    if (mean == null) {
        mean = 0.0;
    }
    if (std == null) {
        std = 1.0;
    }

    var n = Math.sqrt(-2.0 * Math.log(1.0 - Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
    return n * std + mean;
}

function pareto(minimum, alpha) {
    return minimum / Math.pow(1 - Math.random(), 1.0 / alpha);
}

function weibull(alpha, beta) {
    return alpha * Math.pow(-Math.log(1.0 - random()), 1.0 / beta);
}

function triangular(a, b, m) {
    var c = (m - a) / (b - a),
        u = random();
    if (u <= c) {
        return a + Math.sqrt(u * (b - a) * (m - a));
    } else {
        return b - Math.sqrt((1 - u) * (b - a) * (b - m));
    }
}

function lognormal(mean, std) {
    return Math.exp(normal(mean, std));
}

function gamma(alpha, beta) {
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
                _x = alpha * Math.exp(v),
                z = u1 * u1 * u2,
                r = bbb + ccc * v - _x;
            if (r + Math.log(4.5) - 3.5 * z >= 0.0 || r >= Math.log(z)) {
                return _x * beta;
            }
        }
    } else if (alpha == 1.0) {
        var _u = random();
        while (_u <= 1e-7) {
            _u = random();
        }
        return -Math.log(_u) * beta;
    } else {
        while (true) {
            var _u2 = random(),
                b = (Math.E + alpha) / Math.E,
                p = b * _u2,
                _x2 = 0;
            if (p <= 1.0) {
                _x2 = Math.pow(p, 1.0 / alpha);
            } else {
                _x2 = -Math.log((b - p) / alpha);
            }
            var _u3 = random();

            if (p > 1.0) {
                if (_u3 <= Math.pow(_x2, alpha - 1.0)) {
                    break;
                }
            } else if (_u3 <= Math.exp(-_x2)) {
                break;
            }
        }
        return x * beta;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNkLXJhbmRvbS5qcyIsInN0YW5kYWxvbmUuaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRLEFDTWdCLFUsQUFBQTtRLEFBSUEsYyxBQUFBO1EsQUFJQSxTLEFBQUE7USxBQVlBLFMsQUFBQTtRLEFBSUEsVSxBQUFBO1EsQUFJQSxhLEFBQUE7USxBQVVBLFksQUFBQTtRLEFBSUEsUSxBQUFBO0FBaERULElBQU0sOEJBQVcsQ0FBQSxBQUFDLFlBQUQsQUFBYSxzQkFBYixBQUFtQyxvQkFBbkMsQUFBdUQsbUJBQXZELEFBQTBFLGtCQUExRSxBQUE0RixrQkFBNUYsQUFBOEcsMkJBQTlHLEFBQXlJLHFCQUExSixBQUFpQixBQUE4Sjs7QUFFL0ssSUFBTSw4Q0FBbUIsQ0FBQSxBQUFDLFdBQUQsQUFBWSxlQUFaLEFBQTJCLFVBQTNCLEFBQXFDLFVBQXJDLEFBQStDLFdBQS9DLEFBQTBELGNBQTFELEFBQXdFLGFBQWpHLEFBQXlCLEFBQXFGOztBQUU5RyxJQUFNLDBCQUFTLEtBQWYsQUFBb0I7O0FBRXBCLFNBQUEsQUFBUyxRQUFULEFBQWlCLE9BQWpCLEFBQXdCLE9BQU8sQUFDbEM7V0FBTyxZQUFZLFFBQVosQUFBb0IsU0FBM0IsQUFBb0MsQUFDdkM7OztBQUVNLFNBQUEsQUFBUyxZQUFULEFBQXFCLFFBQVEsQUFDaEM7V0FBTyxDQUFDLEtBQUEsQUFBSyxJQUFJLEtBQVYsQUFBQyxBQUFTLEFBQUssWUFBdEIsQUFBa0MsQUFDckM7OztBQUVNLFNBQUEsQUFBUyxPQUFULEFBQWdCLE1BQWhCLEFBQXNCLEtBQUssQUFDOUI7UUFBSSxRQUFKLEFBQVksTUFBTSxBQUNkO2VBQUEsQUFBTyxBQUNWO0FBQ0Q7UUFBSSxPQUFKLEFBQVcsTUFBTSxBQUNiO2NBQUEsQUFBTSxBQUNUO0FBRUQ7O1FBQUksSUFBSSxLQUFBLEFBQUssS0FBSyxDQUFBLEFBQUMs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QUNSO2dCQUFJLEtBQUosQUFBUyxLQUFLLEFBQ1Y7c0JBQUksS0FBQSxBQUFLLElBQUwsQUFBUyxHQUFHLE1BQWhCLEFBQUksQUFBa0IsQUFDekI7QUFGRCxtQkFFTyxBQUNIO3NCQUFJLENBQUMsS0FBQSxBQUFLLElBQUksQ0FBQyxJQUFELEFBQUssS0FBbkIsQUFBSyxBQUFtQixBQUMzQjtBQUNEO2dCQUFNLE1BQU4sQUFBVyxBQUVYOztnQkFBSSxJQUFKLEFBQVEsS0FBSyxBQUNUO29CQUFJLE9BQU0sS0FBQSxBQUFLLElBQUwsQUFBUyxLQUFJLFFBQXZCLEFBQVUsQUFBcUIsTUFBTyxBQUNsQztBQUNIO0FBQ0o7QUFKRCxtQkFJTyxJQUFJLE9BQU0sS0FBQSxBQUFLLElBQUksQ0FBbkIsQUFBVSxBQUFVLE1BQUksQUFDM0I7QUFDSDtBQUNKO0FBQ0Q7ZUFBTyxJQUFQLEFBQVcsQUFDZDtBQUVKOzs7Ozs7Ozs7Ozs7QUNuR0QsOENBQUE7aURBQUE7O2dCQUFBO3dCQUFBO3VCQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgbWVudUxpc3QgPSBbXCJyYW5kb20oKVwiLCBcInVuaWZvcm0oMC4yNSwwLjc1KVwiLCBcImV4cG9uZW50aWFsKDUuMClcIiwgXCJub3JtYWwoMC41LDAuMSlcIiwgXCJwYXJldG8oMC4xLDEwKVwiLCBcIndlaWJ1bGwoMC41LDUpXCIsIFwidHJpYW5ndWxhcigwLjAsMS4wLDAuNilcIiwgXCJsb2dub3JtYWwoLTEsMC4yKVwiLCBcImdhbW1hKDEsMilcIl07XHJcblxyXG5leHBvcnQgY29uc3QgZnVuY3Rpb25OYW1lTGlzdCA9IFtcInVuaWZvcm1cIiwgXCJleHBvbmVudGlhbFwiLCBcIm5vcm1hbFwiLCBcInBhcmV0b1wiLCBcIndlaWJ1bGxcIiwgXCJ0cmlhbmd1bGFyXCIsIFwibG9nbm9ybWFsXCIsIFwiZ2FtbWFcIl07XHJcblxyXG5leHBvcnQgY29uc3QgcmFuZG9tID0gTWF0aC5yYW5kb207XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5pZm9ybShsb3dlciwgdXBwZXIpIHtcclxuICAgIHJldHVybiByYW5kb20oKSAqICh1cHBlciAtIGxvd2VyKSArIGxvd2VyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwb25lbnRpYWwobGFtYmRhKSB7XHJcbiAgICByZXR1cm4gLU1hdGgubG9nKE1hdGgucmFuZG9tKCkpIC8gbGFtYmRhO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsKG1lYW4sIHN0ZCkge1xyXG4gICAgaWYgKG1lYW4gPT0gbnVsbCkge1xyXG4gICAgICAgIG1lYW4gPSAwLjA7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RkID09IG51bGwpIHtcclxuICAgICAgICBzdGQgPSAxLjA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG4gPSBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKDEuMCAtIE1hdGgucmFuZG9tKCkpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiBNYXRoLnJhbmRvbSgpKTtcclxuICAgIHJldHVybiBuICogc3RkICsgbWVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmV0byhtaW5pbXVtLCBhbHBoYSkge1xyXG4gICAgcmV0dXJuIG1pbmltdW0gLyBNYXRoLnBvdygoMSAtIE1hdGgucmFuZG9tKCkpLCAxLjAgLyBhbHBoYSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3ZWlidWxsKGFscGhhLCBiZXRhKSB7XHJcbiAgICByZXR1cm4gYWxwaGEgKiBNYXRoLnBvdygtTWF0aC5sb2coMS4wIC0gcmFuZG9tKCkpLCAxLjAgLyBiZXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWFuZ3VsYXIoYSwgYiwgbSkge1xyXG4gICAgdmFyIGMgPSAobSAtIGEpIC8gKGIgLSBhKSxcclxuICAgICAgICB1ID0gcmFuZG9tKCk7XHJcbiAgICBpZiAodSA8PSBjKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQodSAqIChiIC0gYSkgKiAobSAtIGEpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGIgLSBNYXRoLnNxcnQoKDEgLSB1KSAqIChiIC0gYSkgKiAoYiAtIG0pKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZ25vcm1hbChtZWFuLCBzdGQpIHtcclxuICAgIHJldHVybiBNYXRoLmV4cChub3JtYWwobWVhbiwgc3RkKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKGFscGhhLCBiZXRhKSB7XHJcbiAgICBpZiAoYWxwaGEgPiAxLjApIHtcclxuICAgICAgICBsZXQgYWludiA9IE1hdGguc3FydCgyLjAgKiBhbHBoYSAtIDEuMCksXHJcbiAgICAgICAgICAgIGJiYiA9IGFscGhhIC0gTWF0aC5sb2coNC4wKSxcclxuICAgICAgICAgICAgY2NjID0gYWxwaGEgKyBhaW52O1xyXG5cclxuICAgICAgICB3aGlsZSAodHJ1ZSkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cclxuICAgICAgICAgICAgbGV0IHUxID0gcmFuZG9tKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHUxIDwgMWUtNykgfHwgKHUgPiAwLjk5OTk5OTkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdTIgPSAxLjAgLSByYW5kb20oKSxcclxuICAgICAgICAgICAgICAgIHYgPSBNYXRoLmxvZyh1MSAvICgxLjAgLSB1MSkpIC8gYWludixcclxuICAgICAgICAgICAgICAgIHggPSBhbHBoYSAqIE1hdGguZXhwKHYpLFxyXG4gICAgICAgICAgICAgICAgeiA9IHUxICogdTEgKiB1MixcclxuICAgICAgICAgICAgICAgIHIgPSBiYmIgKyBjY2MgKiB2IC0geDtcclxuICAgICAgICAgICAgaWYgKChyICsgTWF0aC5sb2coNC41KSAtIDMuNSAqIHogPj0gMC4wKSB8fCAociA+PSBNYXRoLmxvZyh6KSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ICogYmV0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoYWxwaGEgPT0gMS4wKSB7XHJcbiAgICAgICAgbGV0IHUgPSByYW5kb20oKTtcclxuICAgICAgICB3aGlsZSAodSA8PSAxZS03KSB7XHJcbiAgICAgICAgICAgIHUgPSByYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC1NYXRoLmxvZyh1KSAqIGJldGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCB1ID0gcmFuZG9tKCksXHJcbiAgICAgICAgICAgICAgICBiID0gKE1hdGguRSArIGFscGhhKSAvIE1hdGguRSxcclxuICAgICAgICAgICAgICAgIHAgPSBiICogdSxcclxuICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICBpZiAocCA8PSAxLjApIHtcclxuICAgICAgICAgICAgICAgIHggPSBNYXRoLnBvdyhwLCAxLjAgLyBhbHBoYSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLU1hdGgubG9nKChiIC0gcCkgLyBhbHBoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdTEgPSByYW5kb20oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwID4gMS4wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodTEgPD0gTWF0aC5wb3coeCwgKGFscGhhIC0gMS4wKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1MSA8PSBNYXRoLmV4cCgteCkpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4ICogYmV0YTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9zZC1yYW5kb20nO1xuIl19
