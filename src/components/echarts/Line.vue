<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { ECharts, EChartsOption, init } from 'echarts';

let chart: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null);

const initChart = () => {
	const option = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				smooth: true,
			},
		],
	};
	chart.setOption(option);
};
const updateChart = () => {
	const option: EChartsOption = {
		series: [
			{
				type: 'line',
				data: [
					{
						value: 5,
						name: '故障',
					},
					{
						value: 35,
						name: '健康',
					},
					{
						value: 10,
						name: '亚健康',
					},
				],
			},
		],
	};
	chart.setOption(option);
};

onMounted(() => {
	chart = init(chartRef.value as HTMLElement);
	initChart();
});
</script>

<template>
	<div class="chart" ref="chartRef"></div>
</template>

<style scoped>
.chart {
	width: 400px;
	height: 200px;
}
</style>
