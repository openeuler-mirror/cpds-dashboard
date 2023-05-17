<template>
	<div class="home1">
		<div class="home-container">
			<div class="home-card">
				<div>
					<el-card class="grid-content">
						<p>集群资源用量</p>
						<div><clusterResources :clusterinfoList="clusterinfoList"></clusterResources></div
					></el-card>
				</div>
				<div>
					<el-card class="grid-content"
						><div><clusterResources :clusterinfoList="clusterinfoList"></clusterResources></div>
					</el-card>
				</div>
			</div>
		</div>
		<div class="cluster-event">
			<p>集群节点事件</p>
			<el-table :data="clusterEventList" style="width: 50%">
				<el-table-column prop="ip" label="节点IP" width="100" />
				<el-table-column prop="type" label="类型" width="150" />
				<el-table-column prop="text" label="事件内容" />
				<el-table-column prop="time" label="发生时间" />
			</el-table>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref } from 'vue';
const clusterResources = defineAsyncComponent(() => import('./cluster-resources/index.vue'));
const table = ref([]);
const clusterinfoList = reactive([
	{ name: 'CPU', used: '5.76', total: 16 },
	{ name: '内存', used: '17.56', total: 24 },
	{ name: '磁盘', used: '100', total: 200.0 },
	{ name: 'CPU', used: '5.76', total: 16 },
]);

const clusterEventList = reactive([
	{ ip: '172.30.25.1', type: '节点状态变更', text: '规则触发', time: '2023-1-06 17:30:06' },
	{ ip: '172.30.25.1', type: '节点状态变更', text: '节点恢复', time: '2023-1-06 17:30:06' },
	{ ip: '172.30.25.1', type: '节点状态变更', text: '规则触发', time: '2023-1-06 17:30:06' },
	{ ip: '172.30.25.1', type: '节点状态变更', text: '节点恢复', time: '2023-1-06 17:30:06' },
]);
</script>

<style scoped>
.cluster-event {
	margin-top: 50px;
	margin-bottom: 300x;
}
.home1 {
	margin-left: 5%;
}
.home-container {
	/* background-color: red; */
	display: flex;
}
.home-card {
	display: flex;

	/* margin: 0 auto; */
}
.home-card div {
	margin: 0 10px;
}
</style>
