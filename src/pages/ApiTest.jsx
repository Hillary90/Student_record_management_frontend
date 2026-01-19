import { useState, useEffect } from 'react'

const ApiTest = () => {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testEndpoints = async () => {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      const tests = {}

      // Test health endpoint
      try {
        const response = await fetch(`${baseURL}/health`)
        tests.health = {
          status: response.status,
          ok: response.ok,
          data: await response.json()
        }
      } catch (error) {
        tests.health = { error: error.message }
      }

      // Test students endpoint (should return 401 or data)
      try {
        const response = await fetch(`${baseURL}/students`)
        tests.students = {
          status: response.status,
          ok: response.ok,
          data: response.status === 401 ? 'Authentication required' : await response.json()
        }
      } catch (error) {
        tests.students = { error: error.message }
      }

      // Test grades endpoint (should return 401 or data)
      try {
        const response = await fetch(`${baseURL}/grades`)
        tests.grades = {
          status: response.status,
          ok: response.ok,
          data: response.status === 401 ? 'Authentication required' : await response.json()
        }
      } catch (error) {
        tests.grades = { error: error.message }
      }

      setResults(tests)
      setLoading(false)
    }

    testEndpoints()
  }, [])

  if (loading) {
    return <div className="p-4">Testing API endpoints...</div>
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <div className="space-y-4">
        {Object.entries(results).map(([endpoint, result]) => (
          <div key={endpoint} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{endpoint.toUpperCase()} Endpoint</h3>
            <div className="bg-gray-100 p-3 rounded">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApiTest