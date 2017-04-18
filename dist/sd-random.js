require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNkLXJhbmRvbS5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7USxBQ01nQixVLEFBQUE7USxBQUlBLGMsQUFBQTtRLEFBSUEsUyxBQUFBO1EsQUFZQSxTLEFBQUE7USxBQUlBLFUsQUFBQTtRLEFBSUEsYSxBQUFBO1EsQUFVQSxZLEFBQUE7USxBQUlBLFEsQUFBQTtBQWhEVCxJQUFNLDhCQUFXLENBQUEsQUFBQyxZQUFELEFBQWEsc0JBQWIsQUFBbUMsb0JBQW5DLEFBQXVELG1CQUF2RCxBQUEwRSxrQkFBMUUsQUFBNEYsa0JBQTVGLEFBQThHLDJCQUE5RyxBQUF5SSxxQkFBMUosQUFBaUIsQUFBOEo7O0FBRS9LLElBQU0sOENBQW1CLENBQUEsQUFBQyxXQUFELEFBQVksZUFBWixBQUEyQixVQUEzQixBQUFxQyxVQUFyQyxBQUErQyxXQUEvQyxBQUEwRCxjQUExRCxBQUF3RSxhQUFqRyxBQUF5QixBQUFxRjs7QUFFOUcsSUFBTSwwQkFBUyxLQUFmLEFBQW9COztBQUVwQixTQUFBLEFBQVMsUUFBVCxBQUFpQixPQUFqQixBQUF3QixPQUFPLEFBQ2xDO1dBQU8sWUFBWSxRQUFaLEFBQW9CLFNBQTNCLEFBQW9DLEFBQ3ZDOzs7QUFFTSxTQUFBLEFBQVMsWUFBVCxBQUFxQixRQUFRLEFBQ2hDO1dBQU8sQ0FBQyxLQUFBLEFBQUssSUFBSSxLQUFWLEFBQUMsQUFBUyxBQUFLLFlBQXRCLEFBQWtDLEFBQ3JDOzs7QUFFTSxTQUFBLEFBQVMsT0FBVCxBQUFnQixNQUFoQixBQUFzQixLQUFLLEFBQzlCO1FBQUksUUFBSixBQUFZLE1BQU0sQUFDZDtlQUFBLEFBQU8sQUFDVjtBQUNEO1FBQUksT0FBSixBQUFXLE1BQU0sQUFDYjtjQUFBLEFBQU0sQUFDVDtBQUVEOztRQUFJLElBQUksS0FBQSxBQUFLLEtBQUssQ0FBQSxBQUFDLE1BQU0sS0FBQSxB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QUFKLEFBQVMsS0FBSyxBQUNWO3NCQUFJLEtBQUEsQUFBSyxJQUFMLEFBQVMsR0FBRyxNQUFoQixBQUFJLEFBQWtCLEFBQ3pCO0FBRkQsbUJBRU8sQUFDSDtzQkFBSSxDQUFDLEtBQUEsQUFBSyxJQUFJLENBQUMsSUFBRCxBQUFLLEtBQW5CLEFBQUssQUFBbUIsQUFDM0I7QUFDRDtnQkFBTSxNQUFOLEFBQVcsQUFFWDs7Z0JBQUksSUFBSixBQUFRLEtBQUssQUFDVDtvQkFBSSxPQUFNLEtBQUEsQUFBSyxJQUFMLEFBQVMsS0FBSSxRQUF2QixBQUFVLEFBQXFCLE1BQU8sQUFDbEM7QUFDSDtBQUNKO0FBSkQsbUJBSU8sSUFBSSxPQUFNLEtBQUEsQUFBSyxJQUFJLENBQW5CLEFBQVUsQUFBVSxNQUFJLEFBQzNCO0FBQ0g7QUFDSjtBQUNEO2VBQU8sSUFBUCxBQUFXLEFBQ2Q7QUFFSjs7Ozs7Ozs7Ozs7O0FDbkdELDhDQUFBO2lEQUFBOztnQkFBQTt3QkFBQTt1QkFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNvbnN0IG1lbnVMaXN0ID0gW1wicmFuZG9tKClcIiwgXCJ1bmlmb3JtKDAuMjUsMC43NSlcIiwgXCJleHBvbmVudGlhbCg1LjApXCIsIFwibm9ybWFsKDAuNSwwLjEpXCIsIFwicGFyZXRvKDAuMSwxMClcIiwgXCJ3ZWlidWxsKDAuNSw1KVwiLCBcInRyaWFuZ3VsYXIoMC4wLDEuMCwwLjYpXCIsIFwibG9nbm9ybWFsKC0xLDAuMilcIiwgXCJnYW1tYSgxLDIpXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZ1bmN0aW9uTmFtZUxpc3QgPSBbXCJ1bmlmb3JtXCIsIFwiZXhwb25lbnRpYWxcIiwgXCJub3JtYWxcIiwgXCJwYXJldG9cIiwgXCJ3ZWlidWxsXCIsIFwidHJpYW5ndWxhclwiLCBcImxvZ25vcm1hbFwiLCBcImdhbW1hXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVuaWZvcm0obG93ZXIsIHVwcGVyKSB7XHJcbiAgICByZXR1cm4gcmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikgKyBsb3dlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9uZW50aWFsKGxhbWJkYSkge1xyXG4gICAgcmV0dXJuIC1NYXRoLmxvZyhNYXRoLnJhbmRvbSgpKSAvIGxhbWJkYTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbChtZWFuLCBzdGQpIHtcclxuICAgIGlmIChtZWFuID09IG51bGwpIHtcclxuICAgICAgICBtZWFuID0gMC4wO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0ZCA9PSBudWxsKSB7XHJcbiAgICAgICAgc3RkID0gMS4wO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuID0gTWF0aC5zcXJ0KC0yLjAgKiBNYXRoLmxvZygxLjAgLSBNYXRoLnJhbmRvbSgpKSkgKiBNYXRoLmNvcygyLjAgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICByZXR1cm4gbiAqIHN0ZCArIG1lYW47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJldG8obWluaW11bSwgYWxwaGEpIHtcclxuICAgIHJldHVybiBtaW5pbXVtIC8gTWF0aC5wb3coKDEgLSBNYXRoLnJhbmRvbSgpKSwgMS4wIC8gYWxwaGEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2VpYnVsbChhbHBoYSwgYmV0YSkge1xyXG4gICAgcmV0dXJuIGFscGhhICogTWF0aC5wb3coLU1hdGgubG9nKDEuMCAtIHJhbmRvbSgpKSwgMS4wIC8gYmV0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmlhbmd1bGFyKGEsIGIsIG0pIHtcclxuICAgIHZhciBjID0gKG0gLSBhKSAvIChiIC0gYSksXHJcbiAgICAgICAgdSA9IHJhbmRvbSgpO1xyXG4gICAgaWYgKHUgPD0gYykge1xyXG4gICAgICAgIHJldHVybiBhICsgTWF0aC5zcXJ0KHUgKiAoYiAtIGEpICogKG0gLSBhKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KCgxIC0gdSkgKiAoYiAtIGEpICogKGIgLSBtKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dub3JtYWwobWVhbiwgc3RkKSB7XHJcbiAgICByZXR1cm4gTWF0aC5leHAobm9ybWFsKG1lYW4sIHN0ZCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnYW1tYShhbHBoYSwgYmV0YSkge1xyXG4gICAgaWYgKGFscGhhID4gMS4wKSB7XHJcbiAgICAgICAgbGV0IGFpbnYgPSBNYXRoLnNxcnQoMi4wICogYWxwaGEgLSAxLjApLFxyXG4gICAgICAgICAgICBiYmIgPSBhbHBoYSAtIE1hdGgubG9nKDQuMCksXHJcbiAgICAgICAgICAgIGNjYyA9IGFscGhhICsgYWludjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXHJcbiAgICAgICAgICAgIGxldCB1MSA9IHJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh1MSA8IDFlLTcpIHx8ICh1ID4gMC45OTk5OTk5KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHUyID0gMS4wIC0gcmFuZG9tKCksXHJcbiAgICAgICAgICAgICAgICB2ID0gTWF0aC5sb2codTEgLyAoMS4wIC0gdTEpKSAvIGFpbnYsXHJcbiAgICAgICAgICAgICAgICB4ID0gYWxwaGEgKiBNYXRoLmV4cCh2KSxcclxuICAgICAgICAgICAgICAgIHogPSB1MSAqIHUxICogdTIsXHJcbiAgICAgICAgICAgICAgICByID0gYmJiICsgY2NjICogdiAtIHg7XHJcbiAgICAgICAgICAgIGlmICgociArIE1hdGgubG9nKDQuNSkgLSAzLjUgKiB6ID49IDAuMCkgfHwgKHIgPj0gTWF0aC5sb2coeikpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCAqIGJldGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGFscGhhID09IDEuMCkge1xyXG4gICAgICAgIGxldCB1ID0gcmFuZG9tKCk7XHJcbiAgICAgICAgd2hpbGUgKHUgPD0gMWUtNykge1xyXG4gICAgICAgICAgICB1ID0gcmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtTWF0aC5sb2codSkgKiBiZXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdSA9IHJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgYiA9IChNYXRoLkUgKyBhbHBoYSkgLyBNYXRoLkUsXHJcbiAgICAgICAgICAgICAgICBwID0gYiAqIHUsXHJcbiAgICAgICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICAgICAgaWYgKHAgPD0gMS4wKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5wb3cocCwgMS4wIC8gYWxwaGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeCA9IC1NYXRoLmxvZygoYiAtIHApIC8gYWxwaGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHUxID0gcmFuZG9tKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocCA+IDEuMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHUxIDw9IE1hdGgucG93KHgsIChhbHBoYSAtIDEuMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodTEgPD0gTWF0aC5leHAoLXgpKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geCAqIGJldGE7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvc2QtcmFuZG9tJztcbiJdfQ==
