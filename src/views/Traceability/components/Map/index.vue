<template>
  <div class="map-con" id="map"/>
</template>
<script>
import { getOnMap } from '@/utils/api'
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
        label:{
          show: true,
          color: '#8be8f9',
          fontSize: 14,
        }
      },]
    }
    getOnMap('sz').then(res => {
      let chart = echarts.init(document.getElementById('map'))
      echarts.registerMap('shenzhen',res.data)
      chart.setOption(options)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
  }
}
</script>