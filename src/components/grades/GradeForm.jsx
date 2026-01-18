import { useState, useEffect } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import { Save, X } from 'lucide-react'

const GradeForm = ({ grade, students, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    subject: '',
    score: '',
    max_score: '100',
    term: '',
    year: new Date().getFullYear().toString(),
    remarks: '',
  })

  useEffect(() => {
    if (grade) {
      setFormData({
        student_id: grade.student_id.toString(),
        subject: grade.subject,
        score: grade.score.toString(),
        max_score: grade.max_score.toString(),
        term: grade.term,
        year: grade.year.toString(),
        remarks: grade.remarks || '',
      })
    }
  }, [grade])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const studentOptions = students.map((student) => ({
    value: student.id.toString(),
    label: `${student.full_name} (${student.admission_number})`,
  }))

  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
  ]

  const termOptions = [
    { value: 'Term 1', label: 'Term 1' },
    { value: 'Term 2', label: 'Term 2' },
    { value: 'Term 3', label: 'Term 3' },
  ]

  const yearOptions = [
    { value: '2026', label: '2026' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Student"
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          options={studentOptions}
          required
          disabled={!!grade}
        />

        <Select
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          options={subjectOptions}
          required
        />

        <Input
          label="Score"
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          placeholder="e.g., 85"
          min="0"
          required
        />

        <Input
          label="Maximum Score"
          type="number"
          name="max_score"
          value={formData.max_score}
          onChange={handleChange}
          placeholder="e.g., 100"
          min="1"
          required
        />

        <Select
          label="Term"
          name="term"
          value={formData.term}
          onChange={handleChange}
          options={termOptions}
          required
        />

        <Select
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          options={yearOptions}
          required
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter any remarks or comments..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel} icon={X}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading} icon={Save}>
          {loading ? 'Saving...' : grade ? 'Update Grade' : 'Add Grade'}
        </Button>
      </div>
    </form>
  )
}

export default GradeForm