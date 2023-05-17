<template>
	<el-table type="disabledCheck" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
		<el-table-column type="selection" width="55" />
		<el-table-column label="ip" width="120" property="ip"> </el-table-column>
		<el-table-column property="nodeStatus" label="Name" width="120" />
		<el-table-column property="clusterStrategy" label="Address" show-overflow-tooltip />
		<el-table-column property="level" label="level" width="120" />
		<el-table-column property="data" label="data" width="120" />
		<el-table-column property="comfirm" label="comfirm" width="120" />
		<el-table-column property="warnStatus" label="warnStatus" width="120" />
	</el-table>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElTable } from 'element-plus';
import HeaderCellRenderer from 'element-plus/es/components/table-v2/src/renderers/header-cell';
import { relative } from 'path';

const tableData = reactive([
	{
		ip: '172.30.25.15',
		nodeStatus: '亚健康',
		clusterStrategy: 'disk_usage_average',
		level: '一般警告',
		data: '2023-01-06 17:31.06',
		comfirm: '',
		warnStatus: '已读',
	},
	{
		ip: '172.30.25.15',
		nodeStatus: '亚健康',
		clusterStrategy: 'disk_usage_average',
		level: '一般警告',
		data: '2023-01-06 17:31.06',
		comfirm: '',
		warnStatus: '已读',
	},
	{
		ip: '172.30.25.15',
		nodeStatus: '亚健康',
		clusterStrategy: 'disk_usage_average',
		level: '一般警告',
		data: '2023-01-06 17:31.06',
		comfirm: '',
		warnStatus: '已读',
	},
	{
		ip: '172.30.25.15',
		nodeStatus: '亚健康',
		clusterStrategy: 'disk_usage_average',
		level: '一般警告',
		data: '2023-01-06 17:31.06',
		comfirm: '',
		warnStatus: '已读',
	},
	{
		ip: '172.30.25.15',
		nodeStatus: '亚健康',
		clusterStrategy: 'disk_usage_average',
		level: '一般警告',
		data: '2023-01-06 17:31.06',
		comfirm: '',
		warnStatus: '已读',
	},
	{
		ip: '172.30.25.15',
		nodeStatus: '亚健康',
		clusterStrategy: 'disk_usage_average',
		level: '一般警告',
		data: '2023-01-06 17:31.06',
		comfirm: '',
		warnStatus: '已读',
	},
]);

const multipleSelection = ref<any>([]);
const handleSelectionChange = (val: any) => {
	multipleSelection.value = val;
};
</script>
<style scoped>
::v-deep .el-table .disabledCheck .cell .el-checkbox__inner {
	display: none;
}
::v-deep .el-table .disabledCheck .cell::before {
	content: '';
	text-align: center;
	line-height: 37px;
}
</style>
