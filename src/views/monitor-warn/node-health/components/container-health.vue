<template>
	<div class="container-health">
		<el-card class="table-wrap" shadow="never">
			<div class="operation mb15">
				<el-select class="width-150 mr10" v-model="state.containerTable.params.sort_field">
					<el-option v-for="item in moduleOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select><span :class="ascClick" style="cursor: pointer;" @click="sort('asc')">升序</span><span> |
				</span><span :class="descClick" style="cursor: pointer;" @click="sort('desc')">降序</span>
			</div>
			<el-table :data="state.containerTable.data" style="width: 100% ;" element-loading-text="数据加载中..."
				v-loading="state.containerTable.loading"
				:row-style="{ height: '50px', background: '#f8f8f8', padding: '0' }">
				<el-table-column label="容器名" width="180">
					<template #default="{ row }">
						<div class="cell" style="height: 50px;">
							<span class="iconfont icon-rongqi" style="font-size: 30px;"></span>
							<div style="margin-left: 10px;">
								<div style="color: #70b8fb;">
									{{ row.name }}
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="容器状态" width="180">
					<template #default="{ row }">
						<div class="cell">
							<div class="iconfont icon-dian" :style="statusColor(row.status)"> </div>
							{{ row.status }}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="CPU用量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ row.cpuUsage }}
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="内存用量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ row.memoryUsage }}
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="出站流量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ row.outbound }}
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="入站流量">
					<template #default="{ row }">
						<div class="cell">
							<div>
								{{ row.inbound }}
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
			sort_field: string,
			sort_order: string
		}
	}

}
const state = reactive<ContainerState>({
	containerTable: {
		loading: false,
		data: [],
		params: {
			instance: '',
			sort_field: 'name',
			sort_order: 'asc'
		}
	}
})
const address = inject('address', ref());
const activeName = inject('activeName', ref());
const ascClick = ref('confirm')
const descClick = ref('')
//Change sorting status
const sort = (order: string) => {
	if (order === 'asc') {
		ascClick.value = 'confirm'
		descClick.value = ''
		state.containerTable.params.sort_order = order
	} else {
		ascClick.value = ''
		descClick.value = 'confirm'
		state.containerTable.params.sort_order = order
	}
}
//Obtain node container data
const getContainerList = () => {
	state.containerTable.loading = true
	state.containerTable.params.instance = address.value
	useMonitorApi().getNodeContainer(state.containerTable.params).then((res) => {
		state.containerTable.data = res.data.records
	}).finally(() => {
		state.containerTable.loading = false
	})
}
const handle = () => {
	if (activeName.value === '容器健康监控') {
		if (address.value) {
			getContainerList()
		}
	}
}
const statusColor = computed(() => (status: string) => {
	switch (status) {
		case 'iowaiting':
			return "font-size: 30px;color: red";
		case 'stopped':
			return "font-size: 30px;color: #c6c8c5";
		case '正常':
			return "font-size: 30px;color: #51c41b";
	}
});
watch(() => [state.containerTable.params.sort_field, state.containerTable.params.sort_order], () => {
	getContainerList()
})
watch(activeName, () => {
	handle()

}, { immediate: true })
const moduleOptions: SelectOptionType[] = [
	{
		label: '容器名称',
		value: 'name',
	},
	{
		label: '容器状态',
		value: 'status',
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