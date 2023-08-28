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
