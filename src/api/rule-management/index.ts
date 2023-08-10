import request from '/@/utils/request';

export function useRuleApi() {
	return {
		getRuleList: (data: { filter?: string; sort_field?: string; sort_order?: string; page_no?: number; page_size?: number }) => {
			return request({
				url: '/api/v1/rules',
				method: 'get',
				params: data,
			});
		},
		addRule: (data: {
			name: string | null;
			expression: string | null;
			severity: string | null;
			duration: string | null;
			subhealth_condition_type?: string | null;
			subhealth_thresholds?: string | null;
			fault_condition_type?: string | null;
			fault_thresholds?: string | null;
		}) => {
			return request({
				url: '/api/v1/rules/create',
				method: 'post',
				data,
			});
		},
		updateRule: (data: {
			name: string | null;
			expression: string | null;
			severity: string | null;
			duration: string | null;
			subhealth_condition_type?: string | null;
			subhealth_thresholds?: string | null;
			fault_condition_type?: string | null;
			fault_thresholds?: string | null;
		}) => {
			return request({
				url: '/api/v1/rules/update',
				method: 'post',
				data,
			});
		},
		deleteRule: (data: { id: number }) => {
			return request({
				url: '/api/v1/rules/delete',
				method: 'post',
				data,
			});
		},
	};
}
