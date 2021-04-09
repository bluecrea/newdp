<template>
  <div class="pie-chart">
    <div class="pie-title">智能秤状态占比图</div>
    <div class="pie-con" ref="pieScales"></div>
  </div>
</template>

<script>
import { nextTick, ref } from 'vue'
import echarts from 'echarts'
import {pieOption} from './option'

export default {
  name: 'PieChart',
  setup() {
    const pieScales = ref(null)
    nextTick(() => {
      let chart = echarts.init(pieScales.value)
      chart.setOption(pieOption)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
    return { pieScales }
  }
}
</script>