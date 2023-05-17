<template>
	<i v-if="isShowIconSvg" class="el-icon" :style="setIconSvgStyle">
		<component :is="getIconName" />
	</i>
	<div v-else-if="isShowIconImg" :style="setIconImgOutStyle">
		<img :src="getIconName" :style="setIconSvgInsStyle" />
	</div>
	<i v-else :class="getIconName" :style="setIconSvgStyle" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'svgIcon',
	props: {
		// Svg icon component name
		name: {
			type: String,
		},
		// Svg size
		size: {
			type: Number,
			default: () => 14,
		},
		// Svg color
		color: {
			type: String,
		},
	},
	setup(props) {
		// Online link, local import address prefix
		const linesString = ['https', 'http', '/src', '/assets', import.meta.env.VITE_PUBLIC_PATH];

		// Get icon name
		const getIconName = computed(() => {
			return props?.name;
		});
		// Used to determine the display and hiding of element plus's own svg icon
		const isShowIconSvg = computed(() => {
			return props?.name?.startsWith('ele-');
		});
		// Used to judge the display and hiding of icons such as online links and local imports
		const isShowIconImg = computed(() => {
			return linesString.find((str) => props.name?.startsWith(str));
		});
		// Set Icon Style
		const setIconSvgStyle = computed(() => {
			return `font-size: ${props.size}px;color: ${props.color};`;
		});
		// Set picture style
		const setIconImgOutStyle = computed(() => {
			return `width: ${props.size}px;height: ${props.size}px;display: inline-block;overflow: hidden;`;
		});
		// Set picture style
		const setIconSvgInsStyle = computed(() => {
			const filterStyle: string[] = [];
			const compatibles: string[] = ['-webkit', '-ms', '-o', '-moz'];
			compatibles.forEach((j) => filterStyle.push(`${j}-filter: drop-shadow(${props.color} 30px 0);`));
			return `width: ${props.size}px;height: ${props.size}px;position: relative;left: -${props.size}px;${filterStyle.join('')}`;
		});
		return {
			getIconName,
			isShowIconSvg,
			isShowIconImg,
			setIconSvgStyle,
			setIconImgOutStyle,
			setIconSvgInsStyle,
		};
	},
});
</script>
