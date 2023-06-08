<template>
	<div class="chart" ref="chartRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import * as echarts from 'echarts';
import { formatDate } from '/@/utils/formatTime';

const props = defineProps<{
	data: {
		xData: any[],
		seriesData: any[],
		subhealth_thresholds?: number,
		fault_thresholds?: number
	}
	title?: string
}>()

const myChart = shallowRef();
const chartRef = ref<HTMLDivElement>();
const initChart = () => {
	myChart.value = echarts.init(chartRef.value as HTMLDivElement)
	const option = {
		title: {
			text: props.title
		},
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
			top: 'top',
		},
		xAxis: {
			type: 'category',
			min: null as any,
			max: null as any,
			data: props.data.xData.map(time => formatDate(new Date(time * 1000), 'mm-dd HH:MM:SS')),
			axisLabel: {

			}

		},
		yAxis: {
			type: 'value',
			min: null as any,
			max: null as any,
		},
		series: props.data.seriesData


	};
	if (props.data.xData.length === 0) {
		option.xAxis.type = 'time'
		option.xAxis.min = 0;
		option.xAxis.axisLabel = {
			formatter: function (value: any, index: any) {
				let remainder = index % 1;
				if (remainder === 0) {
					return `{MM}-{dd} {HH}:{mm}`;
				} else {
					return '';
				}
			}
		}
		option.xAxis.max = new Date().getTime();
		option.yAxis.min = 0;
		option.yAxis.max = 100;
	}
	myChart.value.setOption(option);

};
onMounted(() => {
	initChart();

});
watch(() => props.data, () => {
	if (!chartRef.value) return
	initChart();
}, { immediate: true })
watch(props.data, () => {
	if (!chartRef.value) return
	initChart();
}, { immediate: true })
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
