export const menuList = ["Uniform(0.0,1.0)", "Exponential(1.0)",
                         "Normal(0.0,1.0)", "Pareto(1.0,1.0)",
                         "Weibull(1.0,1.0)", "Triangular(0.0,1.0,0.5)",
                         "Trapezoidal(0.0,1.0,0.25,0.75)",
                         "LogNormal(0.0,1.0)", "Gamma(1.0,1.0)",
                         "Loglogistic(1.0,0.5)","Erlang(4,0.5)",
                         "Bernoulli(0.5)","Binomial(2,0.5)",
                         "Geometric(0.5)", "Poisson(2)"];

export const functionNameList = ["Uniform", "Exponential",
                                 "Normal", "Pareto",
                                 "Weibull", "Triangular",
                                 "Trapezoidal",
                                 "LogNormal", "Gamma",
                                 "Loglogistic","Erlang",
                                 "Bernoulli","Binomial",
                                 "Geometric", "Poisson"];


export const random = Math.random;

/**
 * Uniform distribution implementation.
 * More details at A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 452
 * @param a lower bound
 * @param b upper bound, b >= a
 * @returns Uniform distributed random value
 */
export function Uniform(a, b) {
    if (a == null) a = 0.0;
    if (b == null) b = 1.0;
	if (b < a) return NaN;
    return a + (b - a)*Math.random();
}

/**
 * Exponential distribution mplementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 452 
 * @param beta shape parameter, beta > 0,  lambda = 1/beta. For exponential distribution beta is equal to the mean.
 * @returns Exponentially distributed random value
 */
export function Exponential(beta) {
	if (beta==null) beta == 1;
	if (beta<=0) return NaN;	
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
export function Normal(mean, std) {
    if (mean == null) mean = 0.0;
    if (std == null) std = 1.0;
    if (std < 0) return NaN;

    let n = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
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
export function Pareto(alpha, minimum) {
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
export function Loglogistic(alpha, beta) {
	if (alpha == null) alpha = 1.0;
	if (beta == null) beta = 1.0;
	if (beta <= 0 || alpha <= 0) return NaN;
	var u = Math.random();
	return beta * Math.pow(u/(1-u), 1/alpha);	
}


/**
 * Weibull distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 456
 * @param alpha shape parameter, alpha > 0
 * @param beta scale parameter, beta > 0
 * @returns Weibull distributed random value
 */
export function Weibull(alpha, beta) {
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
export function Erlang(k, beta) {
	if (k == null) k = 1;
	if (beta == null) beta = 1.0;
	var m = k | 0;
	if (beta <= 0 || m <= 0) return NaN;
	var mult = 1.0;
	for (var i=0;i<m;i++) {
		mult *= Math.random();
	}
    return -beta/m*Math.log(mult);
}


/**
 * Triangular distribution implementation
 * @param a left side
 * @param b right side, b >= a
 * @param m triangle peak (mode), a <= m <= b
 * @returns Triangular distributed random value
 */
export function Triangular(a, b, m) {
    if (a == null) a = 0.0;
    if (b == null) b = 1.0;
    if (m == null) m = 0.5;
    if (a>b || m < a || m > b) return NaN;
	if (a==b) return a;
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
export function Trapezoidal(a, b, c, d) {
    if (a == null) a = 0.0;
    if (b == null) b = 1.0;
    if (c == null) c = 0.25;
    if (d == null) d = 0.75;
    if (a > b || c < a || c > d || d > b) return NaN;
	if (a==b) return a;
    var p1 = (c - a) / ( (b - a)+(d - c));
    var p2 = (b - d) / ( (b - a)+(d - c));
    var p = Math.random();
    
    if (p <= p1) {
        return a + Math.sqrt(p * ((b - a)+(d - c)) * (c - a) );
    } else if (p > 1-p2) {
        return b - Math.sqrt((1 - p) * ((b - a)+(d - c)) * (b - d));
    } else {
    	return c + (d-c)*(p-p1)/(1.0 - p1 - p2);
    }
}

/**
 * Lognormal distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 458
 * @param mean mean value
 * @param std standard deviation
 * @returns Lognormally distributed random value
 */
export function LogNormal(mean, std) {
    if (mean == null) mean = 0.0;
    if (std == null) std = 1.0;
    if (std < 0) return NaN;
    return Math.exp(Normal(mean, std))
}



/**
 * Bernoulli distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 464
 * @param p probability of 1
 * @returns Bernoulli distributed random value (zero or one)
 */
export function Bernoulli(p) {
	if (p==null) p = 0.5;
	if (p<0.0 | p > 1.0) return NaN;
    if (Math.random()<=p)
    	return 1;
    else 
    	return 0;
}


/**
 * Binomial distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 469
 * @param n number of trials
 * @param p success probability in each trial
 * @returns Binomial distributed random value (0,1,...,n)
 */
export function Binomial(n,p) {
	if (n==null) n = 1;
	if (p==null) p = 0.5;	
	var t = n | 0;
	if ( p < 0.0 | p > 1.0 | t <= 0) return NaN;
	var sum = 0;
	for (var i=0;i<t;i++) {
		sum += Bernoulli(p);
	}
    return sum;
}

/**
 * Geometric distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 469
 * @param p success probability 
 * @returns Geometric distributed random value 
 */
export function Geometric(p) {
	if (p==null) p = 0.5;	
	if ( p <= 0.0 | p >= 1.0 ) return NaN;	
    return Math.floor(Math.log(Math.random())/Math.log(1-p) ) | 0;
}

/**
 * Poisson distribution implementation based on A.Law "Simulation Modelling and Analysis", 5e, Mc Graw-Hill, 2015, p. 470
 * @param lambda mean value 
 * @returns Poisson distributed random value 
 */
export function Poisson(lambda) {
	if (lambda==null) lambda = 1.0;	
	if ( lambda <= 0.0 ) return NaN;	
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
export function Gamma(alpha, beta) {
	if (alpha == null) alpha = 1.0;
	if (beta == null) beta = 1.0;
    if (alpha > 1.0) {
        let ainv = Math.sqrt(2.0 * alpha - 1.0),
            bbb = alpha - Math.log(4.0),
            ccc = alpha + ainv;

        while (true) {  // eslint-disable-line no-constant-condition
            let u1 = random();

            if ((u1 < 1e-7) || (u > 0.9999999)) {
                continue;
            }
            let u2 = 1.0 - random(),
                v = Math.log(u1 / (1.0 - u1)) / ainv,
                x = alpha * Math.exp(v),
                z = u1 * u1 * u2,
                r = bbb + ccc * v - x;
            if ((r + Math.log(4.5) - 3.5 * z >= 0.0) || (r >= Math.log(z))) {
                return x * beta;
            }
        }
    } else if (alpha == 1.0) {
        let u = random();
        while (u <= 1e-7) {
            u = random();
        }
        return -Math.log(u) * beta;
    } else {
        let x;
        while (true) {
            let u = random(),
                b = (Math.E + alpha) / Math.E,
                p = b * u;
            if (p <= 1.0) {
                x = Math.pow(p, 1.0 / alpha);
            } else {
                x = -Math.log((b - p) / alpha);
            }
            const u1 = random();

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
