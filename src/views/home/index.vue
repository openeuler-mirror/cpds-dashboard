<template>
	<el-card>
		<div style="display: flex;justify-content: space-between;margin: 20px 5% 0 5%">
			<el-card class="content">
				<div style="flex:0 1 50%;">
					<h2>容器健康状态</h2>
					<div style="display: flex;margin-top: 50px;margin-left: 20px; ">
						<el-progress type="circle" :percentage="numContainer" :width="150" :height="150" stroke-width="9"
							color="#51c41b">
							<template #default="{ percentage }">
								<span class="percentage-value">{{ containerProgress.upNum }}/{{ containerProgress.total
								}}</span>
							</template>
						</el-progress>
						<div style="display: flex;align-items: center;margin-left: 20%;font-size: 20px;">
							<div>
								<p>全部容器：</p>
								<p>运行中的容器：</p>
								<p>停止的容器：</p>
							</div>
							<div style="margin-left: 20px;">
								<p>{{ containerProgress.total }}</p>
								<p>{{ containerProgress.upNum }}</p>
								<p>{{ containerProgress.total - containerProgress.upNum }}</p>
							</div>
						</div>
					</div>
				</div>
				<div style="flex:0 1 50%;margin-top: 20%;">
					<h2>集群节点状态</h2>
					<div style="display: flex;margin-top: 10px;margin-left: 20px; ">
						<el-progress type="circle" :percentage="numNode" :width="150" :height="150" stroke-width="9"
							color="#51c41b">
							<template #default="{ percentage }">
								<span class="percentage-value">{{ nodeProgress.upNum }}/{{ nodeProgress.total
								}}</span>
							</template>
						</el-progress>
						<div style="display: flex;align-items: center;margin-left: 20%;font-size: 20px;">
							<div>
								<p>全部节点：</p>
								<p>在线节点：</p>
								<p>离线节点：</p>
							</div>
							<div style="margin-left: 20px;">
								<p>{{ nodeProgress.total }}</p>
								<p>{{ nodeProgress.upNum }}</p>
								<p>{{ nodeProgress.total - nodeProgress.upNum }}</p>
							</div>
						</div>
					</div>
				</div>
			</el-card>
			<el-card class="content">
				<h2>集群资源用量</h2>
				<el-card>
					<ClusterResource style="margin-top: 5px
					;max-width: 550px;margin: 0 auto;" :data="overViewInfo.cpu" name="CPU">
					</ClusterResource>
					<ClusterResource style="margin-top: 5px
					;max-width: 550px;margin: 0 auto;" :data="overViewInfo.memory" name="内存">
					</ClusterResource>
					<ClusterResource style="margin-top: 5px
					;max-width: 550px;margin: 0 auto;" :data="overViewInfo.disk" name="磁盘">
					</ClusterResource>
				</el-card>
				<el-card style="margin-top: 10px;">
					<el-table :data="nodeList?.slice(0, 3)"
						style="width: 100% ;min-height: 220px; font-size: 20px;font-style:oblique"
						:row-style="{ height: '50px', background: '#f8f8f8', padding: '0' }">
						<el-table-column label="节点">
							<template #default="{ row }">
								<div class="cell" style="height: 50px;">
									<span class="iconfont icon-fuwuqiguanli" style="font-size: 40px;"></span>
									<div style="margin-left: 5px;">
										<div>
											<span>
												{{ row.instance.split(':')[0] }}
											</span>
										</div>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="状态" width="180">
							<template #default="{ row }">
								<div class="cell">
									<el-tag class="ml-2" :type="tagColor(row.status)">{{ getLevel(row.status) }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="运行容器数">
							<template #default="{ row }">
								<div class="cell">
									{{ row.container.running }}/{{ row.container.total }}
								</div>
							</template>
						</el-table-column>
					</el-table>
					<div style="width: 100%;background: #f8f8f8;">
						<div style="text-align: center;line-height: 3;letter-spacing: 5px;cursor: pointer;margin-top: 20px;font-size: 20px;color:#ababa8;font-style: oblique;"
							@click="jumpNodeData">
							查看更多</div>
					</div>
				</el-card>
			</el-card>

		</div>
		<div style="margin: 20px 5% 0 5%">
			<el-card>
				<h2 style="margin-bottom: 30px;">诊断结果</h2>
				<el-table :data="diagnostic.DiagnosticList" style="width: 100% ;min-height: 300px;font-size: 20px;"
					:row-style="{ height: '50px', background: '#f8f8f8', padding: '0' }">
					<el-table-column label="触发规则">
						<template #default="{ row }">
							<div class="cell" style="height: 50px;">
								<span class="iconfont icon-jiankangzhenduan" style="font-size: 40px;"></span>
								<div style="margin-left: 5px;">
									<div>
										<span>
											{{ row.rule_name }}
										</span>
									</div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="当前状态">
						<template #default="{ row }">
							<div class="cell">
								<div class="iconfont icon-dian" :style="statusColor(row.status)"> </div>
								{{
									row.status === 'subhealth'
									? '亚健康' : '故障' }}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="触发时间">
						<template #default="{ row }">
							<div class="cell">
								{{ formatDate(new
									Date(row.create_time * 1000), 'YYYY-mm-dd HH:MM:SS') }}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="更新时间">
						<template #default="{ row }">
							<div class="cell">
								{{ formatDate(new
									Date(row.update_time * 1000), 'YYYY-mm-dd HH:MM:SS') }}
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div style="width: 100%;background: #f8f8f8;margin-top: 50px;">
					<div style="text-align: center;line-height: 3;letter-spacing: 5px;cursor: pointer;font-size: 20px;color:#ababa8;font-style: oblique;"
						@click="jumpDiagnosticData">
						查看更多</div>
				</div>
			</el-card>

		</div>

	</el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, reactive, toRefs, watch, defineAsyncComponent } from 'vue';
