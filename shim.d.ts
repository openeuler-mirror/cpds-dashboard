/* eslint-disable */

// Declaration file, * The vue suffix file is handed over to the vue module for processing
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// Declaration file, defining global variables
interface Window {
	nextLoading: boolean;
}
declare module 'element-plus/dist/locale/zh-cn.mjs';
