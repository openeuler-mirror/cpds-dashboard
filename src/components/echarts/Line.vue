<template>
	<div class="chart" ref="chartRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { formatDate } from '/@/utils/formatTime';

const props = defineProps<{
	data: {
		xData: any[],
		seriesData: any[],
		yData: any[],
		subhealth_thresholds: number,
		fault_thresholds: number
	}
}>()

const myChart = shallowRef();
const chartRef = ref<HTMLDivElement>();
const initChart = () => {
	myChart.value = echarts.init(chartRef.value as HTMLDivElement)
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			},
		},
		legend: {
			show: true,
			top: 'bottom'
		},
		xAxis: {
			type: 'category',
			data: props.data.xData.map(time => formatDate(new Date(time * 1000), 'mm-dd HH:MM:SS')) || ['01日00:00', '01日00:00'],

		},
		yAxis: {
			type: 'value',
		},
		series: props.data.seriesData


	};
	myChart.value.setOption(option);
};
onMounted(() => {
	initChart();
});
watch(props.data, () => {
	initChart();
},)
window.addEventListener('resize', () => {
	myChart.value.resize()
})
</script>



<style scoped>
.chart {
	width: 100%;
	height: 400px;
}
</style>
