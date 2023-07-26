<template>
	<el-form ref="ruleDataRuleRef" :model="newFrom" :rules="ruleDataRules" label-width="110px">
		<el-form-item label="规则名称" prop="name">
			<el-input v-model.trim="newFrom.name" clearable />
		</el-form-item>
		<el-form-item label="规则表达式" prop="expression">
			<el-input placeholder="请输入内容" hight="50px" v-model="newFrom.expression" clearable type="textarea" />
		</el-form-item>
		<el-form-item label="告警级别">
			<el-select v-model="newFrom.severity">
				<el-option label="一般" value="warning" />
				<el-option label="严重" value="error" />
				<el-option label="危险" value="critical" />
			</el-select>
		</el-form-item>
		<el-form-item label="阈值时间">
			<el-select v-model="newFrom.duration">
				<el-option label="1m" value="1m" />
				<el-option label="3m" value="3m" />
				<el-option label="5m" value="5m" />
				<el-option label="10m" value="10m" />
				<el-option label="15m" value="15m" />
				<el-option label="30m" value="30m" />
				<el-option label="45m" value="45m" />
				<el-option label="1h" value="1h" />
			</el-select>
		</el-form-item>
		<div class="condition">
			<el-form-item label="亚健康比较条件" style="width: 80%" prop="subhealth_condition_type">
				<el-select v-model="newFrom.subhealth_condition_type" clearable placeholder="">
					<el-option v-for="item in faultConditionTypeOptions" :label="item.label" :value="item.value"
						:key="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="亚健康阈值" prop="subhealth_thresholds">
				<el-input :disabled="subhealth" v-model.trim="newFrom.subhealth_thresholds" />
			</el-form-item>
		</div>
		<div class="condition">
			<el-form-item label="故障比较条件" style="width: 80%" prop="fault_condition_type">
				<el-select v-model="newFrom.fault_condition_type" clearable placeholder="">
					<el-option v-for="item in faultConditionTypeOptions" :label="item.label" :value="item.value"
						:key="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="故障阈值" prop="fault_thresholds">
				<el-input :disabled="fault" v-model.trim="newFrom.fault_thresholds" />
			</el-form-item>
		</div>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, defineEmits, watch, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { editRuleDataInterface } from '../../interface/index';
import type { FormInstance } from 'element-plus';
import { useRuleApi } from '/@/api/rule-management/index';
const newFrom = ref<editRuleDataInterface>({
	name: '',
	expression: '',
	severity: 'warning',
	duration: '1m',
	subhealth_condition_type: '',
	subhealth_thresholds: undefined,
	fault_condition_type: '',
	fault_thresholds: undefined,
});
const props = defineProps<{
	ruleFromdata?: editRuleDataInterface;
}>();

