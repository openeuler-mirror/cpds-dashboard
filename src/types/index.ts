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

export interface NodeDiskData {
	devicePath: string;
	devicePgs: number;
	deviceStatus: number;
	deviceTotalSize: string;
	deviceType: string;
	deviceUsedSize: string;
	deviceId: string;
	osdId?: number;
	osdStatus?: string;
	usedPool?: string;
}
export interface NodeDataRow {
	nodeId: number;
	nodeIp: string;
	nodeName: string;
	nodeStatus: number;
	nodeUsedDevice: number;
	nodeAllDevice: number;
	version: string;
	devices: NodeDiskData[];
	nodeDevices?: NodeDiskData[];
	disabled?: boolean;
}
export interface SelectOptionItem {
	value: string;
	label: string;
}
export interface mapData {
	[key: string]: string;
}
export interface Series {
	name: string;
	type: string;
	data: number[];
	[key: string]: any;
}

export interface LineChartData {
	xData: any[];
	seriesData: any;
	title?: string;
}
