import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import AdminProtectedRoute from '../components/AdminProtectedRoute';

// Import Admin Pages
import Dashboard from '../pages/Dashboard';
import NewsManagement from '../pages/NewsManagement';
import CreateNews from '../pages/CreateNews';
import EditNews from '../pages/EditNews';
import UserManagement from '../pages/UserManagement';
import PermissionManagement from '../pages/PermissionManagement';
import BannerManagement from '../pages/BannerManagement';

const AdminRouter = () => {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <Routes>
          {/* Admin Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* News Management */}
          <Route path="/news" element={<NewsManagement />} />
          <Route path="/news/create" element={<CreateNews />} />
          <Route path="/news/edit/:id" element={<EditNews />} />
          
          {/* User Management */}
          <Route path="/users" element={<UserManagement />} />
          
          {/* Permission Management */}
          <Route path="/permissions" element={<PermissionManagement />} />
          
          {/* Banner Management */}
          <Route path="/banners" element={<BannerManagement />} />
          
          {/* 404 for admin routes */}
          <Route path="*" element={<AdminNotFound />} />
        </Routes>
      </AdminLayout>
    </AdminProtectedRoute>
  );
};

// Admin 404 Component
const AdminNotFound = () => {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Trang admin không tìm thấy</h1>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang admin bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <a
          href="/admin"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Về Dashboard
        </a>
      </div>
    </div>
  );
};

export default AdminRouter;
