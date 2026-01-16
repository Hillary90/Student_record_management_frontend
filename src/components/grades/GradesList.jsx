export default function GradesList({ grades }) {
  return (
    <div style={styles.container}>
      <h3>Grades by Subject</h3>
      {grades.length === 0 ? <p>No grades available</p> : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.subject}</td>
                <td>{grade.grade}</td>
                <td>{grade.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { marginBottom: '30px' },
  table: { width: '100%', borderCollapse: 'collapse' }
};
