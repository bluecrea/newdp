<template>
  <ul class="num-roll">
    <li class="no-date" v-for="(item,index) in orderArr" :key="index">
      <span>
        <i :style="{ transform:`translate(-50%, -${item * 10}%)`}">0123456789</i>
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    orderArr: {
      type: Array,
      default: () => {
        return ['0','0','0','0','0','0','0','0','0']
      }
    }
  }
}
</script>