import { InstanceListInterface } from '/@/views/monitor-warn/interface/index'
import { useMonitorApi } from '/@/api/monitor-warn/index'
import ClusterResource from './components/index.vue'
import router from '/@/router';
import { ResultInterface } from '/@/views/health-diagnosis/interface/index'
import { useHealthApi } from '/@/api/health-diagnosis/index'
import { formatDate } from '/@/utils/formatTime';

const containerProgress = reactive({
	total: 0,
	upNum: 0
})
const nodeProgress = reactive({
	upNum: 0,
	total: 0
})
const state = reactive<InstanceListInterface>({
	nodeList: []
})
interface TargetInterface {
	instance: string,
	status: string
}
interface TargetsInterface {
	targets: Array<TargetInterface>
}
const online_node = reactive<TargetsInterface>({
	targets: []
})
const tableLoading = ref(false)
const diagnostic = reactive<{
	DiagnosticList: Array<ResultInterface>

}>({
	DiagnosticList: []
})
const { nodeList } = toRefs(state)
const usageData = reactive<{
	overViewInfo: {
		cpu: {
			usage: number;
			used_core: number;
			total_core: number;
		};
		memory: {
			usage: number;
			used_bytes: number;
			total_bytes: number;
		};
		disk: {
			usage: number;
			used_bytes: number;
			total_bytes: number;
		};
	}

}>({
	overViewInfo: {
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
	}
})
const { overViewInfo } = toRefs(usageData)
const targets = ref([])
//Routing jump
const jumpNodeData = () => {
	router.push('/monitor-warn/node-health')
}
const jumpDiagnosticData = () => {
	router.push('/health-diagnosis/diagnostic-results')
}
//obtain colors based on status
const statusColor = computed(() => (status: string) => {
	switch (status) {
		case 'fault':
			return "font-size: 30px;color: red";
		case 'subhealth':
			return "font-size: 30px;color: #e6a23c";
	}
});
//obtain table data
const getTableData = async (ids: any) => {
	await Promise.all(ids.map((obj: any) => useMonitorApi().getNodeList({ instance: obj.instance }))).then(res => {
		res.map(item => {
			ids.map((obj: any) => {
				if (item.data[0].instance.includes(obj.instance)) {
					Object.assign(item.data[0], { status: obj.status })
				}
			})
			nodeList.value.push(item.data[0])
		})
	})
}
//obtain targets data
const getTargets = async () => {
	useMonitorApi().getInstance().then(async (res: any) => {
		targets.value = await res.data.targets.map((item: any) => {
			return { instance: item.instance.split(':')[0], status: item.status }
		})
		online_node.targets = res.data.targets
		getTableData(targets.value)
	})
}
//Obtain Rule List Data
const getResultList = async (loading: boolean = false) => {
	tableLoading.value = loading;
	await useHealthApi()
		.getResultList({
			page_no: 1,
			page_size: 5,
		})
		.then((res) => {
			diagnostic.DiagnosticList = res.data.records;
		})
		.finally(() => {
			tableLoading.value = false;
		});
};

