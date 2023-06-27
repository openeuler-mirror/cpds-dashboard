<template>
	<div>
		<Description :title="desctitle" :desc="desc"></Description>
		<div class="cluster-status">
			<el-tabs v-model="activeName" type="card" class="tab" @tab-click="handleClick">
				<el-tab-pane label="概览" name="概览" lazy>
					<div class="main">
						<overview></overview>
					</div>
				</el-tab-pane>
				<el-tab-pane label="物理资源监控" name="物理资源监控" lazy>
					<div class="main">
						<physicalResources></physicalResources>
					</div>
				</el-tab-pane>
				<el-tab-pane label="容器健康监控" name="容器健康监控" lazy>
					<div class="main">
						<containHealth></containHealth>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, provide } from 'vue';
import Description from '/@/components/description/index.vue'
const containHealth = defineAsyncComponent(() => import('./components/container-health.vue'));
const physicalResources = defineAsyncComponent(() => import('./components/physical-resources.vue'));
const overview = defineAsyncComponent(() => import('./components/overview.vue'));
const desctitle = '集群状态'
const desc = '功能描述:显示集群主机在线状态,提供物理资源监控和容器健康监控'
const activeName = ref('概览');
provide('activeName', activeName);
const handleClick = (tab: 'TabsPaneContext', event: Event) => { };
</script>
<style lang="scss" scoped>
.cluster-status {
	display: flex;
	height: 100vh;
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
