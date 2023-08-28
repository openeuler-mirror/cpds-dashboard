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

// Judge whether two array strings are the same
export function judementSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
	const news = removeDuplicate(newArr);
	const olds = removeDuplicate(oldArr);
	let count = 0;
	const leng = olds.length;
	for (let i in olds) {
		for (let j in news) {
			if (olds[i] === news[j]) count++;
		}
	}
	return count === leng;
}

// Judge whether two objects are the same
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
	if (!a || !b) return false;
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let propA = a[propName];
		let propB = b[propName];
		if (!Object.prototype.hasOwnProperty.call(b, propName)) return false;
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false;
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
}

// Array and array object de duplication
export function removeDuplicate(arr: any, attr?: string) {
	if (!arr && !arr.length) {
		return arr;
	} else {
		if (attr) {
			const obj: any = {};
			const newArr = arr.reduce((cur: any, item: any) => {
				obj[item[attr]] ? '' : (obj[item[attr]] = true && item[attr] && cur.push(item));
				return cur;
			}, []);
			return newArr;
		} else {
			return Array.from(new Set([...arr]));
		}
	}
}
