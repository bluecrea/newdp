<template>
  <div class="monitor">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="box-left">
        <div class="box-header">
          <div class="bar-title" style="width: 50%">
            {{marketObj.marketName}}
          </div>
        </div>
        <div class="box-content">
          <div class="status">
            <ul class="online">
              <li>未接入</li>
              <li>不在线</li>
              <li>在线</li>
              <li>预警</li>
              <li>报警</li>
            </ul>
            <dl class="pic">
              <dd>有图像识别</dd>
              <dd>有交易商品图</dd>
            </dl>
          </div>
          <ul class="box">
            <li v-for="(item, index) in marketArr" :key="index">
              <router-link :to="{path: '/monitorDetail', query: {stallId: item.stallId, marketId: marketId, name: marketObj.marketName}}">
                <div class="stalls-no">
                  <span class="no">{{ item.stallCode }}</span>
                  <span class="st">
                  <i class="is-pic" v-if="item.isDiscern"/>
                  <i class="no-pic" v-if="item.isImage"/>
                  <i class="stp" :class="stallStatus(item.stallStatus)"/>
                </span>
                </div>
                <h4>{{ item.businessEntity }}</h4>
                <div class="detail">
                  <div class="dl">
                    <p>今日交易数：<em>{{ item.tradeQty || 0 }}</em> 笔</p>
                    <p>今日交易额：<em>{{ item.tradeAmount || 0 }}</em> 元</p>
                  </div>
                  <div class="type">类别： {{ item.stallTypeName }}</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="box-bottom"/>
      </div>
      <div class="box-right">
        <div class="box-header">
          <div class="title">数据监测展示</div>
        </div>
        <div class="box-right-content">
          <ul class="list-scales">
            <li>
              <img src="../../assets/images/measure/list_1.png" alt="">
              <p>
                <span>接入秤数</span>
                <span><i>{{ deviceData.deviceTotal || 0 }}</i> 台</span>
              </p>
            </li>
            <li>
              <img src="../../assets/images/measure/list_2.png" alt="">
              <p>
                <span>在线数</span>
                <span><i>{{ deviceData.onlineDeviceTotal || 0 }}</i> 台</span>
              </p>
            </li>
            <li>
              <img src="../../assets/images/measure/list_3.png" alt="">
              <p>
                <span>异常数</span>
                <span><i>{{ deviceData.abnormalDeviceTotal || 0 }}</i> 台</span>
              </p>
            </li>
          </ul>
          <h4>今日交易额</h4>
          <ul class="num-scales">
            <template v-for="(item,index) in tradeAmount" :key="index">
              <li v-if="item === 'z'" class="no-data">0</li>
              <li v-else>{{item}}</li>
            </template>
            <li class="unit">元</li>
          </ul>
          <h4>今日交易数</h4>
          <ul class="num-scales">
            <template v-for="(item,index) in tradeQty" :key="index">
              <li v-if="item === 'z'" class="no-data">0</li>
              <li v-else>{{item}}</li>
            </template>
            <li class="unit">笔</li>
          </ul>
          <h4>今日上传交易图片总数</h4>
          <ul class="num-scales">
            <template v-for="(item,index) in tradeImageQty" :key="index">
              <li v-if="item === 'z'" class="no-data">0</li>
              <li v-else>{{item}}</li>
            </template>
            <li class="unit">张</li>
          </ul>
          <div class="data-table">
            <div class="title">实时交易</div>
            <div class="table-con">
              <div class="marquee">
                <dl>
                  <dt>时间</dt>
                  <dt>挡位</dt>
                  <dt>品名</dt>
                  <dt>单价(元)</dt>
                </dl>
                <div class="marquee-wrap">
                  <ul class="marquee-list" v-if="deviceArr.length > 0" :class="{ 'animate-up': animateUp }">
                    <li v-for="item in deviceArr" :key="item">
                      <span>{{ item.orderTime }}</span>
                      <span>{{ item.stallCode }}</span>
                      <span>{{ item.goodsName }}</span>
                      <span>{{ item.price }}</span>
                    </li>
                  </ul>
                  <ul class="marquee-list" v-else>
                    <li class="no-data">
                      暂无数据
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-right-bottom"/>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/loading'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDeviceInfo, getMarketStallList, getMarketStatisticsInfo } from '@/utils/api'

export default {
  name: 'monitor',
  components: {
    Loading
  },
  setup() {
    const dtLoading = ref(true)
    const marketObj = ref({})
    const marketArr = ref([])
    const tradeImageQty = ref([])
    const tradeAmount = ref([])
    const tradeQty = ref([])
    const deviceArr = ref([])
    const router = useRouter()
    const route = useRoute()
    const marketId = ref(route.query.marketId)
    const countyCode = ref(route.query.code)
    const deviceData = ref({})
    const animateUp = ref(false)
    const getData = () => {
      getMarketStallList({marketId: marketId.value}).then(res => {
        if (res.result.success) {
          marketObj.value = res.data.market
          marketArr.value = res.data.items
        }
      })
      getMarketStatisticsInfo({marketId: marketId.value}).then(res => {
        if (res.result.success) {
          deviceData.value = res.data
          tradeAmount.value = setNumberTransform(parseInt(res.data.tradeAmount))
          tradeImageQty.value = setNumberTransform(parseInt(res.data.tradeImageQty))
          tradeQty.value = setNumberTransform(parseInt(res.data.tradeQty))
        }
      })
      getDeviceInfo({countyCode: countyCode.value, marketId: marketId.value}).then(res => {
        if (res.result.success) {
          deviceArr.value = res.data
          setInterval(scrollAnimate, 3000)
          dtLoading.value = false
        }
      })
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
    const scrollAnimate = () => {
      if (deviceArr.value.length > 5) {
        animateUp.value = true
        setTimeout(() => {
          deviceArr.value.push(deviceArr.value[0])
          deviceArr.value.shift()
          animateUp.value = false
        }, 500)
      }
    }
    onMounted(() => {
      getData()
    })
    const goBack = () => {
      router.back()
    }
    const stallStatus = (status) => {
      if (status === 0) {
        return 'no-access'
      } else if (status === 1) {
        return 'offline'
      } else if (status === 2) {
        return 'online'
      } else if (status === 3) {
        return 'early-warning'
      } else if (status === 4) {
        return 'alarm'
      }
    }
    return {
      dtLoading,goBack,marketObj,marketId,marketArr,stallStatus,
      deviceData,tradeImageQty,tradeQty,tradeAmount,deviceArr,animateUp
    }
  }
}
</script>

<style lang="less" scoped>
.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-35px);
}
</style>