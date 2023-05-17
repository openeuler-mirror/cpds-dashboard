<template>
	<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
		<el-tab-pane label="警告信息" name="警告信息"
			><el-card class="box-card"> <warnInfo></warnInfo></el-card
		></el-tab-pane>
		<el-tab-pane label="警告配置" name="警告配置"
			><el-card class="box-card"> <warnSeeting></warnSeeting> </el-card
		></el-tab-pane>
	</el-tabs>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';

const warnInfo = defineAsyncComponent(() => import('./components/warn-info.vue'));
const warnSeeting = defineAsyncComponent(() => import('./components/warn-setting.vue'));
const activeName = ref('警告信息');

const handleClick = (tab: 'TabsPaneContext', event: Event) => {};
</script>
<style scoped>
.box-card {
	height: 1000px;
}
</style>
