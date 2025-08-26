import { createContext, useContext, useState } from "react";
import axios from "axios";
import api from "../services/axiosInstance";
const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const API_URL = "http://localhost:8080";

  const register = async (name, email, password, role) => {
    await axios.post(`${API_URL}/users`, {
      name,
      email,
      passwordHash:password,
      role,
    });
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
    setUser(res.data);
  };

  const me = async () => {
    const res = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
    setUser(res.data);
    return res.data;
  };

 const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = async (name) => {
    const res = await api.put("/users/me", { name });
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };

  const changePassword = async (currentPassword, newPassword) => {
    await api.put("/users/me/password", { currentPassword, newPassword });
  };

  return (
    <AuthContext.Provider value={{ user, register, login, me, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
