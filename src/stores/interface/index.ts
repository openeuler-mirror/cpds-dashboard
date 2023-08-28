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

/**
 * Define interfaces to define object types
 * `stores` All types are defined here
 */

// User information
export interface UserInfosState {
	authBtnList: string[];
	roles: string[];
	time: number;
	userName: string;
}
export interface UserInfosStates {
	userInfos: UserInfosState;
}

// Route cache list
export interface KeepAliveNamesState {
	keepAliveNames: string[];
	cachedViews: string[];
}

// TagsView routing List
export interface TagsViewRoutesState {
	tagsViewRoutes: string[];
	isTagsViewCurrenFull: Boolean;
}

// routing List
export interface RoutesListState {
	routesList: string[];
	isColumnsMenuHover: Boolean;
	isColumnsNavHover: Boolean;
}

// Layout Configuration
export interface ThemeConfigState {
	isDrawer: boolean;
	primary: string;
	topBar: string;
	topBarColor: string;
	menuBar: string;
	menuBarColor: string;
	columnsMenuBar: string;
	columnsMenuBarColor: string;
	isCollapse: boolean;
	isUniqueOpened: boolean;
	isFixedHeader: boolean;
	isFixedHeaderChange: boolean;
	isClassicSplitMenu: boolean;
	isShowLogo: boolean;
	isShowLogoChange: boolean;
	isBreadcrumb: boolean;
	isTagsview: boolean;
	isBreadcrumbIcon: boolean;
	isTagsviewIcon: boolean;
	isCacheTagsView: boolean;
	isSortableTagsView: boolean;
	isShareTagsView: boolean;
	isFooter: boolean;
	isInvert: boolean;
	isIsDark: boolean;
	isWartermark: boolean;
	wartermarkText: string;
	tagsStyle: string;
	animation: string;
	columnsAsideStyle: string;
	columnsAsideLayout: string;
	layout: string;
	isRequestRoutes: boolean;
	globalTitle: string;
	globalViceTitle: string;
	globalComponentSize: string;
}
export interface ThemeConfigStates {
	themeConfig: ThemeConfigState;
}
