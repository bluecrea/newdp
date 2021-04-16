import echarts from 'echarts'
import {getOnMap} from '@/utils/api'
import { useRouter } from 'vue-router'

export const cityMap = [
  { area: '深圳',id: '440301' },
  { area: '罗湖区', id: '440303'},
  { area: '福田区', id: '440304'},
  { area: '南山区', id: '440305'},
  { area: '宝安区', id: '440306'},
  { area: '龙岗区', id: '440307'},
  { area: '盐田区', id: '440308'},
  { area: '龙华区', id: '440309'},
  { area: '坪山区', id: '440310'},
  { area: '光明新区', id: '440311'},
  { area: '大鹏新区', id: '440376'},
  { area: '前海自贸区', id: '440377'},
  { area: '深汕', id: '440388'},
]

export const getMap = (eleId, name, mapOption)  => {
  let id
  cityMap.forEach(item => {
    if (name === item.area) {
      id = item.id
    }
  })
  const router = useRouter()
  getOnMap(id).then(res => {
    let chart = echarts.init(document.getElementById(eleId))
    echarts.registerMap(name, res.data)
    chart.setOption(mapOption)
    chart.on('click',(routeQuery) => {
      router.push({path: '/monitor', query: {name: routeQuery.data.title}})
    })
  })
}