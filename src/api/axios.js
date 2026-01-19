import axios from 'axios'
import { validateToken, forceLogout } from '../utils/auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://student-record-management-backend-2akg.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token before using it
      const isValid = await validateToken()
      if (isValid) {
        config.headers.Authorization = `Bearer ${token}`
        console.log('Adding token to request:', token.substring(0, 20) + '...')
        console.log('Request URL:', config.url)
        console.log('Request method:', config.method)
      } else {
        console.log('Token invalid, removing from request')
        forceLogout()
        return Promise.reject(new Error('Invalid token'))
      }
    } else {
      console.log('No token found in localStorage')
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
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.hash = '#/login'
    }
    return Promise.reject(error)
  }
)

export default instance