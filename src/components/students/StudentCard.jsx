import { Edit, Trash2, Eye, Mail, Phone } from 'lucide-react'
import Button from '../common/Button'

const StudentCard = ({ student, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Student Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-primary-600">
              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {student.full_name}
            </h3>
            <p className="text-sm text-gray-500">{student.admission_number}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {student.class_name}
        </span>
      </div>

      {/* Student Info */}
      <div className="space-y-2 mb-4">
        {student.email && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {student.email}
          </div>
        )}
        {student.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {student.phone}
          </div>
        )}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Gender:</span> {student.gender}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(student)}
          icon={Eye}
          className="flex-1"
        >
          View
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(student)}
          icon={Edit}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(student)}
          icon={Trash2}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default StudentCard