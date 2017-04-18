(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.SilverDecisions || (g.SilverDecisions = {})).Random = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            _x = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNkLXJhbmRvbS5qcyIsInN0YW5kYWxvbmUuaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRLEFDWWdCLFUsQUFBQTtRLEFBSUEsYyxBQUFBO1EsQUFJQSxTLEFBQUE7USxBQVlBLFMsQUFBQTtRLEFBSUEsVSxBQUFBO1EsQUFJQSxhLEFBQUE7USxBQVVBLFksQUFBQTtRLEFBSUEsUSxBQUFBO0FBdERULElBQU0sOEJBQVcsQ0FBQSxBQUFDLG9CQUFELEFBQXFCLG9CQUFyQixBQUNDLG1CQURELEFBQ29CLG1CQURwQixBQUVDLG9CQUZELEFBRXFCLDJCQUZyQixBQUdDLHNCQUhsQixBQUFpQixBQUd1Qjs7QUFFeEMsSUFBTSw4Q0FBbUIsQ0FBQSxBQUFDLFdBQUQsQUFBWSxlQUFaLEFBQ0MsVUFERCxBQUNXLFVBRFgsQUFFQyxXQUZELEFBRVksY0FGWixBQUdDLGFBSDFCLEFBQXlCLEFBR2M7O0FBRXZDLElBQU0sMEJBQVMsS0FBZixBQUFvQjs7QUFFcEIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsT0FBakIsQUFBd0IsT0FBTyxBQUNsQztXQUFPLFlBQVksUUFBWixBQUFvQixTQUEzQixBQUFvQyxBQUN2Qzs7O0FBRU0sU0FBQSxBQUFTLFlBQVQsQUFBcUIsUUFBUSxBQUNoQztXQUFPLENBQUMsS0FBQSxBQUFLLElBQUksS0FBVixBQUFDLEFBQVMsQUFBSyxZQUF0QixBQUFrQyxBQUNyQzs7O0FBRU0sU0FBQSxBQUFTLE9BQVQsQUFBZ0IsTUFBaEIsQUFBc0IsS0FBSyxBQUM5QjtRQUFJLFFBQUosQUFBWSxNQUFNLEFBQ2Q7ZUFBQSxBQUFPLEFBQ1Y7QUFDRDtRQUFJLE9BQUosQUFBVyxNQUFNLEFBQ2I7Y0FBQSxBQUFNLEFBQ1Q7QUFFRDs7UUFBSSxJQUFJLEtBQUEsQUFBSyxLQUFLLENBQUEsQUFBQyxNQUFNLEtBQUEsQUFBSyxJQUFJLE1BQU0s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S0FBSixBQUFTLEtBQUssQUFDVjtxQkFBSSxLQUFBLEFBQUssSUFBTCxBQUFTLEdBQUcsTUFBaEIsQUFBSSxBQUFrQixBQUN6QjtBQUZELG1CQUVPLEFBQ0g7cUJBQUksQ0FBQyxLQUFBLEFBQUssSUFBSSxDQUFDLElBQUQsQUFBSyxLQUFuQixBQUFLLEFBQW1CLEFBQzNCO0FBQ0Q7Z0JBQU0sTUFBTixBQUFXLEFBRVg7O2dCQUFJLElBQUosQUFBUSxLQUFLLEFBQ1Q7b0JBQUksT0FBTSxLQUFBLEFBQUssSUFBTCxBQUFTLElBQUksUUFBdkIsQUFBVSxBQUFxQixNQUFPLEFBQ2xDO0FBQ0g7QUFDSjtBQUpELG1CQUlPLElBQUksT0FBTSxLQUFBLEFBQUssSUFBSSxDQUFuQixBQUFVLEFBQVUsS0FBSSxBQUMzQjtBQUNIO0FBQ0o7QUFDRDtlQUFPLEtBQVAsQUFBVyxBQUNkO0FBRUo7Ozs7Ozs7Ozs7OztBQzFHRCw4Q0FBQTtpREFBQTs7Z0JBQUE7d0JBQUE7dUJBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjb25zdCBtZW51TGlzdCA9IFtcIlVuaWZvcm0oMC4wLDEuMClcIiwgXCJFeHBvbmVudGlhbCgxLjApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIk5vcm1hbCgwLjAsMS4wKVwiLCBcIlBhcmV0bygxLjAsMS4wKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJXZWlidWxsKDEuMCwxLjApXCIsIFwiVHJpYW5ndWxhcigwLjAsMS4wLDAuNSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nTm9ybWFsKDAuMCwxLjApXCIsIFwiR2FtbWEoMS4wLDEuMClcIl07XHJcblxyXG5leHBvcnQgY29uc3QgZnVuY3Rpb25OYW1lTGlzdCA9IFtcIlVuaWZvcm1cIiwgXCJFeHBvbmVudGlhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5vcm1hbFwiLCBcIlBhcmV0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldlaWJ1bGxcIiwgXCJUcmlhbmd1bGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9nTm9ybWFsXCIsIFwiR2FtbWFcIl07XHJcblxyXG5leHBvcnQgY29uc3QgcmFuZG9tID0gTWF0aC5yYW5kb207XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVW5pZm9ybShsb3dlciwgdXBwZXIpIHtcclxuICAgIHJldHVybiByYW5kb20oKSAqICh1cHBlciAtIGxvd2VyKSArIGxvd2VyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRXhwb25lbnRpYWwobGFtYmRhKSB7XHJcbiAgICByZXR1cm4gLU1hdGgubG9nKE1hdGgucmFuZG9tKCkpIC8gbGFtYmRhO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTm9ybWFsKG1lYW4sIHN0ZCkge1xyXG4gICAgaWYgKG1lYW4gPT0gbnVsbCkge1xyXG4gICAgICAgIG1lYW4gPSAwLjA7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RkID09IG51bGwpIHtcclxuICAgICAgICBzdGQgPSAxLjA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG4gPSBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKDEuMCAtIE1hdGgucmFuZG9tKCkpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiBNYXRoLnJhbmRvbSgpKTtcclxuICAgIHJldHVybiBuICogc3RkICsgbWVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBhcmV0byhtaW5pbXVtLCBhbHBoYSkge1xyXG4gICAgcmV0dXJuIG1pbmltdW0gLyBNYXRoLnBvdygoMSAtIE1hdGgucmFuZG9tKCkpLCAxLjAgLyBhbHBoYSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBXZWlidWxsKGFscGhhLCBiZXRhKSB7XHJcbiAgICByZXR1cm4gYWxwaGEgKiBNYXRoLnBvdygtTWF0aC5sb2coMS4wIC0gcmFuZG9tKCkpLCAxLjAgLyBiZXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRyaWFuZ3VsYXIoYSwgYiwgbSkge1xyXG4gICAgdmFyIGMgPSAobSAtIGEpIC8gKGIgLSBhKSxcclxuICAgICAgICB1ID0gcmFuZG9tKCk7XHJcbiAgICBpZiAodSA8PSBjKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQodSAqIChiIC0gYSkgKiAobSAtIGEpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGIgLSBNYXRoLnNxcnQoKDEgLSB1KSAqIChiIC0gYSkgKiAoYiAtIG0pKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIExvZ05vcm1hbChtZWFuLCBzdGQpIHtcclxuICAgIHJldHVybiBNYXRoLmV4cChOb3JtYWwobWVhbiwgc3RkKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbW1hKGFscGhhLCBiZXRhKSB7XHJcbiAgICBpZiAoYWxwaGEgPiAxLjApIHtcclxuICAgICAgICBsZXQgYWludiA9IE1hdGguc3FydCgyLjAgKiBhbHBoYSAtIDEuMCksXHJcbiAgICAgICAgICAgIGJiYiA9IGFscGhhIC0gTWF0aC5sb2coNC4wKSxcclxuICAgICAgICAgICAgY2NjID0gYWxwaGEgKyBhaW52O1xyXG5cclxuICAgICAgICB3aGlsZSAodHJ1ZSkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cclxuICAgICAgICAgICAgbGV0IHUxID0gcmFuZG9tKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHUxIDwgMWUtNykgfHwgKHUgPiAwLjk5OTk5OTkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdTIgPSAxLjAgLSByYW5kb20oKSxcclxuICAgICAgICAgICAgICAgIHYgPSBNYXRoLmxvZyh1MSAvICgxLjAgLSB1MSkpIC8gYWludixcclxuICAgICAgICAgICAgICAgIHggPSBhbHBoYSAqIE1hdGguZXhwKHYpLFxyXG4gICAgICAgICAgICAgICAgeiA9IHUxICogdTEgKiB1MixcclxuICAgICAgICAgICAgICAgIHIgPSBiYmIgKyBjY2MgKiB2IC0geDtcclxuICAgICAgICAgICAgaWYgKChyICsgTWF0aC5sb2coNC41KSAtIDMuNSAqIHogPj0gMC4wKSB8fCAociA+PSBNYXRoLmxvZyh6KSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ICogYmV0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoYWxwaGEgPT0gMS4wKSB7XHJcbiAgICAgICAgbGV0IHUgPSByYW5kb20oKTtcclxuICAgICAgICB3aGlsZSAodSA8PSAxZS03KSB7XHJcbiAgICAgICAgICAgIHUgPSByYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC1NYXRoLmxvZyh1KSAqIGJldGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCB4O1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCB1ID0gcmFuZG9tKCksXHJcbiAgICAgICAgICAgICAgICBiID0gKE1hdGguRSArIGFscGhhKSAvIE1hdGguRSxcclxuICAgICAgICAgICAgICAgIHAgPSBiICogdTtcclxuICAgICAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICBpZiAocCA8PSAxLjApIHtcclxuICAgICAgICAgICAgICAgIHggPSBNYXRoLnBvdyhwLCAxLjAgLyBhbHBoYSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gLU1hdGgubG9nKChiIC0gcCkgLyBhbHBoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdTEgPSByYW5kb20oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwID4gMS4wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodTEgPD0gTWF0aC5wb3coeCwgKGFscGhhIC0gMS4wKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1MSA8PSBNYXRoLmV4cCgteCkpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4ICogYmV0YTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvc2QtcmFuZG9tJztcbiJdfQ==
