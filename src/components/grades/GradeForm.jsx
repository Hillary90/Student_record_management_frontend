import { useState } from 'react';

export default function GradeForm({ studentId, onGradeAdded }) {
  const [formData, setFormData] = useState({ subject: '', grade: '', semester: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGradeAdded?.({ ...formData, studentId });
    setFormData({ subject: '', grade: '', semester: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Add/Update Grade</h3>
      <input type="text" placeholder="Subject" value={formData.subject} 
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
      <input type="number" placeholder="Grade (0-100)" value={formData.grade} 
        onChange={(e) => setFormData({ ...formData, grade: e.target.value })} min="0" max="100" required />
      <input type="text" placeholder="Semester" value={formData.semester} 
        onChange={(e) => setFormData({ ...formData, semester: e.target.value })} required />
      <button type="submit">Submit Grade</button>
    </form>
  );
}

const styles = {
  form: { background: '#f8f9fa', padding: '20px', borderRadius: '6px', marginTop: '20px' }
};
