import { defineStore } from 'pinia';


export const useGlobal = defineStore('global', {
	state: () => ({
		uncomfirmMessage: 0
	}),
	actions: {
		// uncomfirmMessage="";
		// setUncomfirmMessage(data: number) {
		// 	this.uncomfirmMessage = data;
		// },
		// fetchUncomfirmMessage() {
		// 	useAlarmApi().getUnconfirmMessageNum().then((res) => {
		// 		this.uncomfirmMessage = res.data;
		// 	});
		// }
	}
});