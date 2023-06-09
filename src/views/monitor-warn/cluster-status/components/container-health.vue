<template>
	<div>
		<div style="display: flex;padding-top: 10px;padding-left: 15px;">
			<div style="flex:0.9">
				<h4>容器健康监控</h4>
			</div>
			<div class="container">
				<el-date-picker ref="dateRef" style="margin-left: 5px;" class="mr10" v-model="datetimerange"
					type="datetimerange" unlink-panels range-separator="-" start-placeholder="请选择开始时间"
					end-placeholder="请选择结束时间" value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="shortcuts"
					@change="dateChange" />
				<div v-show="latestTime" class="container-time" @click="dateRef.focus()">{{ latestTime }}</div>
			</div>
		</div>
		<div style="display: flex; flex-wrap: wrap;justify-content:space-between">
			<el-card class="echart">
				<Line :data="state.cpuData" title="集群容器状态"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.cpuData" title="容器内存使用率 (%)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.cpuData" title="容器CPU使用率 (%)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.cpuData" title="容器网络流量 (KB)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.cpuData" title="容器网络丢包率 (%)"></Line>
			</el-card>
			<el-card class="echart">
				<Line :data="state.cpuData" title="容器网络错误率 (%)"></Line>
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
	cpuData: LineChartData;
	memoryData: LineChartData;
}
const state = reactive<DataState>({
	cpuData: {
		xData: [],
		seriesData: [],
	},
	memoryData: {
		xData: [],
		seriesData: [],
	},
})
const activeName = inject('activeName', ref());
const datetimerange = ref()
const dateRef = ref()
const defaultdaterange = ref<[number, string]>([5 * 60, 'second']);
const latestTime = ref('最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdaterange.value[0], 'second')).fromNow(true)]);
const dateChange = (val: any) => {
	if (val) {
		if (dayjs(val[1]).diff(new Date(), 'second') == 0) {  // relative time range
			const diff = dayjs(val[1]).diff(val[0], 'second');
			defaultdaterange.value[0] = diff;
			datetimerange.value = null
		} else {   // Filter time range
			datetimerange.value = val;
			latestTime.value = ''
		}
	} else {
		datetimerange.value = null
	}
	getClusterContainer()
}
//Processing ECharts data
const getData = (resource: any) => {
	const LineData: LineChartData = {
		xData: [],
		seriesData: []
	};
	LineData.xData = Array.from(new Map(resource.data.result[0].values).keys())
	LineData.seriesData = resource.data.result.map((item: any, index: number) => {
		return {
			name: item.metric.instance,
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
		start_time: datetimerange.value ? new Date(datetimerange.value[0]).getTime() / 1000 : new Date(dayjs().subtract(defaultdaterange.value[0], defaultdaterange.value[1] as any).format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
		end_time: datetimerange.value ? new Date(datetimerange.value[1]).getTime() / 1000 : new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
	}
	const step = Math.ceil((params.end_time - params.start_time) / 25)
	Object.assign(params, { step: step })
	useMonitorApi().getClusterContainer(params).then((res: any) => {
		res.forEach(((resource: any) => {
			if (resource.metric_name === "cpu_usage") {
				state.cpuData = getData(resource)
			}
			if (resource.metric_name === "memory_usage") {
				state.memoryData = getData(resource)
			}
		}))
	})
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
	datetimerange,
	val => {
		!val && (latestTime.value = '最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdaterange.value[0], 'second')).fromNow(true)]);
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
