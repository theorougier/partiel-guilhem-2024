// src/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
    navigate('/calendar');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
