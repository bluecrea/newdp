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
    </div>
  </div>

</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getOnMap } from '@/utils/api'
import echarts from 'echarts'
import Loading from '@/components/loading'
import { mapOption } from "@/views/Home/components/map"
import ScalesData from './components/ScalesData'

export default {
  name: 'measure',
  setup() {
    const route = useRoute()
    const router = useRouter()
    document.title = route.query.name + '- 计量监管系统'
    const initMap = () => {
      mapOption.series[1].data = [
        {name: '在线', value: [114.136252,22.656084, 2], symbolSize: 5},
        {name: '在线', value: [114.610085,22.806701, 2], symbolSize: 8 }
      ]
      mapOption.series[2].data = [{name:'不在线', value: [113.888032,22.522744, 0], symbolSize: 6}]
      getOnMap('shenzhen').then(res => {
        let chart = echarts.init(document.getElementById('measureMap'))
        echarts.registerMap('shenzhen',res.data)
        dtLoading.value = false
        chart.on('click',(params) => {
          router.push({path: '/measure', query: {name: params.name}})
        })
        chart.setOption(mapOption)
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
    ScalesData
  }
}
</script>