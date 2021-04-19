export const barOption = {
  grid: {
    left: '3%',
    right: 0,
    bottom: '3%',
    top: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    type: 'category',
    inverse: true,
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      fontSize: 16
    },
    data: []
  },
  series: [{
    name: '',
    type: 'bar',
    stack: '1',
    label: {
      normal: {
        show: true,
        position: 'insideLeft'
      }
    },
    barGap: '15%',
    itemStyle: {
      normal: {
        color: '#00c800'
      }
    },
    data: []
  },{
    name: '',
    type: 'bar',
    stack: '1',
    label: {
      normal: {
        show: true,
        position: 'inside'
      }
    },
    barGap: '15%',
    itemStyle: {
      normal: {
        color: '#f95252'
      }
    },
    data: []
  },{
    name: '',
    type: 'bar',
    stack: '1',
    label: {
      normal: {
        show: true,
        position: 'right'
      }
    },
    barCategoryGap: '40%',
    itemStyle: {
      normal: {
        color: '#69a2f6'
      }
    },
    data: []
  }, {
    name: '',
    type: 'bar',
    stack: '1',
    label: {
      normal: {
        show: true,
        position: 'right'
      }
    },
    barCategoryGap: '40%',
    itemStyle: {
      normal: {
        color: '#2a3400'
      }
    },
    data: []
  },{
    name: '',
    type: 'bar',
    stack: '1',
    label: {
      normal: {
        show: true,
        position: 'right'
      }
    },
    barCategoryGap: '40%',
    itemStyle: {
      normal: {
        color: '#0567f6'
      }
    },
    data: []
  }]
}