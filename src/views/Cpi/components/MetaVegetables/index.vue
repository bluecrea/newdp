<template>
  <div class="cpi-line" ref="cpiLine"/>
</template>
<script>
import { nextTick, ref } from 'vue'
import echarts from 'echarts'
import { getPriceTrendData } from '@/utils/api'

export default {
  name: 'MetaVegetables',
  setup() {
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
          data: []
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
        symbol: "none",
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
              },
              label: {
                show: true,
                position: "bottom",
                lineHeight: 20,
                backgroundColor: 'rgba(0,216,255,.2)',
                borderRadius: 2,
                borderColor: '#00c6ff',
                borderWidth: '1',
                padding: [5, 15, 4],
                fontSize: 14,
                fontWeight: 'normal',
              },
            },
            {
              type : 'min',
              name: '最小值',
              itemStyle: {
                color: '#00ff66'
              },
              label: {
                show: true,
                position: "bottom",
                lineHeight: 20,
                backgroundColor: 'rgba(0,216,255,.2)',
                borderRadius: 2,
                borderColor: '#00c6ff',
                borderWidth: '1',
                padding: [5, 15, 4],
                fontSize: 14,
                fontWeight: 'normal',
              },
            },
            {
              name: '今天',
              itemStyle: {
                color: '#00b4ff'
              },
              label: {
                show: true,
                position: "bottom",
                lineHeight: 20,
                backgroundColor: 'rgba(0,216,255,.2)',
                borderRadius: 2,
                borderColor: '#00c6ff',
                borderWidth: '1',
                padding: [5, 15, 4],
                fontSize: 14,
                fontWeight: 'normal',
              },
            }
          ]
        },
        data: []
      }]
    }
    getPriceTrendData({}).then(res => {
      if (res.result.success) {
        if (res.data.length > 1) {
          res.data.forEach(item => {
            options.xAxis[0].data.push(item.date.slice(5,10))
            options.series[0].data.push(item.index)
          })
          options.series[0].markPoint.data[2].xAxis = res.data.length -1
          options.series[0].markPoint.data[2].yAxis = res.data[res.data.length-1].index
          options.series[0].markPoint.data[2].value = res.data[res.data.length-1].index
          nextTick(() => {
            let chart = echarts.init(cpiLine.value)
            chart.setOption(options)
            window.addEventListener('resize', () => {
              chart.resize();
            })
          })
        }
      }
    })
    return {cpiLine}
  }
}
</script>