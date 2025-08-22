// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { loginUser, getMe } from "../services/api";

interface User {
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // si token dispo → récupérer /users/me
  useEffect(() => {
    if (token) {
      getMe(token)
        .then(setUser)
        .catch(() => logout());
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    const me = await getMe(data.access_token);
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook pour utiliser le contexte plus facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};