import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, removeAuthToken, isAuthenticated } from '../services/authService';

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

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = () => {
      console.log('Checking authentication...');
      const token = getAuthToken();
      console.log('Token exists:', !!token);
      
      if (isAuthenticated()) {
        const patientData = localStorage.getItem('patientData');
        console.log('Patient data from localStorage:', patientData);
        if (patientData) {
          try {
            const parsedData = JSON.parse(patientData);
            console.log('Parsed patient data:', parsedData);
            setUser(parsedData);
          } catch (error) {
            console.error('Error parsing patient data:', error);
            removeAuthToken();
            localStorage.removeItem('patientData');
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('patientData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
    localStorage.removeItem('patientData');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
