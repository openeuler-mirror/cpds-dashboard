<template>
	<div class="layout-breadcrumb-seting">
		<el-drawer
			title="布局设置"
			v-model="getThemeConfig.isDrawer"
			direction="rtl"
			destroy-on-close
			size="260px"
			@close="onDrawerClose"
		>
			<el-scrollbar class="layout-breadcrumb-seting-bar">
				<!-- Global themes -->
				<el-divider content-position="left">全局主题</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.primary" size="default" @change="onColorPickerChange"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">深色模式</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isIsDark" size="small" @change="onAddDarkChange"></el-switch>
					</div>
				</div>

				<!-- Top bar settings -->
				<el-divider content-position="left">顶栏设置</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">顶栏背景</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.topBar" size="default" @change="onBgColorPickerChange('topBar')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">顶栏默认字体颜色</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.topBarColor" size="default" @change="onBgColorPickerChange('topBarColor')"> </el-color-picker>
					</div>
				</div>
				<!-- Menu Settings -->
				<el-divider content-position="left">菜单设置</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">菜单背景</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.menuBar" size="default" @change="onBgColorPickerChange('menuBar')"> </el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">菜单默认字体颜色</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker v-model="getThemeConfig.menuBarColor" size="default" @change="onBgColorPickerChange('menuBarColor')"> </el-color-picker>
					</div>
				</div>
				<!-- Column setting -->
				<el-divider content-position="left" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">分栏设置</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">分栏菜单默认字体颜色</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker
							v-model="getThemeConfig.columnsMenuBar"
							size="default"
							@change="onBgColorPickerChange('columnsMenuBar')"
							:disabled="getThemeConfig.layout !== 'columns'"
						>
						</el-color-picker>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">分栏菜单默认字体颜色</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-color-picker
							v-model="getThemeConfig.columnsMenuBarColor"
							size="default"
							@change="onBgColorPickerChange('columnsMenuBarColor')"
							:disabled="getThemeConfig.layout !== 'columns'"
						>
						</el-color-picker>
					</div>
				</div>
				<!-- Interface Settings -->
				<el-divider content-position="left">界面设置</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex" :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">菜单水平折叠</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch
							v-model="getThemeConfig.isCollapse"
							:disabled="getThemeConfig.layout === 'transverse'"
							size="small"
							@change="onThemeConfigChange"
						></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">菜单手风琴</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch
							v-model="getThemeConfig.isUniqueOpened"
							:disabled="getThemeConfig.layout === 'transverse'"
							size="small"
							@change="setLocalThemeConfig"
						></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">固定 Header</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isFixedHeader" size="small" @change="onIsFixedHeaderChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">经典布局分割菜单</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch
							v-model="getThemeConfig.isClassicSplitMenu"
							:disabled="getThemeConfig.layout !== 'classic'"
							size="small"
							@change="onClassicSplitMenuChange"
						>
						</el-switch>
					</div>
				</div>

				<!-- Interface display -->
				<el-divider content-position="left">界面显示</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">侧边栏 Logo</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isShowLogo" size="small" @change="onIsShowLogoChange"></el-switch>
					</div>
				</div>
				<div
					class="layout-breadcrumb-seting-bar-flex mt15"
					:style="{ opacity: getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse' ? 0.5 : 1 }"
				>
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 Breadcrumb</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch
							v-model="getThemeConfig.isBreadcrumb"
							:disabled="getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse'"
							size="small"
							@change="onIsBreadcrumbChange"
						></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 Breadcrumb 图标</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isBreadcrumbIcon" size="small" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 Tagsview</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isTagsview" size="small" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 Tagsview 图标</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isTagsviewIcon" size="small" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 TagsView 缓存</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isCacheTagsView" size="small" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: isMobile ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 TagsView 拖拽</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch
							v-model="getThemeConfig.isSortableTagsView"
							:disabled="isMobile ? true : false"
							size="small"
							@change="onSortableTagsViewChange"
						></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 TagsView 共用</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isShareTagsView" size="small" @change="onShareTagsViewChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启 Footer</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isFooter" size="small" @change="setLocalThemeConfig"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">开启水印</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-switch v-model="getThemeConfig.isWartermark" size="small" @change="onWartermarkChange"></el-switch>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt14">
					<div class="layout-breadcrumb-seting-bar-flex-label">水印文案</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-input v-model="getThemeConfig.wartermarkText" size="default" style="width: 90px" @input="onWartermarkTextInput($event)"></el-input>
					</div>
				</div>

				<!-- Other settings -->
				<el-divider content-position="left">其它设置</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">Tagsview 风格</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="default" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="风格1" value="tags-style-one"></el-option>
							<el-option label="风格4" value="tags-style-four"></el-option>
							<el-option label="风格5" value="tags-style-five"></el-option>
						</el-select>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">主页面切换动画</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select v-model="getThemeConfig.animation" placeholder="请选择" size="default" style="width: 90px" @change="setLocalThemeConfig">
							<el-option label="slide-right" value="slide-right"></el-option>
							<el-option label="slide-left" value="slide-left"></el-option>
							<el-option label="opacitys" value="opacitys"></el-option>
						</el-select>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">分栏高亮风格</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select
							v-model="getThemeConfig.columnsAsideStyle"
							placeholder="请选择"
							size="default"
							style="width: 90px"
							:disabled="getThemeConfig.layout !== 'columns' ? true : false"
							@change="setLocalThemeConfig"
						>
							<el-option label="圆角" value="columns-round"></el-option>
							<el-option label="卡片" value="columns-card"></el-option>
						</el-select>
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15 mb27" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
					<div class="layout-breadcrumb-seting-bar-flex-label">分栏布局风格</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<el-select
							v-model="getThemeConfig.columnsAsideLayout"
							placeholder="请选择"
							size="default"
							style="width: 90px"
							:disabled="getThemeConfig.layout !== 'columns' ? true : false"
							@change="setLocalThemeConfig"
						>
							<el-option label="水平" value="columns-horizontal"></el-option>
							<el-option label="垂直" value="columns-vertical"></el-option>
						</el-select>
					</div>
				</div>

				<!-- Layout Switch -->
				<el-divider content-position="left">布局切换</el-divider>
				<div class="layout-drawer-content-flex">
					<!-- Defaults layout -->
					<div class="layout-drawer-content-item" @click="onSetLayout('defaults')">
						<section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'defaults' }">
							<aside class="el-aside" style="width: 20px"></aside>
							<section class="el-container is-vertical">
								<header class="el-header" style="height: 10px"></header>
								<main class="el-main"></main>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'defaults' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">默认</p>
							</div>
						</div>
					</div>
					<!-- Classic layout -->
					<div class="layout-drawer-content-item" @click="onSetLayout('classic')">
						<section class="el-container is-vertical el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'classic' }">
							<header class="el-header" style="height: 10px"></header>
							<section class="el-container">
								<aside class="el-aside" style="width: 20px"></aside>
								<section class="el-container is-vertical">
									<main class="el-main"></main>
								</section>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'classic' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">经典</p>
							</div>
						</div>
					</div>
					<!-- Transverse layout -->
					<div class="layout-drawer-content-item" @click="onSetLayout('transverse')">
						<section class="el-container is-vertical el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'transverse' }">
							<header class="el-header" style="height: 10px"></header>
							<section class="el-container">
								<section class="el-container is-vertical">
									<main class="el-main"></main>
								</section>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'transverse' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">横向</p>
							</div>
						</div>
					</div>
					<!-- Columns layout -->
					<div class="layout-drawer-content-item" @click="onSetLayout('columns')">
						<section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'columns' }">
							<aside class="el-aside-dark" style="width: 10px"></aside>
							<aside class="el-aside" style="width: 20px"></aside>
							<section class="el-container is-vertical">
								<header class="el-header" style="height: 10px"></header>
								<main class="el-main"></main>
							</section>
						</section>
						<div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'columns' }">
							<div class="layout-tips-box">
								<p class="layout-tips-txt">分栏</p>
							</div>
						</div>
					</div>
				</div>
				<div class="copy-config">
					<el-alert title="点击下方按钮，复制布局配置去 `src/stores/themeConfig.ts` 中修改。" type="warning" :closable="false"> </el-alert>
					<el-button size="default" class="copy-config-btn" type="primary" ref="copyConfigBtnRef" @click="onCopyConfigClick">
						<el-icon class="mr5">
							<ele-CopyDocument />
						</el-icon>
						一键复制配置
					</el-button>
					<el-button size="default" class="copy-config-btn-reset" type="info" @click="onResetConfigClick">
						<el-icon class="mr5">
							<ele-RefreshRight />
						</el-icon>
						一键恢复默认
					</el-button>
				</div>
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script lang="ts">
import { nextTick, onUnmounted, onMounted, getCurrentInstance, defineComponent, computed, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { getLightColor, getDarkColor } from '/@/utils/theme';
import { verifyAndSpace } from '/@/utils/toolsValidate';
import { Local } from '/@/utils/storage';
import Watermark from '/@/utils/wartermark';
import commonFunction from '/@/utils/commonFunction';
import other from '/@/utils/other';

export default defineComponent({
	name: 'layoutBreadcrumbSeting',
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { copyText } = commonFunction();
		const state = reactive({
			isMobile: false,
		});
		// Get layout configuration information
		const getThemeConfig = computed(() => {
			return themeConfig.value;
		});
		// 1.Global themes
		const onColorPickerChange = () => {
			if (!getThemeConfig.value.primary) return ElMessage.warning('全局主题 primary 颜色值不能为空');
			// Color deepening
			document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getThemeConfig.value.primary, 0.1)}`);
			document.documentElement.style.setProperty('--el-color-primary', getThemeConfig.value.primary);
			// Color darkens Color lightens
			for (let i = 1; i <= 9; i++) {
				document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getThemeConfig.value.primary, i / 10)}`);
			}
			setDispatchThemeConfig();
		};
		// 2.Menu / Top bar
		const onBgColorPickerChange = (bg: string) => {
			document.documentElement.style.setProperty(`--next-bg-${bg}`, (<any>getThemeConfig.value)[bg]);
			if (bg === 'menuBar') {
				document.documentElement.style.setProperty(`--next-bg-menuBar-light-1`, <any>getLightColor(getThemeConfig.value.menuBar, 0.05));
			}
			setDispatchThemeConfig();
		};
		// 3.Interface Settings --> Menu collapse horizontally
		const onThemeConfigChange = () => {
			setDispatchThemeConfig();
		};
		// 3.Interface Settings --> Fied Header
		const onIsFixedHeaderChange = () => {
			getThemeConfig.value.isFixedHeaderChange = !getThemeConfig.value.isFixedHeader;
			setLocalThemeConfig();
		};
		// 3.Interface Settings --> Classic Layout Split Menu
		const onClassicSplitMenuChange = () => {
			getThemeConfig.value.isBreadcrumb = false;
			setLocalThemeConfig();
			proxy.mittBus.emit('getBreadcrumbIndexSetFilterRoutes');
		};
		// 4.Interface display --> Sidebar Logo
		const onIsShowLogoChange = () => {
			getThemeConfig.value.isShowLogoChange = !getThemeConfig.value.isShowLogo;
			setLocalThemeConfig();
		};
		// 4.Interface display --> Breadcrumb
		const onIsBreadcrumbChange = () => {
			if (getThemeConfig.value.layout === 'classic') {
				getThemeConfig.value.isClassicSplitMenu = false;
			}
			setLocalThemeConfig();
		};
		// 4.Interface display --> Enable TagsView drag
		const onSortableTagsViewChange = () => {
			proxy.mittBus.emit('openOrCloseSortable');
			setLocalThemeConfig();
		};
		// 4.Interface display --> Enable TagsView Sharing
		const onShareTagsViewChange = () => {
			proxy.mittBus.emit('openShareTagsView');
			setLocalThemeConfig();
		};
		// 4.Interface display --> Dark Mode
		const onAddDarkChange = () => {
			const body = document.documentElement as HTMLElement;
			if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark');
			else body.setAttribute('data-theme', '');
		};
		// 4.Interface display --> Turn on watermark
		const onWartermarkChange = () => {
			getThemeConfig.value.isWartermark ? Watermark.set(getThemeConfig.value.wartermarkText) : Watermark.del();
			setLocalThemeConfig();
		};
		// 4.Interface display --> Watermark copy
		const onWartermarkTextInput = (val: any) => {
			getThemeConfig.value.wartermarkText = verifyAndSpace(val);
			if (getThemeConfig.value.wartermarkText === '') return false;
			if (getThemeConfig.value.isWartermark) Watermark.set(getThemeConfig.value.wartermarkText);
			setLocalThemeConfig();
		};
		// 5.Layout Switch
		const onSetLayout = (layout: string) => {
			Local.set('oldLayout', layout);
			if (getThemeConfig.value.layout === layout) return false;
			if (layout === 'transverse') getThemeConfig.value.isCollapse = false;
			getThemeConfig.value.layout = layout;
			getThemeConfig.value.isDrawer = false;
			initLayoutChangeFun();
		};
		// Set layout switching
		const initLayoutChangeFun = () => {
			onBgColorPickerChange('menuBar');
			onBgColorPickerChange('menuBarColor');
			onBgColorPickerChange('topBar');
			onBgColorPickerChange('topBarColor');
			onBgColorPickerChange('columnsMenuBar');
			onBgColorPickerChange('columnsMenuBarColor');
		};
		const onDrawerClose = () => {
			getThemeConfig.value.isFixedHeaderChange = false;
			getThemeConfig.value.isShowLogoChange = false;
			getThemeConfig.value.isDrawer = false;
			setLocalThemeConfig();
		};
		// Layout configuration pop-up window opens
		const openDrawer = () => {
			getThemeConfig.value.isDrawer = true;
		};
		// Trigger store layout configuration update
		const setDispatchThemeConfig = () => {
			setLocalThemeConfig();
			setLocalThemeConfigStyle();
		};
		// Storage Layout Configuration
		const setLocalThemeConfig = () => {
			Local.remove('themeConfig');
			Local.set('themeConfig', getThemeConfig.value);
		};
		// Storage Layout Configuration Global Theme Styles
		const setLocalThemeConfigStyle = () => {
			Local.set('themeConfigStyle', document.documentElement.style.cssText);
		};
		// One click replication configuration
		const onCopyConfigClick = () => {
			let copyThemeConfig = Local.get('themeConfig');
			copyThemeConfig.isDrawer = false;
			copyText(JSON.stringify(copyThemeConfig)).then(() => {
				getThemeConfig.value.isDrawer = false;
			});
		};
		// One click restore default
		const onResetConfigClick = () => {
			Local.clear();
			window.location.reload();
		};
		onMounted(() => {
			nextTick(() => {
				// Judge whether the current layout is different. If it is different, initialize the style of the current layout to prevent the layout configuration logo, menu background and other parts of the layout from failing when the size of the listening window changes
				if (!Local.get('frequency')) initLayoutChangeFun();
				Local.set('frequency', 1);
				// The size of the listening window changes, and the non default layout is set as the default layout（mobile）
				proxy.mittBus.on('layoutMobileResize', (res: any) => {
					getThemeConfig.value.layout = res.layout;
					getThemeConfig.value.isDrawer = false;
					initLayoutChangeFun();
					state.isMobile = other.isMobile();
				});
				setTimeout(() => {
					// Default Style
					onColorPickerChange();
					// Dark Mode
					if (getThemeConfig.value.isIsDark) onAddDarkChange();
					// Turn on watermark
					onWartermarkChange();
				}, 100);
			});
		});
		onUnmounted(() => {
			proxy.mittBus.off('layoutMobileResize', () => {});
		});
		return {
			openDrawer,
			onColorPickerChange,
			onBgColorPickerChange,
			onThemeConfigChange,
			onIsFixedHeaderChange,
			onIsShowLogoChange,
			getThemeConfig,
			onDrawerClose,
			onAddDarkChange,
			onWartermarkChange,
			onWartermarkTextInput,
			onSetLayout,
			setLocalThemeConfig,
			onClassicSplitMenuChange,
			onIsBreadcrumbChange,
			onSortableTagsViewChange,
			onShareTagsViewChange,
			onCopyConfigClick,
			onResetConfigClick,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
	height: calc(100vh - 50px);
	padding: 0 15px;
	:deep(.el-scrollbar__view) {
		overflow-x: hidden !important;
	}
	.layout-breadcrumb-seting-bar-flex {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
		&-label {
			flex: 1;
			color: var(--el-text-color-primary);
		}
	}
	.layout-drawer-content-flex {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		margin: 0 -5px;
		.layout-drawer-content-item {
			width: 50%;
			height: 70px;
			cursor: pointer;
			border: 1px solid transparent;
			position: relative;
			padding: 5px;
			.el-container {
				height: 100%;
				.el-aside-dark {
					background-color: var(--next-color-seting-header);
				}
				.el-aside {
					background-color: var(--next-color-seting-aside);
				}
				.el-header {
					background-color: var(--next-color-seting-header);
				}
				.el-main {
					background-color: var(--next-color-seting-main);
				}
			}
			.el-circular {
				border-radius: 2px;
				overflow: hidden;
				border: 1px solid transparent;
				transition: all 0.3s ease-in-out;
			}
			.drawer-layout-active {
				border: 1px solid;
				border-color: var(--el-color-primary);
			}
			.layout-tips-warp,
			.layout-tips-warp-active {
				transition: all 0.3s ease-in-out;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border: 1px solid;
				border-color: var(--el-color-primary-light-5);
				border-radius: 100%;
				padding: 4px;
				.layout-tips-box {
					transition: inherit;
					width: 30px;
					height: 30px;
					z-index: 9;
					border: 1px solid;
					border-color: var(--el-color-primary-light-5);
					border-radius: 100%;
					.layout-tips-txt {
						transition: inherit;
						position: relative;
						top: 5px;
						font-size: 12px;
						line-height: 1;
						letter-spacing: 2px;
						white-space: nowrap;
						color: var(--el-color-primary-light-5);
						text-align: center;
						transform: rotate(30deg);
						left: -1px;
						background-color: var(--next-color-seting-main);
						width: 32px;
						height: 17px;
						line-height: 17px;
					}
				}
			}
			.layout-tips-warp-active {
				border: 1px solid;
				border-color: var(--el-color-primary);
				.layout-tips-box {
					border: 1px solid;
					border-color: var(--el-color-primary);
					.layout-tips-txt {
						color: var(--el-color-primary) !important;
						background-color: var(--next-color-seting-main) !important;
					}
				}
			}
			&:hover {
				.el-circular {
					transition: all 0.3s ease-in-out;
					border: 1px solid;
					border-color: var(--el-color-primary);
				}
				.layout-tips-warp {
					transition: all 0.3s ease-in-out;
					border-color: var(--el-color-primary);
					.layout-tips-box {
						transition: inherit;
						border-color: var(--el-color-primary);
						.layout-tips-txt {
							transition: inherit;
							color: var(--el-color-primary) !important;
							background-color: var(--next-color-seting-main) !important;
						}
					}
				}
			}
		}
	}
	.copy-config {
		margin: 10px 0;
		.copy-config-btn {
			width: 100%;
			margin-top: 15px;
		}
		.copy-config-btn-reset {
			width: 100%;
			margin: 10px 0 0;
		}
	}
}
</style>
