// src/pages/LoginPage.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      login(response.data.access_token);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Student Records
        </h1>
        <p className="text-center text-indigo-600 text-xl mb-8">Sign In</p>

        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-6 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-200 transform hover:scale-105 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          © {new Date().getFullYear()} Student Record Management
        </p>
      </div>
    </div>
  );
}