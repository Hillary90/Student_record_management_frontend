import axios from './axios'

// Fetch all students with optional search + pagination
export const fetchStudents = (params) =>
  axios.get('/students', { params })

// Fetch single student by ID
export const fetchStudentById = (id) =>
  axios.get(`/students/${id}`)

// Create new student
export const createStudent = (data) =>
  axios.post('/students', data)

// Update existing student
export const updateStudent = (id, data) =>
  axios.put(`/students/${id}`, data)

// Delete student
export const deleteStudent = (id) =>
  axios.delete(`/students/${id}`)