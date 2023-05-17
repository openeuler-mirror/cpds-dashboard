<template>
	<div class="icon-selector w100 h100">
		<el-popover
			placement="bottom"
			:width="fontIconWidth"
			trigger="click"
			transition="el-zoom-in-top"
			popper-class="icon-selector-popper"
			@show="onPopoverShow"
		>
			<template #reference>
				<el-input
					v-model="fontIconSearch"
					:placeholder="fontIconPlaceholder"
					:clearable="clearable"
					:disabled="disabled"
					:size="size"
					ref="inputWidthRef"
					@clear="onClearFontIcon"
					@focus="onIconFocus"
					@blur="onIconBlur"
				>
					<template #prepend>
						<SvgIcon
							:name="fontIconPrefix === '' ? prepend : fontIconPrefix"
							class="font14"
							v-if="fontIconPrefix === '' ? prepend?.indexOf('ele-') > -1 : fontIconPrefix?.indexOf('ele-') > -1"
						/>
						<i v-else :class="fontIconPrefix === '' ? prepend : fontIconPrefix" class="font14"></i>
					</template>
				</el-input>
			</template>
			<template #default>
				<div class="icon-selector-warp">
					<div class="icon-selector-warp-title flex">
						<div class="flex-auto">{{ title }}</div>
						<div class="icon-selector-warp-title-tab" v-if="type === 'all'">
							<span :class="{ 'span-active': fontIconType === 'ali' }" @click="onIconChange('ali')" class="ml10" title="iconfont 图标">ali</span>
							<span :class="{ 'span-active': fontIconType === 'ele' }" @click="onIconChange('ele')" class="ml10" title="elementPlus 图标">ele</span>
							<span :class="{ 'span-active': fontIconType === 'awe' }" @click="onIconChange('awe')" class="ml10" title="fontawesome 图标">awe</span>
						</div>
					</div>
					<div class="icon-selector-warp-row">
						<el-scrollbar ref="selectorScrollbarRef">
							<el-row :gutter="10" v-if="fontIconSheetsFilterList.length > 0">
								<el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" @click="onColClick(v)" v-for="(v, k) in fontIconSheetsFilterList" :key="k">
									<div class="icon-selector-warp-item" :class="{ 'icon-selector-active': fontIconPrefix === v }">
										<div class="flex-margin">
											<div class="icon-selector-warp-item-value">
												<SvgIcon :name="v" />
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-empty :image-size="100" v-if="fontIconSheetsFilterList.length <= 0" :description="emptyDescription"></el-empty>
						</el-scrollbar>
					</div>
				</div>
			</template>
		</el-popover>
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted, nextTick, computed, watch, defineComponent } from 'vue';
import initIconfont from '/@/utils/getStyleSheets';

