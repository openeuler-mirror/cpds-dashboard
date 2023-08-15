<template>
	<div>
		<Description :title="desctitle" :desc="desc"></Description>
		<el-card>
			<div class="header">
				<div class="search">
					<el-input v-model="rulesionfo.params.filter" class="width-150 mr10" placeholder="输入规则名称"
						:prefix-icon="Search" />
					<el-button @click="search" type="primary">搜索</el-button>
				</div>
				<div>
					<span>
						<el-button @click="addRule" type="primary">添加规则</el-button>
						<el-button @click="getruleList(true, true)" type="primary">刷新</el-button>
					</span>
				</div>
			</div>
			<el-table element-loading-text="数据加载中..." highlight-current-row height="calc(100vh - 400px)" ref="tableRef"
				v-loading="tableLoading" @sort-change="ruleSort" :data="rulesionfo.data" border style="width: 100%">
				<el-table-column prop="name" label="规则名称" sortable="custom" width="110%" />
				<el-table-column prop="expression" label="表达式" min-width="100%" />
				<el-table-column prop="severity" label="告警级别" width="100%">
					<template #default="{ row }">
						<el-tag class="ml-2" :type="tagColor(row.severity)">{{ getLevel(row.severity) }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="duration" label="阈值时间" width="100%" />
				<el-table-column prop="" label="亚健康条件" width="100%"><template #default="{ row }">
						{{ row.subhealth_condition_type ? row.subhealth_condition_type + row.subhealth_thresholds : '—' }}
					</template></el-table-column>
				<el-table-column prop="fault_fullvalue" label="故障条件" width="100%"><template #default="{ row }">
						{{ row.fault_condition_type ? row.fault_condition_type + row.fault_thresholds : '—' }}
					</template></el-table-column>
				<el-table-column prop="create_time" label="创建时间" sortable="custom" width="180%">
					<template #default="{ row }">{{ formatDate(new Date(row.create_time * 1000), 'YYYY-mm-dd HH:MM:SS') }}
					</template>
				</el-table-column>
				<el-table-column prop="update_time" label="更新时间" sortable="custom" width="180%"><template
						#default="{ row }">{{ formatDate(new Date(row.update_time * 1000), 'YYYY-mm-dd HH:MM:SS') }}
					</template></el-table-column>
				<el-table-column prop="fault_fullvalue" label="操作" style="text-align: center" width="180%"><template
						#default="{ row }"><el-button @click="editRule(row)" size="small" type="primary">编辑</el-button>
						<el-button size="small" type="danger" @click="deleteRule(row)">删除
						</el-button></template></el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination v-model:current-page="rulesionfo.params.pageNum"
					v-model:page-size="rulesionfo.params.pageSize" @current-change="onHandleCurrentChange"
					@size-change="onHandleSizeChange" :page-sizes="[5, 10, 30, 50]" background
					layout="total, sizes, prev, pager, next, jumper" :total="rulesionfo.total" />
			</div>
		</el-card>
		<el-dialog :title="title" v-model="dialogVisible" :destroy-on-close="true" width="600px">
			<RuleDialog ref="dialogRuleRef" v-model:value="dialogVisible" :ruleFromdata="editRuleData"
				@refreshList="getruleList(true, true)"></RuleDialog>
			<template #footer>
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleDialogRule">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, computed, ref, defineAsyncComponent, onMounted } from 'vue';
import { formatDate } from '/@/utils/formatTime';
import { Search } from '@element-plus/icons-vue';
import { useRuleApi } from '/@/api/rule-management/index';
import { ElMessageBox, ElMessage } from 'element-plus';
import { RulesStateInterface, editRuleDataInterface, RulesInterface } from '../interface/index';
import Description from '/@/components/description/index.vue'
const RuleDialog = defineAsyncComponent(() => import('./components/ruleDialog.vue'));
const desctitle = '查看规则'
const desc = '功能描述：支持故障/亚健康检测规则列表查看、创建、编辑、删除功能，列表包括规则名、表达式、告警级别和亚健康、故障比较规则值信息'
const state = reactive<RulesStateInterface>({
	rulesionfo: {
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
const { rulesionfo } = toRefs(state);
//Store editing data
const editRuleData = ref<editRuleDataInterface>();
const tableLoading = ref(false);
const title = ref('');
//Dialog pop-up
const dialogVisible = ref(false);
//Obtain ruledialog
const dialogRuleRef = ref();

const search = () => {
	state.rulesionfo.params.pageNum = 1;
	getruleList(true, true);
};

const ruleSort = (column: any) => {
	rulesionfo.value.params.pageNum = 1;
	if (column.order === 'descending') {
		rulesionfo.value.params.sort_field = column.prop;
		rulesionfo.value.params.sort_order = 'desc';
	} else if (column.order === 'ascending') {
		rulesionfo.value.params.sort_field = column.prop;
		rulesionfo.value.params.sort_order = 'asc';
	} else {
		rulesionfo.value.params.sort_field = '';
		rulesionfo.value.params.sort_order = '';
	}
	getruleList(true, true);
};

//Search Open Editor
const editRule = (row: editRuleDataInterface) => {
	title.value = '编辑规则';
	editRuleData.value = row;
	dialogVisible.value = true;
};
//Open Add
const addRule = () => {
	title.value = '添加规则';
	editRuleData.value = undefined;
	dialogVisible.value = true;
};

const handleDialogRule = () => {
	state.rulesionfo.params.pageNum = 1;
	if (editRuleData.value) {
		dialogRuleRef.value.editRule();
	} else {
		dialogRuleRef.value.addRule();
	}
};

//Delete rule
const deleteRule = (row: RulesInterface) => {

	ElMessageBox.confirm(`是否删除检查名为 ${row.name} 的这条规则`, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		//dangerouslyUseHTMLString: true,
		customClass: 'center-message-box',
	})
		.then(() => {
			useRuleApi()
				.deleteRule({ id: row.id })
				.then(() => {
					ElMessage.success('删除规则信息成功');
					getruleList(true, true);
				}).catch(error => {
					let req = error.response
					if (req.data.code === 1004) {
						ElMessage.warning('规则不存在')
						getruleList(true, true);
					}
				});
		})
		.catch(() => { });
};
//Get ruleList
const getruleList = (loading: boolean = false, order: boolean = false) => {
	if (!order) {
		rulesionfo.value.params.sort_field = '';
		rulesionfo.value.params.sort_order = '';
	}
	tableLoading.value = loading;
	useRuleApi()
		.getRuleList({
			filter: rulesionfo.value.params.filter === '' ? undefined : rulesionfo.value.params.filter,
			sort_field: rulesionfo.value.params.sort_field === '' ? undefined : rulesionfo.value.params.sort_field,
			sort_order: rulesionfo.value.params.sort_order === '' ? undefined : rulesionfo.value.params.sort_order,
			page_no: rulesionfo.value.params.pageNum,
			page_size: rulesionfo.value.params.pageSize,
		})
		.then((res) => {
			rulesionfo.value.data = res.data.records;
			rulesionfo.value.total = res.data.page_total;
		})
		.finally(() => {
			tableLoading.value = false;
		});
};
onMounted(() => {
	getruleList();
});
const onHandleCurrentChange = () => {
	getruleList(true, true);
};
const onHandleSizeChange = () => {
	getruleList(true, true);
};
const getLevel = computed(() => (level: string) => {
	switch (level) {
		case 'critical':
			return '危险';
		case 'error':
			return '严重';
		case 'warning':
			return '一般';
	}
});
const tagColor = computed(() => (color: string) => {
	switch (color) {
		case 'critical':
			return 'danger';
		case 'error':
			return 'warning';
		case 'warning':
			return 'info';
	}
});
</script>

<style scoped>
.header {
	display: flex;
	margin-bottom: 10px;
}

.search {
	flex: 1;
}

.pagination {
	margin-top: 10px;
}
</style>
