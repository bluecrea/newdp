<template>
  <div class="cpi-bot">
    <div class="legend">
      <div class="c-title">肉菜价格指数</div>
      <ul class="status">
        <li>最高</li>
        <li>最低</li>
        <li>今天</li>
        <li>物价指数</li>
      </ul>
    </div>
    <div class="cpi-line" ref="cpiLine"/>
  </div>
</template>
<script>
import { nextTick, ref } from 'vue'
import echarts from 'echarts'

export default {
  name: 'MetaVegetables',
  props: {
    lineOptions: {
      type: Object
    }
  },
  setup(props) {
    const cpiLine = ref(null)
    const options = {
      tooltip: {
        trigger: 'axis',
        borderColor: '#2c9ebb',
        borderWidth: 1.5,
        backgroundColor: 'rgba(0, 180, 255, 0.2)'
      },
      grid: {
        left: 35,
        top: 35,
        bottom: 55,
        right: '8%'
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisTick:{
            show: false,
          },
          axisLine:{
            lineStyle:{
              color:'#4c647c',
              opacity:0.2
            },
          },
          axisLabel: {
            textStyle: { color: '#fff', fontSize: 12}
          },
          splitLine: {
            show: false,
          },
          data: props.lineOptions.xData
        }
      ],
      yAxis: [{
        type: 'value',
        axisLine:{
          show: false
        },
        axisTick:{
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#006a84']
          }
        },
        axisLabel: {
          textStyle: { color: '#fff', fontSize: 13}
        },
      }],
      series: [{
        name: '物价指数',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(11, 188, 214, 0.9)'
            }, {
              offset: 0.8,
              color: 'rgba(92, 238, 253, 0.05)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: '#00f0ff',
          }
        },
        markPoint : {
          smooth: true,
          symbol: 'circle',
          symbolSize: 10,
          label: {
            show: false
          },
          data : [
            {
              type : 'max',
              name: '最大值',
              itemStyle: {
                color: '#ff0000'
              }
            },
            {
              type : 'min',
              name: '最小值',
              itemStyle: {
                color: '#00ff66'
              }
            },
            {
              type: 'average',
              name: '平均值',
              itemStyle: {
                color: '#00b4ff'
              }
            }
          ]
        },
        data: props.lineOptions.seriesData
      }]
    }
    nextTick(() => {
      let chart = echarts.init(cpiLine.value)
      chart.setOption(options)
      window.addEventListener('resize', () => {
        chart.resize();
      })
    })
    return {cpiLine}
  }
}
</script>