export const option = {
  geo: {
    map: 'shenzhen',
    left: '5%',
    right: '18%',
    top: 0,
    bottom: '10px',
    silent: true,
    itemStyle:{
      normal: {
        areaColor: '#277b97',
        shadowColor: '#075289',
        shadowBlur: 5,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      }
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
    type: 'map',
    map: 'shenzhen',
    left: '5%',
    right: '18%',
    top: 0,
    bottom: '10px',
    silent: false,
    itemStyle: {
      normal: {
        areaColor: '#277b97',
        borderColor: '#1cccff',
        borderWidth: 1.5
      }
    },
    label:{
      show: true,
      color: '#8be8f9',
      fontSize: 14,
    }
  },{
    name: '在线',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    silent: true,
    rippleEffect: { //涟漪特效
      period: 5, //动画时间，值越小速度越快
      brushType: 'stroke', //波纹绘制方式 stroke, fill
      scale: 3 //波纹圆环最大限制，值越大波纹越大
    },
    data: [],
  }, {
    name: '不在线',
    type: 'scatter',
    silent: true,
    coordinateSystem: 'geo',
    data: []
  }]
}