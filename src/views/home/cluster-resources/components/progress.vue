<template>
	<div class="pross top">
		<div class="demo-progress left top">
			<el-progress stroke-width="3" :width="40" :height="40" :text-inside="true" type="circle" :percentage="num" />
		</div>
		<div>
			<div class="top">
				<el-text tag="p">{{ num }}%</el-text>
			</div>
			<div class="top">
				<el-text tag="p">{{ props.clusterinfo.name }}</el-text>
			</div>
		</div>
		<div class="left">
			<div class="top">
				<el-text tag="p"
					>{{ props.clusterinfo.used }} {{ props.clusterinfo.name == 'CPU' ? 'cores' : props.clusterinfo.name == '内存' ? 'Gi' : 'GB' }}</el-text
				>
			</div>
			<div class="top"><el-text tag="p">已经使用</el-text></div>
		</div>
		<div class="left right">
			<div class="top">
				<el-text tag="p"
					>{{ props.clusterinfo.total }} {{ props.clusterinfo.name == 'CPU' ? 'cores' : props.clusterinfo.name == '内存' ? 'Gi' : 'GB' }}</el-text
				>
			</div>
			<div class="top"><el-text tag="p">总计</el-text></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
const props = defineProps<{
	clusterinfo: any;
}>();
const num = computed(() => {
	return ((props.clusterinfo.used / props.clusterinfo.total) * 100).toFixed(0);
});
</script>
<style scoped>
.container {
	margin-left: 30px;
}
.right {
	margin-right: px;
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
	width: 300px;
	font-weight: 900;
	color: red;
	background-color: aqua;
}
.el-col {
	text-align: center;
}
.statistic {
	width: 100%;
	display: flex;
}
</style>
