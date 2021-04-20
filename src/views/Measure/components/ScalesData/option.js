import echarts from 'echarts'
export const scalesOption = {
  legend: {
    data: ['市场数', '异常数', '秤总数'],
    textStyle: {
      color: 'white'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: [],
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
      axisLine: {
        show: false
      },
      axisLabel: {
        color: "#7BB2F6",
        //formatter: '{value} ml'
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
      data: []
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
      data: []
    },
    {
      name: '秤总数',
      type: 'line',
      //yAxisIndex: 1,
      smooth: true,
      itemStyle: {
        color: '#ffba14'
      },
      data: []
    }
  ]
}