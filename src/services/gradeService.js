import axios from '../api/axios'

export const getAllGrades = async (params = {}) => {
  try {
    console.log('Fetching grades with params:', params)
    const response = await axios.get('/grades', { params })
    console.log('Grades fetched successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching grades:', error.response?.data || error.message)
    throw error
  }
}

export const getGrade = async (id) => {
  try {
    const response = await axios.get(`/grades/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching grade:', error.response?.data || error.message)
    throw error
  }
}

export const createGrade = async (gradeData) => {
  try {
    console.log('Creating grade with data:', gradeData)
    const response = await axios.post('/grades', gradeData)
    console.log('Grade created successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating grade:', error.response?.data || error.message)
    throw error
  }
}

export const updateGrade = async (id, gradeData) => {
  try {
    console.log('Updating grade', id, 'with data:', gradeData)
    const response = await axios.put(`/grades/${id}`, gradeData)
    console.log('Grade updated successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error updating grade:', error.response?.data || error.message)
    throw error
  }
}

export const deleteGrade = async (id) => {
  try {
    console.log('Deleting grade:', id)
    const response = await axios.delete(`/grades/${id}`)
    console.log('Grade deleted successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error deleting grade:', error.response?.data || error.message)
    throw error
  }
}

export const getStudentGradeSummary = async (studentId) => {
  try {
    const response = await axios.get(`/grades/student/${studentId}/summary`)
    return response.data
  } catch (error) {
    console.error('Error fetching student grade summary:', error.response?.data || error.message)
    throw error
  }
}