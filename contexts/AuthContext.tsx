
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { User, UserRole } from '../types';
import * as authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function
  const login = async (email: string, pass: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, this service would make an API call
      const loggedInUser = await authService.login(email, pass, role);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow to be handled by the component
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // In a real app, you might also clear tokens from localStorage
  };
  
  const value = useMemo(() => ({ user, login, logout, isLoading }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
