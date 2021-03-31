<template>
  <div class="data-monitor">
    <ul class="list-3" style="height: 220px;">
      <li v-for="item in accessArr" :key="item">
        <em>
          <img :src="item.img" alt="">
        </em>
        <p><strong>{{item.data}}</strong>个</p>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'dataMonitor',
  props: {
    accessArr: {
      type: Array,
      default: null,
    }
  }
}
</script>