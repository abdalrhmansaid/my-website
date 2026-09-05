import { createContext, useContext, useState } from 'react';
import { AuthService } from '@/services/AuthService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => AuthService.isAuthenticated());

  const login = (username, password) => {
    const result = AuthService.login(username, password);
    if (result.success) setIsAuthenticated(true);
    return result;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
