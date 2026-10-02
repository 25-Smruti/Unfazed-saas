import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('unfazed_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const loginUser = (userData, token) => {
    localStorage.setItem('unfazed_token', token);
    localStorage.setItem('unfazed_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('unfazed_token');
    localStorage.removeItem('unfazed_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
