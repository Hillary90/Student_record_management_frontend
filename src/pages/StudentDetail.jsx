import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Plus, Filter } from 'lucide-react'
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService'
import StudentCard from '../components/students/StudentCard'
import StudentForm from '../components/students/StudentForm'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Loading from '../components/common/Loading'
import SearchBar from '../components/common/SearchBar'
import Select from '../components/common/Select'

const Students = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    filterStudentsList()
  }, [students, searchTerm, filterClass])

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents()
      setStudents(data.students)
      setFilteredStudents(data.students)
    } catch (error) {
      toast.error('Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  const filterStudentsList = () => {
    let filtered = students

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.admission_number.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Class filter
    if (filterClass) {
      filtered = filtered.filter((student) => student.class_name === filterClass)
    }

    setFilteredStudents(filtered)
  }

  const handleAddStudent = () => {
    setSelectedStudent(null)
    setModalOpen(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setModalOpen(true)
  }

  const handleViewStudent = (student) => {
    navigate(`/students/${student.id}`)
  }

  const handleDeleteStudent = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.full_name}?`)) {
      try {
        await deleteStudent(student.id)
        toast.success('Student deleted successfully')
        fetchStudents()
      } catch (error) {
        toast.error('Failed to delete student')
      }
    }
  }

  const handleSubmit = async (formData) => {
    setModalLoading(true)
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, formData)
        toast.success('Student updated successfully')
      } else {
        await createStudent(formData)
        toast.success('Student created successfully')
      }
      setModalOpen(false)
      fetchStudents()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed')
    } finally {
      setModalLoading(false)
    }
  }

  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: 'Form 1', label: 'Form 1' },
    { value: 'Form 2', label: 'Form 2' },
    { value: 'Form 3', label: 'Form 3' },
    { value: 'Form 4', label: 'Form 4' },
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Students</h2>
          <p className="text-gray-600 mt-1">Manage student records and information</p>
        </div>
        <Button variant="primary" onClick={handleAddStudent} icon={Plus}>
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name or admission number..."
            />
          </div>
          <Select
            name="class_filter"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            options={classOptions}
            placeholder="Filter by class"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredStudents.length}</span> of{' '}
          <span className="font-semibold">{students.length}</span> students
        </p>
      </div>

      {/* Students Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No students found</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or add a new student</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={handleViewStudent}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <StudentForm
          student={selectedStudent}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={modalLoading}
        />
      </Modal>
    </div>
  )
}

export default Students