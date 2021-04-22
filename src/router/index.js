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
    meta: { title: '计量' }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/Measure/detail'),
    meta: { title: '区域计量详情' }
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('@/views/Measure/monitor'),
    meta: { title: '市场详情' }
  },
  {
    path: '/monitorDetail',
    name: 'monitorDetail',
    component: () => import('@/views/Measure/monitorDetail'),
    meta: { title: '档位统计' }
  },
  {
    path: '/cpi',
    name: 'cpi',
    component: () => import('@/views/Cpi'),
    meta: { title: '指数' }
  },
  {
    path: '/cpiDetail',
    name: 'cpiDetail',
    component: () => import('@/views/Cpi/detail'),
    meta: { title: '区指数详情' }
  },
  {
    path: '/traceability',
    name: 'traceability',
    component: () => import('@/views/Traceability'),
    meta: { title: '溯源' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
