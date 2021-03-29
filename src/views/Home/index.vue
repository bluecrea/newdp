<template>
  <div class="flex-con">
    <div class="main-left">
      <div class="map" id="map"/>

    </div>
    <div class="main-right">
      <div class="right-box">
        <div class="title">数据监测展示</div>
        <div class="box-con">
          <ul class="list-3" style="height: 220px;">
            <li>
              <em>
                <img src="../../assets/images/index/list_1.png" alt="">
              </em>
              <p><strong>98</strong>个</p>
              <span>市场总数</span>
            </li>
            <li>
              <em>
                <img src="../../assets/images/index/list_2.png" alt="">
              </em>
              <p><strong>98</strong>个</p>
              <span>接入市场</span>
            </li>
            <li>
              <em>
                <img src="../../assets/images/index/list_3.png" alt="">
              </em>
              <p><strong>98</strong>个</p>
              <span>接入秤数</span>
            </li>
          </ul>
        </div>
      </div>
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
    onMounted(() => (initMap()))

    const initMap = () => {
      mapOption.series[0].data = [{name:'食堂', value: [114.23102, 22.541309, 2], symbolSize: 10}]
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
