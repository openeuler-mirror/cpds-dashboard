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

import { RouteRecordRaw } from 'vue-router';
import { nameToTitle } from './routeTitle';

const eeViewRouter = import.meta.glob('../views/viewsEE/**/*.vue');
const layout = () => import('/@/layout/index.vue');

export const eeRoutes: RouteRecordRaw[] = [];
for (let path in eeViewRouter) {
	// const fullName = (path.match(/\.\.\/views\/(.*)\/index.vue$/) as any[])[1].toLowerCase()
	// Parent Route Name
	const pName: string = (path.match(/\.\.\/views\/(.*)\/index.vue$/) as any[])[1].split('/')[1];
	// Subroute Name
	const cName: string = (path.match(/\.\.\/views\/(.*)\/index.vue$/) as any[])[1].split('/')[2];
	const index = eeRoutes.findIndex((route) => route.name === pName);
	if (index === -1) {
		eeRoutes.push({
			path: `/${pName}`,
			name: pName,
			component: layout,
			meta: {
				title: nameToTitle[pName].title,
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: true,
				isIframe: false,
				roles: ['admin'],
				icon: `iconfont icon-${nameToTitle[pName].icon}`,
			},
			children: [
				{
					path: `/${pName}/${cName}`,
					name: cName,
					component: eeViewRouter[path],
					meta: {
						title: nameToTitle[cName].title,
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: true,
						isIframe: false,
						roles: ['admin'],
						icon: `iconfont icon-${nameToTitle[cName].icon}`,
					},
				},
			],
		});
	} else {
		eeRoutes[index].children?.push({
			path: `/${pName}/${cName}`,
			name: cName,
			component: eeViewRouter[path],
			meta: {
				title: nameToTitle[cName].title,
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: true,
				isIframe: false,
				roles: ['admin'],
				icon: `iconfont icon-${nameToTitle[cName].icon}`,
			},
		});
	}
}
