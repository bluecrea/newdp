<template>
  <div class="monitor">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="monitor-left">
        <div class="box-header">
          <div class="bar-title" style="width: 50%">
            标题
          </div>
        </div>
        <div class="box-content">
          <div class="status">
            <ul class="online" style="height: 35px;">
              <li>未接入</li>
              <li>不在线</li>
              <li>在线</li>
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
              <img src="../../assets/images/measure/img.jpg" alt="">
              <div class="tit-stu">
                <span class="tit">{{ item.goodsName }}</span>
                <span class="stu">
                  <i class="ys_sb"/>
                  <i class="setup online"/>
                </span>
              </div>
              <div class="price">
                {{ item.dailyFluctuation }}元/kg
              </div>
              <div class="data-time">
                2021-04-25 10:53
              </div>
            </li>
          </ul>
        </div>
        <div class="box-bottom"/>
      </div>
      <div class="monitor-right">
        <div class="right-top">
          <ul>
            <li>市场：<span>xxx市场</span></li>
            <li>编号：<span>12321312</span></li>
            <li>类别：<span>蔬菜档</span></li>
            <li>联系人：<span>阿傻</span></li>
            <li>电话： <span>1384381114</span></li>
            <li>今日交易数：<span>1555</span> <em>笔</em></li>
            <li>今日交易额：<span>111113.9</span> <em>元</em></li>
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
import { getStallStatisticsInfo } from '@/utils/api'
import { useRoute } from 'vue-router'

export default {
  name: 'monitorDetail',
  components: {
    Loading
  },
  setup() {
    const dtLoading = ref(false)
    const router = useRoute()
    const stallId = router.query.stallId
    const stallArr = ref([])
    getStallStatisticsInfo({stallId: stallId}).then(res => {
      if (res.result.success) {
        stallArr.value = res.data.items
      }
    })
    return {dtLoading,stallArr}
  }
}
</script>