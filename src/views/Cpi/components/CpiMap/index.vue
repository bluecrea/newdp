<template>
  <div class="cpi-map" id="cpiMap"/>
</template>
<script>
import { getOnMap } from '@/utils/api'
import echarts from 'echarts'
import { onMounted } from 'vue'

export default {
  name: 'CpiMap',
  props: {
    mapOps: {
      type: Array
    }
  },
  setup(props) {
    const mapOps = {
      geo: {
        map: 'shenzhen',
        // silent: true,
        itemStyle:{
          normal: {
            areaColor: '#277b97',
            shadowColor: '#6c4d03',
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 10,
          }
        }
      },
      visualMap: {
        type: 'continuous',
        orient: 'horizontal',
        itemHeight: 100,
        text: ['跌','涨'],
        textStyle: {
          color: '#fff',
          fontSize: 15,
        },
        showLabel: true,
        left: 'center',
        bottom: 30,
        min: -8,
        max: 5,
        inRange: {
          color: ['#19e74a','#fc0301']
        }
      },
      series: [{
        type: 'map',
        map: 'shenzhen',
        data: props.mapOps,
        selectedMode: 'false',
        itemStyle: {
          normal: {
            borderColor: '#fccba5',
            borderWidth: 2,
          }
        },
        label: {
          normal: {
            show: true,
            formatter: params => {
              console.log(params.data)
              if (params.data.value > 0) {
                return  '{name|'+ params.data.name +'}\n{jump|+'+ params.data.value +'%}'
              } else {
                return '{name|'+ params.data.name +'}\n{sink|'+ params.data.value +'%}'
              }
            },
            rich: {
              name: {
                color: '#fff',
                fontSize: 14,
              },
              jump: {
                color: '#ffe600',
                fontSize: 17,
              },
              sink: {
                color: '#5fff00',
                fontSize: 17,
              }
            }
          }
        }
      }]
    }
    const initMap = () => {
      getOnMap('sz').then(res => {
        let chart = echarts.init(document.getElementById('cpiMap'))
        echarts.registerMap('shenzhen',res.data)
        chart.setOption(mapOps)
        window.addEventListener('resize', () => {
          chart.resize();
        })
      })
    }
    onMounted(() => {
      initMap()
    })
  }
}
</script>