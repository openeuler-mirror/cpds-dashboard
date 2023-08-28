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

import { number } from 'echarts';

export interface UsegeInterface {}
export interface AwrnStateInterface {
	overViewInfo: {
		nodeInfo: Array<NodeInterface>;
		container: {
			running: number;
			total: number;
		};
		cpu: {
			usage: number;
			used_core: number;
			total_core: number;
		};
		memory: {
			usage: number;
			used_bytes: number;
			total_bytes: number;
		};
		disk: {
			usage: number;
			used_bytes: number;
			total_bytes: number;
		};
	};
}
export interface NodeInterface {
	instance: string;
	arch: string;
	kernal_version: string;
	os_version: string;
}
export interface InstanceInterface {
	instance: string;
	container: { running: number; total: number };
	cpu: { usage: number; used_core: number; total_core: number;number_cores:number };
	memory: { usage: number; used_bytes: number; total_bytes: number };
	disk: { usage: number; used_bytes: number; total_bytes: number };
	status: string;
}
export interface InstanceListInterface {
	nodeList: Array<InstanceInterface>;
	nodeArrary: Array<InstanceInterface>;
}
