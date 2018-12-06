import Highcharts from 'highcharts'

class OutgoChart {

  constructor (elemId) {
    Highcharts.chart(elemId, {
      title: { text: '' },
      
      xAxis: {
        categories: ['1 мая', '2 мая', '3 мая', '4 мая', '5 мая', '6 мая', '7 мая', '8 мая']
      },
      
      yAxis: {
        title: { text: 'м³' }
      },
      
      series: [
        {
          name: 'Расход',
          data: [200000, 220000, 235000, 248000, 260000, 281000, 300000, 324000],
          marker: { radius: 6 },
          color: '#07f'
        }
      ],

      tooltip: {
        headerFormat: '{point.x}<br>',
        pointFormat: '{point.y} м³',
        shared: true
      }
    });
  }

}

export default OutgoChart