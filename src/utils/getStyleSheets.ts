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

import { nextTick } from 'vue';
import * as svg from '@element-plus/icons-vue';

// Get Ali font icon
const getAlicdnIconfont = () => {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const styles: any = document.styleSheets;
			let sheetsList = [];
			let sheetsIconList = [];
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.indexOf('at.alicdn.com') > -1) {
					sheetsList.push(styles[i]);
				}
			}
			for (let i = 0; i < sheetsList.length; i++) {
				for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
					if (sheetsList[i].cssRules[j].selectorText && sheetsList[i].cssRules[j].selectorText.indexOf('.icon-') > -1) {
						sheetsIconList.push(
							`${sheetsList[i].cssRules[j].selectorText.substring(1, sheetsList[i].cssRules[j].selectorText.length).replace(/\:\:before/gi, '')}`
						);
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

// Initialize to obtain the css style, and obtain the element plus's own svg icon
const getElementPlusIconfont = () => {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const icons = svg as any;
			const sheetsIconList = [];
			for (const i in icons) {
				sheetsIconList.push(`ele-${icons[i].name}`);
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

// Initialize to obtain css style, and use the icon of fontawesome
const getAwesomeIconfont = () => {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const styles: any = document.styleSheets;
			let sheetsList = [];
			let sheetsIconList = [];
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.indexOf('netdna.bootstrapcdn.com') > -1) {
					sheetsList.push(styles[i]);
				}
			}
			for (let i = 0; i < sheetsList.length; i++) {
				for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
					if (
						sheetsList[i].cssRules[j].selectorText &&
						sheetsList[i].cssRules[j].selectorText.indexOf('.fa-') === 0 &&
						sheetsList[i].cssRules[j].selectorText.indexOf(',') === -1
					) {
						if (/::before/.test(sheetsList[i].cssRules[j].selectorText)) {
							sheetsIconList.push(
								`${sheetsList[i].cssRules[j].selectorText.substring(1, sheetsList[i].cssRules[j].selectorText.length).replace(/\:\:before/gi, '')}`
							);
						}
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList.reverse());
			else reject('未获取到值，请刷新重试');
		});
	});
};

// Get Font Icon `document.styleSheets`
const initIconfont = {
	// iconfont
	ali: () => {
		return getAlicdnIconfont();
	},
	// element plus
	ele: () => {
		return getElementPlusIconfont();
	},
	// fontawesome
	awe: () => {
		return getAwesomeIconfont();
	},
};

export default initIconfont;
