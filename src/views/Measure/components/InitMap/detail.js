export const detailOption = {
  geo: {
    map: '',
    silent: true,
    layoutCenter: ['45%', '50%'],
    layoutSize: 580,
    itemStyle:{
      normal: {
        areaColor: '#277b97',
        shadowColor: '#075289',
        shadowBlur: 5,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
    },
    label:{
      show: true,
      color: '#8be8f9',
      fontSize: 14,
    }
  },
  visualMap: {
    type: 'piecewise',
    pieces: [
      {
        min: 0,
        max: 0,
        label: '未接入',
        symbol: 'circle',
        color: '#9a9a9a'
      },{
        min: 1,
        max: 1,
        label: '不在线',
        symbol: 'circle',
        color: '#ffffff'
      },{
        max: 2,
        min: 2,
        label: '在线',
        color: '#00ff33',
        symbol: 'circle'
      },{
        min: 3,
        max: 3,
        label: '预警',
        symbol: 'circle',
        color: '#ffd600'
      },{
        min: 4,
        max: 4,
        label: '报警',
        symbol: 'circle',
        color: '#fc0000'
      },
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
    name: '未接入',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: []
  }, {
    name: '不在线',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: []
  }, {
    name: '在线',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    silent: false,
    rippleEffect: {
      period: 5,
      brushType: 'stroke',
      scale: 3
    },
    emphasis: {
      label: {
        show: true,
        position: 'right',
        backgroundColor: 'rgba(5,104,151,.6)',
        padding: [5,10],
        borderRadius: 3,
        borderColor: '#5bd5ef',
        borderWidth: 1,
        lineHeight: 25,
        color: '#ffffff',
        formatter: function(params) {
          return '{title|'+params.data.title +'}\n' +
            '{key|档口数：}{value|'+params.data.stallNum +'}\n' +
            '{key|交易数：}{value|'+params.data.tradeQty +'}\n' +
            '{key|交易额：}{value|'+params.data.turnover+'}\n' +
            '{key|器具总数：}{value|'+params.data.deviceNum+'}'
        },
        rich: {
          title: {
            padding: [0, 0, 5, 0],
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ffffff'
          },
          key: {
            color: '#ffffff',
            fontSize: 14,
          },
          value: {
            color: '#ffc740',
            fontSize: 14,
          }
        }
      }
    },
    data: [],
  },{
    name: '预警',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: []
  },{
    name: '报警',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: []
  }]
}