<template>
	<div class="cluster-status">
		<el-tabs v-model="activeName" type="card" class="tab" @tab-click="handleClick">
			<el-tab-pane label="概览" name="概览"
				><div class="main"><overview></overview></div
			></el-tab-pane>
			<el-tab-pane label="物理资源监控" name="物理资源监控"
				><el-card class="box-card"><physicalResources></physicalResources></el-card
			></el-tab-pane>
			<el-tab-pane label="容器健康监控" name="容器健康监控"
				><el-card class="box-card"><containHealth></containHealth> </el-card
			></el-tab-pane>
		</el-tabs>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';

const containHealth = defineAsyncComponent(() => import('./components/container-health.vue'));
const physicalResources = defineAsyncComponent(() => import('./components/physical-resources.vue'));
const overview = defineAsyncComponent(() => import('./components/overview.vue'));
const activeName = ref('概览');

const handleClick = (tab: 'TabsPaneContext', event: Event) => {};
</script>
<style scoped>
.cluster-status {
	display: flex;
	height: 100vh;
	/* flex-direction: column; */
	padding: 5px;
	box-sizing: border-box;
}
.main {
	width: 100%;
	background-color: #ffffff;
}
.tab {
	width: 100%;
}
</style>
