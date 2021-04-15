<template>
  <div class="traceability">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="traceability-con">
      <div class="flex-pic">
        <traceability-map/>
        <div class="pic-right"/>
      </div>
      <div class="pic_bottom"/>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/loading'
import TraceabilityMap from './components/Map'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'traceability',
  components: {
    Loading,
    TraceabilityMap
  },
  setup() {
    const dtLoading = ref(false)
    const router = useRouter()
    const goBack = () => {
      router.back()
    }
    return {dtLoading,goBack}
  }
}
</script>