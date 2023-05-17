<template>
	<div class="node-health">
		节点状态
		<el-card class="table-wrap" shadow="never">
			<div class="operation mb15">
				<el-select class="width-150 mr10" placeholder="按节点状态排序" v-model="alarmModule" clearable>
					<el-option v-for="item in moduleOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="date" label="日期" width="180"> </el-table-column>
				<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
				<el-table-column prop="address" label="地址"> </el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const alarmModule = ref('');
const moduleOptions: SelectOptionType[] = [
	{
		label: '节点',
		value: 'nodes',
	},
	{
		label: '集群',
		value: 'cluster',
	},
	{
		label: '设备',
		value: 'devices',
	},
];
const tableData = [
	{
		date: '2016-05-02',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1518 弄',
	},
	{
		date: '2016-05-04',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1517 弄',
	},
	{
		date: '2016-05-01',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1519 弄',
	},
	{
		date: '2016-05-03',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1516 弄',
	},
];
</script>

<style scoped>
.node-health {
	margin-top: 30px;
}
</style>
