<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="login-tit">用户登录</div>
      <div class="form">
        <input type="text" placeholder="请输入登录ID" v-model="userName">
        <input type="password" placeholder="请输入密码" v-model="password">
        <label>
          <input type="text" placeholder="请输入验证码" v-model="verifyCode">
          <img :src="imgSrc" alt="">
        </label>
        <div class="remember-me">
          <input type="checkbox" v-model="rememberMe">
          <span>记住我</span>
        </div>
        <button type="submit" @click="submitLogin">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref,defineComponent } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getVerifyCode, login } from '@/utils/api'
import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/message/style/css'

export default defineComponent({
  name: 'login',
  setup() {
    const userName = ref('')
    const password = ref('')
    const verifyCode = ref('')
    const rememberMe = ref(false)
    const errMsg = ref('')
    const showToast = ref(false)
    const store = useStore()
    const router = useRouter()
    const imgSrc = ref(null)
    const submitLogin = () => {
      if (userName.value === '') {
        message.error('请输入用户ID！')
        return false
      }
      if (password.value === '') {
        message.error('请输入密码！')
        return false
      }
      if (verifyCode.value === '') {
        message.error('请输入验证码！')
        return false
      }
      const userInfo = {
        userCode: userName.value,
        userPwd: password.value,
        verifyCode: verifyCode.value
      }
      login(userInfo).then(res => {
        if (res.result.success) {
          let userInfo = res.data.user
          userInfo.rememberMe = rememberMe.value
          userInfo.token = res.data.token
          store.dispatch('userInfo/setUserInfo', userInfo)
          router.push('/')
        } else {
          message.error(res.result.message)
        }
      })

    }
    getVerifyCode({}).then(res => {
      imgSrc.value = URL.createObjectURL(new Blob([res.data],{ type: 'application/zip' }))
    })
    return { userName, password, rememberMe, errMsg, showToast, submitLogin, imgSrc, verifyCode }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/userInfo'
    })
  }
})
</script>