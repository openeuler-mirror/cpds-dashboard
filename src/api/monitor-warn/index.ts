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

import request from '/@/utils/request';

export function useMonitorApi() {
	return {
		getNodeInfo: (data: { instance: string }) => {
			return request({
				url: '/api/v1/monitor/node_info',
				method: 'get',
				params: data,
			});
		},
		getInstance: () => {
			return request({
				url: '/api/v1/monitor/targets',
				method: 'get',
			});
		},
		getNodeList: (data: { instance: string }) => {
			return request({
				url: '/api/v1/monitor/node_status',
				method: 'get',
				params: data,
			});
		},
		getClusterResource: (data: Object) => {
			return request({
				url: '/api/v1/monitor/cluster_resources',
				method: 'get',
				params: data,
			});
		},
		getClusterContainer: (data: Object) => {
			return request({
				url: '/api/v1/monitor/cluster_container_status',
				method: 'get',
				params: data,
			});
		},
		getNodeResource: (data: Object) => {
			return request({
				url: '/api/v1/monitor/node_resources',
				method: 'get',
				params: data,
			});
		},
		getNodeContainer: (data: Object) => {
			return request({
				url: '/api/v1/monitor/node_container_status',
				method: 'get',
				params: data,
			});
		},
	};
}
