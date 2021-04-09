let data = [
  {value: 335, name: '正常'},
  {value: 310, name: '预警'},
  {value: 234, name: '15天不在线'},
]
export const pieOption = {
  /*tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },*/
  color: ['#66ff66','#ff0000','#2c7bf0'],
  title: {
    text: '{name|秤总数}\n{val|2000台}',// '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
    x: 'center',
    y: 'center',
    /*top: 'center',
    left: '55%',*/
    textStyle: {
      rich: {
        name: {
          fontSize: 16,
          fontWeight: '400',
          color: '#697786',
          padding: [10, 0]
        },
        val: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#fff',
        }
      }
    }
  },
  series:[{
    type: 'pie',
    center: ['50%', '50%'],
    radius: ['60%', '90%'],
    hoverAnimation: false,
    label: {
      normal: {
        formatter: params => {
          return (
            '{icon|■}{name|' + params.name + '}{value|' + params.value+ '}'
          )
        },
        //padding: [0 , -100, 25, -100],
        rich: {
          icon: {
            fontSize: 20,
          },
          name: {
            fontSize: 12,
            color: '#fff',
            padding: [0, 5, 0, 5],
          },
          value: {
            fontSize: 15,
            fontWeight: 'bold',
          }
        }
      }
    },
    labelLine: {
      normal: {
        length:10,
        length2:20,
        lineStyle: {
          color:'#00ffff'
        }
      }
    },
    itemStyle: {
      normal: {
        borderColor: '#082440',
        borderWidth: 3,
      },
    },
    data: data
  }]
}