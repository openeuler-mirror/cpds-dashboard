<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import other from '/@/utils/other';
import { Session } from '/@/utils/storage';
import setIntroduction from '/@/utils/setIconfont';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const { proxy } = <any>getCurrentInstance();
const setingsRef = ref();
const route = useRoute();
const stores = useTagsViewRoutes();
// Get global component size
const getGlobalComponentSize = computed(() => {
	return other.globalComponentSize();
});
// Layout configuration pop-up window opens
const openSetingsDrawer = () => {
	setingsRef.value.openDrawer();
};
// Set initialization to prevent restoring default when refreshing
onBeforeMount(() => {
	// Set batch third-party icon
	setIntroduction.cssCdn();
	// Set batch third-party js
	setIntroduction.jsCdn();
});
onMounted(() => {
	nextTick(() => {
		// Click Open in the pop-up window of monitoring layout configuration
		proxy.mittBus.on('openSetingsDrawer', () => {
			openSetingsDrawer();
		});
		// Get the layout configuration in the cache
		// if (Local.get('themeConfig')) {
		// 	storesThemeConfig.setThemeConfig(Local.get('themeConfig'));
		// 	document.documentElement.style.cssText = Local.get('themeConfigStyle');
		// }
		document.documentElement.style.cssText = `
					--next-bg-menuBar:#545c64; 
					--next-bg-menuBar-light-1:#5c646b; 
					--next-bg-menuBarColor:#eaeaea; 
					--next-bg-topBar:#ffffff; 
					--next-bg-topBarColor:#606266; 
					--next-bg-columnsMenuBar:#545c64; 
					--next-bg-columnsMenuBarColor:#e6e6e6; 
					--el-color-primary-dark-2:#398ee5; 
					--el-color-primary:#409eff; 
					--el-color-primary-light-1:#53a7ff; 
					--el-color-primary-light-2:#66b1ff; 
					--el-color-primary-light-3:#79bbff; 
					--el-color-primary-light-4:#8cc4ff; 
					--el-color-primary-light-5:#9fceff; 
					--el-color-primary-light-6:#b2d8ff; 
					--el-color-primary-light-7:#c5e1ff; 
					--el-color-primary-light-8:#d8ebff; 
					--el-color-primary-light-9:#ebf5ff;`;
		// Get full screen configuration in cache
		if (Session.get('isTagsViewCurrenFull')) {
			stores.setCurrenFullscreen(Session.get('isTagsViewCurrenFull'));
		}
	});
});
onUnmounted(() => {
	proxy.mittBus.off('openSetingsDrawer', () => {});
});
// Monitor route changes and set website title
watch(
	() => route.path,
	() => {
		other.useTitle();
	},
	{
		deep: true,
	}
);
</script>
