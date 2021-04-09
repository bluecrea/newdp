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
    }
  },
  setup() {
    const barCon = ref(null)
    nextTick(() => {
      let chart = echarts.init(barCon.value)
      chart.setOption(barOption)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
    return { barCon }
  }
}
</script>