<template>
	<div class="overview">
		<el-row>
			<el-col :span="12" v-for="(progressstatus, index) in progressList" :key="index"
				><div class="grid-content ep-bg-purple"><statusProgress :progressstatus="progressstatus"></statusProgress></div>
			</el-col>
		</el-row>

		<p>资源使用情况</p>
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="grid-content ep-bg-purple" />
				<usedState :usedstate="usedStateList[0]"></usedState>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ep-bg-purple" />
				<usedState :usedstate="usedStateList[1]"></usedState>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ep-bg-purple" />
				<usedState :usedstate="usedStateList[2]"></usedState>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ep-bg-purple" />
				<usedState :usedstate="usedStateList[3]"></usedState>
			</el-col>
		</el-row>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="Date" width="180" />
			<el-table-column prop="name" label="Name" width="180" />
			<el-table-column prop="address" label="Address" />
		</el-table>
	</div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref } from 'vue';
const statusProgress = defineAsyncComponent(() => import('./components/progress.vue'));
const usedState = defineAsyncComponent(() => import('/@/components/progressstate/circle.vue'));
const progressList = reactive([
	{ name: 'healthStatus', total: 60, running: 48 },
	{ name: 'nodeStatus', total: 6, running: 4 },
]);
const usedStateList = reactive([
	{ name: 'CPU', total: 16, running: 12.26 },
	{ name: '内存', total: 23.37, running: 16.13 },
	{ name: '磁盘', total: 2000, running: 108.99 },
	{ name: 'inode', total: 131313, running: 100000 },
]);
const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
];
</script>
<style scoped>
.overview {
	border: 1px, solid#000;

	padding: 0;
	/* padding-top: 10px; */
}
.status {
	border: 1px, solid#000;
	height: 50px;
	/* background-color: red; */
}
</style>
