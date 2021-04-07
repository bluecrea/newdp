<template>
  <div class="toast" :class="toastMode" v-show="showToast">
    <div class="toast-message">{{ toastMsg }}</div>
  </div>
</template>
<script>

export default {
  name: 'Toast',
  props: {
    toastMode: {
      type: String,
      default: 'error'
    },
    toastMsg: {
      type: String,
      default: ''
    },
    showToast: {
      type: Boolean,
      default: false
    }
  }
}
</script>