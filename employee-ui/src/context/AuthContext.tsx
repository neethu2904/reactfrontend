import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { loginUser } from "../services/authApi";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("employee-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials: { email: string; password: string }) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    localStorage.setItem("employee-user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("employee-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
