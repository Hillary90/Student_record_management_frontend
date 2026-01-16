import React from "react";

const StudentList = ({ students }) => {
  if (students.length === 0) {
    return <p className="text-gray-500 mt-4">No students found.</p>;
  }

  return (
    <div className="w-full max-w-3xl mt-4 bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Admission Number</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Class</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((s) => (
            <tr key={s.id}>
              <td className="px-4 py-2">{`${s.first_name} ${s.last_name}`}</td>
              <td className="px-4 py-2">{s.admission_number}</td>
              <td className="px-4 py-2">{s.course}</td>
              <td className="px-4 py-2">{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

