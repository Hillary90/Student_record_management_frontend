import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { isAuthenticated, validateToken } from '../../utils/auth'

const AuthDebug = () => {
  const { user } = useAuth()
  const [debugInfo, setDebugInfo] = useState(null)

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    const isAuth = isAuthenticated()
    const isValidToken = validateToken()

    const info = {
      hasToken: !!token,
      hasUser: !!savedUser,
      isAuthenticated: isAuth,
      isValidToken: isValidToken,
      contextUser: !!user,
      tokenPreview: token ? token.substring(0, 50) + '...' : 'No token',
      userPreview: savedUser ? JSON.parse(savedUser) : 'No user data'
    }

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        info.tokenPayload = payload
        info.tokenExpiry = new Date(payload.exp * 1000).toLocaleString()
        info.tokenValid = payload.exp > Date.now() / 1000
      } catch (e) {
        info.tokenError = e.message
      }
    }

    setDebugInfo(info)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Authentication Debug</h3>
      <button 
        onClick={checkAuthStatus}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Check Auth Status
      </button>
      
      {debugInfo && (
        <div className="bg-white p-4 rounded">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default AuthDebug