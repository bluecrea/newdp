<template>
  <div class="measure">
    <Loading v-if="dtLoading"/>
    <div class="go-back" @click="goBack"/>
    <div class="flex-con">
      <div class="main-left">
        <div class="map" id="measureMap"/>
        <div class="chart-bar">
          <div class="img-left">
            <div class="scales-img">
              <img src="../../assets/images/measure/scales.jpg" alt="">
            </div>
          </div>
          <scales-data/>
        </div>
      </div>
      <div class="main-measure-right">
        <pie-chart/>
        <horizontal-bar bar-tit="各街道"/>
        <div class="complaint">
          <div class="bar-title">投诉与处理</div>
          <ul class="flex-box">
            <li>
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
            <li>
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
            <li>
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
            <li class="active">
              <h4>缺斤少两</h4>
              <em>2021-04-09</em>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loading from '@/components/loading'
import ScalesData from './components/ScalesData'
import PieChart from './components/PieChart'
import HorizontalBar from './components/HorizontalBar'
import { getMap, cityMap } from './components/InitMap'

export default {
  name: 'measure',
  setup() {
    const route = useRoute()
    const router = useRouter()
    document.title = route.query.name + '- 计量监管系统'
    const dtLoading = ref(true)
    const goBack = () => {
      router.back()
    }
    const getOption = () => {
      let option = {
        geo: {
          map: '',
          silent: true,
          layoutCenter: ['45%', '50%'],
          layoutSize: 580,
          itemStyle:{
            normal: {
              areaColor: '#277b97',
              shadowColor: '#075289',
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowOffsetY: 10,
            },
          },
          label:{
            show: true,
            color: '#8be8f9',
            fontSize: 14,
          }
        },
        series: [{
          name: '在线',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          silent: false,
          rippleEffect: {
            period: 5,
            brushType: 'stroke',
            scale: 3
          },
          emphasis: {
            label: {
              show: true,
              position: 'right',
              backgroundColor: 'rgba(5,104,151,.6)',
              padding: [5,10],
              borderRadius: 3,
              borderColor: '#5bd5ef',
              borderWidth: 1,
              lineHeight: 25,
              color: '#ffffff',
              formatter: function(params) {
                return '{title|'+params.data.title +'}\n' +
                    '{key|档口数：}{value|'+params.data.stallNum +'}\n' +
                    '{key|交易数：}{value|'+params.data.tradeQty +'}\n' +
                    '{key|交易额：}{value|'+params.data.turnover+'}\n' +
                    '{key|器具总数：}{value|'+params.data.deviceNum+'}'
              },
              rich: {
                title: {
                  padding: [0, 0, 5, 0],
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#ffffff'
                },
                key: {
                  color: '#ffffff',
                  fontSize: 14,
                },
                value: {
                  color: '#ffc740',
                  fontSize: 14,
                }
              }
            }
          },
          data: [],
        }, {
          name: '不在线',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: []
        }]
      }
      const mapData = [{
        area: '440306',
        data: [
          {
            name: '在线',
            value: [113.890332,22.570409, 2],
            symbolSize: 5,
            title: '宝安宝富市场',
            stallNum: 78,
            turnover: 123180, // 成交额
            deviceNum: 75,
            tradeQty: 1598,
          },
          {
            name: '在线',
            value: [113.928132,22.671558, 2],
            symbolSize: 8,
            title: '龙华富华市场',
            stallNum: 87,
            turnover: 223180, // 成交额
            deviceNum: 95,
            tradeQty: 5598,
          }
        ]
      }]
      option.geo.map = route.query.name
      cityMap.forEach(item => {
        if (option.geo.map === item.area) {
          mapData.map(value=> {
            if (item.id === value.area) {
              option.series[0].data = value.data
            }
          })
        }
      })
      getMap('measureMap',route.query.name, option)
      dtLoading.value = false

    }
    onMounted(() => {
      getOption()
    })
    return {dtLoading,goBack}
  },
  components: {
    Loading,
    ScalesData,
    PieChart,
    HorizontalBar
  }
}
</script>