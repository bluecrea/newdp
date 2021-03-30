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
          <h4>今日交易额</h4>
          <ul class="num-roll">
            <li class="no-date" v-for="index in 9" :key="index">
              <span>
                <i :ref="el => { numberItem[index-1] = el }">0123456789</i>
              </span>
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
import { nextTick, onMounted, ref } from 'vue'
import {mapOption } from "@/views/Home/components/map";

export default {
  name: 'Home',
  setup() {
    const numberArr = ref([])
    const numberItem = ref([])
    onMounted(() => {
      initMap()
    })
    const initMap = () => {
      mapOption.series[0].data = [{name:'食堂', value: [114.23102, 22.541309, 2], symbolSize: 10}]
      let chart = echarts.init(document.getElementById('map'))
      echarts.registerMap('shenzhen',shenzhen)
      chart.setOption(mapOption)
      window.addEventListener('resize', () => {
        chart.resize();
      })
      let num = 2568782
      setNumberTransform(num)
      setInterval(() => {
        num ++
        setNumberTransform(num)
      }, 5000)

    }
    const setNumberTransform = (num) => {
      num = `${num}`.split('')
      const numberItems = numberItem.value
      if (num.length < 9) {
        let arrLength = num.length
        for (let i = 0; i < (9 - arrLength); i++) {
          num.unshift('0')
        }
      }
      nextTick(() => {
        numberItems.forEach((item,index) => {
          let ty = num[index]
          if (ty === '0') {
            item.style = 'opacity: .3;'
          } else {
            item.style = `transform:translate(-50%, -${ty * 10}%);`
          }

        })
      })
    }

    return { numberItem,numberArr }
  }
}
</script>
