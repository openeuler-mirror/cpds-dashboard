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

import { ElMessage } from 'element-plus';

// Hex color to rgb color
export function hexToRgb(str: any) {
	let hexs: any = '';
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(str)) return ElMessage.warning('输入错误的hex');
	str = str.replace('#', '');
	hexs = str.match(/../g);
	for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
	return hexs;
}

// Rgb color to Hex color
export function rgbToHex(r: any, g: any, b: any) {
	let reg = /^\d{1,3}$/;
	if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning('输入错误的rgb颜色值');
	let hexs = [r.toString(16), g.toString(16), b.toString(16)];
	for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
	return `#${hexs.join('')}`;
}

// Deepen Color Value
export function getDarkColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值');
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// Lighten Color Value
export function getLightColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值');
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
