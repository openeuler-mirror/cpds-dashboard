<template>
	<div style="display: flex;">
		<div style="flex:0.9">
			<h4>集群物理资源监控</h4>
		</div>
		<div class="container">
			<el-date-picker ref="dateRef" style="margin-left: 5px;" class="mr10" v-model="datetimeRange"
				type="datetimerange" unlink-panels range-separator="-" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间"
				value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="shortcuts" @change="dateChange" />
			<div v-show="latestTime" class="container-time" @click="dateRef.focus()">{{ latestTime }}</div>
		</div>
	</div>
	<div class="line-container">
		<el-card class="echart">
			<Line :data="state.cpuUsageData" yUnit="%" title="CPU使用率 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.memoryUsageData" yUnit="%" title="内存使用率 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.diskIops" yUnit="%" title="节点磁盘iops"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.containerTotalData" title="容器总数 (个)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.containerRunningData" title="容器运行数 (个)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.diskUsageData" yUnit="%" title="磁盘使用率 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.diskNumData" title="磁盘吞吐量 (次)"></Line>
		</el-card>
		<el-card class="echart" style="width: 100%;">
			<Line :data="state.diskBytesData" yUnit="KB/s" title="磁盘吞吐"></Line>
		</el-card>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch, reactive, defineAsyncComponent, onMounted, inject } from 'vue'
import { timeNameMap } from '/@/utils/const';
import { dayjs } from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
const Line = defineAsyncComponent(() => import('/@/components/echarts/Line.vue'))
import { LineChartData } from '/@/types/index'
import { useMonitorApi } from '/@/api/monitor-warn/index'
import { shortcuts } from '/@/utils/const'
dayjs.extend(relativeTime);

interface DataState {
	memoryUsageData: LineChartData;
	containerTotalData: LineChartData;
	containerRunningData: LineChartData;
	cpuUsageData: LineChartData;
	diskUsageData: LineChartData;
	diskNumData: LineChartData;
	diskBytesData: LineChartData;
	diskIops: LineChartData;
}
const state = reactive<DataState>({
	memoryUsageData: {
		xData: [],
		seriesData: [],
	},
	containerTotalData: {
		xData: [],
		seriesData: [],
	},
	containerRunningData: {
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
	diskNumData: {
		xData: [],
		seriesData: [],
	},
	diskBytesData: {
		xData: [],
		seriesData: [],
	},
	diskIops: {
		xData: [],
		seriesData: [],
	},
})
const address = inject('address', ref());
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
	getNodeResource()
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
//Obtain node status information
const getNodeResource = () => {
	const params = {
		instance: address.value,
		start_time: datetimeRange.value ? new Date(datetimeRange.value[0]).getTime() / 1000 : new Date(dayjs().subtract(defaultdateRange.value[0], defaultdateRange.value[1] as any).format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
		end_time: datetimeRange.value ? new Date(datetimeRange.value[1]).getTime() / 1000 : new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
	}
	const step = Math.ceil((params.end_time - params.start_time) / 25)
	Object.assign(params, { step: step })
	useMonitorApi().getNodeResource(params).then((res) => {
		res.data.forEach((resource: any) => {
			if (resource.metric_name === "node_memory_usage") {
				state.memoryUsageData = getData(resource)
			}
			if (resource.metric_name === "node_container_total") {
				state.containerTotalData = getData(resource)
			}
			if (resource.metric_name === "node_container_running") {
				state.containerRunningData = getData(resource)
			}
			if (resource.metric_name === "node_cpu_usage") {
				state.cpuUsageData = getData(resource)
			}
			if (resource.metric_name === "node_disk_usage") {
				state.diskUsageData = getData(resource)
			}
			if (resource.metric_name === "node_disk_written_complete") {
				const data = getData(resource)
				if (state.diskNumData.seriesData.length != 1) {
					state.diskNumData = data
				} else {
					state.diskNumData.seriesData.push(data.seriesData[0])
					state.diskNumData.xData = data.xData
				}
			}
			if (resource.metric_name === "node_disk_read_bytes") {
				const data = getData(resource)
				if (state.diskBytesData.seriesData.length != 1) {
					state.diskBytesData = data
				} else {
					state.diskBytesData.seriesData.push(data.seriesData[0])
					state.diskBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "node_disk_written_bytes") {
				const data = getData(resource)
				if (state.diskBytesData.seriesData.length != 1) {
					state.diskBytesData = data
				} else {
					state.diskBytesData.seriesData.push(data.seriesData[0])
					state.diskBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "node_disk_read_complete") {
				const data = getData(resource)
				if (state.diskNumData.seriesData.length != 1) {
					state.diskNumData = data
				} else {
					state.diskNumData.seriesData.push(data.seriesData[0])
					state.diskNumData.xData = data.xData
				}
			}
		})
	})
}
const getName = (name: string) => {
	if (name === 'node_disk_read_complete' || name === 'node_disk_read_bytes') return '读'
	if (name === 'node_disk_written_complete' || name === 'node_disk_written_bytes') return '写'
	return ''
}
const handle = () => {
	if (activeName.value === '物理资源监控') {
		if (address.value) {
			getNodeResource()
		}
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
.echart {
	width: calc((100% - 15px) / 2);
	height: calc((100% - 30px) / 2);
	margin-top: 15px;
}

.container {
	position: relative;
	margin-left: 10px;

}

.line-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between
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
