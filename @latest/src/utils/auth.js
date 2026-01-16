// src/utils/auth.js
import { jwtDecode } from "jwt-decode";   // ← correct named export (no underscore)

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);      // ← change function name here too
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true; // invalid → treat as expired
  }
}