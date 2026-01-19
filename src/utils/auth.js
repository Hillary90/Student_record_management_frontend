// Token validation utility
export const validateToken = async () => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return false
  }
  
  try {
    // Try to decode the token to check if it's expired
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    
    // Add 5 minute buffer to prevent edge cases
    if (payload.exp < (currentTime + 300)) {
      console.log('Token expired or expiring soon, clearing localStorage')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    }
    
    return true
  } catch (error) {
    console.log('Invalid token format, clearing localStorage')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return false
  }
}

// Check if user is authenticated (synchronous version)
export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  
  if (!token || !user) {
    return false
  }
  
  try {
    // Check token expiration locally
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    
    if (payload.exp < currentTime) {
      console.log('Token expired, clearing localStorage')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    }
    
    return true
  } catch (error) {
    console.log('Invalid token format, clearing localStorage')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return false
  }
}

// Clear all auth data
export const clearAuthData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  console.log('Auth data cleared')
}

// Force logout and redirect
export const forceLogout = () => {
  clearAuthData()
  window.location.hash = '#/login'
}

// Get current token
export const getToken = () => {
  return localStorage.getItem('token')
}