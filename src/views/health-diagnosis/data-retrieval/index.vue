<template>
	<div>
		<Description :title="title" :desc="desc"></Description>
		<el-card>
			<div>
				<icon>
					<Search style="width: 1em; height: 1em; margin-right: 8px" />
				</icon>
				<span style="font-size: 20px;font-weight: bold;">原始数据查询</span>
			</div>
			<div style="margin-top: 50px;">
				<h4 style="margin-bottom: 15px;">原始数据查询</h4>
				<el-form ref="expressionRef" :rules="rules" :model="newFrom">
					<el-form-item label="表达式" style="font-weight: bold;" prop="expression">
						<el-input v-model.trim="newFrom.expression" placeholder="在此处输入表达式" style="width: 70%;" />
					</el-form-item></el-form>

			</div>
			<div class="time">
				<div class="demo-datetime-picker" style="flex:1">
					<div class="operation" style="display: flex;line-height: 30px;">
						<span>查询范围</span>
						<div class="container">
							<el-date-picker ref="dateRef" style="margin-left: 5px;" class="mr10" v-model="datetimeRange"
								type="datetimerange" unlink-panels range-separator="-" start-placeholder="请选择开始时间"
								end-placeholder="请选择结束时间" value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="shortcuts"
								@change="dateChange" />
							<div v-show="latestTime" class="container-time" @click="dateRef.focus()">{{ latestTime }}</div>
						</div>

					</div>
				</div>
				<el-button type="primary" style="margin-right: 30%;" @click="selectRawDate">查询</el-button>
			</div>
			<div style="margin-top: 100px;">
				<h2>原始数据查询历史记录</h2>
				<el-table :data="history" style="width: 100%">
					<el-table-column label="表达式" align="center"> <template #default="{ row }"><span
								@click="getExpression(row.expression)" style="cursor: pointer;">{{
									row.expression }}</span></template></el-table-column>
					<el-table-column prop="time" label="查询范围" align="center"> </el-table-column>

				</el-table>
			</div>
			<div>
				<el-dialog :title="rawtitle" v-model="dialogVisible" :destroy-on-close="true" width="60%">
					<RawData ref="rawRuleRef" v-model:value="dialogVisible" @refreshHistory="refreshHistory()"
						:expression="newFrom.expression"></RawData>
					<template #footer>
						<el-button @click="dialogVisible = false">关闭</el-button>
					</template>
				</el-dialog>
			</div>


		</el-card>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch, defineAsyncComponent, provide, reactive, onMounted } from 'vue';
import Description from '/@/components/description/index.vue'
import { Search } from '@element-plus/icons-vue';
import { timeNameMap } from '/@/utils/const';
import { dayjs } from 'element-plus';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { FormInstance } from 'element-plus'
import { Local } from '/@/utils/storage';
import { shortcuts } from '/@/utils/const'
dayjs.extend(relativeTime);
const RawData = defineAsyncComponent(() => import('./components/rawData.vue'))
const title = '原始数据检索';
const desc = '功能描述：提供诊断结果列表,支持诊断原始数据查看，显示诊断时所使用的原始数据,并提供图表展示原始数据的变化规律。'
const datetimeRange = ref()
const defaultdateRange = ref<[number, string]>([5 * 60, 'second']);
const latestTime = ref('最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdateRange.value[0], 'second')).fromNow(true)]);
const dateRef = ref()
const rawtitle = ref()
const history = ref()
const dialogVisible = ref(false)
const expressionRef = ref<FormInstance>()
const newFrom = ref({
	expression: ''
});
const validateName = (rule: any, value: any, callback: any) => {
	if (!value) {
		return callback(new Error('请输入表达式'));
	}
	var reg = /^[^`@#$%^&*?]+$/;
	if (!reg.test(value)) {
		return callback(new Error('规则表达式中不可包含特殊字符'));
	}
	callback()
}
const rules = reactive({
	expression: [{ validator: validateName, trigger: 'blur' }],

});

const dateChange = (val: any) => {
	if (val) {
		// relative time range
		if (dayjs(val[1]).diff(new Date(), 'second') == 0) {
			const diff = dayjs(val[1]).diff(val[0], 'second');
			defaultdateRange.value[0] = diff;
			datetimeRange.value = null
		} else {
			// Filter time range  
			datetimeRange.value = val;
			latestTime.value = ''
		}
	} else {
		datetimeRange.value = null
	}
}
//Refresh Historical Data
const refreshHistory = () => {
	history.value = Local.get('history')
}
//auto fill expression
const getExpression = (expression: string) => {
	newFrom.value.expression = expression
	expressionRef.value?.clearValidate(['expression']);
}
//using provide to pass values to subcomponents
provide('datetimeRange', datetimeRange);
provide('defaultdateRange', defaultdateRange);
const selectRawDate = () => {
	if (!expressionRef.value) return;
	expressionRef.value.validate((valid: any) => {
		if (!valid) return;
		rawtitle.value = `监控指标：${newFrom.value.expression}`
		dialogVisible.value = true
	})

}
// Monitoring time range change
watch(
	datetimeRange,
	val => {
		!val && (latestTime.value = '最近 ' + timeNameMap[dayjs(dayjs().subtract(defaultdateRange.value[0], 'second')).fromNow(true)]);
	},


);
//retrieve history from browser localstorage
onMounted(() => {
	history.value = Local.get('history')
})

</script>
<style  lang="scss" scoped>
.container {
	position: relative;
	margin-left: 10px;
}

.container-time {
	position: absolute;
	top: 0;
	left: 0;
	width: 405px;
	height: 33px;
	z-index: 100px;
	background: #fff;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	border: 1px solid gray;
	border-radius: 5px;
}

.time {
	display: flex;
	margin-top: 50px;
}
</style>
