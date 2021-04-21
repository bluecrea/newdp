<template>
  <div class="bar-one" ref="increase"/>
</template>
<script>
import { nextTick, ref } from 'vue'
import echarts from 'echarts'

export default {
  name: 'DownSinkBar',
  props: {
    options: {
      type: Object
    },
    types: {
      type: String
    }
  },
  setup(props) {
    const increase = ref(null)
    const options = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '2%',
        containLabel: true
      },
      xAxis: {
        show: false,
        type: 'value'
      },
      yAxis: [{
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          },
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        data: props.options.goodsName.slice(0,10)
      },{
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '12'
          },
        },
        data: props.options.goodsValue.slice(0,10)
      }],
      series: [{
        name: '值',
        type: 'bar',
        zlevel: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
          },
        },
        barWidth: 20,
        data: props.options.goodsValue
      },{
        name: '背景',
        type: 'bar',
        barWidth: 20,
        barGap: '-100%',
        data: props.options.goodsMax.slice(0,10),
        itemStyle: {
          normal: {
            barBorderRadius: 30,
          }
        },
      }]
    }
    if (props.types === 'increase') {
      options.series[0].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#ff0000' },
        { offset: 1, color: '#ff6600' }])
      options.series[1].itemStyle.normal.color = '#271a20'
    } else {
      options.series[0].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#09B93F'},
        { offset: 1, color: '#00CC33'}])
      options.series[1].itemStyle.normal.color = '#053328'
    }
    nextTick(() => {
      let chart = echarts.init(increase.value)
      chart.setOption(options)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
    return {increase}
  }
}
</script>