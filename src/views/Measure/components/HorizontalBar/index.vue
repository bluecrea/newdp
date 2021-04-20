<template>
  <div class="hor-bar">
    <div class="bar-title">{{barTit}}智能秤状态占比</div>
    <div class="bar-con" ref="barCon"/>
  </div>
</template>
<script>
import { barOption } from './option'
import { nextTick, ref } from 'vue'
import echarts from 'echarts'

export default {
  name: 'HorizontalBar',
  props: {
    barTit: {
      type: String,
      default: ''
    },
    areaNameList: {
      type: Array
    },
    seriesData: {
      type: Array
    }
  },
  setup(props) {
    const barCon = ref(null)
    nextTick(() => {
      let chart = echarts.init(barCon.value)
      let index = 0
      barOption.yAxis.data = props.areaNameList
      for (let i=0;i< props.seriesData.length;i++) {
        barOption.series[i].name = props.seriesData[i].name
        barOption.series[i].data = props.seriesData[i].data
      }
      chart.setOption(barOption)
      setInterval(() => {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        index ++
        if (index > barOption.series[0].data.length) {
          index = 0
        }
      }, 2500)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
    return { barCon }
  }
}
</script>