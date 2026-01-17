// src/pages/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">
            Student Records Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition duration-200 transform hover:scale-105 shadow"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome back! 
          </h2>
          <p className="text-gray-600 mb-8">
            Manage student records, view reports, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-100 p-8 rounded-xl text-center hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-indigo-700 mb-2">Students</h3>
              <p className="text-4xl font-bold text-indigo-600">1,248</p>
            </div>
            <div className="bg-purple-100 p-8 rounded-xl text-center hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Courses</h3>
              <p className="text-4xl font-bold text-purple-600">42</p>
            </div>
            <div className="bg-pink-100 p-8 rounded-xl text-center hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-pink-700 mb-2">Pending</h3>
              <p className="text-4xl font-bold text-pink-600">19</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

