import axios from 'axios'
import { isAuthenticated, clearAuthData } from '../utils/auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://student-record-management-backend-2akg.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && isAuthenticated()) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Adding token to request:', token.substring(0, 20) + '...')
      console.log('Request URL:', config.url)
      console.log('Request method:', config.method)
    } else {
      console.log('No valid token found')
      if (token) {
        // Token exists but is invalid, clear it
        clearAuthData()
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing token and redirecting to login')
      clearAuthData()
      // Only redirect if not already on login page
      if (!window.location.hash.includes('login')) {
        window.location.hash = '#/login'
      }
    }
    return Promise.reject(error)
  }
)

export default instance