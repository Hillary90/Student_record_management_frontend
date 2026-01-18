import { useAuth } from '../../context/AuthContext'
import { LogOut, User } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Page Title - Will be dynamic based on route */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {user?.username}!
          </h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">{user?.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar