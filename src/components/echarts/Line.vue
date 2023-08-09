<template>
	<div :style="{ height: containerHeight }" class="chart" v-loading="resizeLoading" ref="chartRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef, watch, onUnmounted, computed } from 'vue';
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
const containerHeight = computed(() => {
	return 500 + props.data.seriesData.length * 20 + 'px'
})
const containerHeight1 = computed(() => {
	return 40 + props.data.seriesData.length * 20 + 'px'
})
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
					if (value === undefined) return
					if (props.yUnit === '%') {
						value = (value * 100)
					}
					if (props.yUnit === 'KB/s') {
						if (value >= 1024 * 1024 * 1024) {
							value = (value / 1024 / 1024 / 1024).toFixed(2);
							yUnit = 'GB/s'
						} else if (value >= 1024 * 1024) {
							value = (value / 1024 / 1024).toFixed(2);
							yUnit = 'MB/s'
						} else {
							value = (value / 1024).toFixed(2)
						}
					}
					if (props.yUnit === 'KB') {
						if (value >= 1024 * 1024 * 1024) {
							value = (value / 1024 / 1024 / 1024).toFixed(2);
							yUnit = 'GB'
						} else if (value >= 1024 * 1024) {
							value = (value / 1024 / 1024).toFixed(2);
							yUnit = 'MB'
						} else {
							value = (value / 1024).toFixed(2)
						}
					}
					str += `<p style="display:flex;justify-content:space-between;align-items:center;">
										<div>
											<span style="display:inline-block;max-width: 500px;word-break: break-all;white-space: normal;">
												<span style="display:inline-block;width:10px;height:10px;border-radius:10px;background:${item.color};margin-right:5px;"></span>
												${item.seriesName}
												<span style="font-weight:bold;">${value} ${yUnit}</span>
											</span>
										</div>
										
									</p>`

				}
				str += '</div>'
				return str

			}
		},
		legend: {
			padding: 6,
			itemGap: 6,
			itemHeight: 14,
			show: true,
			top: 'top',
		},
		grid: {
			top: containerHeight1.value
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
					if (props.yUnit === '%' && value <= 1 && props.data.xData.length > 0) {
						value = (value * 100).toFixed(2)
					}
					if (props.yUnit === 'KB/s') {
						if (value >= 1024 * 1024 * 1024) {
							value = (value / 1024 / 1024 / 1024).toFixed(2);
							yUnit = 'GB/s'
						} else if (value >= 1024 * 1024) {
							value = (value / 1024 / 1024).toFixed(2);
							yUnit = 'MB/s'
						} else {
							value = (value / 1024).toFixed(2)
						}
					}
					if (props.yUnit === 'KB') {
						if (value >= 1024 * 1024 * 1024) {
							value = (value / 1024 / 1024 / 1024).toFixed(2);
							yUnit = 'GB'
						} else if (value >= 1024 * 1024) {
							value = (value / 1024 / 1024).toFixed(2);
							yUnit = 'MB'
						} else {
							value = (value / 1024).toFixed(2)
						}
					}
					return value + yUnit
				}
			}
		},
		series: (props.yUnit != '%' || props.data.xData.length != 0) ? props.data.seriesData : props.data.seriesData.map(item => ({ ...item, data: item.data.map((value: any) => (value < 0.01 ? 0 : value)) }))

	};
	myChart.value.on('legendselectchanged', function (obj: any) {
		const legendData = Object.keys(obj.selected);
		const selectedObj = legendData.filter(item => obj.selected[item]);
		const updatedOption = {
			legend: {
				selected: <any>{},
			},
		};
		legendData.forEach((key) => {
			if (obj.name === key) {
				updatedOption.legend.selected[obj.name] = true;
			} else if (selectedObj.length === 0) {
				updatedOption.legend.selected[key] = true;
			} else {
				updatedOption.legend.selected[key] = false;
			}
		})
		myChart.value.setOption(updatedOption);
	});
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
const resize = () => {
	myChart.value.resize({
		animation: {
			duration: 200,
			easing: 'linear'
		}
	});
};
const resizeLoading = ref(false);

onMounted(() => {
	initChart();
	window.addEventListener('resize', resize);

});
watch(() => props.data, () => {
	if (!chartRef.value) return
	resizeLoading.value = true;
	setTimeout(() => {
		resize();
		resizeLoading.value = false;
	}, 500);
	initChart();
}, { immediate: true })
watch(props.data, () => {
	if (!chartRef.value) return
	resizeLoading.value = true;
	setTimeout(() => {
		resize();
		resizeLoading.value = false;
	}, 500);
	initChart();
}, { immediate: true })

onUnmounted(() => {
	window.removeEventListener('resize', resize);
});

</script>



<style scoped>
.chart {
	width: 100%;
}
</style>
