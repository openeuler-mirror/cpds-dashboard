<template>
	<div class="h100 layout-parent">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<keep-alive :include="getKeepAliveNames">
					<component :is="Component" :key="refreshRouterViewKey" class="w100" v-show="!isIframePage" />
				</keep-alive>
			</transition>
		</router-view>
		<transition :name="setTransitionName" mode="out-in">
			<Iframes class="w100" v-show="isIframePage" :refreshKey="iframeRefreshKey" :name="setTransitionName" :list="iframeList" />
		</transition>
	</div>
</template>

<script lang="ts">
import {
	defineAsyncComponent,
	computed,
	defineComponent,
	toRefs,
	reactive,
	getCurrentInstance,
	onBeforeMount,
	onUnmounted,
	nextTick,
	watch,
	onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Session } from '/@/utils/storage';

interface ParentViewState {
	refreshRouterViewKey: null | string;
	keepAliveNameList: string[];
	iframeRefreshKey: string;
	iframeList: any[];
}

// Import components
const Iframes = defineAsyncComponent(() => import('/@/layout/routerView/iframes.vue'));

export default defineComponent({
	name: 'layoutParentView',
	components: {
		Iframes,
	},
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const route = useRoute();
		const router = useRouter();
		const storesKeepAliveNames = useKeepALiveNames();
		const storesThemeConfig = useThemeConfig();
		const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames);
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const state = reactive<ParentViewState>({
			refreshRouterViewKey: null,
			keepAliveNameList: [],
			// iframe tagsview Right-click menu refreshed
			iframeRefreshKey: '',
			iframeList: [],
		});
		// set iframe disabled
		const isIframePage = computed(() => {
			return route.meta.isIframe;
		});
		// get iframe component list(Not rendered)
		const getIframeListRoutes = async () => {
			router.getRoutes().forEach((v) => {
				if (v.meta.isIframe) {
					v.meta.isIframeOpen = false;
					v.meta.loading = true;
					state.iframeList.push({ ...v });
				}
			});
		};
		const setTransitionName = computed(() => {
			return themeConfig.value.animation;
		});
		const getKeepAliveNames = computed(() => {
			return themeConfig.value.isTagsview ? cachedViews.value : state.keepAliveNameList;
		});
		onBeforeMount(() => {
			state.keepAliveNameList = keepAliveNames.value;
			proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
				state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name);
				state.refreshRouterViewKey = null;
				state.iframeRefreshKey = '';
				nextTick(() => {
					state.iframeRefreshKey = fullPath;
					state.refreshRouterViewKey = fullPath;
					state.keepAliveNameList = keepAliveNames.value;
				});
			});
		});
		onMounted(() => {
			getIframeListRoutes();
			nextTick(() => {
				setTimeout(() => {
					if (themeConfig.value.isCacheTagsView) cachedViews.value = Session.get('tagsViewList')?.map((item: any) => item.name);
				}, 0);
			});
		});
		onUnmounted(() => {
			proxy.mittBus.off('onTagsViewRefreshRouterView', () => {});
		});
		watch(
			() => route.fullPath,
			() => {
				state.refreshRouterViewKey = decodeURI(route.fullPath);
			}
		);
		return {
			isIframePage,
			setTransitionName,
			getKeepAliveNames,
			...toRefs(state),
		};
	},
});
</script>
