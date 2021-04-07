<template>
  <div class="login-box">
    <div class="login-tit">用户登录</div>
    <div class="form">
      <input type="text" placeholder="请输入登录ID" v-model="userName">
      <input type="password" placeholder="请输入密码" v-model="password">
      <label>
        <input type="text" placeholder="请输入验证码">
        <em/>
      </label>
      <div class="remember-me">
        <input type="checkbox" v-model="rememberMe">
        <span>记住我</span>
      </div>
      <button type="submit" @click="submitLogin">登录</button>
    </div>
    <toast toast-mode="error" :toast-msg="errMsg" :show-toast="showToast"/>
  </div>
</template>
<script>
import { ref } from 'vue'
import toast from '@/components/Toast'
import { mapGetters, useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  components: {
    toast
  },
  setup() {
    const userName = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const errMsg = ref('')
    const showToast = ref(false)
    const store = useStore()
    const router = useRouter()
    const submitLogin = () => {
      if (userName.value === '') {
        errMsg.value = '请输入用户ID！'
        showToast.value = true
        setTimeout(() => {
          showToast.value = false
        }, 3000)
        return false
      }
      if (password.value === '') {
        errMsg.value = '请输入密码！'
        showToast.value = true
        setTimeout(() => {
          showToast.value = false
        }, 3000)
        return false
      }
      const userInfo = {
        userName: userName.value,
        password: password.value,
        rememberMe: rememberMe.value
      }
      store.dispatch('userInfo/setUserInfo', userInfo)
      router.push('/')
    }

    return {
      userName,
      password,
      rememberMe,
      errMsg,
      showToast,
      submitLogin
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/userInfo'
    })
  }
}
</script>