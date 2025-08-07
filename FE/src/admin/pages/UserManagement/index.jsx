import React, { useState, useEffect } from 'react';
import { userAPI, roleAPI } from '../../../shared/services/api';
import PermissionGuard from '../../../shared/components/PermissionGuard';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalRecords: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    page: 1,
    limit: 10
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    roleId: '',
    status: 'active'
  });

  // Load data khi component mount
  useEffect(() => {
    loadUsers();
    loadRoles();
  }, [filters]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers(filters);
      if (response.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await roleAPI.getRoles();
      if (response.success) {
        setRoles(response.data);
      }
    } catch (err) {
      console.error('Không thể tải danh sách roles:', err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await userAPI.createUser(newUser);
      if (response.success) {
        setNewUser({
          fullName: '',
          email: '',
          password: '',
          phone: '',
          roleId: '',
          status: 'active'
        });
        setShowCreateModal(false);
        loadUsers(); // Reload danh sách
        alert('Tạo người dùng thành công!');
      } else {
        alert(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      alert('Không thể tạo người dùng');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      fullName: user.fullName,
      email: user.email,
      password: '',
      phone: user.phone || '',
      roleId: user.role._id,
      status: user.status
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...newUser };
      if (!updateData.password) {
        delete updateData.password; // Không cập nhật password nếu để trống
      }

      const response = await userAPI.updateUser(selectedUser._id, updateData);
      if (response.success) {
        setShowEditModal(false);
        setSelectedUser(null);
        loadUsers(); // Reload danh sách
        alert('Cập nhật người dùng thành công!');
      } else {
        alert(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      alert('Không thể cập nhật người dùng');
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.fullName}"?`)) {
      try {
        const response = await userAPI.deleteUser(user._id);
        if (response.success) {
          loadUsers(); // Reload danh sách
          alert('Xóa người dùng thành công!');
        } else {
          alert(response.message || 'Có lỗi xảy ra');
        }
      } catch (err) {
        alert('Không thể xóa người dùng');
      }
    }
  };

  const handleChangeStatus = async (user, newStatus) => {
    try {
      const response = await userAPI.changeUserStatus(user._id, newStatus);
      if (response.success) {
        loadUsers(); // Reload danh sách
        alert('Cập nhật trạng thái thành công!');
      } else {
        alert(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      alert('Không thể cập nhật trạng thái');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset về trang đầu khi filter
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  const getRoleBadge = (role) => {
    if (!role) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">N/A</span>;

    const roleConfig = {
      admin: { color: 'bg-red-100 text-red-800', text: 'Admin' },
      editor: { color: 'bg-blue-100 text-blue-800', text: 'Editor' },
      user: { color: 'bg-gray-100 text-gray-800', text: 'User' }
    };

    const config = roleConfig[role.title] || roleConfig.user;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {role.title}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Hoạt động' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Không hoạt động' },
      suspended: { color: 'bg-red-100 text-red-800', text: 'Bị khóa' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={loadUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
          <p className="text-gray-600">Quản lý tài khoản và phân quyền người dùng</p>
        </div>
        <PermissionGuard resource="users" action="create">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm người dùng
          </button>
        </PermissionGuard>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả vai trò</option>
              {roles.map(role => (
                <option key={role._id} value={role.title}>
                  {role.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đăng nhập cuối
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Sửa
                      </button>
                      <button
                        onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className="text-green-600 hover:text-green-900"
                      >
                        {user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Thêm người dùng mới</h2>
            <form onSubmit={handleCreateUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tạo người dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
