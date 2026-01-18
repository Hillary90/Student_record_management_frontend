import axios from '../api/axios'

export const getAllStudents = async (params = {}) => {
  const response = await axios.get('/students', { params })
  return response.data
}

export const getStudent = async (id, includeGrades = false) => {
  const response = await axios.get(`/students/${id}`, {
    params: { include_grades: includeGrades }
  })
  return response.data
}

export const createStudent = async (studentData) => {
  const response = await axios.post('/students', studentData)
  return response.data
}

export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`/students/${id}`, studentData)
  return response.data
}

export const deleteStudent = async (id) => {
  const response = await axios.delete(`/students/${id}`)
  return response.data
}