import { Edit, Trash2, Eye, Mail, Phone } from 'lucide-react'
import Button from '../common/Button'

const StudentCard = ({ student, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6">
      {/* Student Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold text-primary-600">
              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
              {student.full_name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{student.admission_number}</p>
          </div>
        </div>
        <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex-shrink-0">
          {student.class_name}
        </span>
      </div>

      {/* Student Info */}
      <div className="space-y-2 mb-4">
        {student.email && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
        )}
        {student.phone && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{student.phone}</span>
          </div>
        )}
        <div className="text-xs sm:text-sm text-gray-600">
          <span className="font-medium">Gender:</span> {student.gender}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(student)}
          icon={Eye}
          className="flex-1 justify-center"
        >
          <span className="hidden sm:inline">View</span>
          <span className="sm:hidden">View Details</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(student)}
          icon={Edit}
          className="flex-1 justify-center"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(student)}
          icon={Trash2}
          className="flex-1 justify-center"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default StudentCard