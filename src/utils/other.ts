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
import type { App } from 'vue';
import * as svg from '@element-plus/icons-vue';
import router from '/@/router/index';
import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Local } from '/@/utils/storage';
import SvgIcon from '/@/components/svgIcon/index.vue';
import SparkMD5 from 'spark-md5';
import { LineChartData, mapData } from '../types';

export function elSvg(app: App) {
	const icons = svg as any;
	for (const i in icons) {
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}

// Set browser title
export function useTitle() {
	const stores = useThemeConfig(pinia);
	const { themeConfig } = storeToRefs(stores);
	nextTick(() => {
		let webTitle = '';
		let globalTitle: string = themeConfig.value.globalTitle;
		const { meta } = router.currentRoute.value;
		webTitle = <any>meta.title;
		document.title = `${webTitle} - ${globalTitle}` || globalTitle;
	});
}

// Image lazy loading
export const lazyImg = (el: any, arr: any) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					arr[key]['loading'] = false;
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};

// Global Component Size
export const globalComponentSize = (): string => {
	const stores = useThemeConfig(pinia);
	const { themeConfig } = storeToRefs(stores);
	return Local.get('themeConfig')?.globalComponentSize || themeConfig.value?.globalComponentSize;
};

// Deep cloning of objects
export function deepClone(obj: any) {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (obj[attr] && typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

// Judge whether it is a mobile terminal
export function isMobile() {
	if (
		navigator.userAgent.match(
			/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
		)
	) {
		return true;
	} else {
		return false;
	}
}

// Judge whether all the attributes in the array object are empty, and if they are empty, delete the object in the current row
export function handleEmpty(list: any) {
	const arr = [];
	for (const i in list) {
		const d = [];
		for (const j in list[i]) {
			d.push(list[i][j]);
		}
		const leng = d.filter((item) => item === '').length;
		if (leng !== d.length) {
			arr.push(list[i]);
		}
	}
	return arr;
}

/**
 * use spark-md5 create MD5
 * @resolve {string} md5
 */
export async function MD5(file: any) {
	return new Promise((resolve, reject) => {
		const blobSlice = File.prototype.slice;
		// Read in chunks of 2MB
		const chunkSize = 2097152;
		const chunks = Math.ceil(file.size / chunkSize);
		const spark = new SparkMD5.ArrayBuffer();
		const fileReader = new FileReader();
		let currentChunk = 0;
		fileReader.onload = function (e) {
			// Append array buffer
			spark.append(e.target?.result);
			currentChunk++;
			if (currentChunk < chunks) {
				loadNext();
			} else {
				resolve(spark.end());
			}
		};
		fileReader.onerror = function (e) {
			reject(e);
		};
		function loadNext() {
			const start = currentChunk * chunkSize;
			const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		}
		loadNext();
	});
}

// chart color
const chartColors = ['#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#5470C6', '#FC8452', '#9A60B4', '#9A60B4', '#EA7CCC'];

// line chart data handle
export const lineTimeHandle = (data?: any, dataMap?: mapData, callback?: (data: number) => number) => {
	const chartData: LineChartData = {
		seriesNames: [],
		seriesData: [],
	};
	if (data) {
		try {
			let i = 0;
			for (let key in data) {
				if (data[key]) {
					const name = dataMap ? dataMap[key] : key;
					chartData.seriesNames.push(name);
					chartData.seriesData.push({
						name: name,
						type: 'line',
						data: data[key].map((item: [number, number | string]) => [
							item[0] * 1000,
							callback ? callback(typeof item[1] === 'string' ? 0 : item[1]) : typeof item[1] === 'string' ? 0 : item[1],
						]),
						showSymbol: false,
						itemStyle: {
							color: chartColors[i++],
						},
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	return chartData;
};

// format units
export const formatUnits = (size: string | number | null | undefined) => {
	let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	let i = 0;
	let num = Number(size);

	if (size === null || size === undefined) return '-';

	if (isNaN(num)) {
		return 'NaN';
	}

	while (num >= 1024 && i < units.length - 1) {
		num /= 1024;
		i++;
	}

	if (typeof num === 'number') {
		return num.toFixed(2) + units[i];
	} else {
		return num;
	}
};

// fill dates
export const fillDates = (start: string, range: any) => {
	const begin = new Date(start).valueOf() / 1000;
	for (const key in range) {
		if (Object.prototype.hasOwnProperty.call(range, key)) {
			if (range[key] !== null) {
				const gap: number = range[key][0][0] - begin;
				let interval: number = range[key][1][0] - range[key][0][0];
				if (range[key].lengh === 1) {
					interval = 1;
				}
				const frequency: number = gap / interval;
				const timeArray: any = range[key];
				const originalBegin: any = range[key][0][0];
				// console.log(interval);
				if (frequency > 0 && interval > 0) {
					for (let x = 1; x <= frequency; x++) {
						timeArray.unshift([originalBegin - x * interval, null]);
					}
				}
			}
		}
	}
	return range;
};
export const strMapToObj = (strMap: any) => {
	let obj = Object.create(null);
	for (let [k, v] of strMap) {
		obj[k] = v;
	}
	return obj;
};

const other = {
	elSvg: (app: App) => {
		elSvg(app);
	},
	useTitle: () => {
		useTitle();
	},
	lazyImg: (el: any, arr: any) => {
		lazyImg(el, arr);
	},
	globalComponentSize: () => {
		return globalComponentSize();
	},
	deepClone: (obj: any) => {
		return deepClone(obj);
	},
	isMobile: () => {
		return isMobile();
	},
	handleEmpty: (list: any) => {
		return handleEmpty(list);
	},
};

export default other;
