<template>
	<p>{{ props.progressstatus.name == 'healthStatus' ? '容器健康状态' : '集群节点状态' }}</p>
	<div class="container">
		<div>
			<el-progress type="circle" :percentage="num" :width="90" :height="90" stroke-width="7" color="green">
				<template #default="{ percentage }">
					<span class="percentage-value">{{ props.progressstatus.running }}/{{ props.progressstatus.total }}</span>
				</template>
			</el-progress>
		</div>
		<div class="descriptions">
			<el-descriptions>
				<el-descriptions-item :label="props.progressstatus.name == 'healthStatus' ? '容器个数' : '全部节点'">{{
					props.progressstatus.total
				}}</el-descriptions-item>
			</el-descriptions>
			<el-descriptions>
				<el-descriptions-item :label="props.progressstatus.name == 'healthStatus' ? '运行中的容器' : '在线节点'">{{
					props.progressstatus.running
				}}</el-descriptions-item>
			</el-descriptions>
			<el-descriptions>
				<el-descriptions-item :label="props.progressstatus.name == 'healthStatus' ? '异常容器个数' : '离线节点'">{{
					props.progressstatus.total - props.progressstatus.running
				}}</el-descriptions-item>
			</el-descriptions>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps<{ progressstatus: any }>();
const num = computed(() => {
	return ((props.progressstatus.running / props.progressstatus.total) * 100).toFixed(0);
});
</script>
<style scoped>
.container {
	display: flex;
}
.descriptions {
	padding-left: 20px;
}
</style>
