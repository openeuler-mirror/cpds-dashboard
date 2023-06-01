import request from '/@/utils/request';

export function useDataRetrievalApi() {
	return {
		getRawData: (data: Object) => {
			return request({
				url: '/api/v1/prometheus/query_range',
				method: 'get',
				params: data,
			});
		},
	};
}
