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
interface ChartsState {
  [key: string]: {
    [key: string]: any;
  };
}

export const useCharts = defineStore('charts', {
	state: ():ChartsState => ({
		legendSelected: {
			cluster: {
				ops: null,
				recoveryOps: null,
				pg: null
			},
			node: {
				cpu: null,
				memory: null,
				receiveLoad: null,
				sendLoad: null,
				receiveLoss: null,
				sendLoss: null,
				receiveError: null,
				sendError: null,
				retry: null,
			},
			pool: {
				ops: null,
				bps: null,
			},
			volume: {
				ops: null,
				bps: null,
				delay: null,
			},
			file: {
				ops: null,
				load: null,
			},
			osd: {
				ops: null,
				bps: null,
				delay: null,
				diskIops: null,
				diskBps: null,
				employ: null
			}
		}
	}),
	actions: {
		setLegendStatus(name: keyof ChartsState, activeTab: keyof ChartsState, data: any): void {
			this.legendSelected[activeTab][name] = data;
		}
	}
});