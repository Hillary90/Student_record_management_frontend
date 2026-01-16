import { useState } from 'react'

const StudentForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: initialData.name || '',
    admissionNumber: initialData.admissionNumber || '',
    className: initialData.className || ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Admission Number</label>
        <input
          type="text"
          name="admissionNumber"
          value={form.admissionNumber}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Class</label>
        <input
          type="text"
          name="className"
          value={form.className}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  )
}

export default StudentForm