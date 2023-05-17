<template>
	<el-main class="layout-main">
		<el-scrollbar
			ref="layoutScrollbarRef"
			:class="{
				'layout-scrollbar':
					(!isClassicOrTransverse && !state.currentRouteMeta.isLink && !state.currentRouteMeta.isIframe) ||
					(!isClassicOrTransverse && state.currentRouteMeta.isLink && !state.currentRouteMeta.isIframe),
			}"
		>
			<LayoutParentView
				:style="{
					padding: !isClassicOrTransverse || (state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe) ? '0' : '15px',
					transition: 'padding 0.3s ease-in-out',
				}"
			/>
		</el-scrollbar>
	</el-main>
</template>

<script lang="ts" setup>
import { reactive, getCurrentInstance, watch, onMounted, computed, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
// import { NextLoading } from '/@/utils/loading';
import LayoutParentView from '/@/layout/routerView/parent.vue';

import { ElNotification } from 'element-plus';
import { useGlobal } from '/@/stores/global';

interface MainState {
	headerHeight: string | number;
	currentRouteMeta: any;
}

const { proxy } = <any>getCurrentInstance();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const route = useRoute();
const state = reactive<MainState>({
	headerHeight: '',
	currentRouteMeta: {},
});
// Judge layout
const isClassicOrTransverse = computed(() => {
	const { layout } = themeConfig.value;
	return layout === 'classic' || layout === 'transverse';
});
// Set the height of main
const initHeaderHeight = () => {
	const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
	let { isTagsview } = themeConfig.value;
	if (isTagsview) return (state.headerHeight = bool ? `86px` : `115px`);
	else return (state.headerHeight = `80px`);
};
// Initialize to obtain the current route meta, which is used to set iframes padding
const initGetMeta = () => {
	state.currentRouteMeta = route.meta;
};
const taskVisible = ref(false);
// Save the data pushed by websocket
const taskData = ref<any[]>([]);
// Save the latest websocket pushed data
const currentData = ref();
// Dynamically calculate task drawer width
const asideWidth = ref('calc(100% - 220px)');
const taskDrawerLeft = ref('220px');
const asideWidthChange = (classArr: string[]) => {
	if (classArr.indexOf('layout-aside-pc-220') > -1) {
		asideWidth.value = 'calc(100% - 220px)';
		taskDrawerLeft.value = '220px';
	} else if (classArr.indexOf('layout-aside-pc-64') > -1) {
		asideWidth.value = 'calc(100% - 64px)';
		taskDrawerLeft.value = '64px';
	} else {
		asideWidth.value = '100%';
		taskDrawerLeft.value = '0';
	}
};
// Monitor the change of sidebar width
proxy.mittBus.on('aside-width', asideWidthChange);
// The /system-event/task and /no-cluster route does not display the task list button
const isTaskBtn = computed(() => {
	return route.path !== '/system-event/task' && route.path !== '/no-cluster' && route.path !== '/home';
});
const socket = ref();
const storesGlobal = useGlobal();

// Restrict notification display
const notificationQueue: { title: any; message: any; timestamp: number }[] = [];
const pushNotification = (options: any, space: number = 2000) => {
	// Find if there are already the same notifications in the queue
	const notification = notificationQueue.find((item) => item.title === options.title && item.message === options.message);
	if (notification) {
		// If there are identical notifications and the time interval between the last display exceeds, a notification is displayed
		console.log(new Date().getTime() - notification.timestamp);
		if (new Date().getTime() - notification.timestamp > space) ElNotification(options);
		// Update the timestamp of the notification
		notification.timestamp = new Date().getTime();
	} else {
		// if no same notice,add queue
		notificationQueue.push({
			title: options.title,
			message: options.message,
			timestamp: new Date().getTime(),
		});
		// show notice
		ElNotification(options);
	}
};

onMounted(async () => {
	await initGetMeta();
	initHeaderHeight();
	// NextLoading.done();
});
onUnmounted(() => {
	// Close websocket
	socket.value != null && socket.value.close();
	proxy.mittBus.off('aside-width', asideWidthChange);
});
watch(
	() => route.path,
	() => {
		state.currentRouteMeta = route.meta;
		const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
		state.headerHeight = bool ? `86px` : `115px`;
		proxy.$refs.layoutScrollbarRef.update();
	}
);
watch(
	themeConfig,
	(val) => {
		state.currentRouteMeta = route.meta;
		const bool = state.currentRouteMeta.isLink && state.currentRouteMeta.isIframe;
		state.headerHeight = val.isTagsview ? (bool ? `86px` : `115px`) : '51px';
		proxy.$refs?.layoutScrollbarRef?.update();
	},
	{
		deep: true,
	}
);
</script>
<style lang="scss" scoped>
.task-btn {
	margin-top: 8px;
	position: fixed;
	bottom: 15px;
	.el-icon {
		margin-left: 5px;
	}
}
:deep(.el-drawer) {
	width: v-bind(asideWidth);
	left: v-bind(taskDrawerLeft);
}
</style>
