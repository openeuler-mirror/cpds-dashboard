import { useUserInfo } from '/@/stores/userInfo';
import { judementSameArr } from '/@/utils/arrayOperation';

// Single permission verification
export function auth(value: string): boolean {
	const stores = useUserInfo();
	return stores.userInfos.authBtnList.some((v: string) => v === value);
}

// Multiple permission verifications, true if one is satisfied
export function auths(value: Array<string>): boolean {
	let flag = false;
	const stores = useUserInfo();
	stores.userInfos.authBtnList.map((val: string) => {
		value.map((v: string) => {
			if (val === v) flag = true;
		});
	});
	return flag;
}

// Multiple permission verifications, true if all is satisfied
export function authAll(value: Array<string>): boolean {
	const stores = useUserInfo();
	return judementSameArr(value, stores.userInfos.authBtnList);
}
