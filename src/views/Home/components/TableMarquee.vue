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
      listData.value = [
        { time: '20:21:21', name: '横岗第一市场', no: 'A30', goodsName: '海南花罗', price: '2.40', weight: '0.5' },
        { time: '10:20:20', name: '横岗第二市场', no: 'A31', goodsName: '广东花罗', price: '2.50', weight: '0.6' },
        { time: '10:21:30', name: '横岗第三市场', no: 'A31', goodsName: '广东花罗', price: '2.60', weight: '0.7' },
        { time: '10:22:40', name: '横岗第四市场', no: 'A31', goodsName: '广东花罗', price: '2.70', weight: '0.8' },
        { time: '10:23:50', name: '横岗第五市场', no: 'A31', goodsName: '广东花罗', price: '2.80', weight: '0.9' },
        { time: '10:24:00', name: '横岗第六市场', no: 'A31', goodsName: '广东花罗', price: '2.90', weight: '1.0' },
        { time: '10:24:00', name: '横岗第七市场', no: 'A31', goodsName: '广东花罗', price: '2.90', weight: '1.0' }
      ]
    }
    const scrollAnimate = () => {
      animateUp.value = true
      setTimeout(() => {
        listData.value.push(listData.value[0])
        listData.value.shift()
        animateUp.value = false
      }, 500)
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