<template>
	<div class="node">
		集群物理资源监控
		<div class="content">
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
			<el-card> <Line></Line> </el-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import Line from '/@/components/echarts/Line.vue';
</script>
<style scoped>
.content {
	height: calc(100% - 40px);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.content > div {
	width: calc((100% - 15px) / 2);
	height: calc((100% - 30px) / 2);
	margin-top: 15px;
}
</style>
