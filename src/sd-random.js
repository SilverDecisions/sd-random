
var menu_list = ["random()", "uniform(0.25,0.75)","exponential(5.0),1.0","normal(0.5,0.1)","pareto(0.1,10)","weibull(0.5,5)","triangular(0.0,1.0,0.6)","lognormal(-1,0.2)","gamma(1,2)"]



random = Math.random


function uniform (lower, upper) {
    return Math.random() * (upper-lower) + lower;
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

    n = Math.sqrt(-2.0 * Math.log(1.0 - Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
    return n * std + mean;
}

function pareto(minimum,alpha) {
    return minimum / Math.pow((1 - Math.random()), 1.0 / alpha);
}

function weibull(alpha, beta) {
    return alpha * Math.pow(-Math.log(1.0 - this.random()), 1.0 / beta);
}

function triangular(a, b, m) {
	c = (m - a) / (b - a);
	u = Math.random()
	if (u <= c) {
		return a + Math.sqrt(u * (b - a) * (m - a));
	} else {
		return b - Math.sqrt((1 - u) * (b - a) * (b - m));
	}
}


function lognormal(mean, std) {
    return Math.exp(normal(mean,std))
}


function gamma(alpha, beta) {

    if (alpha > 1.0) {
      ainv = Math.sqrt(2.0 * alpha - 1.0);
      bbb = alpha - Math.log(4.0);
      ccc = alpha + ainv;

      while (true) {  // eslint-disable-line no-constant-condition
        u1 = this.random();

        if ((u1 < 1e-7) || (u > 0.9999999)) {
          continue;
        }
        u2 = 1.0 - this.random();
        v = Math.log(u1 / (1.0 - u1)) / ainv;
        x = alpha * Math.exp(v);
        z = u1 * u1 * u2;
        r = bbb + ccc * v - x;
        if ((r + Math.log(4.5) - 3.5 * z >= 0.0) || (r >= Math.log(z))) {
          return x * beta;
        }
      }
    } else if (alpha == 1.0) {
      u = this.random();
      while (u <= 1e-7) {
        u = this.random();
      }
      return -Math.log(u) * beta;
    } else {
      while (true) {  
        u = this.random();
        b = (Math.E + alpha) / Math.E;
        p = b * u;
        x=0;
        if (p <= 1.0) {
          x = Math.pow(p, 1.0 / alpha);
        } else {
          x = -Math.log((b - p) / alpha);
        }
        const u1 = this.random();

        if (p > 1.0) {
          if (u1 <= Math.pow(x, (alpha - 1.0))) {
            break;
          }
        } else if (u1 <= Math.exp(-x)) {
          break;
        }
      }
      return x * beta;
    }

}



for (var i = 0; i < menu_list.length; i++) {
	console.log(menu_list[i]+" "+eval(menu_list[i]))
}

