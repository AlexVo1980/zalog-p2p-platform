import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setLoading(false);
      } else {
        fetchUser();
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      toast.success('Вход выполнен успешно');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка входа');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      const { token: newToken, user: userDataResponse } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userDataResponse));
      setToken(newToken);
      setUser(userDataResponse);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      toast.success('Регистрация успешна');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка регистрации');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Выход выполнен');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

