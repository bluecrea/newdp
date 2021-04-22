<template>
  <div class="flex-con">
    <Loading v-if="dtLoading"/>
    <div class="main-left">
      <div class="map" id="map"/>
      <div class="table-box">
        <div class="img-left">
          <div class="title">{{ realObj.marketName }}</div>
          <div class="img-con">
            <div class="img">
              <swiper-con @realIndex="realIndex" :img-length="realArr" v-if="realArr.length>0"/>
            </div>
            <ul class="list" v-if="realIndex">
              <li>挡位数 <span>{{ realObj.stallNum }}</span> 个</li>
              <li>器具数 <span>{{ realObj.deviceNum }}</span> 台</li>
              <li>交易数 <span>{{ realObj.tradeQty }}</span> 笔</li>
              <li>异常器具数 <span>{{ realObj.abnormalDeviceNum }}</span> 台</li>
            </ul>
          </div>
        </div>
        <div class="table-right">
          <div class="title">实时交易</div>
          <table-marquee/>
        </div>
      </div>
    </div>
    <div class="main-right">
      <div class="right-box">
        <div class="title">数据监测展示</div>
        <div class="box-con">
          <data-monitor :accessArr="accessArr"/>
          <h4>今日交易额</h4>
          <num-roll :orderArr="numberArr"/>
          <h4>今日交易数</h4>
          <num-roll :order-arr="toDayArr"/>
        </div>
        <div class="title">肉菜价格指数</div>
        <div class="line-box">
          <meta-vegetables/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getOnMap, getAreaMarketInfo, getMarketStatistics } from '@/utils/api'
import Loading from '@/components/loading'
import { mapOption } from "./components/map"
import dataMonitor from './components/DataMonitor'
import tableMarquee from './components/TableMarquee'
import NumRoll from './components/NumRoll'
import SwiperCon from './components/SwiperCon'
import MetaVegetables from '@/views/Cpi/components/MetaVegetables'
import echarts from 'echarts'

export default {
  name: 'Home',
  setup() {
    const numberArr = ref([])
    const toDayArr = ref([])
    const accessArr = ref([
      { name: 'totalAccess', data: 0, title: '市场总数', img: require('../../assets/images/index/list_1.png') },
      { name: 'marketAccess', data: 0, title: '接入市场', img: require('../../assets/images/index/list_2.png')},
      { name: 'scalesAccess', data: 0, title: '接入秤数', img: require('../../assets/images/index/list_3.png')}
    ])
    const realObj = ref({})
    const realArr = ref([])
    const dtLoading = ref(true)
    const initMap = () => {
      let chart = echarts.init(document.getElementById('map'))
      getOnMap('sz').then(res => {
        echarts.registerMap('shenzhen',res.data)
      })
      getAreaMarketInfo({}).then(res => {
        if (res.result.success) {
          accessArr.value[0].data = res.data.allMarketTotal
          accessArr.value[1].data = res.data.onlineMarketTotal
          accessArr.value[2].data = res.data.onlineDeviceTotal
          res.data.marketItems.forEach(item => {
            if (item.marketStatus === 0) {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px+3 }
              mapOption.series[2].data.push(obj)
            } else {
              let obj = { name: item.name, value:[item.longitude, item.latitude, item.marketStatus], symbolSize: item.px }
              mapOption.series[1].data.push(obj)
            }
          })
          numberArr.value = setNumberTransform(parseInt(res.data.tradeAmount))
          toDayArr.value = setNumberTransform(parseInt(res.data.tradeQty))
          chart.setOption(mapOption)
          window.addEventListener('resize', () => {
            chart.resize();
          })
        }
      })
      getMarketStatistics({}).then(res => {
        if (res.result.success) {
          res.data.forEach(item => {
            let obj = {marketName: item.market.marketName, stallNum: item.stallNum, deviceNum: item.deviceNum, tradeQty: item.tradeQty, abnormalDeviceNum: item.abnormalDeviceNum}
            realArr.value.push(obj)
          })
        }
      })
      setInterval(() => {
        initMap()
      }, 30000)
      dtLoading.value = false
    }
    const setNumberTransform = (num) => {
      num = `${num}`.split('')
      if (num.length < 9) {
        let arrLength = num.length
        for (let i = 0; i < (9 - arrLength); i++) {
          num.unshift('z')
        }
      }
      return num
    }

    const realIndex = (params) => {
      realObj.value = realArr.value[params]
    }
    onMounted(() => {
      initMap()
    })
    return { numberArr, accessArr, toDayArr, realIndex, realArr, realObj,dtLoading }
  },
  components: {
    dataMonitor,
    NumRoll,
    SwiperCon,
    tableMarquee,
    MetaVegetables,
    Loading,
  }
}
</script>
