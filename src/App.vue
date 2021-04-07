<template>
  <div :class="[route.path === '/login' ? 'login' : 'wrap']">
    <loading v-if="dtLoading"/>
    <header-bar :title="title" />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Loading from '@/components/loading'
import HeaderBar from '@/components/Header'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const dtLoading = ref(true)
    const title = ref('')
    const route = useRoute()

    const getData = () => {
      dtLoading.value = false
      title.value = '深圳市农贸市场智能计量监管系统'
    }
    onMounted(() => getData())
    return {
      dtLoading,
      title,
      route
    }
  },
  components: {
    Loading,
    HeaderBar
  },
}
</script>
<style lang="less">
@import "assets/style/index";
</style>
