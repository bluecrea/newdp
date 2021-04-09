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
    data: ['罗湖', '福田', '南山', '宝安', '光明', '龙岗', '龙华', '盐田', '坪山', '大鹏', '前海', '深汕']
  },
  series: [{
    name: '正常',
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
    data: [320, 302, 301, 334, 390, 330, 320, 36, 69, 562, 150, 300]
  },{
    name: '预警',
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
    data: [20, 13, 10, 34, 90, 30, 10, 8, 12, 5, 7, 12]
  },{
    name: '不在线',
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
    data: [8, 23, 15, 14, 10, 3, 1, 8, 2, 5, 7, 2]
  }]
}