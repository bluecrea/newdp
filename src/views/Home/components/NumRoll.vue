<template>
  <ul class="num-roll">
    <li v-for="(item,index) in orderArr" :key="index">
      <span v-if="item === 'z'" class="no-data">0</span>
      <span v-else>
        <i :style="{ transform:`translate(-50%, -${item * 10}%)`}">0123456789</i>
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
export default {
  props: {
    orderArr: {
      type: Array,
      default: () => {
        return ['z','z','z','z','z','z','z','z','z']
      }
    }
  }
}
</script>