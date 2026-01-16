// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token && !isTokenExpired(token) ? { token } : null;
  });

  // Login: save token to state and localStorage
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
    navigate("/dashboard"); // navigate after login
  };

  // Logout: clear token
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Check token expiration on app load or when user changes
  useEffect(() => {
    if (!user || isTokenExpired(user.token)) {
      logout(); // automatically logs out if token is invalid
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
