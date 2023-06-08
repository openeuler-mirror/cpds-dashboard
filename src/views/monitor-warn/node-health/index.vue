<template>
	<div>
		<Description :title="desctitle" :desc="desc"></Description>
		<NodeList></NodeList>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, provide, onMounted, reactive, toRefs, computed } from 'vue';
import Description from '/@/components/description/index.vue'
const NodeList = defineAsyncComponent(() => import('./components/nodelist.vue'))
const desctitle = '节点健康'
const desc = '显示节点基本信息，包含节点IP地址、操作系统版本、内核版本、采集器版本和系统架构信息'
</script>
