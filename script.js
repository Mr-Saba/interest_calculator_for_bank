var amount = document.querySelector('#amount'),
    investment_rate = document.querySelector('#investment_rate'),
    investment_time = document.querySelector('#investment_time'),
    future_value = document.querySelector('#future_value'),
    principal = document.querySelector('#principal'),
    interest = document.querySelector('#interest'),
    button = document.getElementById('button')
    
    var size = document.body.clientWidth > 400 ? true : false;

function getChartData() {
    var a = parseFloat(amount.value)
    var i_r = parseFloat(investment_rate.value)
    var t = parseInt(investment_time.value),

    currentYear = (new Date()).getFullYear();
    
    var labels = [];
    
    for (var year = currentYear; year < currentYear + t; year++) {
        labels.push(year);
    }
    
    var principal_dataset = {
        label: 'Total Principal',
        backgroundColor: '#b01eb3',
        data: []
    };
    
    var interest_dataset = {
        label: "Total Interest",
        backgroundColor: 'rgb(197, 197, 197)',
        data: []
    };
    
    var won = 0
    var u = 0;
    principal.innerHTML = a + ' €';
    future_value.innerHTML = a;
    for (var i = 1; i <= t; i++) {
        principal_dataset.data.push(a);
    }
    for (var i = 1; i <= t; i++) {
        u = a + ( a * i_r * i)
        won = parseInt(u -a) 
        a = parseInt(u);
        interest_dataset.data.push(won);
        interest.innerHTML = won  + ' €';
    }
    future_value.innerHTML = parseInt(future_value.innerHTML) + won + ' €';
    return {
        labels: labels,
        datasets: [principal_dataset, interest_dataset]
    }
}
function updateChart() {
        var data = getChartData();
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.datasets[0].data;
        chart.data.datasets[1].data = data.datasets[1].data;
        chart.update();
    }

    button.addEventListener('click', function () {
        updateChart()
    })

const ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: getChartData(),
    options: {
            legend: {
                display: false
            },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
                scaleLabel: {
                    display: size,
                    labelString: 'Year'
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: function (value) {
                        return value + ' €';
                    }
                },
                scaleLabel: {
                    display: size,
                    labelString: 'Balance'
                }
            }]
        }
    }
})
