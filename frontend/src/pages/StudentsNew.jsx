import { createStudent } from '../api/studentApi'
import StudentForm from '../components/StudentForm'
import { useNavigate } from 'react-router-dom'

const StudentsNew = () => {
  const navigate = useNavigate()

  const handleCreate = async (data) => {
    await createStudent(data)
    navigate('/students')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Student</h1>
      <StudentForm onSubmit={handleCreate} />
    </div>
  )
}

export default StudentsNew