const getLevel = computed(() => (level: string) => {
	switch (level) {
		case 'up':
			return '在线';
		case 'down':
			return '离线';
	}
});
const tagColor = computed(() => (color: string) => {
	switch (color) {
		case 'down':
			return 'danger';
		case 'up':
			return 'primary';
	}
});
onMounted(async () => {
	await getTargets()
	await getResultList(true)
})
//Calculate resource usage
const numNode = computed(() => {
	nodeProgress.upNum = online_node.targets.filter((target: any) => target.status === 'up').length
	nodeProgress.total = online_node.targets.length
	if (nodeProgress.total === 0) return 0
	return ((nodeProgress.upNum / nodeProgress.total) * 100)
})
const numContainer = computed(() => {
	if (containerProgress.total === 0) return 0
	return ((containerProgress.upNum / containerProgress.total) * 100)
})
const containerRunning = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.container.running
	}, 0)
})
const containerTotal = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.container.total
	}, 0)
})
const cpuUsage = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.cpu.usage
	}, 0)
})
const cpuUsed = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.cpu.used_core
	}, 0)
})
const cpuTotal = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.cpu.total_core
	}, 0)
})
const memoryUsage = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.memory.usage
	}, 0)
})
const memoryUsed = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.memory.used_bytes
	}, 0)
})
const memoryTotal = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.memory.total_bytes
	}, 0)
})
const diskUsage = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.disk.usage
	}, 0)
})
const diskUsed = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.disk.used_bytes
	}, 0)
})
const diskTotal = computed(() => {
	return nodeList.value.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.disk.total_bytes
	}, 0)
})
//listen to nodelist and assign calculated values to overViewInfo
watch(nodeList.value, () => {
	overViewInfo.value.cpu = {
		usage: cpuUsage.value,
		used_core: cpuUsed.value,
		total_core: cpuTotal.value
	}
	overViewInfo.value.memory = {
		usage: memoryUsage.value,
		used_bytes: memoryUsed.value,
		total_bytes: memoryTotal.value
	}
	overViewInfo.value.disk = {
		usage: diskUsage.value,
		used_bytes: diskUsed.value,
		total_bytes: diskTotal.value
	}
	containerProgress.total = containerTotal.value
	containerProgress.upNum = containerRunning.value
})


</script>

<style scoped>
.clusterResource {
	margin-top: 30px;
}

.chart {
	width: calc((100% - 35px) / 2);
	height: calc((100% - 30px) / 2);
	margin-top: 15px;
}

.contentChart {
	width: calc((110% - 50px) / 2);
	height: calc((100% - 30px) / 2);
	margin-top: 15px;
}

.content {
	width: calc((100% - 50px) / 2);
	margin-top: 15px;
}

.cell {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center
}



::v-deep .el-table::before {
	height: 0;
}

::v-deep .el-table__row>td {
	border: none;
}
</style>