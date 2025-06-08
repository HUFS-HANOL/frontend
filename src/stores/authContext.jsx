import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { instance } from '@/utils/apiConfig';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem('accessToken');

      if (storedToken) {
        setToken(storedToken);
        const valid = await instance.post('/api/auth/auth');
        if (valid.status === 200) {
          setToken(storedToken);
          setUserId(valid.data.user.id);
        } else {
          logout();
        }
      }
    };

    init();
  }, [pathname]);

  const login = (newToken) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await instance.post('/api/auth/logout');
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  const isLoggedIn = localStorage.getItem('accessToken') || !!token;

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
