import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, GraduationCap, BookOpen } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/grades', icon: GraduationCap, label: 'Grades' },
  ]

  return (
    <div className="w-64 bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <BookOpen className="w-8 h-8 text-primary-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">Student MS</span>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                isActive ?  'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="ml-3 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar