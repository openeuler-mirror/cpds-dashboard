export interface RulesInterface {
	id: number;
	name: string;
	expression: string;
	subhealth_condition_type: string;
	subhealth_thresholds: number;
	fault_condition_type: string;
	fault_thresholds: number;
	severity: string;
	duration: string;
	create_time: number;
	update_time: number;
}
export interface RulesStateInterface {
	rulesionfo: {
		data: Array<RulesInterface>;
		params: {
			pageSize: number;
			pageNum: number;
			filter: string;
			sort_field: string;
			sort_order: string;
		};

		total: number;
	};
}
export interface editRuleDataInterface {
	name: string;
	expression: string;
	severity: string;
	duration: string;
	subhealth_condition_type?: string;
	subhealth_thresholds?: string;
	fault_condition_type?: string;
	fault_thresholds?: string;
}
