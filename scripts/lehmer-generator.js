function lehmer(a, m, R, n) {
    let currentR = R;
    let result = new Array(n);
    for (let i = 0; i < n; i++) {
        currentR = (a * currentR) % m;
        result[i] = currentR / m;
    }
    return result;
}

function checkUniformity(result) {
    const n = result.length;
    const k = 20;
    const xMax = Math.max(...result);
    const xMin = Math.min(...result);
    const r = xMax - xMin;
    const intervalLength = r / k;

    let frequencies = [];
    for (let i = xMin; i <= xMax; i += intervalLength) {
        let count = 0
        for (let j = 0; j < result.length; j++) {
            count += result[j] >= i && result[j] < i + intervalLength ? 1 : 0;
        }
        frequencies.push(count / n);
    }
    return frequencies;
}


function calculateExpectedValue(result) {
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        sum += result[i];
    }
    return sum / result.length;
}

function calculateDispersion(result) {
    const m = calculateExpectedValue(result)
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        sum += Math.pow(result[i] - m, 2);
    }
    return sum / result.length;
}

function calculateRootMeanSquare(dispersion) {
    return Math.sqrt(dispersion);
}


function calculationHitFrequency(result) {
    let K = 0;
    for (let i = 0; i < result.length; i += 2) {
        K += (Math.pow(result[i], 2) + Math.pow(result[i + 1], 2) < 1) ? 1 : 0;
    }
    return (2 * K) / result.length;
}

function calculatePeriod(result) {
    for (let i = result.length - 2; i > 0; i--) {
        if (result[result.length - 1] === result[i]) {
            return result.length - 1 - i;
        }
    }
}

function calculateAperiodicity(result, P) {
    for (let i = 0; i < result.length; i++) {
        if (result[i] === result[i + P]) {
            return i + P;
        }
    }
}