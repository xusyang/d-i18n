<template>
  <div :id="id" :style="{ height: '100%', width: '100%' }" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, defineProps, watch, nextTick } from 'vue'
interface lineDataType {
  name: string
  value: string | number
}
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  datas: {
    type: Array as () => Array<lineDataType>,
    default: []
  }
})
watch(
  () => props.datas,
  (val) => {
    initChart()
  },
  {
    deep: true,
    immediate: true
  }
)

function initChart() {
  const xData = []
  const values = []
  props.datas.forEach((item) => {
    xData.push(item.name)
    values.push(item.value)
  })
  const options = {
    tooltip: {
      trigger: 'axis',
      color: '#1f9bff',
      formatter: '{b0}<br>{c0} h'
    },
    grid: {
      top: '15%',
      right: '5%',
      left: '5%',
      bottom: '15%'
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisLine: {
          lineStyle: {
            color: 'rgb(204, 204, 204)'
          }
        },
        axisLabel: {
          color: '#666',
          fontSize: 12
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLabel: {
          color: '#333',
          formatter: '{value} h'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#ccc',
            type: 'dashed'
          }
        }
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 10,
        data: values,
        itemStyle: {
          color: '#1F90FF',
          borderColor: '#fff',

          // 圆点透明 边框
          borderWidth: 5
        },
        emphasis: {
          showSymbol: true
        },
        lineStyle: {
          width: 3,
          color: '#1f9bff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(96, 173, 250, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(96, 173, 250, 0)'
            }
          ])
        }
      }
    ]
  }
  nextTick(() => {
    const echart = echarts.init(document.getElementById(props.id))
    echart.setOption(options)
  })
}
</script>
