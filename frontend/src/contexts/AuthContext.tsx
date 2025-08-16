// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, getMe } from "../services/api";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      getMe().then(setUser).catch(() => logout());
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    const me = await getMe();
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