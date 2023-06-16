<template>
	<div>
		<div style="display: flex;padding-top: 10px;padding-left: 15px;">
			<div style="flex:0.9">
				<h4>容器健康监控</h4>
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
				<Line :data="state.cpuUsageData" yUnit="%" title="容器CPU使用 (%)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.runningData" title="运行容器 (个)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.notRunningData" title="停止容器 (个)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.containerBytesData" yUnit="KB" title="容器流量"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.memoryUsageData" yUnit="%" title="容器内存使用 (%)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.netErrorRateData" yUnit="%" title="容器网络错误率 (%)"></Line>
			</el-card>
			<el-card class="echart" style="width: 100%;">
				<Line :data="state.netDropRateData" yUnit="%" title="容器网络丢包率 (%)"></Line>
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
	netDropRateData: LineChartData;
	runningData: LineChartData;
	notRunningData: LineChartData;
	containerBytesData: LineChartData;
	netErrorRateData: LineChartData;
	memoryUsageData: LineChartData;
	cpuUsageData: LineChartData;
}
const state = reactive<DataState>({
	netDropRateData: {
		xData: [],
		seriesData: [],
	},
	runningData: {
		xData: [],
		seriesData: [],
	},
	notRunningData: {
		xData: [],
		seriesData: [],
	},
	containerBytesData: {
		xData: [],
		seriesData: [],
	},
	netErrorRateData: {
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
const getData = (resource: any) => {
	const LineData: LineChartData = {
		xData: [],
		seriesData: []
	};
	if (!resource.data.result) return LineData
	LineData.xData = Array.from(new Map(resource.data.result[0].values).keys())
	LineData.seriesData = resource.data.result.map((item: any, index: number) => {
		return {
			name: getName(resource.metric_name),
			data: Array.from(new Map(item.values).values()),
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
			if (resource.metric_name === "cluster_container_network_transmit_drop_rate") {
				const data = getData(resource)
				if (state.netDropRateData.seriesData.length != 1) {
					state.netDropRateData = data
				} else {
					state.netDropRateData.seriesData.push(data.seriesData[0])
					state.netDropRateData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_running") {
				state.runningData = getData(resource)
			}
			if (resource.metric_name === "cluster_container_not_running") {
				state.notRunningData = getData(resource)
			}
			if (resource.metric_name === "cluster_container_recive_bytes") {
				const data = getData(resource)
				if (state.containerBytesData.seriesData.length != 1) {
					state.containerBytesData = data
				} else {
					state.containerBytesData.seriesData.push(data.seriesData[0])
					state.containerBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_network_recive_error_rate") {
				const data = getData(resource)
				if (state.netErrorRateData.seriesData.length != 1) {
					state.netErrorRateData = data
				} else {
					state.netErrorRateData.seriesData.push(data.seriesData[0])
					state.netErrorRateData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_write_bytes") {
				const data = getData(resource)
				if (state.containerBytesData.seriesData.length != 1) {
					state.containerBytesData = data
				} else {
					state.containerBytesData.seriesData.push(data.seriesData[0])
					state.containerBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_memory_usage") {
				state.memoryUsageData = getData(resource)
			}
			if (resource.metric_name === "cluster_container_network_recive_drop_rate") {
				const data = getData(resource)
				if (state.netDropRateData.seriesData.length != 1) {
					state.netDropRateData = data
				} else {
					state.netDropRateData.seriesData.push(data.seriesData[0])
					state.netDropRateData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_network_transmit_error_rate") {
				const data = getData(resource)
				if (state.netErrorRateData.seriesData.length != 1) {
					state.netErrorRateData = data
				} else {
					state.netErrorRateData.seriesData.push(data.seriesData[0])
					state.netErrorRateData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_container_cpu_usage") {
				state.cpuUsageData = getData(resource)
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
