import axios from '../api/axios'

export const getAllGrades = async (params = {}) => {
  const response = await axios.get('/grades', { params })
  return response.data
}

export const getGrade = async (id) => {
  const response = await axios.get(`/grades/${id}`)
  return response.data
}

export const createGrade = async (gradeData) => {
  const response = await axios.post('/grades', gradeData)
  return response.data
}

export const updateGrade = async (id, gradeData) => {
  const response = await axios.put(`/grades/${id}`, gradeData)
  return response.data
}

export const deleteGrade = async (id) => {
  const response = await axios.delete(`/grades/${id}`)
  return response.data
}

export const getStudentGradeSummary = async (studentId) => {
  const response = await axios.get(`/grades/student/${studentId}/summary`)
  return response.data
}