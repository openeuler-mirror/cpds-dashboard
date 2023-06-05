<template>
	<div class="pross">
		<div class="circle">
			<el-progress stroke-width="3" :width="40" :height="40" :text-inside="true" type="circle" :percentage="num" />
		</div>
		<div>
			<el-row>
				<el-col :span="24">
					<el-statistic :value="props.usedstate?.running">
						<template #title>
							<div style="display: inline-flex; align-items: center">{{ props.usedstate.name }} {{ unit }}
							</div>
						</template>
						<template #suffix>/{{ props.usedstate?.total }}</template>
					</el-statistic>
				</el-col></el-row>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue';

const props = defineProps<{
	usedstate?: any;
}>();
const unit = computed(() => {
	return props.usedstate.name == 'CPU' ? 'core' : props.usedstate.name == '内存' ? 'Gi' : props.usedstate.name == '磁盘' ? 'Gb' : '';
});

const num = computed(() => {
	return ((props.usedstate?.running / props.usedstate?.total) * 100).toFixed(0);
});
</script>
<style scoped>
.container {
	margin-left: 30px;
}

.right {
	margin-right: px;
}

.circle {
	margin-right: 30px;
}

.top {
	margin: 5px 0 5px 0;
}

.left {
	margin-left: 20px;
}

.demo-progress .el-progress--line {
	margin-bottom: 15px;
	height: 150px;
	width: 150px;
}

.demo-progress .el-progress--circle {
	margin-right: 15px;
}

.pross {
	display: flex;
	width: 250px;
	height: 70px;
	font-weight: 900;
	padding: 10px;
	margin-top: 20px;
	color: red;
	background-color: aqua;
}

.el-col {
	text-align: center;
}

.statistic {
	width: 100%;
	display: flex;
}</style>
