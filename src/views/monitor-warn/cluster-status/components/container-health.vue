<template>
	<div class="container-health">
		容器健康监控
		<div class="content">
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
			<el-card> 折线图 </el-card>
		</div>
	</div>
</template>

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
