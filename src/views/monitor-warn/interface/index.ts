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
	cpu: { usage: number; used_core: number; total_core: number };
	memory: { usage: number; used_bytes: number; total_bytes: number };
	disk: { usage: number; used_bytes: number; total_bytes: number };
	status: string;
}
export interface InstanceListInterface {
	nodeList: Array<InstanceInterface>;
}
