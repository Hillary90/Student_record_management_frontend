import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Mail, Phone, MapPin, User, Calendar, BookOpen, Award } from 'lucide-react'
import { getStudent } from '../services/studentService'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'

const StudentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudent()
  }, [id])

  const fetchStudent = async () => {
    try {
      const data = await getStudent(id, true) // Include grades
      setStudent(data.student)
    } catch (error) {
      toast.error('Failed to fetch student details')
      navigate('/students')
    } finally {
      setLoading(false)
    }
  }

  const calculateGPA = (grades) => {
    if (!grades || grades.length === 0) return 'N/A'
    const total = grades.reduce((sum, grade) => sum + grade.percentage, 0)
    return (total / grades.length).toFixed(1)
  }

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100'
    if (percentage >= 80) return 'text-blue-600 bg-blue-100'
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100'
    if (percentage >= 60) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  if (loading) {
    return <Loading />
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Student not found</p>
        <Button onClick={() => navigate('/students')} className="mt-4">
          Back to Students
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/students')}
          icon={ArrowLeft}
          className="mr-4"
        >
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{student.full_name}</h2>
          <p className="text-gray-600">{student.admission_number} • {student.class_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-800">{student.full_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Admission Number</label>
                <p className="text-gray-800">{student.admission_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-gray-800 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(student.date_of_birth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <p className="text-gray-800">{student.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Class</label>
                <p className="text-gray-800">{student.class_name}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {student.email}
                  </p>
                </div>
              )}
              {student.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-800 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {student.phone}
                  </p>
                </div>
              )}
              {student.address && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-800 flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-0.5" />
                    {student.address}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guardian Information */}
          {(student.guardian_name || student.guardian_phone) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.guardian_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Guardian Name</label>
                    <p className="text-gray-800">{student.guardian_name}</p>
                  </div>
                )}
                {student.guardian_phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Guardian Phone</label>
                    <p className="text-gray-800 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {student.guardian_phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Academic Performance */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Academic Performance
            </h3>
            
            {/* GPA Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Overall GPA</p>
                  <p className="text-2xl font-bold">{calculateGPA(student.grades)}%</p>
                </div>
                <Award className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            {/* Grades List */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Recent Grades</h4>
              {student.grades && student.grades.length > 0 ? (
                student.grades.map((grade) => (
                  <div key={grade.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-800">{grade.subject}</h5>
                        <p className="text-sm text-gray-500">{grade.term} {grade.year}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(grade.percentage)}`}>
                          {grade.grade_letter}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {grade.score}/{grade.max_score}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {grade.percentage}%
                      </span>
                    </div>
                    {grade.remarks && (
                      <p className="text-xs text-gray-500 mt-2">{grade.remarks}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No grades recorded yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail