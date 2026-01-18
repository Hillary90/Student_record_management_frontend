import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env. VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
instance.interceptors.request. use(
  (config) => {
    const token = localStorage. getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error. response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Use BASE_URL for proper routing in both dev and production
      const basePath = import. meta.env.BASE_URL || '/'
      window.location. href = `${basePath}login`
    }
    return Promise.reject(error)
  }
)

export default instance