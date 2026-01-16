import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Students from '../pages/Students.jsx'
import StudentDetails from '../pages/StudentDetails.jsx'
import StudentsNew from '../pages/StudentsNew.jsx'
import TestTailwind from '../pages/TestTailwind.jsx'



const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Default route redirects to /students */}
      <Route path="/" element={<Navigate to="/students" />} />
      <Route path="/test" element={<TestTailwind />} />



      {/* Student Management UI routes */}
      <Route path="/students" element={<Students />} />
      <Route path="/students/new" element={<StudentsNew />} />
      <Route path="/students/:id" element={<StudentDetails />} />

      {/* Fallback */}
      <Route path="*" element={<div className="p-6">Page not found</div>} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes