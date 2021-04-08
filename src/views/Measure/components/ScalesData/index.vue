<template>
  <div class="bar-line" ref="scalesData"/>
</template>
<script>
import { nextTick, ref } from 'vue'
import echarts from 'echarts'
import {scalesOption} from "./option.js"

export default {
  name: 'scalesData',
  setup() {
    const scalesData = ref(null)
    nextTick(() => {
      let chart = echarts.init(scalesData.value)
      chart.setOption(scalesOption)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
    return {scalesData}
  }
}
</script>