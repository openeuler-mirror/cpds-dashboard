<template>
	<el-card style="overflow: auto;">
		<div style="display: flex;">
			<div style="flex:0 1 50%">
				<h4>容器健康状态</h4>
				<div style="display: flex;margin-top: 10px;margin-left: 20px; ">
					<el-progress type="circle" :percentage="numContainer" :width="100" :height="100" stroke-width="7"
						color="#51c41b">
						<template #default="{ percentage }">
							<span class="percentage-value">{{ containerProgress.upNum }}/{{ containerProgress.total
							}}</span>
						</template>
					</el-progress>
					<div style="display: flex;align-items: center;margin-left: 20px;">
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

			<div style="flex:0 1 50%">
				<h4>集群节点状态</h4>
				<div style="display: flex;margin-top: 10px;margin-left: 20px; ">
					<el-progress type="circle" :percentage="numNode" :width="100" :height="100" stroke-width="7"
						color="#51c41b">
						<template #default="{ percentage }">
							<span class="percentage-value">{{ nodeProgress.upNum }}/{{ nodeProgress.total
							}}</span>
						</template>
					</el-progress>
					<div style="display: flex;align-items: center;margin-left: 20px;">
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
		</div>
		<div style="margin-top: 30px;">
			<h3>资源使用情况</h3>
			<div style="display: flex;margin-top: 10px;justify-content: space-between;width: 70%;">
				<div style="flex:0 1 25%;">
					<Usage name="CPU" unit="cores" :data="overViewInfo.cpu"></Usage>
				</div>
				<div style="flex:0 1 25%">
					<Usage name="内存" unit="GB" :data="overViewInfo.memory"></Usage>
				</div>
				<div style="flex:0 1 25%">
					<Usage name="磁盘" unit="GB" :data="overViewInfo.disk"></Usage>
				</div>
			</div>
		</div>

		<NodeList v-model:total="containerProgress.total" v-model:upNum="containerProgress.upNum"
			v-model:overViewInfo="overViewInfo">
		</NodeList>
	</el-card>
</template>
<script lang="ts" setup>
import { computed, ref, reactive, defineAsyncComponent, watch, inject, toRefs } from 'vue';
const NodeList = defineAsyncComponent(() => import('../../node-health/components/nodelist.vue'))
const Usage = defineAsyncComponent(() => import('/@/components/usage/index.vue'))
import { useMonitorApi } from '/@/api/monitor-warn/index'

const state = reactive<{
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
const { overViewInfo } = toRefs(state)
const activeName = inject('activeName', ref());
const nodeProgress = reactive({
	upNum: 0,
	total: 0
})
const containerProgress = reactive({
	total: 0,
	upNum: 0
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
const getTargets = () => {
	useMonitorApi().getInstance().then((res) => {
		online_node.targets = res.data.targets
	})
}
const handle = () => {
	if (activeName.value === '概览') {
		getTargets()

	}
}
watch(activeName, () => {
	handle()
}, { immediate: true })
</script>