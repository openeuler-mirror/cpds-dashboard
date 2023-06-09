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
