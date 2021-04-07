import router from '@/router/index'
import store from '@/store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'


router.beforeEach((to,form,next) => {
  document.title = `${to.meta.title} - 计量监管系统`
  NProgress.start()
  if (Object.keys(store.getters['userInfo/userInfo']).length === 0) {
    next({ name: 'login' })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})