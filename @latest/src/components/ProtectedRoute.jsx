import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isTokenExpired } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || isTokenExpired(user.token)) return <Navigate to="/login" />;

  return children;
}
