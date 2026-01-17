import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GradeForm from '../components/grades/GradeForm';
import GradesList from '../components/grades/GradesList';
import PerformanceSummary from '../components/grades/PerformanceSummary';

export default function StudentDetail() {
  const { id } = useParams();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetch(`/api/students/${id}/grades`).then(res => res.json()).then(setGrades);
    setGrades([
      { subject: 'Math', grade: 85, semester: 'Fall 2024' },
      { subject: 'Science', grade: 92, semester: 'Fall 2024' }
    ]);
  }, [id]);

  const handleGradeAdded = (newGrade) => {
    setGrades([...grades, newGrade]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Student Grades - ID: {id}</h2>
      <PerformanceSummary grades={grades} />
      <GradesList grades={grades} />
      <GradeForm studentId={id} onGradeAdded={handleGradeAdded} />
    </div>
  );
}
