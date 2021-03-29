export const mapOption = {
  geo: {
    map: 'shenzhen',
    type: 'map',
    left: '5%',
    right: '20%',
    top: 0,
    bottom: 0,
    layoutCenter: ['50%', '50%'],
    itemStyle:{
      areaColor: '#277b97',
      borderColor: '#4aeff9',
      borderWidth: 1,
    },
    /*emphasis: {
      itemStyle: {
        areaColor: '#123555',
        shadowColor: '#000',
        shadowBlur: 10
      }
    },*/
    label:{
      show: true,
      color: '#8be8f9',
      fontSize: 14,
    }
  },
  visualMap: {
    type: 'piecewise',
    pieces: [{
      max: 2,
      min: 2,
      label: '在线',
      color: '#00ff33',
      symbol: 'circle'
    },
      {
        min: 3,
        max: 3,
        label: '预警',
        symbol: 'circle',
        color: '#f0953d'
      },
      {
        min: 1,
        max: 1,
        label: '不在线',
        symbol: 'circle',
        color: '#fff'
      },
      {
        min: 0,
        max: 0,
        label: '未接入',
        symbol: 'circle',
        color: '#c23c33'
      }
    ],
    color: '#fff',
    textStyle: {
      color: '#fff',
    },
    itemSymbol: 'circle', // 无效，需单独设置每个pieces对象
    top: 0,
    right: 0,
    left: 'center',
    orient: 'horizontal',
    visibility: 'off'
  },
  series: [{
    name: '食堂/餐饮',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: [],
  }]
}