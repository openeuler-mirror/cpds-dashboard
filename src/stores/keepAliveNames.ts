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

import { defineStore } from 'pinia';
import { KeepAliveNamesState } from './interface';

// Route cache list
export const useKeepALiveNames = defineStore('keepALiveNames', {
	state: (): KeepAliveNamesState => ({
		keepAliveNames: [],
		cachedViews: [],
	}),
	actions: {
		async setCacheKeepAlive(data: Array<string>) {
			this.keepAliveNames = data;
		},
		async addCachedView(view: any) {
			if (this.cachedViews.includes(view.name)) return;
			if (view.meta.isKeepAlive) this.cachedViews.push(view.name);
		},
		async delCachedView(view: any) {
			const index = this.cachedViews.indexOf(view.name);
			index > -1 && this.cachedViews.splice(index, 1);
		},
		async delOthersCachedViews(view: any) {
			if (view.meta.isKeepAlive) this.cachedViews = [view.name];
			else this.cachedViews = [];
		},
		async delAllCachedViews() {
			this.cachedViews = [];
		},
	},
});
