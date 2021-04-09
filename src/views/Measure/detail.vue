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
        <horizontal-bar bar-tit="各街道"/>
        <div class="complaint">
          <div class="bar-title">投诉与处理</div>
          <ul class="flex-box">
            <li>
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
            <li class="active">
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
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loading from '@/components/loading'
import ScalesData from './components/ScalesData'
import PieChart from './components/PieChart'
import HorizontalBar from './components/HorizontalBar'
import { getMap } from './components/InitMap'

export default {
  name: 'measure',
  setup() {
    const route = useRoute()
    const router = useRouter()
    document.title = route.query.name + '- 计量监管系统'
    const initMap = () => {
      let option = {
        geo: {
          map: '',
          layoutCenter: ['45%', '50%'],
          layoutSize: 580,
          itemStyle:{
            normal: {
              areaColor: '#277b97',
              shadowColor: '#075289',
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowOffsetY: 10,
            },
          },
        },
      }
      option.geo.map = route.query.name
      getMap('measureMap',route.query.name, option)
      dtLoading.value = false
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