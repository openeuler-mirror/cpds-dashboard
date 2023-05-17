<template>
	<div class="main">
		<el-row v-for="(clusterinfo, index) in props.clusterinfoList" :key="index">
			<el-col :span="12"> <homeProgress :clusterinfo="clusterinfo"></homeProgress></el-col>
		</el-row>
	</div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import homeProgress from './components/progress.vue';
const props = defineProps<{
	clusterinfoList: any;
}>();
</script>
<style scoped></style>
