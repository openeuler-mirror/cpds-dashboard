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

export interface HealthStateInterface {
	diagnosisinfo: {
		data: Array<ResultInterface>;
		params: {
			pageSize: number;
			pageNum: number;
			filter: string;
			sort_field: string,
			sort_order: string,
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
