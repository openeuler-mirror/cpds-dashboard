/* 
 *  Copyright 2023 CPDS Author
 *  
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  
 *       https://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
};

const viteConfig = defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [vue()],
		root: process.cwd(),
		resolve: { alias },
		base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		hmr: true,

		optimizeDeps: {
			include: [
				'element-plus/lib/locale/lang/zh-cn',
				'element-plus/lib/locale/lang/en',
				'element-plus/lib/locale/lang/zh-tw',
				'axios',
				'sortablejs',
				'echarts',
				'vue-demi',
				'dayjs',
				'dayjs/plugin/relativeTime',
			],
		},
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT as unknown as number,
			open: env.VITE_OPEN,
		},
		build: {
			outDir: 'cpds-ui',
			sourcemap: false,
			chunkSizeWarningLimit: 6000,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					},
				},
			},
		},
		css: { preprocessorOptions: { css: { charset: false } } },
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
		},
	};
});

export default viteConfig;
