import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: { title: '首页'}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },
  {
    path: '/measure',
    name: 'measure',
    component: () => import('@/views/Measure'),
    meta: { title: '区详情' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
