import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra quyền admin
  const userIsAdmin = user?.role?.title === 'admin';

  if (!userIsAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl font-bold text-red-300 mb-4">403</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không có quyền truy cập</h1>
          <p className="text-gray-600 mb-8">
            Bạn không có quyền truy cập vào khu vực quản trị này.
          </p>
          <div className="space-x-4">
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Về trang chủ
            </a>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;
