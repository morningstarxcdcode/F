import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  phone?: string;
  role: 'vendor' | 'supplier';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessName: string;
  phone: string;
  role: 'vendor' | 'supplier';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

// Add token to requests if available
axios.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = Cookies.get('token');
    const userData = Cookies.get('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', { email, password });
      
      const { token, user: userData } = response.data;
      
      // Store token and user data
      Cookies.set('token', token, { expires: 7 }); // 7 days
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      
      setUser(userData);
      toast.success('Welcome back!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/register', userData);
      
      const { token, user: newUser } = response.data;
      
      // Store token and user data
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('user', JSON.stringify(newUser), { expires: 7 });
      
      setUser(newUser);
      toast.success('Account created successfully!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await axios.put('/auth/profile', userData);
      
      const updatedUser = response.data.user;
      
      // Update stored user data
      Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
      setUser(updatedUser);
      
      toast.success('Profile updated successfully!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
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
