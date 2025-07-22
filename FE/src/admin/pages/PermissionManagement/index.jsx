import React, { useState } from 'react';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      name: 'Quản lý tin tức',
      description: 'Tạo, sửa, xóa tin tức',
      roles: ['admin', 'editor'],
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      id: 2,
      name: 'Quản lý người dùng',
      description: 'Quản lý tài khoản người dùng',
      roles: ['admin'],
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      id: 3,
      name: 'Xem thống kê',
      description: 'Xem báo cáo và thống kê hệ thống',
      roles: ['admin', 'editor'],
      actions: ['read']
    },
    {
      id: 4,
      name: 'Quản lý banner',
      description: 'Thay đổi banner trang web',
      roles: ['admin'],
      actions: ['create', 'read', 'update', 'delete']
    }
  ]);

  const [roles] = useState([
    { id: 'admin', name: 'Administrator', color: 'bg-red-100 text-red-800' },
    { id: 'editor', name: 'Editor', color: 'bg-blue-100 text-blue-800' },
    { id: 'user', name: 'User', color: 'bg-gray-100 text-gray-800' }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  const handleEditPermission = (permission) => {
    setEditingPermission({ ...permission });
    setShowEditModal(true);
  };

  const handleSavePermission = () => {
    setPermissions(permissions.map(p => 
      p.id === editingPermission.id ? editingPermission : p
    ));
    setShowEditModal(false);
    setEditingPermission(null);
  };

  const toggleRolePermission = (roleId) => {
    const updatedRoles = editingPermission.roles.includes(roleId)
      ? editingPermission.roles.filter(r => r !== roleId)
      : [...editingPermission.roles, roleId];
    
    setEditingPermission({
      ...editingPermission,
      roles: updatedRoles
    });
  };

  const toggleActionPermission = (action) => {
    const updatedActions = editingPermission.actions.includes(action)
      ? editingPermission.actions.filter(a => a !== action)
      : [...editingPermission.actions, action];
    
    setEditingPermission({
      ...editingPermission,
      actions: updatedActions
    });
  };

  const getActionName = (action) => {
    const actionNames = {
      create: 'Tạo',
      read: 'Xem',
      update: 'Sửa',
      delete: 'Xóa'
    };
    return actionNames[action] || action;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Phân quyền</h1>
        <p className="text-gray-600">Cấu hình quyền truy cập cho các vai trò khác nhau</p>
      </div>

      {/* Roles Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Các vai trò trong hệ thống</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${role.color}`}>
                  {role.name}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Quyền: {permissions.filter(p => p.roles.includes(role.id)).length} module
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ma trận phân quyền</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức năng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò được phép
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {permission.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {permission.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {permission.roles.map((roleId) => {
                        const role = roles.find(r => r.id === roleId);
                        return (
                          <span key={roleId} className={`px-2 py-1 text-xs font-medium rounded-full ${role?.color}`}>
                            {role?.name}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {permission.actions.map((action) => (
                        <span key={action} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {getActionName(action)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditPermission(permission)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Permission Modal */}
      {showEditModal && editingPermission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa quyền: {editingPermission.name}</h2>
            
            <div className="space-y-6">
              {/* Roles Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Vai trò được phép</h3>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <label key={role.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPermission.roles.includes(role.id)}
                        onChange={() => toggleRolePermission(role.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Hành động được phép</h3>
                <div className="space-y-2">
                  {['create', 'read', 'update', 'delete'].map((action) => (
                    <label key={action} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPermission.actions.includes(action)}
                        onChange={() => toggleActionPermission(action)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{getActionName(action)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSavePermission}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManagement;
