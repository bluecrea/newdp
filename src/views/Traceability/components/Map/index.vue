<template>
  <div class="map-con" id="map"/>
</template>
<script>
import { getAreaMarketInfo, getOnMap } from '@/utils/api'
import echarts from 'echarts'

export default {
  name: 'traceabilityMap',
  props: {
    mapOpsData: {
      type: Array
    }
  },
  setup() {
    const options = {
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
      series:[{
        type: 'map',
        map: 'shenzhen',
        left: '5%',
        right: '18%',
        top: 0,
        bottom: '10px',
        silent: true,
        itemStyle: {
          normal: {
            areaColor: '#277b97',
            borderColor: '#1cccff',
            borderWidth: 1.5
          }
        },
        data: [],
        label:{
          normal: {
            show: true,
            formatter: (params) => {
              console.log(params.data)
              if (params.data) {
                return '{name|'+params.data.name+'}\n{marketTotal|市场数：'+ params.data.value[0]+'}\n' +
                    '{deviceTotal|秤总数:'+params.data.value[1]+'}'
              }

              /*return  '{name|'+ params.name +'}\n{marketTotal|市场数：'+ params.data.marketTotal +'}\n' +
                  '{deviceTotal|秤总数:'+params.data.deviceTotal+'}'*/
            },
            rich: {
              name: {
                color: '#4aeff9',
                fontSize: 16,
              },
              marketTotal: {
                color: '#eb121b',
                fontSize: 14,
              },
              deviceTotal: {
                color: '#5fff00',
                fontSize: 14,
              }
            }
          }
        }
      }]
    }
    getAreaMarketInfo({}).then(res => {
      if (res.result.success) {
        res.data.countyItems.forEach(item => {
          let obj = {
            name: item.name,
            value: [item.marketTotal, item.deviceTotal]
          }
          options.series[0].data.push(obj)
        })
        console.log(options.series[0].data)
      }
      getOnMap('sz').then(res => {
        let chart = echarts.init(document.getElementById('map'))
        echarts.registerMap('shenzhen',res.data)
        chart.setOption(options)
        window.addEventListener('resize', () => {
          chart.resize();
        })
      })
    })
  }
}
</script>