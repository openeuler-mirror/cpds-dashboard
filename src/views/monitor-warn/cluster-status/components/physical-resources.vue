<template>
	<div style="display: flex;padding-top: 10px;padding-left: 15px;">
		<div style="flex:0.9">
			<h2>集群物理资源监控</h2>
		</div>
		<div style="display: flex;align-items: center;">
			<span style="font-size: 15px;">查询时间范围:</span>
		</div>
		<div class="container">
			<el-date-picker ref="dateRef" style="margin-left: 5px;" class="mr10" v-model="datetimeRange"
				type="datetimerange" unlink-panels range-separator="-" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间"
				value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="shortcuts" @change="dateChange" />
			<div v-show="latestTime" class="container-time" @click="dateRef.focus()">{{ latestTime }}</div>
		</div>
	</div>
	<div style="display: flex; flex-wrap: wrap;justify-content:space-between">
		<el-card class="echart">
			<Line :data="state.cpuUsageData" yUnit="%" title="集群总CPU使用率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.memoryUsageData" yUnit="%" title="集群总内存使用率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.diskUsageData" yUnit="%" title="集群总磁盘使用率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.iowait" yUnit="%" title="集群iowait"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.netIops" title="网络iops"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.netRate" yUnit="KB/s" title="网络速率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.netDropRate" yUnit="%" title="网络丢包率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.netErrorRate" yUnit="%" title="网络错误率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.retransmRate" yUnit="%" title="网络重传率"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.diskBytesData" yUnit="KB/s" title="集群总磁盘吞吐速率"></Line>
		</el-card>
		<el-card class="echart" style="width: 100%;">
			<Line :data="state.diskNumData" yUnit="次/s" title="磁盘iops"></Line>
		</el-card>

	</div>
</template>
<script lang="ts" setup>
import { ref, watch, reactive, computed, defineAsyncComponent, inject } from 'vue'
import { timeNameMap } from '/@/utils/const';
import { dayjs } from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
const Line = defineAsyncComponent(() => import('/@/components/echarts/Line.vue'))
import { useMonitorApi } from '/@/api/monitor-warn/index'
import { LineChartData } from '/@/types/index'
import { shortcuts } from '/@/utils/const'
dayjs.extend(relativeTime);

