<template>
  <div class="flex-con">
    <div class="main-left">
      <div class="map" id="map"/>
      <div class="table-box">
        <div class="img-left">
          <div class="title">{{ realObj.marketName }}</div>
          <div class="img-con">
            <div class="img">
              <swiper-con @realIndex="realIndex"/>
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
          <area-pieces/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { mapOption } from "@/views/Home/components/map"
import { getOnMap } from '@/utils/api'
import dataMonitor from './components/DataMonitor'
import tableMarquee from './components/TableMarquee'
import NumRoll from './components/NumRoll'
import SwiperCon from './components/SwiperCon'
import AreaPieces from './components/AreaPieces'
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
    const initMap = () => {
      mapOption.series[1].data = [
        {name: '在线', value: [114.136252,22.656084, 2], symbolSize: 5},
        {name: '在线', value: [114.610085,22.806701, 2], symbolSize: 8 }
        ]
      mapOption.series[2].data = [{name:'不在线', value: [113.888032,22.522744, 0], symbolSize: 6}]
      getOnMap('sz').then(res => {
        let chart = echarts.init(document.getElementById('map'))
        echarts.registerMap('shenzhen',res.data)
        chart.setOption(mapOption)
        window.addEventListener('resize', () => {
          chart.resize();
        })
      })

      let num = 2568782
      numberArr.value = setNumberTransform(num)
      setInterval(() => {
        num ++
        numberArr.value = setNumberTransform(num)
      }, 5000)
      accessArr.value[0].data = 96
      toDayArr.value = setNumberTransform(32341)
    }
    const setNumberTransform = (num) => {
      num = `${num}`.split('')
      if (num.length < 9) {
        let arrLength = num.length
        for (let i = 0; i < (9 - arrLength); i++) {
          num.unshift('0')
        }
      }
      return num
    }
    const realObj = ref({})
    const realIndex = (params) => {
      let realArr = [
        {marketName: '横岗第一市场', stallNum: 20, deviceNum: 15, tradeQty: 1200, abnormalDeviceNum: 1},
        {marketName: '横岗第二市场', stallNum: 25, deviceNum: 25, tradeQty: 1300, abnormalDeviceNum: 2}
      ]
      realObj.value = realArr[params]
    }
    onMounted(() => {
      initMap()
    })
    return { numberArr, accessArr, toDayArr,realIndex,realObj }
  },
  components: {
    dataMonitor,
    NumRoll,
    SwiperCon,
    tableMarquee,
    AreaPieces,
  }
}
</script>
