<template>
	<div class="chart" ref="chartRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import * as echarts from 'echarts';
import { formatDate } from '/@/utils/formatTime';

const props = withDefaults(defineProps<{
	data: {
		xData: any[],
		seriesData: any[],
		subhealth_thresholds?: number,
		fault_thresholds?: number
	}
	yUnit?: string
	title?: string
}>(), {
	yUnit: ''
})

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
			formatter: (params: any) => {
				//console.log(params[0]);
				let str = `<div><p>${params[0].axisValue}</p>`;
				for (let item of params) {
					let value = null
					let yUnit = props.yUnit
					value = item.value
					if (props.yUnit === '%' && value <= 1) {
						value = (value * 100).toFixed(2)
					}
					if (props.yUnit === 'KB/s') {
						if (value >= 1024 * 1024) {
							value = (value / 1024 / 1024).toFixed(2);
							yUnit = 'GB/s'
						} else if (value >= 1024) {
							value = (value / 1024).toFixed(2);
							yUnit = 'MB/s'
						}
					}
					str += `<p style="display:flex;justify-content:space-between;align-items:center;">
							<span>
								<span style="display:inline-block;width:10px;height:10px;border-radius:10px;background:${item.color};margin-right:5px;"></span>
								<span>${item.seriesName}</span>
							</span>
							<span style="font-weight:bold;">${value} ${yUnit}</span>
						</p>`

				}
				str += '</div>'
				return str

			}
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

			},
			axisTick: {
				alignWithLabel: true
			}

		},
		yAxis: {
			type: 'value',
			min: null as any,
			max: null as any,
			axisLabel: {
				formatter: function (value: any) {
					let yUnit = props.yUnit;
					if (props.yUnit === '%' && value <= 1) {
						value = (value * 100).toFixed(2)
					}
					if (props.yUnit === 'KB/s') {
						if (value >= 1024 * 1024) {
							value = (value / 1024 / 1024).toFixed(2);
							yUnit = 'GB/s'
						} else if (value >= 1024) {
							value = (value / 1024).toFixed(2);
							yUnit = 'MB/s'
						}
					}
					return value + yUnit
				}
			}
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
