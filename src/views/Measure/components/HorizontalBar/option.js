export const barOption = {
  grid: {
    left: '3%',
    right: 0,
    bottom: '3%',
    top: '5%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
        color: '#fcc500'
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
        position: 'insideLeft'
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
        position: 'insideLeft'
      }
    },
    barCategoryGap: '40%',
    itemStyle: {
      normal: {
        color: '#b8b8b8'
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
        position: 'insideLeft'
      }
    },
    barCategoryGap: '40%',
    itemStyle: {
      normal: {
        color: '#ff2525'
      }
    },
    data: []
  }]
}