<template>
  <header>
    <ul class="menu">
      <template v-if="route.name === 'Home'">
        <li v-for="item in menuArr" :key="item">{{ item }}</li>
      </template>
    </ul>
    <div class="title">
      <h1>{{title}}</h1>
      <div class="line"/>
    </div>
    <div class="now-date">
      <p v-if="route.name==='Home'">{{ nowDate }}</p>
    </div>
  </header>
</template>

<script>
import {useRoute} from 'vue-router'
import { ref, onUnmounted } from 'vue'
import dayjs from "dayjs";

export default {
  name: 'HeaderBar',
  props: {
    title: String
  },
  setup() {
    const route = useRoute()
    const menuArr = ref(['计量','指数', '溯源'])
    const nowDate = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    const time = setInterval(() => nowDate.value = dayjs().format('YYYY-MM-DD HH:mm:ss'), 1000)

    onUnmounted(() => clearInterval(time))

    return {
      route,
      menuArr,
      nowDate
    }
  }
}

</script>