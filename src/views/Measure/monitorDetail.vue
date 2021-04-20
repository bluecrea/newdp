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
            <li>1</li>
            <li>2</li>
            <li>2</li>
            <li class="dh">,</li>
            <li>3</li>
            <li>1</li>
            <li>2</li>
            <li class="dh">,</li>
            <li>7</li>
            <li>5</li>
            <li>9</li>
            <li class="unit">元</li>
          </ul>
          <h4>今日交易数</h4>
          <ul class="num-scales">
            <li>1</li>
            <li>2</li>
            <li>2</li>
            <li class="dh">,</li>
            <li>3</li>
            <li>1</li>
            <li>2</li>
            <li class="dh">,</li>
            <li>7</li>
            <li>5</li>
            <li>9</li>
            <li class="unit">笔</li>
          </ul>
          <h4>今日上传交易图片总数</h4>
          <ul class="num-scales">
            <li>1</li>
            <li>2</li>
            <li>2</li>
            <li class="dh">,</li>
            <li>3</li>
            <li>1</li>
            <li>2</li>
            <li class="dh">,</li>
            <li>7</li>
            <li>5</li>
            <li>9</li>
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
                  <ul class="marquee-list">
                    <li>
                      <span>2021-12-1</span>
                      <span>A21</span>
                      <span>钓鱼岛</span>
                      <span>5212</span>
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
import { getMarketStallList,getMarketStatisticsInfo } from '@/utils/api'

export default {
  name: 'monitor',
  components: {
    Loading
  },
  setup() {
    const dtLoading = ref(false)
    const marketObj = ref({})
    const marketArr = ref([])
    const router = useRouter()
    const route = useRoute()
    const marketId = ref(route.query.marketId)
    const deviceData = ref({})
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
          console.log(res.data)
        }
      })
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
    return {dtLoading,goBack,marketObj,marketId,marketArr,stallStatus,deviceData}
  }
}
</script>