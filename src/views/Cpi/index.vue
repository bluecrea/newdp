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
          <h5>涨幅——深圳市</h5>
          <jump-sink-bar :options="increaseOps" types="increase"/>
          <h5>跌幅——深圳市</h5>
          <jump-sink-bar :options="increaseOps" types="decline"/>
        </div>
        <div class="box-bottom"/>
      </div>
      <div class="flex-center">
        <cpi-map :map-ops="mapOptions"/>
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
          <li>
            <span>豆角</span>
            <span class="increase">+26.05%</span>
            <span>5.43元/公斤</span>
          </li>
          <li>
            <span>豆角</span>
            <span class="increase">+26.05%</span>
            <span>5.43元/公斤</span>
          </li>
          <li>
            <span>豆角</span>
            <span class="decline">-26.05%</span>
            <span>5.43元/公斤</span>
          </li>
          <li>
            <span>豆角</span>
            <span class="decline">-26.05%</span>
            <span>5.43元/公斤</span>
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
import CpiMap from './components/CpiMap'
import MetaVegetables from './components/MetaVegetables'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'cpi',
  components: {
    Loading,
    JumpSinkBar,
    CpiMap,
    MetaVegetables
  },
  setup() {
    const dtLoading = ref(true)
    const router = useRouter()
    const increaseOps = {
      goodsName: ["安徽省","河南省","浙江省","湖北省","贵州省","江西省","江苏省","四川省"],
      goodsValue: [239,181,154,144,135,117,74,72,],
      goodsMax: [500, 500,500,500,500,500,500,500]
    }
    const mapOptions = [
      { name: '罗湖区', value: 3.5},
      { name: '福田区', value: 2.8 },
      { name: '南山区', value: 4.2 },
      { name: '宝安区', value: -0.5 },
      { name: '龙岗区', value: -0.9 },
      { name: '盐田区', value: -6.7 },
      { name: '龙华区', value: -2.8 },
      { name: '坪山区', value: -7.2 },
      { name: '光明新区', value: -2.5 },
      { name: '大鹏新区', value: -5.1 },
      { name: '前海自贸区', value: -4.2 },
      { name: '深汕', value: 5 }
    ]
    const goBack = () => {
      router.back()
    }
    nextTick(() => {
      dtLoading.value = false
    })
    return { dtLoading, increaseOps, mapOptions, goBack }
  }
}
</script>