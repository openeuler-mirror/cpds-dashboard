<template>
	<div class="layout-navbars-breadcrumb-index">
		<div v-if="isShowBreadcrumb" class="layout-navbars-breadcrumb">
			<el-breadcrumb class="layout-navbars-breadcrumb-hide">
				<transition-group name="breadcrumb">
					<el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="!v.meta.tagsViewName ? v.meta.title : v.meta.tagsViewName">
						<span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
							<SvgIcon :name="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="themeConfig.isBreadcrumbIcon" />
							<div v-if="!v.meta.tagsViewName">{{ v.meta.title }}</div>
							<div v-else>{{ v.meta.tagsViewName }}</div>
						</span>
						<a v-else @click.prevent="onBreadcrumbClick(v)">
							<SvgIcon :name="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="themeConfig.isBreadcrumbIcon" />{{ v.meta.title }}
						</a>
					</el-breadcrumb-item>
				</transition-group>
			</el-breadcrumb>
			<div>{{ breadcrumbList[breadcrumbList.length - 1].meta.tagsViewName }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, onMounted, defineComponent } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { Local } from '/@/utils/storage';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useRoutesList } from '/@/stores/routesList';

interface BreadcrumbState {
	breadcrumbList: Array<any>;
	routeSplit: Array<string>;
	routeSplitFirst: string;
	routeSplitIndex: number;
}

export default defineComponent({
	name: 'layoutBreadcrumb',
	setup() {
		const stores = useRoutesList();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { routesList } = storeToRefs(stores);
		const route = useRoute();
		const router = useRouter();

		const state = reactive<BreadcrumbState>({
			breadcrumbList: [],
			routeSplit: [],
			routeSplitFirst: '',
			routeSplitIndex: 1,
		});
		// Dynamically set classic and horizontal layout not to be displayed
		const isShowBreadcrumb = computed(() => {
			initRouteSplit(route.path);
			const { layout, isBreadcrumb } = themeConfig.value;
			if (layout === 'classic' || layout === 'transverse') return false;
			else return !!isBreadcrumb;
		});
		// When bread crumbs are clicked
		const onBreadcrumbClick = (v: any) => {
			const { redirect, path, children } = v;
			if (redirect) {
				router.push(redirect);
			} else {
				if (children && children.length > 0) {
					router.push(children[0].path);
				} else {
					router.push(path);
				}
			}
		};
		// Expand or stow the left menu and click
		const onThemeConfigChange = () => {
			themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
			setLocalThemeConfig();
		};
		// Storage Layout Configuration
		const setLocalThemeConfig = () => {
			Local.remove('themeConfig');
			Local.set('themeConfig', themeConfig.value);
		};
		// Processing crumb data
		const getBreadcrumbList = (arr: Array<string>) => {
			arr.forEach((item: any) => {
				state.routeSplit.forEach((v: any, k: number, arrs: any) => {
					if (state.routeSplitFirst === item.path) {
						state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`;
						state.breadcrumbList.push(item);
						state.routeSplitIndex++;
						if (item.children) getBreadcrumbList(item.children);
					}
				});
			});
		};
		// The current route string is cut into an array and the first empty content is deleted
		const initRouteSplit = (path: string) => {
			if (!themeConfig.value.isBreadcrumb) return false;
			// state.breadcrumbList = [routesList.value[1]];
			if (path == '/home') {
				state.breadcrumbList = [
					{
						path: '/home',
						name: 'home',
						meta: {
							title: '概览',
							isLink: '',
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-gaishu',
							tagsViewName: '概览',
						},
					},
				];
			} else {
				state.breadcrumbList = [];
			}

			state.routeSplit = path.split('/');
			state.routeSplit.shift();
			state.routeSplitFirst = `/${state.routeSplit[0]}`;
			state.routeSplitIndex = 1;
			getBreadcrumbList(routesList.value);
			if (route.name === 'notFound' && state.breadcrumbList.length > 1) state.breadcrumbList.shift();
			if (state.breadcrumbList.length > 0) state.breadcrumbList[state.breadcrumbList.length - 1].meta.tagsViewName = route.meta.title;
		};
		onMounted(() => {
			initRouteSplit(route.path);
			console.log(route.path == '/home');
		});
		onBeforeRouteUpdate((to) => {
			initRouteSplit(to.path);
		});
		return {
			onThemeConfigChange,
			isShowBreadcrumb,
			themeConfig,
			onBreadcrumbClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 100px;
	//display: flex;
	align-items: center;
	background: var(--next-bg-topBar);
	border-bottom: 1px solid var(--next-border-color-light);

	.bell {
		padding-left: 50px;
	}
}

.layout-navbars-breadcrumb {
	height: inherit;
	//display: flex;
	padding-top: 10px;
	padding-left: 50px;
	align-items: center;

	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		color: var(--next-bg-topBarColor);
		height: 100%;
		width: 40px;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}

	.layout-navbars-breadcrumb-span {
		display: flex;
		opacity: 0.7;
		color: var(--next-bg-topBarColor);
	}

	.layout-navbars-breadcrumb-iconfont {
		font-size: 14px;
		margin-right: 5px;
	}

	:deep(.el-breadcrumb__separator) {
		opacity: 0.7;
		color: var(--next-bg-topBarColor);
	}

	:deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
		font-weight: unset !important;
		color: var(--next-bg-topBarColor);

		&:hover {
			color: var(--el-color-primary) !important;
		}
	}
}
</style>
