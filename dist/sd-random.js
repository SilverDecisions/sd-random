require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Uniform = Uniform;
exports.Exponential = Exponential;
exports.Normal = Normal;
exports.Pareto = Pareto;
exports.Weibull = Weibull;
exports.Triangular = Triangular;
exports.LogNormal = LogNormal;
exports.Gamma = Gamma;
var menuList = exports.menuList = ["Uniform(0.0,1.0)", "Exponential(1.0)", "Normal(0.0,1.0)", "Pareto(1.0,1.0)", "Weibull(1.0,1.0)", "Triangular(0.0,1.0,0.5)", "LogNormal(0.0,1.0)", "Gamma(1.0,1.0)"];

var functionNameList = exports.functionNameList = ["Uniform", "Exponential", "Normal", "Pareto", "Weibull", "Triangular", "LogNormal", "Gamma"];

var random = exports.random = Math.random;

function Uniform(lower, upper) {
    return random() * (upper - lower) + lower;
}

function Exponential(lambda) {
    return -Math.log(Math.random()) / lambda;
}

function Normal(mean, std) {
    if (mean == null) {
        mean = 0.0;
    }
    if (std == null) {
        std = 1.0;
    }

    var n = Math.sqrt(-2.0 * Math.log(1.0 - Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
    return n * std + mean;
}

function Pareto(minimum, alpha) {
    return minimum / Math.pow(1 - Math.random(), 1.0 / alpha);
}

function Weibull(alpha, beta) {
    return alpha * Math.pow(-Math.log(1.0 - random()), 1.0 / beta);
}

function Triangular(a, b, m) {
    var c = (m - a) / (b - a),
        u = random();
    if (u <= c) {
        return a + Math.sqrt(u * (b - a) * (m - a));
    } else {
        return b - Math.sqrt((1 - u) * (b - a) * (b - m));
    }
}

function LogNormal(mean, std) {
    return Math.exp(Normal(mean, std));
}

function Gamma(alpha, beta) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNkLXJhbmRvbS5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7USxBQ1lnQixVLEFBQUE7USxBQUlBLGMsQUFBQTtRLEFBSUEsUyxBQUFBO1EsQUFZQSxTLEFBQUE7USxBQUlBLFUsQUFBQTtRLEFBSUEsYSxBQUFBO1EsQUFVQSxZLEFBQUE7USxBQUlBLFEsQUFBQTtBQXREVCxJQUFNLDhCQUFXLENBQUEsQUFBQyxvQkFBRCxBQUFxQixvQkFBckIsQUFDQyxtQkFERCxBQUNvQixtQkFEcEIsQUFFQyxvQkFGRCxBQUVxQiwyQkFGckIsQUFHQyxzQkFIbEIsQUFBaUIsQUFHdUI7O0FBRXhDLElBQU0sOENBQW1CLENBQUEsQUFBQyxXQUFELEFBQVksZUFBWixBQUNDLFVBREQsQUFDVyxVQURYLEFBRUMsV0FGRCxBQUVZLGNBRlosQUFHQyxhQUgxQixBQUF5QixBQUdjOztBQUV2QyxJQUFNLDBCQUFTLEtBQWYsQUFBb0I7O0FBRXBCLFNBQUEsQUFBUyxRQUFULEFBQWlCLE9BQWpCLEFBQXdCLE9BQU8sQUFDbEM7V0FBTyxZQUFZLFFBQVosQUFBb0IsU0FBM0IsQUFBb0MsQUFDdkM7OztBQUVNLFNBQUEsQUFBUyxZQUFULEFBQXFCLFFBQVEsQUFDaEM7V0FBTyxDQUFDLEtBQUEsQUFBSyxJQUFJLEtBQVYsQUFBQyxBQUFTLEFBQUssWUFBdEIsQUFBa0MsQUFDckM7OztBQUVNLFNBQUEsQUFBUyxPQUFULEFBQWdCLE1BQWhCLEFBQXNCLEtBQUssQUFDOUI7UUFBSSxRQUFKLEFBQVksTUFBTSxBQUNkO2VBQUEsQUFBTyxBQUNWO0FBQ0Q7UUFBSSxPQUFKLEFBQVcsTUFBTSxBQUNiO2NBQUEsQUFBTSxBQUNUO0FBRUQ7O1FBQUksSUFBSSxLQUFBLEFBQUssS0FBSyxDQUFBLEFBQUMsTUFBTSxLQUFBLEFBQUssSUFBSSxNQUFNLEtBQWhDLEFBQWlC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S0FBQSxBQUFLLElBQUwsQUFBUyxHQUFHLE1BQWhCLEFBQUksQUFBa0IsQUFDekI7QUFGRCxtQkFFTyxBQUNIO3NCQUFJLENBQUMsS0FBQSxBQUFLLElBQUksQ0FBQyxJQUFELEFBQUssS0FBbkIsQUFBSyxBQUFtQixBQUMzQjtBQUNEO2dCQUFNLE1BQU4sQUFBVyxBQUVYOztnQkFBSSxJQUFKLEFBQVEsS0FBSyxBQUNUO29CQUFJLE9BQU0sS0FBQSxBQUFLLElBQUwsQUFBUyxLQUFJLFFBQXZCLEFBQVUsQUFBcUIsTUFBTyxBQUNsQztBQUNIO0FBQ0o7QUFKRCxtQkFJTyxJQUFJLE9BQU0sS0FBQSxBQUFLLElBQUksQ0FBbkIsQUFBVSxBQUFVLE1BQUksQUFDM0I7QUFDSDtBQUNKO0FBQ0Q7ZUFBTyxJQUFQLEFBQVcsQUFDZDtBQUVKOzs7Ozs7Ozs7Ozs7QUN6R0QsOENBQUE7aURBQUE7O2dCQUFBO3dCQUFBO3VCQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY29uc3QgbWVudUxpc3QgPSBbXCJVbmlmb3JtKDAuMCwxLjApXCIsIFwiRXhwb25lbnRpYWwoMS4wKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3JtYWwoMC4wLDEuMClcIiwgXCJQYXJldG8oMS4wLDEuMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiV2VpYnVsbCgxLjAsMS4wKVwiLCBcIlRyaWFuZ3VsYXIoMC4wLDEuMCwwLjUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ05vcm1hbCgwLjAsMS4wKVwiLCBcIkdhbW1hKDEuMCwxLjApXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZ1bmN0aW9uTmFtZUxpc3QgPSBbXCJVbmlmb3JtXCIsIFwiRXhwb25lbnRpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3JtYWxcIiwgXCJQYXJldG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZWlidWxsXCIsIFwiVHJpYW5ndWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvZ05vcm1hbFwiLCBcIkdhbW1hXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuaWZvcm0obG93ZXIsIHVwcGVyKSB7XHJcbiAgICByZXR1cm4gcmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlcikgKyBsb3dlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEV4cG9uZW50aWFsKGxhbWJkYSkge1xyXG4gICAgcmV0dXJuIC1NYXRoLmxvZyhNYXRoLnJhbmRvbSgpKSAvIGxhbWJkYTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5vcm1hbChtZWFuLCBzdGQpIHtcclxuICAgIGlmIChtZWFuID09IG51bGwpIHtcclxuICAgICAgICBtZWFuID0gMC4wO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0ZCA9PSBudWxsKSB7XHJcbiAgICAgICAgc3RkID0gMS4wO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuID0gTWF0aC5zcXJ0KC0yLjAgKiBNYXRoLmxvZygxLjAgLSBNYXRoLnJhbmRvbSgpKSkgKiBNYXRoLmNvcygyLjAgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKSk7XHJcbiAgICByZXR1cm4gbiAqIHN0ZCArIG1lYW47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQYXJldG8obWluaW11bSwgYWxwaGEpIHtcclxuICAgIHJldHVybiBtaW5pbXVtIC8gTWF0aC5wb3coKDEgLSBNYXRoLnJhbmRvbSgpKSwgMS4wIC8gYWxwaGEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gV2VpYnVsbChhbHBoYSwgYmV0YSkge1xyXG4gICAgcmV0dXJuIGFscGhhICogTWF0aC5wb3coLU1hdGgubG9nKDEuMCAtIHJhbmRvbSgpKSwgMS4wIC8gYmV0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUcmlhbmd1bGFyKGEsIGIsIG0pIHtcclxuICAgIHZhciBjID0gKG0gLSBhKSAvIChiIC0gYSksXHJcbiAgICAgICAgdSA9IHJhbmRvbSgpO1xyXG4gICAgaWYgKHUgPD0gYykge1xyXG4gICAgICAgIHJldHVybiBhICsgTWF0aC5zcXJ0KHUgKiAoYiAtIGEpICogKG0gLSBhKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KCgxIC0gdSkgKiAoYiAtIGEpICogKGIgLSBtKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBMb2dOb3JtYWwobWVhbiwgc3RkKSB7XHJcbiAgICByZXR1cm4gTWF0aC5leHAoTm9ybWFsKG1lYW4sIHN0ZCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1tYShhbHBoYSwgYmV0YSkge1xyXG4gICAgaWYgKGFscGhhID4gMS4wKSB7XHJcbiAgICAgICAgbGV0IGFpbnYgPSBNYXRoLnNxcnQoMi4wICogYWxwaGEgLSAxLjApLFxyXG4gICAgICAgICAgICBiYmIgPSBhbHBoYSAtIE1hdGgubG9nKDQuMCksXHJcbiAgICAgICAgICAgIGNjYyA9IGFscGhhICsgYWludjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXHJcbiAgICAgICAgICAgIGxldCB1MSA9IHJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh1MSA8IDFlLTcpIHx8ICh1ID4gMC45OTk5OTk5KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHUyID0gMS4wIC0gcmFuZG9tKCksXHJcbiAgICAgICAgICAgICAgICB2ID0gTWF0aC5sb2codTEgLyAoMS4wIC0gdTEpKSAvIGFpbnYsXHJcbiAgICAgICAgICAgICAgICB4ID0gYWxwaGEgKiBNYXRoLmV4cCh2KSxcclxuICAgICAgICAgICAgICAgIHogPSB1MSAqIHUxICogdTIsXHJcbiAgICAgICAgICAgICAgICByID0gYmJiICsgY2NjICogdiAtIHg7XHJcbiAgICAgICAgICAgIGlmICgociArIE1hdGgubG9nKDQuNSkgLSAzLjUgKiB6ID49IDAuMCkgfHwgKHIgPj0gTWF0aC5sb2coeikpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCAqIGJldGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGFscGhhID09IDEuMCkge1xyXG4gICAgICAgIGxldCB1ID0gcmFuZG9tKCk7XHJcbiAgICAgICAgd2hpbGUgKHUgPD0gMWUtNykge1xyXG4gICAgICAgICAgICB1ID0gcmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtTWF0aC5sb2codSkgKiBiZXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdSA9IHJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgYiA9IChNYXRoLkUgKyBhbHBoYSkgLyBNYXRoLkUsXHJcbiAgICAgICAgICAgICAgICBwID0gYiAqIHUsXHJcbiAgICAgICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICAgICAgaWYgKHAgPD0gMS4wKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5wb3cocCwgMS4wIC8gYWxwaGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeCA9IC1NYXRoLmxvZygoYiAtIHApIC8gYWxwaGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHUxID0gcmFuZG9tKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocCA+IDEuMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHUxIDw9IE1hdGgucG93KHgsIChhbHBoYSAtIDEuMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodTEgPD0gTWF0aC5leHAoLXgpKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geCAqIGJldGE7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vc3JjL3NkLXJhbmRvbSc7XG4iXX0=
