// components/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);

    setIsAuthenticated(true);
    setUsername(username);

    router.push('/reservas');
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    setIsAuthenticated(false);
    setUsername(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


