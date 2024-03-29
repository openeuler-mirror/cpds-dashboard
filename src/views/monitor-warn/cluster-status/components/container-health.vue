<template>
	<div>
		<div style="display: flex;padding-top: 10px;padding-left: 15px;">
			<div style="flex:0.9">
				<h2>容器健康监控</h2>
			</div>
			<div style="display: flex;align-items: center;">
				<span style="font-size: 15px;">查询时间范围:</span>
			</div>
			<div class="container">
				<el-date-picker ref="dateRef" style="margin-left: 5px;" class="mr10" v-model="datetimeRange"
					type="datetimerange" unlink-panels range-separator="-" start-placeholder="请选择开始时间"
					end-placeholder="请选择结束时间" value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="shortcuts"
					@change="dateChange" />
				<div v-show="latestTime" class="container-time" @click="dateRef.focus()">{{ latestTime }}</div>
			</div>
		</div>
		<div style="display: flex; flex-wrap: wrap;justify-content:space-between">
			<el-card class="echart">
				<Line :data="state.cpuUsageData" yUnit="%" title="容器CPU使用率"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.diskUsageData" yUnit="%" title="容器磁盘使用率"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.containerBytesData" yUnit="KB" title="容器流量"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.memoryUsageData" yUnit="%" title="容器内存使用率"></Line>
			</el-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch, reactive, defineAsyncComponent, inject } from 'vue'
import { timeNameMap } from '/@/utils/const';
import { dayjs } from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
import { shortcuts } from '/@/utils/const'
const Line = defineAsyncComponent(() => import('/@/components/echarts/Line.vue'))
import { useMonitorApi } from '/@/api/monitor-warn/index'
import { LineChartData } from '/@/types/index'
dayjs.extend(relativeTime);

interface DataState {
	containerBytesData: LineChartData;
	memoryUsageData: LineChartData;
	cpuUsageData: LineChartData;
	diskUsageData: LineChartData
}
const state = reactive<DataState>({

	containerBytesData: {
		xData: [],
		seriesData: [],
	},
	memoryUsageData: {
		xData: [],
		seriesData: [],
	},
	cpuUsageData: {
		xData: [],
		seriesData: [],
	},
	diskUsageData: {
		xData: [],
		seriesData: [],
	},
})
const activeName = inject('activeName', ref());
const datetimeRange = ref()
const dateRef = ref()
const defaultdateRange = ref<[number, string]>([5 * 60, 'second']);
const latestTime = ref('最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdateRange.value[0], 'second')).fromNow(true)]);
const dateChange = (val: any) => {
	if (val) {
		if (dayjs(val[1]).diff(new Date(), 'second') == 0) {  // relative time range
			const diff = dayjs(val[1]).diff(val[0], 'second');
			defaultdateRange.value[0] = diff;
			datetimeRange.value = null
		} else {   // Filter time range
			datetimeRange.value = val;
			latestTime.value = ''
		}
	} else {
		datetimeRange.value = null
	}
	getClusterContainer()
}
//Processing ECharts data
const getData = (resource: any, params: any) => {
	const LineData: LineChartData = {
		xData: [],
		seriesData: []
	};
	if (!resource.data.result) return LineData
	let start = params.start_time
	let step = params.step
	const getResult = ((item: any) => {
		let result = []
		let end = item.values[0][0] - step
		for (let i = start; i <= end; i = i + step) {
			result.push(i)
		}
		result = result.map((value: any) => {
			return [value, null]
		})
		return [...result, ...item.values]
	})
	LineData.xData = Array.from(new Map(getResult(resource.data.result[0])).keys())
	LineData.seriesData = resource.data.result.map((item: any, index: number) => {
		return {
			name: getName(resource.metric_name),
			data: Array.from(new Map(getResult(item)).values()),
			type: 'line',
			smooth: true,
			areaStyle: {
				opacity: 0.4
			},
		}
	})
	return LineData
}
//Obtain cluster container data
const getClusterContainer = () => {
	const params = {
		start_time: datetimeRange.value ? new Date(datetimeRange.value[0]).getTime() / 1000 : new Date(dayjs().subtract(defaultdateRange.value[0], defaultdateRange.value[1] as any).format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
		end_time: datetimeRange.value ? new Date(datetimeRange.value[1]).getTime() / 1000 : new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
	}
	const step = Math.ceil((params.end_time - params.start_time) / 25)
	Object.assign(params, { step: step })
	useMonitorApi().getClusterContainer(params).then((res: any) => {
		res.data.forEach(((resource: any) => {
			if (resource.metric_name === "cluster_container_recive_bytes") {
				const data = getData(resource, params)
				if (state.containerBytesData.seriesData.length != 1) {
					state.containerBytesData = data
				} else {
					state.containerBytesData.seriesData.push(data.seriesData[0])
					state.containerBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_write_bytes") {
				const data = getData(resource, params)
				if (state.containerBytesData.seriesData.length != 1) {
					state.containerBytesData = data
				} else {
					state.containerBytesData.seriesData.push(data.seriesData[0])
					state.containerBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_memory_usage") {
				state.memoryUsageData = getData(resource, params)
			}
			if (resource.metric_name === "cluster_container_cpu_usage") {
				state.cpuUsageData = getData(resource, params)
			}
			if (resource.metric_name === "cluster_container_disk_usage") {
				state.diskUsageData = getData(resource, params)
			}
		}))
	})
}
const getName = (name: string) => {
	if (name === 'cluster_container_recive_bytes' || name === 'cluster_container_network_recive_drop_rate' || name === 'cluster_container_network_recive_error_rate') return '接收'
	if (name === 'cluster_container_write_bytes' || name === 'cluster_container_network_transmit_drop_rate' || name === 'cluster_container_network_transmit_error_rate') return '发送'
	return ''
}
const handle = () => {
	if (activeName.value === '容器健康监控') {
		getClusterContainer()
	}
}
watch(activeName, () => {
	handle()

}, { immediate: true })

watch(
	datetimeRange,
	val => {
		!val && (latestTime.value = '最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdateRange.value[0], 'second')).fromNow(true)]);
	},


);
</script>

<style scoped>
.content {
	height: calc(100% - 40px);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.echart {
	width: calc((100% - 15px) / 2);
	height: calc((100% - 30px) / 2);
	margin-top: 15px;
	padding: 0;
}

.container {
	position: relative;
	margin-left: 10px;

}




.container-time {
	position: absolute;
	top: 0;
	left: 0;
	width: 405px;
	height: 33px;
	z-index: 100px;
	background: #fff;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	border: 1px solid gray;
	border-radius: 5px;
}
</style>
