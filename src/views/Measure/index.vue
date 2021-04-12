<template>
  <div class="measure">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="main-left">
        <div class="map" id="measureMap"/>
        <div class="chart-bar">
          <div class="img-left">
            <div class="scales-img">
              <img src="../../assets/images/measure/scales.jpg" alt="">
            </div>
          </div>
          <scales-data/>
        </div>
      </div>
      <div class="main-measure-right">
        <pie-chart/>
        <horizontal-bar barTit="各区"/>
        <div class="complaint">
          <div class="bar-title">投诉与处理</div>
          <ul class="flex-box">
            <li>
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
            <li class="active">
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
            <li>
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
            <li>
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getOnMap } from '@/utils/api'
import echarts from 'echarts'
import Loading from '@/components/loading'
import { option } from "./components/mapOption"
import ScalesData from './components/ScalesData'
import PieChart from './components/PieChart'
import HorizontalBar from './components/HorizontalBar'

export default {
  name: 'measure',
  setup() {
    const router = useRouter()
    const initMap = () => {
      option.series[1].data = [
        {name: '在线', value: [114.136252,22.656084, 2], symbolSize: 5},
        {name: '在线', value: [114.610085,22.806701, 2], symbolSize: 8 }
      ]
      option.series[2].data = [{name:'不在线', value: [113.888032,22.522744, 0], symbolSize: 6}]
      getOnMap('sz').then(res => {
        let chart = echarts.init(document.getElementById('measureMap'))
        echarts.registerMap('shenzhen',res.data)
        dtLoading.value = false
        chart.on('click',(params) => {
          router.push({path: '/detail', query: {name: params.name}})
        })
        chart.setOption(option)
        window.addEventListener('resize', () => {
          chart.resize();
        })
      })
    }
    const dtLoading = ref(true)
    const goBack = () => {
      router.back()
    }
    onMounted(() => {
      initMap()
    })
    return {dtLoading,goBack}
  },
  components: {
    Loading,
    ScalesData,
    PieChart,
    HorizontalBar
  }
}
</script>