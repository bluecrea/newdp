import echarts from 'echarts'
export const scalesOption = {
  legend: {
    data: ['市场数', '异常数', '秤总数'],
    textStyle: {
      color: 'white'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['罗湖区', '福田区', '南山区', '宝安区', '光明区', '龙岗区', '龙华区', '盐田区', '坪山区', '大鹏区', '前海', '深汕'],
      axisPointer: {
        type: 'shadow'
      },
      axisLine: {
        lineStyle: {
          color: '#7BB2F6'
        }
      },
      axisLabel: {
        color: '#7BB2F6'
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '市场数',
      min: 0,
      max: 250,
      interval: 50,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: "#7BB2F6",
        //formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: '秤总数',
      min: 0,
      max: 25,
      interval: 5,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: "#7BB2F6",
        //formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: '市场数',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0],
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [{offset: 0, color: '#35b5e9'}, {offset: 1, color: '#214ced'}]
        )
      },
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '异常数',
      type: 'bar',
      barCategoryGap: '1%',
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0],
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [{offset: 0, color: '#67ead9'}, {offset: 1, color: '#15c570'}]
        )
      },
      barWidth: 15,
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '秤总数',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      itemStyle: {
        color: '#ffba14'
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
}