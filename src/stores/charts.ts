import { defineStore } from 'pinia';
interface ChartsState {
  [key: string]: {
    [key: string]: any;
  };
}

export const useCharts = defineStore('charts', {
	state: ():ChartsState => ({
		legendSelected: {
			cluster: {
				ops: null,
				recoveryOps: null,
				pg: null
			},
			node: {
				cpu: null,
				memory: null,
				receiveLoad: null,
				sendLoad: null,
				receiveLoss: null,
				sendLoss: null,
				receiveError: null,
				sendError: null,
				retry: null,
			},
			pool: {
				ops: null,
				bps: null,
			},
			volume: {
				ops: null,
				bps: null,
				delay: null,
			},
			file: {
				ops: null,
				load: null,
			},
			osd: {
				ops: null,
				bps: null,
				delay: null,
				diskIops: null,
				diskBps: null,
				employ: null
			}
		}
	}),
	actions: {
		setLegendStatus(name: keyof ChartsState, activeTab: keyof ChartsState, data: any): void {
			this.legendSelected[activeTab][name] = data;
		}
	}
});