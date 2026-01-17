import { useEffect, useState } from 'react'
import { fetchStudents } from '../api/studentApi'
import StudentCard from '../components/StudentCard'

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetchStudents({ search: query, page })
      setStudents(res.data?.items || res.data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [page])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Students</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Search by name or admission number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => { setPage(1); load() }}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((s) => <StudentCard key={s.id} student={s} />)}
        </div>
      )}

      <div className="flex items-center gap-2 mt-6">
        <button
          className="px-3 py-2 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">Page {page}</span>
        <button
          className="px-3 py-2 border rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Students