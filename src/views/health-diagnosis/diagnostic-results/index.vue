<template>
	<div>
		<Description :title="title" :desc="desc"></Description>
		<el-card>
			<div class="header">
				<div>
					<el-input v-model="diagnosisinfo.params.filter" class="width-150 mr10" placeholder="输入规则名称"
						:prefix-icon="Search" />
					<el-button @click="search" type="primary">搜索</el-button>
				</div>
			</div>
			<el-table element-loading-text="数据加载中..." highlight-current-row height="calc(100vh - 455px)" ref="tableRef"
				v-loading="tableLoading" @sort-change="ruleSort" :data="diagnosisinfo.data" border style="width: 100%">
				<el-table-column prop="id" label="诊断ID" sortable="custom"></el-table-column>
				<el-table-column prop="rule_name" label="规则名称"></el-table-column>
				<el-table-column prop="status" label="当前状态"><template #default="{ row }"><el-tag class="ml-2" :type="row.status === 'subhealth'
					? 'warning' : 'danger'">{{
		row.status === 'subhealth'
		? '亚健康' : '故障' }}</el-tag></template></el-table-column>
				<el-table-column prop="create_time" label="触发时间" sortable="custom"><template #default="{ row }">{{
					formatDate(new
						Date(row.create_time * 1000), 'YYYY-mm-dd HH:MM:SS') }} </template></el-table-column>
				<el-table-column prop="update_time" label="更新时间" sortable="custom"><template #default="{ row }">{{
					formatDate(new
						Date(row.update_time * 1000), 'YYYY-mm-dd HH:MM:SS') }} </template></el-table-column>
				<el-table-column label="操作" style="text-align: center" width="180%"><template #default="{ row }"><el-button
							link size="small" @click="lookRawData(row)" type="primary">查看原始数据</el-button>
						<el-button link size="small" type="danger" @click="deleteResult(row.id)">删除
						</el-button></template></el-table-column>
			</el-table>

			<div class="pagination">
				<el-pagination v-model:current-page="diagnosisinfo.params.pageNum"
					v-model:page-size="diagnosisinfo.params.pageSize" @current-change="onHandleCurrentChange"
					@size-change="onHandleSizeChange" :page-sizes="[5, 10, 30, 50]" background
					layout="total, sizes, prev, pager, next, jumper" :total="diagnosisinfo.total" />
			</div>
		</el-card>
		<div>
			<el-dialog :title="rawtitle" v-model="dialogVisible" :destroy-on-close="true" width="80%">
				<RawData ref="rawRuleRef" v-model:value="dialogVisible" :rawData="rawData"></RawData>
				<template #footer>
					<el-button @click="dialogVisible = false">关闭</el-button>
				</template>
			</el-dialog>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useHealthApi } from '/@/api/health-diagnosis/index';
import { HealthStateInterface, ResultInterface } from '../interface/index';
import { formatDate } from '/@/utils/formatTime';
import { ElMessageBox, ElMessage } from 'element-plus';
const RawData = defineAsyncComponent(() => import('./components/rawData.vue'))
import Description from '/@/components/description/index.vue'
const title = '诊断结果';
const desc = '提供诊断结果列表,支持诊断原始数据查看，显示诊断时所使用的原始数据,并提供图表展示原始数据的变化规律。'

const state = reactive<HealthStateInterface>({
	diagnosisinfo: {
		data: [],
		params: {
			pageSize: 5,
			pageNum: 1,
			filter: '',
			sort_field: '',
			sort_order: '',
		},
		total: 0,
	},
});
const { diagnosisinfo } = toRefs(state);
const tableLoading = ref(false);
const rawtitle = ref('');
const dialogVisible = ref(false);
const rawData = ref()
const search = () => {
	state.diagnosisinfo.params.pageNum = 1;
	getResultList(true);
};
const lookRawData = (row: ResultInterface) => {
	rawData.value = row
	rawtitle.value = row.rule_name
	dialogVisible.value = true
}
const ruleSort = (column: any) => {
	diagnosisinfo.value.params.pageNum = 1;
	if (column.order === 'descending') {
		diagnosisinfo.value.params.sort_field = column.prop;
		diagnosisinfo.value.params.sort_order = 'desc';
	} else if (column.order === 'ascending') {
		diagnosisinfo.value.params.sort_field = column.prop;
		diagnosisinfo.value.params.sort_order = 'asc';
	} else {
		diagnosisinfo.value.params.sort_field = '';
		diagnosisinfo.value.params.sort_order = '';
	}
	getResultList(true, true);
};
const deleteResult = (id: number) => {
	ElMessageBox.confirm(`是否删除这条诊断结果 ?`, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		//dangerouslyUseHTMLString: true,
		customClass: 'center-message-box',
	})
		.then(() => {
			useHealthApi()
				.deleteResult({ id: id })
				.then(() => {
					ElMessage.success('删除诊断结果成功');
					getResultList(true);
				}).catch(error => {
					let req = error.response
					if (req.data.code === 2002)
						ElMessage.warning('诊断结果不存在')
					getResultList(true);
				});
		})
		.catch(() => { });
};
const onHandleCurrentChange = () => {
	getResultList(true);
};
const onHandleSizeChange = () => {
	getResultList(true);
};
const getResultList = (loading: boolean = false, order: boolean = false) => {
	if (!order) {
		diagnosisinfo.value.params.sort_field = '';
		diagnosisinfo.value.params.sort_order = '';
	}
	tableLoading.value = loading;
	useHealthApi()
		.getResultList({
			filter: diagnosisinfo.value.params.filter === '' ? undefined : diagnosisinfo.value.params.filter,
			sort_field: diagnosisinfo.value.params.sort_field === '' ? undefined : diagnosisinfo.value.params.sort_field,
			sort_order: diagnosisinfo.value.params.sort_order === '' ? undefined : diagnosisinfo.value.params.sort_order,
			page_no: diagnosisinfo.value.params.pageNum,
			page_size: diagnosisinfo.value.params.pageSize,
		})
		.then((res) => {
			diagnosisinfo.value.data = res.data.records;
			diagnosisinfo.value.total = res.data.page_total;
		})
		.finally(() => {
			//diagnosisinfo.value.data = res.data.records;
			tableLoading.value = false;
		});
};
onMounted(() => {
	getResultList();
});
</script>

<style scoped>
.header {
	display: flex;
	margin-bottom: 10px;
}

.pagination {
	margin-top: 10px;
}
</style>
