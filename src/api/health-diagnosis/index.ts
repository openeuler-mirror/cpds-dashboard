import request from '/@/utils/request';

export function useHealthApi() {
	return {
		getResultList: (data: { filter?: string;sort_field?: string; sort_order?: string; page_no: number; page_size: number }) => {
			return request({
				url: '/api/v1/analysis/result',
				method: 'get',
				params: data,
			});
		},
		deleteResult: (data: { id: number }) => {
			return request({
				url: '/api/v1/analysis/result/delete',
				method: 'post',
				data,
			});
		},
		getRawData: (data: { query: string; start_time: any; end_time: any; step: 2 }) => {
			return request({
				url: '/api/v1/prometheus/query_range',
				method: 'get',
				params: data,
			});
		},
	};
}
