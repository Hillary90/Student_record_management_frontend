import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchStudentById, updateStudent, deleteStudent } from '../api/studentApi'
import StudentForm from '../components/StudentForm'

const StudentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetchStudentById(id).then(res => setStudent(res.data))
  }, [id])

  const handleUpdate = async (data) => {
    await updateStudent(id, data)
    setEditing(false)
    const res = await fetchStudentById(id)
    setStudent(res.data)
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id)
      navigate('/students')
    }
  }

  if (!student) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {editing ? (
        <StudentForm initialData={student} onSubmit={handleUpdate} />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-2">{student.name}</h1>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Admission:</span> {student.admissionNumber}</p>
            <p><span className="font-medium">Class:</span> {student.className || student.class}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default StudentDetails