import { Link } from 'react-router-dom'

const StudentCard = ({ student }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{student.name}</h3>
      <p className="text-sm text-gray-600">Admission: {student.admissionNumber}</p>
      <p className="text-sm text-gray-600">Class: {student.className || student.class}</p>
      <Link
        to={`/students/${student.id}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View profile
      </Link>
    </div>
  )
}

export default StudentCard