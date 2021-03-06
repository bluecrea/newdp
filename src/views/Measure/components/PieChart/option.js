export const pieOption = {
  /*tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },*/
  color: ['#66ff66','#fcc500','#2c7bf0','#b8b8b8','#ff2525'],
  title: {
    text: '',// '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
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
    data: []
  }]
}