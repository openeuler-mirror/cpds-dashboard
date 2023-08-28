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

import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Session } from '/@/utils/storage';
import { staticRoutes } from '/@/router/route';
import Cookies from 'js-cookie';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
// import { ElMessage } from 'element-plus';

const storesThemeConfig = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isRequestRoutes } = themeConfig.value;
if (isRequestRoutes) staticRoutes.splice(0, 1);

export const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});

// Route multi-level nested array into one-dimensional array
export function formatFlatteningRoutes(arr: any) {
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

// One dimensional array is processed into multi-level nested array (only two levels are reserved: that is, all above two levels are processed into only two levels, and keep alive supports second level caching)
export function formatTwoStageRoutes(arr: any) {
	if (arr.length <= 0) return false;
	const newArr: any = [];
	const cacheList: Array<string> = [];
	arr.forEach((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
		} else {
			if (v.path.indexOf('/:') > -1) {
				v.meta['isDynamic'] = true;
				v.meta['isDynamicPath'] = v.path;
			}
			newArr[0].children.push({ ...v });
			if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
				cacheList.push(v.name);
				const stores = useKeepALiveNames(pinia);
				stores.setCacheKeepAlive(cacheList);
			}
		}
	});
	return newArr;
}

// isRequestRoutes is true，then enable the back-end control route，path：`/src/stores/themeConfig.ts`
if (!isRequestRoutes) initFrontEndControlRoutes();

router.beforeEach(async (to, from, next) => {
	Session.set('authorization', 'admin');
	Session.set('refreshtoken', 'admin');
	sessionStorage.setItem('clusterVip', 'true');
	Cookies.set('userName', 'admin');
	await initFrontEndControlRoutes();
	NProgress.configure({ showSpinner: false });
	if (to.meta.title) NProgress.start();
		
	if(to.path==='/'){
		next('/home')
	}else{
		next()
	}

});

router.afterEach(() => {
	NProgress.done();
});

export default router;
