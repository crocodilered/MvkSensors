import Highcharts from 'highcharts'

class PressureChart {

  constructor (elem) {
    Highcharts.chart(elem, {
      title: { text: '' },
      
      xAxis: {
        categories: ['1 мая', '2 мая', '3 мая', '4 мая', '5 мая', '6 мая', '7 мая', '8 мая']
      },
      
      yAxis: {
        title: { text: 'кПа' },
      },
      
      series: [{
        name: 'Давление',
        data: [7, 7.1, 7.2, 7.1, 6.9, 7, 7, 7.1],
        marker: { radius: 6 },
        color: '#0c6'
      }],

      tooltip: {
        headerFormat: '{point.x}<br>',
        pointFormat: '{point.y} кПа',
        shared: true
      },

      responsive: {
        rules: [{
          condition: {
              maxHeight: 200
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
        }]
      }
    })
  }

}

export default PressureChart