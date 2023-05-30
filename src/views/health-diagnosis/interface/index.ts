export interface HealthStateInterface {
	diagnosisinfo: {
		data: Array<ResultInterface>;
		params: {
			pageSize: number;
			pageNum: number;
			filter: string;
		};

		total: number;
	};
}
export interface ResultInterface {
	id: number;
	rule_id: number;
	rule_name: string;
	status: string;
	count: number;
	create_time: number;
	update_time: number;
}