interface DataState {
	diskBytesData: LineChartData;
	diskUsageData: LineChartData;
	cpuUsageData: LineChartData;
	diskNumData: LineChartData;
	memoryUsageData: LineChartData;
	netDropRate: LineChartData;
	netErrorRate: LineChartData
	retransmRate: LineChartData
	netIops: LineChartData
	netRate: LineChartData
	iowait: LineChartData
}
const state = reactive<DataState>({
	diskBytesData: {
		xData: [],
		seriesData: [],
	},
	diskUsageData: {
		xData: [],
		seriesData: [],
	},
	cpuUsageData: {
		xData: [],
		seriesData: [],
	},
	diskNumData: {
		xData: [],
		seriesData: [],
	},
	memoryUsageData: {
		xData: [],
		seriesData: [],
	},
	netDropRate: {
		xData: [],
		seriesData: [],
	},
	netErrorRate: {
		xData: [],
		seriesData: [],
	},
	retransmRate: {
		xData: [],
		seriesData: [],
	},
	netIops: {
		xData: [],
		seriesData: [],
	},
	netRate: {
		xData: [],
		seriesData: [],
	},
	iowait: {
		xData: [],
		seriesData: [],
	}
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
	getClusterResource()
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
//Obtain cluster resource data
const getClusterResource = () => {
	const params = {
		start_time: datetimeRange.value ? new Date(datetimeRange.value[0]).getTime() / 1000 : new Date(dayjs().subtract(defaultdateRange.value[0], defaultdateRange.value[1] as any).format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
		end_time: datetimeRange.value ? new Date(datetimeRange.value[1]).getTime() / 1000 : new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
	}
	const step = Math.ceil((params.end_time - params.start_time) / 25)
	Object.assign(params, { step: step })
	useMonitorApi().getClusterResource(params).then((res: any) => {
		res.data.forEach(((resource: any) => {
			if (resource.metric_name === "cluster_disk_read_bytes") {
				const data = getData(resource, params)
				if (state.diskBytesData.seriesData.length != 1) {
					state.diskBytesData = data
				} else {
					state.diskBytesData.seriesData.push(data.seriesData[0])
					state.diskBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_disk_usage") {
				state.diskUsageData = getData(resource, params)
			}
			if (resource.metric_name === "cluster_cpu_usage") {
				state.cpuUsageData = getData(resource, params)
			}
			if (resource.metric_name === "cluster_disk_read_complete") {
				const data = getData(resource, params)
				if (state.diskNumData.seriesData.length != 1) {
					state.diskNumData = data
				} else {
					state.diskNumData.seriesData.push(data.seriesData[0])
					state.diskNumData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_disk_written_complete") {
				const data = getData(resource, params)
				if (state.diskNumData.seriesData.length != 1) {
					state.diskNumData = data
				} else {
					state.diskNumData.seriesData.push(data.seriesData[0])
					state.diskNumData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_memory_usage") {
				state.memoryUsageData = getData(resource, params)
			}
			if (resource.metric_name === "cluster_disk_written_bytes") {
				const data = getData(resource, params)
				if (state.diskBytesData.seriesData.length != 1) {
					state.diskBytesData = data
				} else {
					state.diskBytesData.seriesData.push(data.seriesData[0])
					state.diskBytesData.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_network_drop_rate") {
				state.netDropRate = getData(resource, params)
			}
			if (resource.metric_name === "cluster_network_recive_error_rate") {
				const data = getData(resource, params)
				if (state.netErrorRate.seriesData.length != 1) {
					state.netErrorRate = data
				} else {
					state.netErrorRate.seriesData.push(data.seriesData[0])
					state.netErrorRate.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_network_transmit_error_rate") {
				const data = getData(resource, params)
				if (state.netErrorRate.seriesData.length != 1) {
					state.netErrorRate = data
				} else {
					state.netErrorRate.seriesData.push(data.seriesData[0])
					state.netErrorRate.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_retransm_rate") {
				state.retransmRate = getData(resource, params)
			}
			if (resource.metric_name === "cluster_network_receive_iops") {
				const data = getData(resource, params)
				if (state.netIops.seriesData.length != 1) {
					state.netIops = data
				} else {
					state.netIops.seriesData.push(data.seriesData[0])
					state.netIops.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_network_transmit_iops") {
				const data = getData(resource, params)
				if (state.netIops.seriesData.length != 1) {
					state.netIops = data
				} else {
					state.netIops.seriesData.push(data.seriesData[0])
					state.netIops.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_network_recive_bytes") {
				const data = getData(resource, params)
				if (state.netRate.seriesData.length != 1) {
					state.netRate = data
				} else {
					state.netRate.seriesData.push(data.seriesData[0])
					state.netRate.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_network_transmit_bytes") {
				const data = getData(resource, params)
				if (state.netRate.seriesData.length != 1) {
					state.netRate = data
				} else {
					state.netRate.seriesData.push(data.seriesData[0])
					state.netRate.xData = data.xData
				}
			}
			if (resource.metric_name === "cluster_cpu_iowait") {
				state.iowait = getData(resource, params)
			}
		}))
	})
}
const getName = (name: string) => {
	if (name === 'cluster_disk_read_bytes' || name === 'cluster_disk_read_complete') return '读'
	if (name === 'cluster_disk_written_bytes' || name === 'cluster_disk_written_complete') return '写'
	if (name === 'cluster_network_recive_error_rate' || name === 'cluster_network_receive_iops' || name === 'cluster_network_recive_bytes') return '接收'
	if (name === 'cluster_network_transmit_error_rate' || name === 'cluster_network_transmit_iops' || name === 'cluster_network_transmit_bytes') return '发送'
	return ''
}
const handle = () => {
	if (activeName.value === '物理资源监控') {
		getClusterResource()

	}
}
watch(
	datetimeRange,
	val => {
		!val && (latestTime.value = '最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdateRange.value[0], 'second')).fromNow(true)]);
	},
);
watch(activeName, () => {
	handle()
}, { immediate: true })


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
