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
          <scales-data :county-items="scalesParams" v-if="scalesParams.length > 0"/>
        </div>
      </div>
      <div class="main-measure-right">
        <pie-chart v-if="pieOpsData.length > 0" :pie-ops-data="pieOpsData" :total="pieOpsTotal"/>
        <horizontal-bar barTit="各区" v-if="areaArray.length > 0" :area-name-list="areaArray" :series-data="seriesObj"/>
        <div class="complaint">
          <div class="bar-title">投诉与处理</div>
          <ul class="flex-box">
            <li  v-for="(item,index) in complaintList.slice(0, 4)" :key="index" :class="{'active': item.dealStatus === 1}">
              <h4>{{ item.complaintContents }}</h4>
              <em>{{ item.complaintTime.slice(0, 10) }}</em>
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
import { getAreaMarketInfo, getOnMap, getDeviceStatistics, getComplaintList } from '@/utils/api'
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
    const pieOpsData = ref([])
    const areaArray = ref([])
    const seriesObj = ref([])
    const pieOpsTotal = ref(0)
    const dtLoading = ref(true)
    const complaintList = ref([])
    const goBack = () => {
      router.back()
    }
    const scalesParams = ref([])
    const initMap = () => {
      let chart = echarts.init(document.getElementById('measureMap'))
      getOnMap('sz').then(res => {
        echarts.registerMap('shenzhen',res.data)
      })
      getAreaMarketInfo({}).then(res => {
        if (res.result.success) {
          res.data.marketItems.forEach(item => {
            if (item.marketStatus === 0) {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px+3 }
              option.series[1].data.push(obj)
            } else if (item.marketStatus === 1 ) {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px+3 }
              option.series[2].data.push(obj)
            } else if (item.marketStatus === 2) {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px }
              option.series[3].data.push(obj)
            } else if (item.marketStatus === 3 ) {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px }
              option.series[4].data.push(obj)
            } else {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px }
              option.series[5].data.push(obj)
            }
          })
          scalesParams.value = res.data.countyItems
          chart.setOption(option)
          window.addEventListener('resize', () => {
            chart.resize();
          })
          chart.on('click',(params) => {
            router.push({path: '/detail', query: {name: params.name}})
          })
        }
      })
      getData()
    }
    const getData = () => {
      getDeviceStatistics({}).then(res => {
        if (res.result.success) {
          pieOpsData.value = res.data.items
          pieOpsTotal.value = res.data.deviceTotal
          let obj = {}
          res.data.areaItems.forEach(item => {
            areaArray.value.push(item.areaName)
            item.items.forEach(val => {
              let { name } = val
              if (!obj[name]) obj[name] = { name, data: [] }
              obj[name].data.push(val.value)
            })
          })
          seriesObj.value = Object.values(obj)
        }
      })
      getComplaintList({}).then(res => {
        if (res.result.success) {
          complaintList.value = res.data.items
        }
      })
      dtLoading.value = false
    }
    onMounted(() => {
      initMap()
    })
    return {dtLoading,goBack,pieOpsData,pieOpsTotal, areaArray, seriesObj, complaintList,scalesParams}
  },
  components: {
    Loading,
    ScalesData,
    PieChart,
    HorizontalBar
  }
}
</script>