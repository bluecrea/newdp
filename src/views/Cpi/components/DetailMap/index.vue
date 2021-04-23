<template>
  <div class="cpi-map" id="cpiMap"/>
</template>
<script>
import { onMounted } from 'vue'
import { getOnMap } from '@/utils/api'
import echarts from 'echarts'

export default {
  name: 'DetailMap',
  props: {
    mapOps: {
      type: Array
    },
    mapName: {
      type: String
    }
  },
  setup(props) {
    const maxNum = Math.max.apply(Math, props.mapOps.map(item => {
      return item.value
    }))
    const minNum = Math.min.apply(Math, props.mapOps.map(item => {
      return item.value
    }))
    const mapOps = {
      visualMap: {
        type: 'continuous',
        orient: 'horizontal',
        itemHeight: 100,
        text: ['涨','跌'],
        textStyle: {
          color: '#fff',
          fontSize: 15,
        },
        showLabel: true,
        left: 'center',
        bottom: 10,
        min: minNum,
        max: maxNum,
        inRange: {
          color: ['#19e74a','#fc0301']
        }
      },
      series: [{
        type: 'map',
        map: props.mapName,
        data: props.mapOps,
        selectedMode: false,
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
        silent: true,
        label: {
          normal: {
            show: true,
            formatter: (params) => {
              if (params.data) {
                if (params.data.value > 0) {
                  return  '{name|'+ params.data.name +'}\n{jump|+'+ params.data.value +'%}'
                } else {
                  return '{name|'+ params.data.name +'}\n{sink|'+ params.data.value +'%}'
                }
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
      getOnMap(props.mapName).then(res => {
        let chart = echarts.init(document.getElementById('cpiMap'))
        echarts.registerMap(props.mapName,res.data)
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