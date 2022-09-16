function initValues() {
    const a = document.getElementById('a').value;
    const m = document.getElementById('m').value;
    const R = document.getElementById('R').value;
    const n = 20000;
    showChart(checkUniformity(lehmer(a, m, R, n)));
    showEstimates(a, m, R);
}

function showChart(resultUniformity) {
    const data = {
        labels: Array.from(Array(20).keys()),
        datasets: [{
            label: 'Frequency',
            data: resultUniformity,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Lehmer Generator'
                }
            }
        },
    };

    const lehmerChart = new Chart(
        document.getElementById('lehmer-chart'),
        config, data
    );
}

function showEstimates(a, m, R) {
    const n1 = 20000;
    const n2 = 2000000;
    const result = lehmer(a, m, R, n1);
    const resultP = lehmer(a, m, R, n2);
    const D = calculateDispersion(result);
    const P = calculatePeriod(resultP);

    document.getElementById('expected-value').innerText = 'm = ' + calculateExpectedValue(result);
    document.getElementById('dispersion').innerText = 'D = ' + D;
    document.getElementById('root-mean-square').innerText = 'σ ̃ = ' + calculateRootMeanSquare(D)
    document.getElementById('hit-frequency').innerText = '2K/N = ' + calculationHitFrequency(result);
    document.getElementById('period').innerText = 'Period = ' + P;
    document.getElementById('aperiodicity').innerText = 'Aperiodicity = ' + calculateAperiodicity(resultP, P);
}

//values for init
//51133, 252101, 51133