import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getAllGrades, createGrade, updateGrade, deleteGrade } from '../services/gradeService'
import { getAllStudents } from '../services/studentService'
import { isAuthenticated } from '../utils/auth'
import GradeForm from '../components/grades/GradeForm'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Loading from '../components/common/Loading'
import Select from '../components/common/Select'

const Grades = () => {
  const { user } = useAuth()
  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [filteredGrades, setFilteredGrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [filterStudent, setFilterStudent] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  useEffect(() => {
    filterGradesList()
  }, [grades, filterStudent, filterTerm])

  const fetchData = async () => {
    try {
      // Check authentication before making API calls
      if (!isAuthenticated()) {
        toast.error('Please log in to access grades')
        return
      }
      
      const [gradesData, studentsData] = await Promise.all([
        getAllGrades(),
        getAllStudents(),
      ])
      setGrades(gradesData.grades)
      setStudents(studentsData.students)
      setFilteredGrades(gradesData.grades)
    } catch (error) {
      console.error('Fetch data error:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch data'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const filterGradesList = () => {
    let filtered = grades

    if (filterStudent) {
      filtered = filtered.filter((grade) => grade.student_id.toString() === filterStudent)
    }

    if (filterTerm) {
      filtered = filtered.filter((grade) => grade.term === filterTerm)
    }

    setFilteredGrades(filtered)
  }

  const handleAddGrade = () => {
    setSelectedGrade(null)
    setModalOpen(true)
  }

  const handleEditGrade = (grade) => {
    setSelectedGrade(grade)
    setModalOpen(true)
  }

  const handleDeleteGrade = async (grade) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      try {
        // Check authentication before making API calls
        if (!isAuthenticated()) {
          toast.error('Please log in to delete grades')
          return
        }
        
        console.log('Attempting to delete grade:', grade.id)
        await deleteGrade(grade.id)
        toast.success('Grade deleted successfully')
        fetchData()
      } catch (error) {
        console.error('Delete grade error:', error)
        const errorMessage = error.response?.data?.error || error.message || 'Failed to delete grade'
        toast.error(errorMessage)
      }
    }
  }

  const handleSubmit = async (formData) => {
    setModalLoading(true)
    try {
      // Check authentication before making API calls
      if (!isAuthenticated()) {
        toast.error('Please log in to manage grades')
        return
      }
      
      console.log('Submitting grade form:', formData)
      if (selectedGrade) {
        await updateGrade(selectedGrade.id, formData)
        toast.success('Grade updated successfully')
      } else {
        await createGrade(formData)
        toast.success('Grade created successfully')
      }
      setModalOpen(false)
      fetchData()
    } catch (error) {
      console.error('Grade form submission error:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Operation failed'
      toast.error(errorMessage)
    } finally {
      setModalLoading(false)
    }
  }

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId)
    return student ? student.full_name : 'Unknown'
  }

  const getGradeColor = (letter) => {
    const colors = {
      A: 'bg-green-100 text-green-800',
      B: 'bg-blue-100 text-blue-800',
      C: 'bg-yellow-100 text-yellow-800',
      D: 'bg-orange-100 text-orange-800',
      F: 'bg-red-100 text-red-800',
    }
    return colors[letter] || 'bg-gray-100 text-gray-800'
  }

  const studentOptions = [
    { value: '', label: 'All Students' },
    ...students.map((student) => ({
      value: student.id.toString(),
      label: student.full_name,
    })),
  ]

  const termOptions = [
    { value: '', label: 'All Terms' },
    { value: 'Term 1', label: 'Term 1' },
    { value: 'Term 2', label: 'Term 2' },
    { value: 'Term 3', label: 'Term 3' },
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Grades</h2>
          <p className="text-gray-600 mt-1">Manage student academic performance</p>
        </div>
        <Button variant="primary" onClick={handleAddGrade} icon={Plus}>
          Add Grade
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            name="student_filter"
            value={filterStudent}
            onChange={(e) => setFilterStudent(e.target.value)}
            options={studentOptions}
            placeholder="Filter by student"
          />
          <Select
            name="term_filter"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            options={termOptions}
            placeholder="Filter by term"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredGrades.length}</span> of{' '}
          <span className="font-semibold">{grades.length}</span> grades
        </p>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredGrades.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">No grades found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or add a new grade</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Student
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Subject
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Score
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Percentage
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Grade
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Term
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800">
                      {getStudentName(grade.student_id)}
                    </td>
                    <td className="py-4 px-6 text-gray-800">{grade.subject}</td>
                    <td className="py-4 px-6 text-gray-800">
                      {grade.score}/{grade.max_score}
                    </td>
                    <td className="py-4 px-6 text-gray-800">{grade.percentage}%</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(
                          grade.grade_letter
                        )}`}
                      >
                        {grade.grade_letter}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      {grade.term} {grade.year}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditGrade(grade)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGrade(grade)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedGrade ? 'Edit Grade' : 'Add New Grade'}
        size="lg"
      >
        <GradeForm
          grade={selectedGrade}
          students={students}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={modalLoading}
        />
      </Modal>
    </div>
  )
}

export default Grades