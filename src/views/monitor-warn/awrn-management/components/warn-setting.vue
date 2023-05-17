<template>
	<div class="warn-setting">
		<div class="warn">
			<el-card>
				<div class="header">
					<div class="header-left"><span>邮箱通知配置</span></div>
					<div class="header-right">
						<el-form-item style="width: 80%" label="状态:未开启">
							<el-switch v-model="value" />
						</el-form-item>
					</div>
				</div>

				<span>服务器配置</span>

				<div>
					<el-card> </el-card>
				</div>
				<span>收件人配置</span>
				<div>
					<el-card> </el-card>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('状态：未开启');
</script>
<style scoped>
.warn-setting {
}

.warn {
	width: 50%;
	margin: auto;
}
.header {
	display: flex;
	margin-bottom: 10px;
}
.header-right {
	flex: none;
}
.header-left {
	padding-top: 2px;
	flex: 1;
}
</style>
