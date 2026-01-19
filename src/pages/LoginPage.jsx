import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { BookOpen, LogIn } from 'lucide-react'

const Login = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username:  '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')

  // Test API connection on component mount
  useEffect(() => {
    const testAPI = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const response = await fetch(`${baseURL}/health`)
        if (response.ok) {
          setApiStatus('connected')
        } else {
          setApiStatus('error')
        }
      } catch (error) {
        console.error('API connection test failed:', error)
        setApiStatus('error')
      }
    }
    testAPI()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await login(formData)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full">
              <BookOpen className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Record Management</h1>
          <p className="text-primary-100">Sign in to your account</p>
        </div>

        {/* API Status */}
        <div className="mb-4 text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            apiStatus === 'connected' ? 'bg-green-100 text-green-800' :
            apiStatus === 'error' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {apiStatus === 'connected' ? '✓ API Connected' :
             apiStatus === 'error' ? '✗ API Connection Failed' :
             '⏳ Checking API...'}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || apiStatus === 'error'}
              icon={LogIn}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login