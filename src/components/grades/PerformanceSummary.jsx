export default function PerformanceSummary({ grades }) {
  const average = grades.length === 0 ? 0 : 
    (grades.reduce((acc, g) => acc + Number(g.grade), 0) / grades.length).toFixed(2);
  
  const status = average >= 90 ? 'Excellent' : average >= 80 ? 'Very Good' : 
    average >= 70 ? 'Good' : average >= 60 ? 'Pass' : 'Needs Improvement';

  return (
    <div style={styles.container}>
      <h3>Performance Summary</h3>
      <div style={styles.stats}>
        <div><span>Total Subjects:</span><strong>{grades.length}</strong></div>
        <div><span>Average Grade:</span><strong>{average}</strong></div>
        <div><span>Status:</span><strong>{status}</strong></div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#f8f9fa', padding: '20px', borderRadius: '6px', marginBottom: '30px' },
  stats: { display: 'flex', gap: '30px' }
};
