<template>
	<div class="container-health">
		<el-card class="table-wrap" shadow="never">
			<div class="operation mb15">
				<el-select class="width-150 mr10" v-model="sort_field">
					<el-option v-for="item in moduleOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select><span :class="ascClick" style="cursor: pointer;" @click="sort('asc')">升序</span><span> |
				</span><span :class="descClick" style="cursor: pointer;" @click="sort('desc')">降序</span>
			</div>
			<el-table :data="state.containerTable.data" style="width: 100% ;" element-loading-text="数据加载中..."
				v-loading="state.containerTable.loading"
				:row-style="{ height: '50px', background: '#f8f8f8', padding: '0' }">
				<el-table-column label="容器名">
					<template #default="{ row }">
						<div class="cell" style="height: 150px;">
							<span class="iconfont icon-rongqi" style="font-size: 30px;"></span>
							<div style="margin-left: 10px;">
								<div style="color: #70b8fb;">
									{{ row.name }}
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="容器状态">
					<template #default="{ row }">
						<div class="cell">
							<div class="iconfont icon-dian" :style="statusColor(row.status)"> </div>
							{{ getStatus(row.status) }}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="CPU用量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ getUsed('cpu', row.cpuUsage) }}
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="内存用量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ getUsed('memory', row.memoryUsage) }}
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="出站流量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ getUsed('outbound', row.outbound) }}
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="入站流量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ getUsed('inbound', row.inbound) }}
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

	</div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, inject, watch } from 'vue';
import { useMonitorApi } from '/@/api/monitor-warn/index'

export interface ContainerData {
	name: string;
	status: string;
	cpuUsage: number;
	memoryUsage: number;
	outbound: number;
	inbound: number;

}
interface ContainerState {
	containerTable: {
		loading: boolean;
		data: ContainerData[];
		params: {
			instance: string,
		}
	}

}
const state = reactive<ContainerState>({
	containerTable: {
		loading: false,
		data: [],
		params: {
			instance: '',
		}
	}
})
const address = inject('address', ref());
const activeName = inject('activeName', ref());
const ascClick = ref('')
const descClick = ref('confirm')
const sort_field = ref('status')
const order = ref('desc')
//Change sorting status
const sort = (value: string) => {
	order.value = value
	if (order.value === 'asc') {
		ascClick.value = 'confirm'
		descClick.value = ''
		if (sort_field.value === 'status') {
			state.containerTable.data.sort((a, b) => (a.status >= b.status ? 1 : -1))
		} else {
			state.containerTable.data.sort((a, b) => (a.name >= b.name ? 1 : -1))
		}
	} else {
		ascClick.value = ''
		descClick.value = 'confirm'
		if (sort_field.value === 'status') {
			state.containerTable.data.sort((a, b) => (a.status <= b.status ? 1 : -1))
		} else {
			state.containerTable.data.sort((a, b) => (a.name <= b.name ? 1 : -1))
		}
	}
}
//Obtain node container data
const getContainerList = () => {
	state.containerTable.loading = true
	state.containerTable.params.instance = address.value
	useMonitorApi().getNodeContainer(state.containerTable.params).then((res) => {
		const containerDataList = <ContainerData[]>[]
		res.data.forEach(({ metric_name, data }: any) => {
			if (metric_name === 'node_container_status') {
				for (let i = 0; i < data.result.length; i++) {
					const container = <ContainerData>{
						name: '',
						status: '',
						cpuUsage: 0,
						memoryUsage: 0,
						outbound: 0,
						inbound: 0,
					}
					const containerID = data.result[i].metric.container
					res.data.forEach(({ metric_name, data }: any) => {
						const resultArray = data.result
						if (metric_name === 'node_container_memory_used') {
							resultArray.forEach(({ metric, value }: any) => {
								if (metric.container === containerID) {
									container.memoryUsage = value[1]
								}
							})
						}
						if (resultArray && metric_name === 'node_container_outbound_traffic') {
							resultArray.forEach(({ metric, value }: any) => {
								if (metric.container === containerID) {
									container.outbound = value[1]
								}
							})
							if (!container.outbound) {
								container.outbound = 0
							}
						}
						if (resultArray && metric_name === 'node_container_inbound_traffic') {
							resultArray.forEach(({ metric, value }: any) => {
								if (metric.container === containerID) {
									container.inbound = value[1]
								}
							})
							if (!container.inbound) {
								container.inbound = 0
							}
						}
						if (metric_name === 'node_container_cpu_usage') {
							resultArray.forEach(({ metric, value }: any) => {
								if (metric.container === containerID) {
									container.cpuUsage = value[1]
								}
							})
							if (!container.cpuUsage) {
								container.cpuUsage = 0
							}
						}
						if (metric_name === 'node_container_status') {
							container.status = resultArray[i].metric.state
							container.name = resultArray[i].metric.container
						}
					})
					containerDataList.push(container)
				}
				state.containerTable.data = containerDataList
			}
		})

	}).finally(() => {
		state.containerTable.loading = false
		sort("desc")
	})
}

const getUsed = computed(() => (type: string, used: any) => {
	used = parseFloat(used)
	if (type === 'cpu') {
		return (used * 100).toFixed(2) + ' %'
	}
	if (type === 'memory') {
		if (used > 1024 * 1024 * 1024) return (used / Math.pow(1024, 3)).toFixed(1) + ' GB';
		if (used > 1024 * 1024) return (used / Math.pow(1024, 2)).toFixed(1) + ' MB';
		return (used / Math.pow(1024, 1)).toFixed(1) + ' KB';
	}
	if (type === 'inbound') {
		if (used > 1024 * 1024 * 1024) return (used / Math.pow(1000, 3)).toFixed(1) + ' GB';
		if (used > 1024 * 1024) return (used / Math.pow(1000, 2)).toFixed(1) + ' MB';
		return (used / Math.pow(1024, 1)).toFixed(1) + ' KB';
	}
	if (type === 'outbound') {
		if (used > 1024 * 1024 * 1024) return (used / Math.pow(1000, 3)).toFixed(1) + ' GB';
		if (used > 1024 * 1024) return (used / Math.pow(1000, 2)).toFixed(1) + ' MB';
		return (used / Math.pow(1024, 1)).toFixed(1) + ' KB';
	}
})



const handle = () => {
	if (activeName.value === '容器健康监控') {
		if (address.value) {
			getContainerList()
		}
	}
}
const statusColor = computed(() => (status: string) => {
	switch (status) {
		case 'paused':
			return "font-size: 30px;color: #909399";
		case 'created':
			return "font-size: 30px;color: #E6A23C";
		case 'exited':
			return "font-size: 30px;color: #909399"
		case 'running':
			return "font-size: 30px;color: #67C23A";
	}
});
const getStatus = computed(() => (status: string) => {
	switch (status) {
		case 'running':
			return "运行中"
		case 'created':
			return "已创建";
		case 'exited':
			return "停止等待"
		case 'paused':
			return "暂停"
	}
})
watch(() => sort_field.value, () => {
	sort(order.value)
})
watch(activeName, () => {
	handle()

}, { immediate: true })
const moduleOptions: SelectOptionType[] = [
	{
		label: '容器状态',
		value: 'status',
	},
	{
		label: '容器名称',
		value: 'name',
	},
];

</script>

<style scoped>
.confirm {
	color: #5c8eec;
}

.container-health {
	margin-top: 30px;
}

.cell {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 15px;
}

::v-deep .el-table__body {
	-webkit-border-vertical-spacing: 15px;
}

::v-deep .el-table::before {
	height: 0;
}

::v-deep .el-table__row>td {
	border: none;
}
</style>