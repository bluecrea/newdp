<template>
  <div class="bar-line" ref="scalesData"/>
</template>
<script>
import { nextTick, onMounted, ref } from 'vue'
import echarts from 'echarts'
import {scalesOption} from "./option.js"

export default {
  name: 'scalesData',
  props: {
    countyItems: {
      type: Array
    }
  },
  setup(props) {
    const scalesData = ref(null)
    const showBar = ref(false)
    const initData = () => {
      let chart = echarts.init(scalesData.value)
      props.countyItems.forEach(item => {
        scalesOption.xAxis[0].data.push(item.name)
        scalesOption.series[0].data.push(item.marketTotal)
        scalesOption.series[1].data.push(item.deviceWar)
        scalesOption.series[2].data.push(item.deviceTotal)
      })
      nextTick(() => {
        chart.setOption(scalesOption, true)
      })
      let index = 0
      setInterval(() => {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        index ++
        if (index > scalesOption.xAxis[0].data.length) {
          index = 0
        }
      }, 3000)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    }
    onMounted(() => {
      scalesOption.xAxis[0].data = []
      scalesOption.series[0].data = []
      scalesOption.series[1].data = []
      scalesOption.series[2].data = []
      initData()
    })
    return {scalesData, showBar}
  }
}
</script>