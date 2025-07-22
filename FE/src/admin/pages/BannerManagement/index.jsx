import React, { useState } from 'react';

const BannerManagement = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Banner Trang chủ chính',
      description: 'Banner hiển thị ở đầu trang chủ',
      imageUrl: '/duck1.png',
      link: '/',
      position: 'homepage-main',
      status: 'active',
      order: 1,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Banner Dịch vụ',
      description: 'Banner quảng bá dịch vụ mới',
      imageUrl: '/psyduck.gif',
      link: '/services',
      position: 'homepage-secondary',
      status: 'active',
      order: 2,
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      title: 'Banner Tin tức',
      description: 'Banner khu vực tin tức',
      imageUrl: '/vite.svg',
      link: '/news',
      position: 'news-header',
      status: 'inactive',
      order: 3,
      createdAt: '2024-01-13'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    position: 'homepage-main',
    status: 'active',
    order: 1
  });

  const positions = [
    { value: 'homepage-main', label: 'Trang chủ - Chính' },
    { value: 'homepage-secondary', label: 'Trang chủ - Phụ' },
    { value: 'news-header', label: 'Đầu trang tin tức' },
    { value: 'services-header', label: 'Đầu trang dịch vụ' },
    { value: 'sidebar', label: 'Thanh bên' }
  ];

  const handleCreateBanner = (e) => {
    e.preventDefault();
    const banner = {
      id: banners.length + 1,
      ...newBanner,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBanners([...banners, banner]);
    setNewBanner({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      position: 'homepage-main',
      status: 'active',
      order: 1
    });
    setShowCreateModal(false);
  };

  const handleEditBanner = (banner) => {
    setEditingBanner({ ...banner });
    setShowEditModal(true);
  };

  const handleUpdateBanner = (e) => {
    e.preventDefault();
    setBanners(banners.map(banner => 
      banner.id === editingBanner.id ? editingBanner : banner
    ));
    setShowEditModal(false);
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      setBanners(banners.filter(banner => banner.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, status: newStatus } : banner
    ));
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
      </span>
    );
  };

  const getPositionLabel = (position) => {
    const pos = positions.find(p => p.value === position);
    return pos ? pos.label : position;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Banner</h1>
          <p className="text-gray-600">Quản lý banner hiển thị trên website</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm banner mới
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Banner Image */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {banner.imageUrl ? (
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Banner Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{banner.title}</h3>
                {getStatusBadge(banner.status)}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{banner.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Vị trí:</span>
                  <span className="text-gray-900">{getPositionLabel(banner.position)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Thứ tự:</span>
                  <span className="text-gray-900">{banner.order}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Link:</span>
                  <span className="text-blue-600 truncate max-w-32">{banner.link}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngày tạo:</span>
                  <span className="text-gray-900">{banner.createdAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleStatusChange(banner.id, banner.status === 'active' ? 'inactive' : 'active')}
                    className="text-green-600 hover:text-green-900 text-sm"
                  >
                    {banner.status === 'active' ? 'Ẩn' : 'Hiện'}
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Banner Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Thêm banner mới</h2>
            <form onSubmit={handleCreateBanner}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    required
                    value={newBanner.title}
                    onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={newBanner.description}
                    onChange={(e) => setNewBanner({...newBanner, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL hình ảnh
                  </label>
                  <input
                    type="url"
                    value={newBanner.imageUrl}
                    onChange={(e) => setNewBanner({...newBanner, imageUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link đích
                  </label>
                  <input
                    type="text"
                    value={newBanner.link}
                    onChange={(e) => setNewBanner({...newBanner, link: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vị trí hiển thị
                  </label>
                  <select
                    value={newBanner.position}
                    onChange={(e) => setNewBanner({...newBanner, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {positions.map((pos) => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thứ tự
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newBanner.order}
                    onChange={(e) => setNewBanner({...newBanner, order: parseInt(e.target.value)})}
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
                  Tạo banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showEditModal && editingBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa banner</h2>
            <form onSubmit={handleUpdateBanner}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={editingBanner.description}
                    onChange={(e) => setEditingBanner({...editingBanner, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL hình ảnh
                  </label>
                  <input
                    type="url"
                    value={editingBanner.imageUrl}
                    onChange={(e) => setEditingBanner({...editingBanner, imageUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link đích
                  </label>
                  <input
                    type="text"
                    value={editingBanner.link}
                    onChange={(e) => setEditingBanner({...editingBanner, link: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vị trí hiển thị
                  </label>
                  <select
                    value={editingBanner.position}
                    onChange={(e) => setEditingBanner({...editingBanner, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {positions.map((pos) => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thứ tự
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingBanner.order}
                    onChange={(e) => setEditingBanner({...editingBanner, order: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
