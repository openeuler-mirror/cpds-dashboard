import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Session } from '/@/utils/storage';
import router from '/@/router';

const url = import.meta.env.VITE_API_URL as any;
// Create a new axios instance
const service = axios.create({
	baseURL: url,
	timeout: 30000,
	headers: { 'Content-Type': 'application/json' },
});

export const baseURL = url;
// Export axios instance
export default service;
