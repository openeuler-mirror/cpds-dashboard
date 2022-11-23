import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Session } from './storage'

// Configure a new axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})

// add request interceptor
service.interceptors.request.use(
  (config) => {
    if (Session.get('token')) {
      ;(<any>config.headers).common['Authorization'] = `${Session.get('token')}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// add response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code && res.code !== 0) {
      // not login
      if (res.code === 401) {
        Session.clear()
        window.location.href = '/'
        ElMessageBox.alert('login please', 'notification', {})
          .then(() => {})
          .catch(() => {})
      }
      return Promise.reject(service.interceptors.response)
    } else {
      return response.data
    }
  },
  (error) => {
    ElMessage.error(error)
    return Promise.reject(error)
  }
)
// export axios
export default service
