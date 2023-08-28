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

// Add watermark effect to the page
const setWatermark = (str: string) => {
	const id = '1.23452384164.123412416';
	if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id));
	const can = document.createElement('canvas');
	can.width = 200;
	can.height = 130;
	const cans: any = can.getContext('2d');
	cans.rotate((-20 * Math.PI) / 180);
	cans.font = '12px Vedana';
	cans.fillStyle = 'rgba(200, 200, 200, 0.30)';
	cans.textBaseline = 'Middle';
	cans.fillText(str, can.width / 10, can.height / 2);
	const div = document.createElement('div');
	div.id = id;
	div.style.pointerEvents = 'none';
	div.style.top = '15px';
	div.style.left = '0px';
	div.style.position = 'fixed';
	div.style.zIndex = '10000000';
	div.style.width = `${document.documentElement.clientWidth}px`;
	div.style.height = `${document.documentElement.clientHeight}px`;
	div.style.background = `url(${can.toDataURL('image/png')}) left top repeat`;
	document.body.appendChild(div);
	return id;
};

// Add watermark effect to the page
const watermark = {
	set: (str: string) => {
		let id = setWatermark(str);
		if (document.getElementById(id) === null) id = setWatermark(str);
	},
	del: () => {
		let id = '1.23452384164.123412416';
		if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id));
	},
};

export default watermark;
