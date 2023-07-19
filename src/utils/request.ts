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
