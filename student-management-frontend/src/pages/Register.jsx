import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Button from '../components/common/Button'
import { BookOpen, UserPlus } from 'lucide-react'

const Register = () => {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e. target.value })
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ... errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!/\S+@\S+\.\S+/.test(formData. email)) {
      newErrors.email = 'Email is invalid'
    }

    if (formData.password. length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    const { confirmPassword, ...registerData } = formData
    await register(registerData)
    setLoading(false)
  }

  const roleOptions = [
    { value:  'teacher', label: 'Teacher' },
    { value:  'admin', label: 'Admin' },
  ]

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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-primary-100">Register a new user account</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              error={errors.username}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData. password}
              onChange={handleChange}
              placeholder="Create a password"
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors. confirmPassword}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
              icon={UserPlus}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register