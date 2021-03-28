<template>
  <div class="home">
    <div class="main-left">
      <div class="map" id="map"/>
    </div>
    <div class="main-right">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import shenzhen from '@/assets/map/shenzhen.json'
import { onMounted } from 'vue'
import {mapOption } from "@/views/Home/components/map";

export default {
  name: 'Home',
  setup() {
    onMounted(() => initMap())
    const initMap = () => {
      mapOption.series[0].data = [{name: '盐田区', value: 334}]
      mapOption.series[1].data = [{name:'食堂', value: [114.23102, 22.541309, 56]}]
      let chart = echarts.init(document.getElementById('map'))
      echarts.registerMap('shenzhen',shenzhen)
      chart.setOption(mapOption)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    }
  }
}
</script>
