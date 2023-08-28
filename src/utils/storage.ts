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
