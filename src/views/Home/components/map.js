export const mapOption = {
  geo: {
    map: 'shenzhen',
    type: 'map',
    silent: true,
    aspectScale: 0.95,
    layoutCenter: ['43%', '50%'],
    layoutSize: 850,
    itemStyle:{
      borderColor: '#27aee3',
      borderWidth: 1,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      // shadowBlur: 10,
      // shadowOffsetX: 3,
      // shadowOffsetY: 5,
      // option: 1,
    },
    label:{
      show: true,
      color: '#004075',
      fontSize: 12,
    }
  },
  visualMap: {
    type: 'piecewise',
    pieces: [{
      max: 30,
      label: '安全',
      color: '#2c9a42'
    },
      {
        min: 30,
        max: 60,
        label: '警告',
        color: '#d08a00'
      },
      {
        min: 60,
        label: '危险',
        color: '#c23c33'
      },
    ],
    color: '#fff',
    textStyle: {
      color: '#fff',
    },
    top: 0,
    right: 0,
    orient: 'horizontal',
    visibility: 'off'
  },
  series: [{
    name: '测试',
    type: 'map',
    geoIndex: 0,
    data: []
  },{
    type: 'scatter',
    coordinateSystem: 'geo',
    name: '食堂/餐饮',
    data: [],
    symbolSize: 8,
    itemStyle: {
      normal: '#00ff33'
    }
  }]
}