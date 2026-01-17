import { useState, useEffect } from 'react'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import { Save, X } from 'lucide-react'

const StudentForm = ({ student, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    admission_number: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    class_name: '',
    email: '',
    phone: '',
    address: '',
    guardian_name: '',
    guardian_phone: '',
  })

  useEffect(() => {
    if (student) {
      setFormData({
        admission_number: student.admission_number || '',
        first_name:  student.first_name || '',
        last_name: student.last_name || '',
        date_of_birth: student.date_of_birth || '',
        gender: student.gender || '',
        class_name: student.class_name || '',
        email: student.email || '',
        phone: student.phone || '',
        address: student.address || '',
        guardian_name: student.guardian_name || '',
        guardian_phone: student.guardian_phone || '',
      })
    }
  }, [student])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]:  e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ]

  const classOptions = [
    { value: 'Form 1', label: 'Form 1' },
    { value: 'Form 2', label: 'Form 2' },
    { value: 'Form 3', label: 'Form 3' },
    { value: 'Form 4', label: 'Form 4' },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Admission Number"
          name="admission_number"
          value={formData.admission_number}
          onChange={handleChange}
          placeholder="e.g., ADM001"
          required
          disabled={!! student}
        />

        <Input
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter first name"
          required
        />

        <Input
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter last name"
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />

        <Select
          label="Gender"
          name="gender"
          value={formData. gender}
          onChange={handleChange}
          options={genderOptions}
          required
        />

        <Select
          label="Class"
          name="class_name"
          value={formData. class_name}
          onChange={handleChange}
          options={classOptions}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="student@school.com"
        />

        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+254712345678"
        />

        <Input
          label="Guardian Name"
          name="guardian_name"
          value={formData.guardian_name}
          onChange={handleChange}
          placeholder="Enter guardian name"
        />

        <Input
          label="Guardian Phone"
          type="tel"
          name="guardian_phone"
          value={formData.guardian_phone}
          onChange={handleChange}
          placeholder="+254787654321"
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter student address"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel} icon={X}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading} icon={Save}>
          {loading ? 'Saving...' :  student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  )
}

export default StudentForm