<template>
  <div class="table-con">
    <div class="marquee">
      <dl>
        <dt>时间</dt>
        <dt>所属市场</dt>
        <dt>挡位</dt>
        <dt>品名</dt>
        <dt>单价(元)</dt>
        <dt>重量(千克)</dt>
      </dl>
      <div class="marquee-wrap">
        <ul class="marquee-list" :class="{ 'animate-up': animateUp }">
          <li v-for="(item,index) in listData" :key="index">
            <span>{{ item.time }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.no }}</span>
            <span>{{ item.goodsName }}</span>
            <span>{{ item.price }}</span>
            <span>{{ item.weight }}</span>
          </li>
        </ul>
      </div>
    </div>

<!--      <tr>
        <td>20:21:21</td>
        <td>横岗第二市场</td>
        <td>A30</td>
        <td>海南花罗</td>
        <td>12.00</td>
        <td>0.23</td>
      </tr>-->
  </div>
</template>
<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { getDeviceInfo } from '@/utils/api'

export default {
  name: 'tableMarquee',
  setup() {
    const listData = ref([])
    const animateUp = ref(false)
    let timer
    onMounted(() => {
      getData()
      timer = setInterval(scrollAnimate, 3000)
    })
    onUnmounted(() => clearInterval(timer))
    const getData = () => {
      getDeviceInfo({}).then(res => {
        if (res.result.success) {
          listData.value = res.data
        }
      })
    }
    const scrollAnimate = () => {
      if (listData.value.length > 5) {
        animateUp.value = true
        setTimeout(() => {
          listData.value.push(listData.value[0])
          listData.value.shift()
          animateUp.value = false
        }, 500)
      }
    }
    return { listData, animateUp }
  }
}
</script>

<style lang="less" scoped>
.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-35px);
}
</style>