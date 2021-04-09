import echarts from 'echarts'
import {getOnMap} from '@/utils/api'

const cityMap = [
  { city: '深圳',id: 'shenzhen' },
  { city: '罗湖区', id: '440303'},
  { city: '福田区', id: '440304'},
  { city: '南山区', id: '440305'},
  { city: '宝安区', id: '440306'},
  { city: '龙岗区', id: '440307'},
  { city: '盐田区', id: '440308'},
  { city: '龙华区', id: '440309'},
  { city: '坪山区', id: '440310'},
  { city: '光明新区', id: '440311'},
  { city: '大鹏新区', id: '440343'},
  { city: '前海自贸区', id: '440377'},
  { city: '深汕', id: '440388'},
]

export const getMap = (eleId, name, mapOption)  => {
  let id
  cityMap.forEach(item => {
    if (name === item.city) {
      id = item.id
    }
  })
  getOnMap(id).then(res => {
    let chart = echarts.init(document.getElementById(eleId))
    chart.showLoading()
    echarts.registerMap(name, res.data)
    chart.setOption(mapOption)
    chart.hideLoading()
  })
}