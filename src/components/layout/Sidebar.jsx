import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, GraduationCap, BookOpen, X } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/grades', icon: GraduationCap, label: 'Grades' },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <BookOpen className="w-8 h-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">Student MS</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-3 font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo with close button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Student MS</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-3 font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop sidebar spacer */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0" />
    </>
  )
}

export default Sidebar