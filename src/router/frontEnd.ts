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
import { storeToRefs } from 'pinia';
import { formatTwoStageRoutes, formatFlatteningRoutes, router } from '/@/router/index';
import { dynamicRoutes, notFoundAndNoPower } from '/@/router/route';
import pinia from '/@/stores/index';
import { Session } from '/@/utils/storage';
import { useUserInfo } from '/@/stores/userInfo';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import { useRoutesList } from '/@/stores/routesList';
import { NextLoading } from '/@/utils/loading';

// Initialization method to prevent route loss during refreshing
export async function initFrontEndControlRoutes() {
	if (window.nextLoading === undefined) NextLoading.start();
	if (!Session.get('authorization')) return false;
	useUserInfo(pinia).setUserInfos();
	await setAddRoute();
	await setFilterMenuAndCacheTagsViewRoutes();
}

// Add Dynamic Route
export async function setAddRoute() {
	await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
}

// Reset Route
export async function frontEndsResetRoute() {
	await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
		const routeName: any = route.name;
		router.hasRoute(routeName) && router.removeRoute(routeName);
	});
}

// Obtain the route array with the current user permission ID, and replace the original route
export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes));
	filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children), ...notFoundAndNoPower];
	return filterRouteEnd;
}

// Obtain the current user permission ID to compare the routing table (not processed into multi-level nested routing)
export function setFilterRoute(chil: any) {
	const stores = useUserInfo(pinia);
	const { userInfos } = storeToRefs(stores);
	let filterRoute: any = [];
	chil.forEach((route: any) => {
		if (route.meta.roles) {
			route.meta.roles.forEach((metaRoles: any) => {
				userInfos.value.roles.forEach((roles: any) => {
					if (metaRoles === roles) filterRoute.push({ ...route });
				});
			});
		}
	});
	return filterRoute;
}

// Caching one-dimensional arrays processed by multi-level nested arrays
export function setCacheTagsViewRoutes() {
	const stores = useUserInfo(pinia);
	const storesTagsView = useTagsViewRoutes(pinia);
	const { userInfos } = storeToRefs(stores);
	let rolesRoutes = setFilterHasRolesMenu(dynamicRoutes, userInfos.value.roles);
	storesTagsView.setTagsViewRoutes(formatTwoStageRoutes(formatFlatteningRoutes(rolesRoutes))[0].children);
}

// Set recursive filtering of authorized routes to vuex routesList (processed into multi-level nested routes) and cache one-dimensional arrays processed by multi-level nested arrays
export function setFilterMenuAndCacheTagsViewRoutes() {
	const stores = useUserInfo(pinia);
	const storesRoutesList = useRoutesList(pinia);
	const { userInfos } = storeToRefs(stores);
	storesRoutesList.setRoutesList(setFilterHasRolesMenu(dynamicRoutes[0].children, userInfos.value.roles));
	setCacheTagsViewRoutes();
}

// Determine Route ` meta Whether the role 'contains the permission field of the current login user
export function hasRoles(roles: any, route: any) {
	if (route.meta && route.meta.roles) return roles.some((role: any) => route.meta.roles.includes(role));
	else return true;
}

// Get the current user permission ID to compare the route table, and set recursive filtering for routes with permission
export function setFilterHasRolesMenu(routes: any, roles: any) {
	const menu: any = [];
	routes.forEach((route: any) => {
		const item = { ...route };
		if (hasRoles(roles, item)) {
			if (item.children) item.children = setFilterHasRolesMenu(item.children, roles);
			menu.push(item);
		}
	});
	return menu;
}
