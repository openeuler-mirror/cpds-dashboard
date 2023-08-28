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

// Font icon url
const cssCdnUrlList: Array<string> = [
	// '//at.alicdn.com/t/font_2298093_y6u00apwst.css',
	// '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
];
// Third party js url
const jsCdnUrlList: Array<string> = [];

// Dynamic batch setting font icon
export function setCssCdn() {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = v;
		link.crossOrigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

// Dynamic batch setting of third-party js
export function setJsCdn() {
	if (jsCdnUrlList.length <= 0) return false;
	jsCdnUrlList.map((v) => {
		let link = document.createElement('script');
		link.src = v;
		document.body.appendChild(link);
	});
}

// Set font icons and dynamic js in batch
const setIntroduction = {
	// set css
	cssCdn: () => {
		setCssCdn();
	},
	// set js
	jsCdn: () => {
		setJsCdn();
	},
};

export default setIntroduction;
