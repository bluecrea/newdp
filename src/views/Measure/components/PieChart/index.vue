<template>
  <div class="pie-chart">
    <div class="pie-title">智能秤状态占比图</div>
    <div class="pie-con" ref="pieScales"></div>
  </div>
</template>

<script>
import { nextTick, ref } from 'vue'
import echarts from 'echarts'
import { pieOption } from './option'

export default {
  name: 'PieChart',
  props: {
    pieOpsData: {
      type: Array
    },
    total: {
      type: Number
    }
  },
  setup(props) {
    const pieScales = ref(null)
    pieOption.title.text = `{name|秤总数}\n{val|${props.total}台}`
    nextTick(() => {
      pieOption.series[0].data = props.pieOpsData
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