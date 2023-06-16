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
	<div style="display: flex; flex-wrap: wrap;justify-content:space-between">
		<el-card class="echart">
			<Line :data="state.cpuData" title="CPU用量 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.cpuData" title="CPU用量 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.cpuData" title="CPU用量 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.cpuData" title="CPU用量 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.cpuData" title="CPU用量 (%)"></Line>
		</el-card>
		<el-card class="echart">
			<Line :data="state.cpuData" title="CPU用量 (%)"></Line>
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
//Obtain node status information
const getNodeResource = () => {
	const params = {
		instance: address,
		start_time: datetimeRange.value ? new Date(datetimeRange.value[0]).getTime() / 1000 : new Date(dayjs().subtract(defaultdateRange.value[0], defaultdateRange.value[1] as any).format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
		end_time: datetimeRange.value ? new Date(datetimeRange.value[1]).getTime() / 1000 : new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
	}
	const step = Math.ceil((params.end_time - params.start_time) / 25)
	Object.assign(params, { step: step })
	useMonitorApi().getNodeResource(params).then((res) => {
		res.data.forEach(((resource: any) => {
			if (resource.metric_name === "node_cpu_usage") {
				state.cpuData = getData(resource)
			}
			if (resource.metric_name === "memory_usage") {
				state.memoryData = getData(resource)
			}
		}))
	})
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
