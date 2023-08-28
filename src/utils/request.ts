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

import { message } from './message';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const url = import.meta.env.VITE_API_URL as any;
// Create a new axios instance
const service = axios.create({
	baseURL: url,
	timeout: 30000,
	headers: { 'Content-Type': 'application/json' },
});
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		// If responseType is blob, it means the file is downloaded
		if (response.request.responseType === 'blob') {
			return res;
		}
		if (res.code && res.code !== 0) {
			// If tip is set to no in the interface header, no error message will be prompted
			if (response?.config?.headers?.tip !== 'no') {
				ElMessage.error(res.message);
			}
			return Promise.reject(res);
		}
		return res;
	},
	(error) => {
		const res = error.response;
		if (res?.status && res?.status !== 200) {
			if (res.status === 404) {
				ElMessage.error('资源未找到');
			}
		}
		// Response error
		if (error.message.indexOf('timeout') !== -1) {
			ElMessage.error('网络超时');
		}
		if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		}
		return Promise.reject(error);
	}
);
export const baseURL = url;
// Export axios instance
export default service;