export default defineComponent({
	name: 'iconSelector',
	emits: ['update:modelValue', 'get', 'clear'],
	props: {
		// Front content of input box
		prepend: {
			type: String,
			default: () => 'ele-Pointer',
		},
		// Input box placeholder text
		placeholder: {
			type: String,
			default: () => '请输入内容搜索图标或者选择图标',
		},
		// Input box placeholder text
		size: {
			type: String,
			default: () => 'default',
		},
		// Pop up title
		title: {
			type: String,
			default: () => '请选择图标',
		},
		// Icon type
		type: {
			type: String,
			default: () => 'ele',
		},
		// Disable
		disabled: {
			type: Boolean,
			default: () => false,
		},
		// Whether it can be emptied
		clearable: {
			type: Boolean,
			default: () => true,
		},
		// Customize empty status description text
		emptyDescription: {
			type: String,
			default: () => '无相关图标',
		},
		modelValue: String,
	},
	setup(props, { emit }) {
		const inputWidthRef = ref();
		const selectorScrollbarRef = ref();
		const state = reactive({
			fontIconPrefix: '',
			fontIconWidth: 0,
			fontIconSearch: '',
			fontIconTabsIndex: 0,
			fontIconSheetsList: [],
			fontIconPlaceholder: '',
			fontIconType: 'ali',
			fontIconShow: true,
		});
		// When processing input to obtain focus, change the placeholder value of input when the modelValue has a value
		const onIconFocus = () => {
			if (!props.modelValue) return false;
			state.fontIconSearch = '';
			state.fontIconPlaceholder = props.modelValue;
		};
		// When the input loses focus, if it is empty, the input value will be cleared. When clicking the selected icon, the original value will be taken
		const onIconBlur = () => {
			setTimeout(() => {
				const icon = state.fontIconSheetsList.filter((icon: string) => icon === state.fontIconSearch);
				if (icon.length <= 0) state.fontIconSearch = '';
			}, 300);
		};
		// Processing icon bidirectional binding value echo
		const initModeValueEcho = () => {
			if (props.modelValue === '') return ((<string | undefined>state.fontIconPlaceholder) = props.placeholder);
			(<string | undefined>state.fontIconPlaceholder) = props.modelValue;
			(<string | undefined>state.fontIconPrefix) = props.modelValue;
		};
		// When the icon type is all, echo of types ali, ele, awe
		const initFontIconTypeEcho = () => {
			if ((<any>props.modelValue)?.indexOf('iconfont') > -1) onIconChange('ali');
			else if ((<any>props.modelValue)?.indexOf('ele-') > -1) onIconChange('ele');
			else if ((<any>props.modelValue)?.indexOf('fa') > -1) onIconChange('awe');
			else onIconChange('ali');
		};
		// Icon search and icon data display
		const fontIconSheetsFilterList = computed(() => {
			if (!state.fontIconSearch) return state.fontIconSheetsList;
			let search = state.fontIconSearch.trim().toLowerCase();
			return state.fontIconSheetsList.filter((item: any) => {
				if (item.toLowerCase().indexOf(search) !== -1) return item;
			});
		});
		// Get the width of input
		const getInputWidth = () => {
			nextTick(() => {
				state.fontIconWidth = inputWidthRef.value.$el.offsetWidth;
			});
		};
		// Monitoring page width changes
		const initResize = () => {
			window.addEventListener('resize', () => {
				getInputWidth();
			});
		};
		// Init data
		const initFontIconData = async (type: string) => {
			state.fontIconSheetsList = [];
			if (type === 'ali') {
				await initIconfont.ali().then((res: any) => {
					state.fontIconSheetsList = res.map((i: string) => `iconfont ${i}`);
				});
			} else if (type === 'ele') {
				await initIconfont.ele().then((res: any) => {
					state.fontIconSheetsList = res;
				});
			} else if (type === 'awe') {
				await initIconfont.awe().then((res: any) => {
					state.fontIconSheetsList = res.map((i: string) => `fa ${i}`);
				});
			}
			state.fontIconPlaceholder = props.placeholder;
			// Initialize bidirectional binding echo
			initModeValueEcho();
		};
		// Click icon to switch
		const onIconChange = (type: string) => {
			state.fontIconType = type;
			initFontIconData(type);
		};
		// Get the icon currently clicked
		const onColClick = (v: any) => {
			state.fontIconPlaceholder = v;
			state.fontIconPrefix = v;
			emit('get', state.fontIconPrefix);
			emit('update:modelValue', state.fontIconPrefix);
		};
		// Clear the icon currently clicked
		const onClearFontIcon = () => {
			state.fontIconPrefix = '';
			emit('clear', state.fontIconPrefix);
			emit('update:modelValue', state.fontIconPrefix);
		};
		// Listening Popover is opened for two-way binding value echo
		const onPopoverShow = () => {
			initModeValueEcho();
			initFontIconTypeEcho();
		};
		// On page load
		onMounted(() => {
			initModeValueEcho();
			initResize();
			getInputWidth();
		});

		// onitor the changes of two-way binding modelValue
		watch(
			() => props.modelValue,
			() => {
				initModeValueEcho();
			}
		);
		return {
			inputWidthRef,
			selectorScrollbarRef,
			fontIconSheetsFilterList,
			onColClick,
			onIconChange,
			onClearFontIcon,
			onIconFocus,
			onIconBlur,
			onPopoverShow,
			...toRefs(state),
		};
	},
});
</script>