const subhealth = computed(() => {
	return !newFrom.value.subhealth_condition_type;
});
const fault = computed(() => {
	return !newFrom.value.fault_condition_type;
});
//Monitor comparison conditions, clear threshold if cancelled
watch(
	() => [newFrom.value.fault_condition_type, newFrom.value.subhealth_condition_type],
	() => {
		if (!newFrom.value.fault_condition_type) {
			newFrom.value.fault_thresholds = undefined;
		}
		if (!newFrom.value.subhealth_condition_type) {
			newFrom.value.subhealth_thresholds = undefined;
		}
	}
);
//Listening for editing form parameters and making shallow copies
watch(
	() => props.ruleFromdata,
	() => {
		if (props.ruleFromdata) {
			newFrom.value = { ...props.ruleFromdata };
		}
	},
	{ immediate: true }
);
const ruleDataRuleRef = ref<FormInstance>();
const emits = defineEmits(['update:value', 'refreshList']);
//Submit Edit Form
const editRule = () => {
	if (!ruleDataRuleRef.value) return;
	ruleDataRuleRef.value.validate((valid: any) => {
		if (!valid) return;
		if (newFrom.value.fault_thresholds) {
			newFrom.value.fault_thresholds = parseFloat(newFrom.value.fault_thresholds as any);
		}
		if (newFrom.value.subhealth_thresholds) {
			newFrom.value.subhealth_thresholds = parseFloat(newFrom.value.subhealth_thresholds as any);
		}
		useRuleApi()
			.updateRule(newFrom.value)
			.then(() => {
				ElMessage.success('编辑规则任务成功');
				emits('update:value', false);
				emits('refreshList');
			}).catch(error => {
				let req = error.response
				if (req.data.code === 1003) {
					ElMessage.warning('规则内容没有改变')
				}
			});
	});
};
//Submit Add Form
const addRule = () => {
	if (!ruleDataRuleRef.value) return;
	ruleDataRuleRef.value.validate((valid: any) => {
		if (!valid) return;
		if (newFrom.value.fault_thresholds) {
			newFrom.value.fault_thresholds = parseFloat(newFrom.value.fault_thresholds as any);
		}
		if (newFrom.value.subhealth_thresholds) {
			newFrom.value.subhealth_thresholds = parseFloat(newFrom.value.subhealth_thresholds as any);
		}
		useRuleApi()
			.addRule(newFrom.value)
			.then(() => {
				ElMessage.success('添加规则任务成功');
				emits('update:value', false);
				emits('refreshList');
			}).catch(error => {
				let req = error.response
				if (req.data.code === 1002) {
					ElMessage.warning('规则名称已存在')
				}
			});
	});
};
//Export method to parent component
defineExpose({
	editRule,
	addRule,
});
//Name Rules
const validateName = (rule: any, value: any, callback: any) => {
	if (value === '' || value === null) {
		return callback(new Error('请输入规则名称'));
	}
	var reg = /^[A-Za-z0-9]{1,20}$/;
	if (!reg.test(value)) {
		return callback(new Error('规则名称格式不正确'));
	}
	callback();
};
//Expression Rules
const validateExpression = (rule: any, value: any, callback: any) => {
	if (value === '' || value === null) {
		return callback(new Error('请输入规则表达式'));
	}
	var reg = /^[^`@#$%^&*?]+$/;
	if (!reg.test(value)) {
		return callback(new Error('规则表达式中不可包含特殊字符'));
	}
	callback();
};
const reqNumber = /^\d+$|^\d+[.]?\d+$/;
//Sub health threshold
const validateSubhealthThresholds = (rule: any, value: any, callback: any) => {
	const flag = newFrom.value.subhealth_condition_type;
	if (flag && (value === undefined || value === '')) {
		return callback(new Error('请输入亚健康阈值'));
	}

	if (!reqNumber.test(value) && value) {
		return callback(new Error('格式为数值类型'));
	}
	callback();
};
//Fault threshold
const validateFaultThresholds = (rule: any, value: any, callback: any) => {
	const flag = newFrom.value.fault_condition_type;
	if (flag && (value === undefined || value === '')) {
		return callback(new Error('请输入亚健康阈值'));
	}
	if (!reqNumber.test(value) && value) {
		return callback(new Error('格式为数值类型'));
	}

	callback();
};

//Comparison condition verification
const validateConditionType = (rule: any, value: any, callback: any) => {
	if (!newFrom.value.subhealth_condition_type && !newFrom.value.fault_condition_type) {
		if (!newFrom.value.subhealth_thresholds) {
			ruleDataRuleRef.value?.clearValidate(['subhealth_thresholds']);
		}
		if (!newFrom.value.fault_thresholds) {
			ruleDataRuleRef.value?.clearValidate(['fault_thresholds']);
		}
		return callback(new Error('至少选择一个比较条件'));
	}
	if (newFrom.value.subhealth_condition_type || newFrom.value.fault_condition_type) {
		if (rule.field === 'subhealth_condition_type') {
			if (newFrom.value.subhealth_condition_type) {
				ruleDataRuleRef.value?.clearValidate(['fault_condition_type']);
				callback();
			}
		}
		if (rule.field === 'fault_condition_type') {
			if (newFrom.value.fault_condition_type) {
				ruleDataRuleRef.value?.clearValidate(['subhealth_condition_type']);
				callback();
			}
		}
		callback();
	}
};
//Form Rule Validation
const ruleDataRules = reactive({
	name: [{ validator: validateName, trigger: 'blur' }],
	expression: [{ validator: validateExpression, trigger: 'blur' }],
	subhealth_condition_type: [{ validator: validateConditionType, trigger: 'change' }],
	subhealth_thresholds: [{ validator: validateSubhealthThresholds, trigger: 'blur' }],
	fault_condition_type: [{ validator: validateConditionType, trigger: 'change' }],
	fault_thresholds: [{ validator: validateFaultThresholds, trigger: 'blur' }],
});

const faultConditionTypeOptions = [
	{ label: '==', value: '==' },
	{ label: '!=', value: '!=' },
	{ label: '<', value: '<' },
	{ label: '>', value: '>' },
];
//Delete warning messages for form validation by listening for changes in conditions
watch(() => [newFrom.value.subhealth_condition_type, newFrom.value.fault_condition_type], () => {
	if (!newFrom.value.subhealth_condition_type) {
		ruleDataRuleRef.value?.clearValidate(['subhealth_thresholds']);
	}
	if (!newFrom.value.fault_condition_type) {
		ruleDataRuleRef.value?.clearValidate(['fault_thresholds']);
	}
})
</script>

<style scoped>
.pagination {
	padding-top: 30px;
}

.condition {
	display: flex;
}
</style>
