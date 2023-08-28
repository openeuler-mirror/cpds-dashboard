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
