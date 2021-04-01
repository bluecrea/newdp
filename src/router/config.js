import router from '@/router/index'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'

router.beforeEach((to,form,next) => {
  document.title = `${to.meta.title} - 计量监管系统`
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})