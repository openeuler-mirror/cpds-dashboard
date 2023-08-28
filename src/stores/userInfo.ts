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

import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import { Session } from '/@/utils/storage';

// User information
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => ({
		userInfos: {
			userName: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			const userName = Cookies.get('userName');
			// User information
			const userInfos = {
				userName: userName,
				time: new Date().getTime(),
				roles: ['admin'],
				authBtnList: [],
			};
			// Store user information to browser cache
			Session.set('userInfo', userInfos);
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				this.userInfos = userInfos;
			}
		},
	},
});
