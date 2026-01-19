import { useState, useEffect } from 'react'
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react'
import { getAllStudents } from '../services/studentService'
import { getAllGrades } from '../services/gradeService'
import Loading from '../components/common/Loading'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalGrades: 0,
    averageScore: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [studentsData, gradesData] = await Promise.all([
        getAllStudents(),
        getAllGrades(),
      ])

      const avgScore = gradesData.grades.length > 0
        ? gradesData.grades.reduce((acc, grade) => acc + grade.percentage, 0) / gradesData.grades.length
        : 0

      setStats({
        totalStudents: studentsData.count,
        totalGrades: gradesData.count,
        averageScore: avgScore.toFixed(2),
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Grades',
      value: stats.totalGrades,
      icon: GraduationCap,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Subjects',
      value: '8+',
      icon: BookOpen,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your student management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Welcome to Student Record Management System</h3>
        <p className="text-primary-100 mb-4">
          Manage your students, track their academic performance, and maintain comprehensive records all in one place.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/students"
            className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            View Students
          </Link>
          <Link
            to="/grades"
            className="bg-primary-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            Manage Grades
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
