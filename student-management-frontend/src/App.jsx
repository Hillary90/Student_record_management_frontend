import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get("http://127.0.0.1:5000/students")
      .then((res) => {
        setStudents(res.data);

        // Extract unique courses for dropdown
        const classes = [...new Set(res.data.map((s) => s.course))];
        setClassList(classes);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load students. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Filter students by search and selected class
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admission_number.includes(searchTerm);

    const matchesClass = selectedClass ? s.course === selectedClass : true;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Student Search & Filter
      </h1>

      {/* Search & Filter Inputs */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown
          classList={classList}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      </div>

      {/* Loading & Error Messages */}
      {loading && <p className="text-gray-500 mt-4">Loading students...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Student List */}
      {!loading && !error && <StudentList students={filteredStudents} />}
    </div>
  );
}

export default App;






