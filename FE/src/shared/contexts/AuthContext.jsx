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
      try {
        const response = await fetch('http://localhost:3000/admin/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          return { success: true, data };
        } else {
          return { success: false, error: data.message || 'Đăng nhập thất bại' };
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

  // Helper functions để kiểm tra quyền
  const hasPermission = (resource, action) => {
    if (!user || !user.role) return false;

    // Admin có tất cả quyền
    if (user.role.title === 'admin') return true;

    if (!user.role.permissions) return false;

    return user.role.permissions.some(permission => {
      return permission.resource === resource &&
             (permission.actions.includes(action) || permission.actions.includes('manage'));
    });
  };

  const hasRole = (roleName) => {
    if (!user || !user.role) return false;
    return user.role.title === roleName;
  };

  const isAdmin = () => {
    return hasRole('admin');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    hasPermission,
    hasRole,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
