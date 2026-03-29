import { createContext, useContext, useState, type ReactNode } from 'react';
import { type UserRole, type User, mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setUser(mockUsers[selectedRole]);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(mockUsers[newRole]);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
