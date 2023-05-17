import Cookies from 'js-cookie';

// window.localStorage
export const Local = {
	// set
	set(key: string, val: any) {
		window.localStorage.setItem(key, JSON.stringify(val));
	},
	// get
	get(key: string) {
		let json: any = window.localStorage.getItem(key);
		return JSON.parse(json);
	},
	// remove
	remove(key: string) {
		window.localStorage.removeItem(key);
	},
	// remove all
	clear() {
		window.localStorage.clear();
	},
};

// window.sessionStorage
export const Session = {
	// set
	set(key: string, val: any) {
		if (key === 'authorization') return Cookies.set(key, val);
		if (key === 'refreshtoken') return Cookies.set(key, val);
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// get
	get(key: string) {
		if (key === 'authorization') return Cookies.get(key);
		if (key === 'refreshtoken') return Cookies.get(key);
		let json: any = window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	// remove
	remove(key: string) {
		if (key === 'authorization') return Cookies.remove(key);
		if (key === 'refreshtoken') return Cookies.remove(key);
		window.sessionStorage.removeItem(key);
	},
	// remove all
	clear() {
		Cookies.remove('authorization');
		Cookies.remove('refreshtoken');
		window.sessionStorage.clear();
	},
};
