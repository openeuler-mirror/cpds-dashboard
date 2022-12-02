<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { ECharts, EChartsOption, init } from 'echarts'

let chart: ECharts
const chartRef: Ref<HTMLElement | null> = ref(null)

const initChart = () => {
  const option: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 0,
            name: '故障'
          },
          {
            value: 5,
            name: '健康'
          },
          {
            value: 0,
            name: '亚健康'
          }
        ]
      }
    ]
  }
  chart.setOption(option)
}
const updateChart = () => {
  const option: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 5,
            name: '故障'
          },
          {
            value: 35,
            name: '健康'
          },
          {
            value: 10,
            name: '亚健康'
          }
        ]
      }
    ]
  }
  chart.setOption(option)
}

onMounted(() => {
  chart = init(chartRef.value as HTMLElement)
  initChart()
  setTimeout(() => {
    updateChart()
  }, 200)
})
</script>

<template>
  <div class="chart" ref="chartRef"></div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
