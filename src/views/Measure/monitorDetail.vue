<template>
  <div class="monitor">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="monitor-left">
        <div class="box-header">
          <div class="bar-title" style="width: 50%">
            {{ marketName }}
          </div>
        </div>
        <div class="box-content">
          <div class="status">
            <ul class="online-detail" style="height: 35px;">
              <li>正常</li>
              <li>预警</li>
              <li>报警</li>
            </ul>
            <dl class="pic-sb">
              <dd>未识别</dd>
              <dd>识别失败</dd>
              <dd>疑似识别</dd>
              <dd>识别成功</dd>
            </dl>
          </div>
          <ul class="box" v-if="stallArr.length > 0">
            <li v-for="(item,index) in stallArr" :key="index">
              <popover placement="right">
                <template #content>
                  <ul class="des">
                    <li>比较结果： <span>{{ item.warnStatusText }}</span></li>
                    <li>器具编码： <span>{{ item.serialNumber }}</span></li>
                    <li>器具名称： <span>{{ item.deviceName }}</span></li>
                    <li>挡位号： <span>{{ item.stallCode }}</span></li>
                    <li>挡位名称： <span>{{ item.businessEntity }}</span></li>
                    <li>交易单号：<span>{{ item.orderNo }}</span></li>
                    <li>交易商品：<span>{{ item.goodsName }}</span></li>
                    <li>原始零位AD值：<span>{{ item.initad }}</span></li>
                    <li>标准称重斜率：<span>{{ item.slope }}</span></li>
                    <li>去皮零位AD值：<span>{{ item.zeroad }}</span></li>
                    <li>称重AD值：<span>{{ item.weightad }}</span></li>
                  </ul>
                </template>
                <img src="../../assets/images/measure/img.jpg" alt="">
                <div class="tit-stu">
                  <span class="tit">{{ item.goodsName }}</span>
                  <span class="stu">
                  <i :class="sbStatus(item.discernStatus)"/>
                  <i class="setup" :class="stallStatus(item.warnStatus)"/>
                </span>
                </div>
                <div class="price">
                  {{ item.price }}元/kg
                </div>
                <div class="data-time">
                  {{ item.orderTime }}
                </div>
              </popover>
            </li>
          </ul>
        </div>
        <div class="box-bottom"/>
      </div>
      <div class="monitor-right">
        <div class="right-top">
          <ul>
            <li>市场：<span>{{ marketName }}</span></li>
            <li>编号：<span>{{ stallObj.stallCode }}</span></li>
            <li>类别：<span>{{ stallObj.stallTypeName }}</span></li>
            <li>联系人：<span>{{ stallObj.contacter }}</span></li>
            <li>电话： <span>{{ stallObj.telphone }}</span></li>
            <li>今日交易数：<span>{{ stallObj.tradeQty }}</span> <em>笔</em></li>
            <li>今日交易额：<span>{{ stallObj.tradeAmount }}</span> <em>元</em></li>
          </ul>
          <img src="../../assets/images/measure/img-rig.jpg" alt="">
        </div>
        <div class="right-bottom">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/loading'
import { ref } from 'vue'
import { getDeviceInfo, getStallStatisticsInfo } from '@/utils/api'
import { useRoute, useRouter } from 'vue-router'
import Popover from 'ant-design-vue/lib/popover'
import 'ant-design-vue/lib/popover/style/css'


export default {
  name: 'monitorDetail',
  components: {
    Loading,
    Popover
  },
  setup() {
    const dtLoading = ref(false)
    const router = useRouter()
    const route = useRoute()
    const stallId = route.query.stallId
    const marketName = route.query.name
    const stallObj = ref({})
    const stallArr = ref([])
    const data = {
      stallId: stallId,
      marketId: route.query.marketId
    }
    const goBack = () => {
      router.back()
    }
    const sbStatus = (status) => {
      if (status === 0) {
        return 'no-sb'
      } else if (status === 1) {
        return 'sb-sb'
      } else if (status === 2) {
        return 'ys_sb'
      } else {
        return 'sb-cg'
      }
    }
    const stallStatus = (status) => {
      if (status === 0) {
        return 'online'
      } else if (status === 1) {
        return 'early-warning'
      } else {
        return 'alarm'
      }
    }
    getStallStatisticsInfo({stallId: stallId}).then(res => {
      if (res.result.success) {
        stallObj.value = res.data
      }
    })
    getDeviceInfo(data).then(res => {
      stallArr.value = res.data
    })
    return {dtLoading,stallObj,stallArr,goBack, marketName,sbStatus,stallStatus}
  }
}
</script>
<style lang="less">
.ant-popover {
  .ant-popover-content {
    .ant-popover-arrow {
      border-left-color: #066a99;
      border-bottom-color: #066a99;
    }
    .ant-popover-inner {
      background-color: #066a99;
      .ant-popover-inner-content {
        color: #fff;
      }
    }
  }
}
ul.des {
  margin:0;
  li {
    font-size: 14px;
    line-height: 25px;
    height: 25px;
    span {
      color: #ffc740;
    }
  }
}
</style>