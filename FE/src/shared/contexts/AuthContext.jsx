import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
      // Demo admin login - trong thực tế sẽ gọi API
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = {
          id: 1,
          email: 'admin@example.com',
          name: 'Administrator',
          role: 'admin',
          isAdmin: true
        };
        const adminToken = 'demo-admin-token';

        setToken(adminToken);
        setUser(adminUser);
        localStorage.setItem('token', adminToken);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return { success: true, data: { user: adminUser, token: adminToken } };
      }

      try {
        const response = await fetch('http://localhost:3000/admin/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          return { success: true, data };
        } else {
          return { success: false, error: data.message };
        }
      } catch (error) {
        return { success: false, error: 'Không thể kết nối đến server' };
      }
  };

  const register = async (userData) => {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message };
    } 
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
