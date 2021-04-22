<template>
  <div class="measure">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="main-left">
        <div class="map-txt"/>
        <div class="map" id="measureMap"/>
        <div class="chart-bar">
          <div class="img-left">
            <div class="scales-img">
              <img src="../../assets/images/measure/scales.jpg" alt="">
            </div>
          </div>
          <scales-data :county-items="scalesParams" v-if="sonRefresh"/>
        </div>
      </div>
      <div class="main-measure-right">
        <pie-chart v-if="pieOpsData.length > 0" :pie-ops-data="pieOpsData" :total="pieOpsTotal"/>
        <horizontal-bar :bar-tit="areaName" v-if="areaArray.length > 0" :area-name-list="areaArray" :series-data="seriesObj"/>
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
import { useRoute, useRouter } from 'vue-router'
import { nextTick, onMounted, ref } from 'vue'
import Loading from '@/components/loading'
import ScalesData from './components/ScalesData'
import PieChart from './components/PieChart'
import HorizontalBar from './components/HorizontalBar'
import { cityMap } from './components/InitMap'
import { detailOption } from './components/InitMap/detail'
import { getAreaMarketInfo, getComplaintList, getDeviceStatistics, getOnMap } from '@/utils/api'
import echarts from 'echarts'

export default {
  name: 'measure',
  setup() {
    const route = useRoute()
    const router = useRouter()
    document.title = route.query.name + '- 计量监管系统'
    const dtLoading = ref(true)
    const areaName = ref(route.query.name)
    const pieOpsData = ref([])
    const pieOpsTotal = ref(0)
    const areaArray = ref([])
    const seriesObj = ref([])
    const complaintList = ref([])
    const scalesParams = ref([])
    const sonRefresh = ref(false)
    const goBack = () => {
      router.back()
    }
    const initData = () => {
      let data = {
        countyCode: '',
        mapId: ''
      }
      detailOption.geo.map = route.query.name
      cityMap.forEach(item => {
        if (detailOption.geo.map === item.area) {
          if (detailOption.geo.map.indexOf('大鹏') !== -1) {
            data.countyCode = '440311'
            data.mapId = item.id
          } else if (detailOption.geo.map.indexOf('光明') !== -1) {
            data.countyCode = '440309'
            data.mapId = item.id
          } else {
            data.countyCode = item.id
            data.mapId = item.id
          }
        }
      })
      getAreaMarketInfo(data).then(res => {
        scalesParams.value = []
        if (res.result.success) {
          scalesParams.value = res.data.countyItems
          res.data.marketItems.map(item => {
            let obj = {
              name: '',
              value: [],
              symbolSize: 0,
              title: ''
            }
            if (item.marketStatus === 0) {
              obj.name = '未接入'
              obj.value = [item.longitude, item.latitude, item.marketStatus]
              obj.symbolSize = item.px+3
              obj.title = item.name
              obj.marketId = item.marketId
              detailOption.series[0].data.push(obj)
            } else if (item.marketStatus === 1) {
              obj.name = '不在线'
              obj.value = [item.longitude, item.latitude, item.marketStatus]
              obj.symbolSize = item.px+3
              obj.title = item.name
              obj.marketId = item.marketId
              detailOption.series[1].data.push(obj)
            } else if (item.marketStatus === 2) {
              obj.name = '在线'
              obj.value = [item.longitude, item.latitude, item.marketStatus]
              obj.symbolSize = item.px
              obj.title = item.name
              obj.marketId = item.marketId
              detailOption.series[2].data.push(obj)
            } else if (item.marketStatus === 3) {
              obj.name = '预警'
              obj.value = [item.longitude, item.latitude, item.marketStatus]
              obj.symbolSize = item.px
              obj.title = item.name
              obj.marketId = item.marketId
              detailOption.series[3].data.push(obj)
            } else if (item.marketStatus === 4) {
              obj.name = '报警'
              obj.value = [item.longitude, item.latitude, item.marketStatus]
              obj.symbolSize = item.px
              obj.title = item.name
              obj.marketId = item.marketId
              detailOption.series[4].data.push(obj)
            }
          })
          nextTick(() => {
            sonRefresh.value = true
            getOnMap(data.mapId).then(res => {
              let chart = echarts.init(document.getElementById('measureMap'))
              echarts.registerMap(route.query.name, res.data)
              chart.setOption(detailOption)
              chart.on('click',(routeQuery) => {
                router.push({path: '/monitor', query: {marketId: routeQuery.data.marketId, code: data.countyCode}})
              })
            })
          })
        }
      })
      getDeviceStatistics(data).then(res => {
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
      initData()
    })
    return {dtLoading, goBack, areaName, pieOpsData, pieOpsTotal, areaArray, seriesObj, complaintList,scalesParams, sonRefresh}
  },
  components: {
    Loading,
    ScalesData,
    PieChart,
    HorizontalBar
  }
}
</script>