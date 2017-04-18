export const menuList = ["random()", "uniform(0.25,0.75)", "exponential(5.0)", "normal(0.5,0.1)", "pareto(0.1,10)", "weibull(0.5,5)", "triangular(0.0,1.0,0.6)", "lognormal(-1,0.2)", "gamma(1,2)"];

export const functionNameList = ["uniform", "exponential", "normal", "pareto", "weibull", "triangular", "lognormal", "gamma"];

export const random = Math.random;

export function uniform(lower, upper) {
    return random() * (upper - lower) + lower;
}

export function exponential(lambda) {
    return -Math.log(Math.random()) / lambda;
}

export function normal(mean, std) {
    if (mean == null) {
        mean = 0.0;
    }
    if (std == null) {
        std = 1.0;
    }

    let n = Math.sqrt(-2.0 * Math.log(1.0 - Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
    return n * std + mean;
}

export function pareto(minimum, alpha) {
    return minimum / Math.pow((1 - Math.random()), 1.0 / alpha);
}

export function weibull(alpha, beta) {
    return alpha * Math.pow(-Math.log(1.0 - random()), 1.0 / beta);
}

export function triangular(a, b, m) {
    var c = (m - a) / (b - a),
        u = random();
    if (u <= c) {
        return a + Math.sqrt(u * (b - a) * (m - a));
    } else {
        return b - Math.sqrt((1 - u) * (b - a) * (b - m));
    }
}

export function lognormal(mean, std) {
    return Math.exp(normal(mean, std))
}

export function gamma(alpha, beta) {
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
        while (true) {
            let u = random(),
                b = (Math.E + alpha) / Math.E,
                p = b * u,
                x = 0;
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


