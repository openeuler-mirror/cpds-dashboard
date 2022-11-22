import axios from 'axios'

// Configure a new axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})

// export axios
export default service
