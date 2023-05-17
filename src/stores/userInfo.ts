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
