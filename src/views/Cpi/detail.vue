<template>
  <div class="cpi">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="flex-left">
        <div class="box-header">
          <h4>涨跌幅排行榜</h4>
        </div>
        <div class="box-cen">
          <h5>涨幅——{{ mapName }}</h5>
          <jump-sink-bar :options="increaseOps" v-if="increaseOps.goodsName.length > 0" types="increase"/>
          <h5>跌幅——{{ mapName }}</h5>
          <down-sink-bar :options="declineOps" v-if="declineOps.goodsName.length > 0" types="decline"/>
        </div>
        <div class="box-bottom"/>
      </div>
      <div class="flex-center">
        <detail-map :map-ops="mapOptions" :map-name="countyCode" v-if="mapOptions.length>0"/>
        <div class="cpi-bot">
          <div class="legend">
            <div class="c-title">肉菜价格指数</div>
            <ul class="status">
              <li>最高</li>
              <li>最低</li>
              <li>平均</li>
              <li>物价指数</li>
            </ul>
          </div>
          <meta-vegetables/>
        </div>
      </div>
      <div class="flex-right">
        <div class="box-header">
          <h4>交易信息展示</h4>
        </div>
        <ul class="box-cen">
          <li v-for="(item, index) in goodsIndexArr.slice(0,14)" :key="index">
            <span>{{ item.goodsName }}</span>
            <span v-if="Math.sign(item.dailyFluctuation) === 1" class="increase">+{{ item.dailyFluctuationStr }}</span>
            <span v-else class="decline">-{{ item.dailyFluctuationStr }}</span>
            <span>{{ item.dailyFluctuation }}</span>
          </li>
        </ul>
        <div class="box-bottom"/>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/loading'
import JumpSinkBar from './components/JumpSinkBar'
import DownSinkBar from './components/DownSinkBar'
import MetaVegetables from './components/MetaVegetables'
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {getAreaIndexStatistics,getIndexUp, getGoodsIndex} from '@/utils/api'
import { cityMap } from '@/views/Measure/components/InitMap'
import DetailMap from '@/views/Cpi/components/DetailMap'

export default {
  name: 'cpi',
  components: {
    DetailMap,
    Loading,
    JumpSinkBar,
    MetaVegetables,
    DownSinkBar
  },
  setup() {
    const dtLoading = ref(true)
    const router = useRouter()
    const route = useRoute()
    const mapName = route.query.name
    const countyCode = ref('')
    cityMap.forEach(item => {
      if (mapName === item.area) {
        if (route.query.name.indexOf('大鹏') !== -1) {
          countyCode.value =  '440311'
        } else if (route.query.name.indexOf('光明') !== -1) {
          countyCode.value =  '440309'
        } else {
          countyCode.value = item.id
        }
      }
    })
    const increaseOps = {
      goodsName: [],
      goodsValue: [],
      goodsMax: []
    }
    const declineOps = {
      goodsName: [],
      goodsValue: [],
      goodsMax: []
    }
    const goodsIndexArr = ref([])
    const mapOptions = []
    const getData = () => {
      getAreaIndexStatistics({}).then(res => {
        if (res.result.success) {
          res.data.map(item => {
            let obj = {name:item.name,value: item.dailyFluctuation}
            mapOptions.push(obj)
          })
        }
      })
      getIndexUp({countyCode: countyCode.value }).then(res => {
        if (res.result.success) {
          const maxNum = Math.max.apply(Math, res.data.items.map(item => {
            return item.dailyFluctuation
          }))
          res.data.items.forEach(item => {
            increaseOps.goodsName.push(item.goodsName)
            increaseOps.goodsValue.push(item.dailyFluctuation)
            increaseOps.goodsMax.push(maxNum)
          })
          res.data.newItems.forEach(item => {
            declineOps.goodsName.push(item.goodsName)
            declineOps.goodsValue.push(item.dailyFluctuation)
            declineOps.goodsMax.push(maxNum)
          })
        }
      })
      getGoodsIndex({countyCode: countyCode.value }).then(res => {
        if (res.result.success) {
          goodsIndexArr.value = res.data.items
        }
      })
    }
    onMounted(() => {
      getData()
    })
    const goBack = () => {
      router.back()
    }
    nextTick(() => {
      dtLoading.value = false
    })
    return { dtLoading, increaseOps, mapOptions, goBack, goodsIndexArr, declineOps,countyCode,mapName }
  }
}
</script>