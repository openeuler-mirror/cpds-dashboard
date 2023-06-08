<template>
	<div class="aa" style="display: flex;padding: 20px;flex-wrap: wrap;">
		<el-card style="flex: 1 1 40%;">
			<h3>节点详情</h3>
			<div style="display: flex;align-items: center; margin-bottom: 30px; margin-top: 10px;">
				<span class="iconfont icon-fuwuqiguanli" style="font-size: 40px;"></span>
				<div style="font-size: larger;margin-left: 20px;">{{ address }}</div>
			</div>
			<table style="font-size: 30px;">
				<tr>
					<td>ip地址:</td>
					<td>{{ overViewInfo.nodeInfo[0].instance }}</td>
				</tr>
				<tr>
					<td>操作系统版本:</td>
					<td>{{ overViewInfo.nodeInfo[0].os_version }}</td>
				</tr>
				<tr>
					<td>内核版本:</td>
					<td>{{ overViewInfo.nodeInfo[0].kernal_version }}</td>
				</tr>
				<tr>
					<td>cpds-agent版本:</td>
					<td>{{ overViewInfo.nodeInfo[0].arch }}</td>
				</tr>
			</table>
		</el-card>
		<div style="flex: 1 1 60%;">
			<el-card>
				<Pie :data="state.overViewInfo.container"></Pie>
			</el-card>
			<el-card>
				<div style="display: flex;">
					<div style="flex:0 1 30%; margin-top: 50px;">
						<Usage style="margin-bottom: 30px;cursor: pointer;" name="CPU" unit="core" :data="overViewInfo.cpu"
							@click="changeLine('cpu')"></Usage>
						<Usage style="margin-bottom: 30px;cursor: pointer;" name="内存" unit="Gi" :data="overViewInfo.memory"
							@click="changeLine('memory')"></Usage>
						<Usage style="margin-bottom: 30px;cursor: pointer;" name="磁盘" unit="GB" :data="overViewInfo.disk"
							@click="changeLine('disk')">
						</Usage>
					</div>
					<div style="flex:0 1 70%">
						<Line :data="lineChart.lineData"></Line>
					</div>
				</div>

			</el-card>
		</div>
	</div>
</template>
<script lang="ts" setup>

import { defineAsyncComponent, reactive, ref, inject, watch, toRefs } from 'vue';

import { useMonitorApi } from '/@/api/monitor-warn/index'
import { AwrnStateInterface } from '../../interface/index'
import Line from '/@/components/echarts/Line.vue';
import { LineChartData } from '/@/types/index'
const Usage = defineAsyncComponent(() => import('/@/components/usage/index.vue'))
//import Pie from '/@/components/echarts/pie.vue'
const Pie = defineAsyncComponent(() => import('/@/components/echarts/pie.vue'))

interface DataState {
	lineData: LineChartData;

}
const lineChart = reactive<DataState>({
	lineData: {
		xData: [],
		seriesData: [],
	},

})
const address = inject('address', ref());
const activeName = inject('activeName', ref());
const lineName = ref('node_cpu_usage')
const state = reactive<AwrnStateInterface>({
	overViewInfo: {
		nodeInfo: [{
			instance: '',
			os_version: '',
			kernal_version: '',
			arch: ''

		}],
		container: {
			running: 0,
			total: 0
		},
		cpu: {
			usage: 0,
			used_core: 0,
			total_core: 0
		},
		memory: {
			usage: 0,
			used_bytes: 0,
			total_bytes: 0
		},
		disk: {
			usage: 0,
			used_bytes: 0,
			total_bytes: 0
		}
	},
})
const { overViewInfo } = toRefs(state)
//Changing the ECharts chart
const changeLine = (name: string) => {
	if (name === 'cpu') {
		lineName.value = 'node_cpu_usage'
	}
	if (name === 'memory') {
		lineName.value = 'node_memory_usage'
	}
	if (name === 'disk') {
		lineName.value = 'node_disk_usage'
	}
	getNodeResource(address.value)
	getContainer(address.value)
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
//Obtain detailed information
const getNodeInfo = async (address: string) => {
	useMonitorApi().getNodeInfo({ instance: address }).then((res: any) => {
		overViewInfo.value.nodeInfo = res.data
	})
}
//Obtain node containers and node usage
const getContainer = async (address: string) => {
	useMonitorApi().getNodeList({ instance: address }).then((res) => {
		overViewInfo.value.container = res.data[0].container
		overViewInfo.value.cpu = res.data[0].cpu
		overViewInfo.value.memory = res.data[0].memory
		overViewInfo.value.disk = res.data[0].disk
	})
}
//Obtaining Node Information and Rendering Charts
const getNodeResource = (address: string) => {
	useMonitorApi().getNodeResource({ instance: address }).then((res) => {
		res.data.forEach(((resource: any) => {
			if (lineName.value === "node_cpu_usage" && resource.metric_name === "node_cpu_usage") {
				lineChart.lineData = getData(resource)
			}
			if (lineName.value === "node_memory_usage" && resource.metric_name === "node_memory_usage") {
				lineChart.lineData = getData(resource)
			}
			if (lineName.value === "node_disk_usage" && resource.metric_name === "node_disk_usage") {
				lineChart.lineData = getData(resource)
			}
		}))
	})
}
const handle = async () => {
	if (activeName.value === '概览') {
		if (address.value) {
			await getNodeInfo(address.value)
			await getContainer(address.value)
			getNodeResource(address.value)
		}
	}
}
watch(activeName, () => {
	handle()

}, { immediate: true })

</script>
<style scoped>
table {
	width: 100%;


}

td {
	vertical-align: middle;
	width: 80%;
}

@media(min-width: 1500px) {
	.aa {
		flex-wrap: nowrap !important;
	}
}


td:last-child {
	text-align: left;
}

tr {
	height: 150px;
}
</style>
