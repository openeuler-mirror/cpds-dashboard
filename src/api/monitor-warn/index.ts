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
				url: '/api/monitor/cluster_resource',
				method: 'get',
				params: data,
			});
		},
		getClusterContainer: (data: Object) => {
			return request({
				url: '/api/monitor/cluster_container',
				method: 'get',
				params: data,
			});
		},
		getNodeResource: (data: Object) => {
			return request({
				url: '/api/v1/monitor/node_resource',
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
