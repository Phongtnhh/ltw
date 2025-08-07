import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NewsManagement.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const NewsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });

  // Fetch news data
  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      console.log('Fetching news with params:', params.toString());

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/news?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log('API response:', data);

      if (data.success) {
        setNewsList(data.data.news);
        setPagination(data.data.pagination);
      } else {
        console.error('API returned error:', data.message);
        alert(data.message || 'Có lỗi xảy ra khi tải danh sách tin tức');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Có lỗi xảy ra khi tải danh sách tin tức: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  // Fetch data when status filter changes
  useEffect(() => {
    fetchNews();
  }, [statusFilter]);

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchNews(1);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/admin/news/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        const data = await response.json();
        if (data.success) {
          alert('Xóa tin tức thành công!');
          fetchNews(pagination.currentPage);
        } else {
          alert(data.message || 'Có lỗi xảy ra khi xóa tin tức');
        }
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Có lỗi xảy ra khi xóa tin tức');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/news/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchNews(pagination.currentPage);
      } else {
        alert(data.message || 'Có lỗi xảy ra khi thay đổi trạng thái');
      }
    } catch (error) {
      console.error('Error changing status:', error);
      alert('Có lỗi xảy ra khi thay đổi trạng thái');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', text: 'Đã xuất bản' },
      draft: { color: 'bg-yellow-100 text-yellow-800', text: 'Bản nháp' },
      archived: { color: 'bg-gray-100 text-gray-800', text: 'Lưu trữ' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1>Quản lý Tin tức</h1>
          <p>Quản lý tất cả tin tức và bài viết</p>
        </div>
        <Link
          to="/admin/news/create"
          className={styles.createButton}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tạo tin tức mới
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tác giả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : newsList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Không có tin tức nào
                  </td>
                </tr>
              ) : (
                newsList.map((news) => (
                <tr key={news._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {news.title}
                          {news.featured && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Nổi bật
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {news.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(news.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {news.views || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleStatusChange(news._id, news.status === 'published' ? 'draft' : 'published')}
                        className="text-green-600 hover:text-green-900"
                      >
                        {news.status === 'published' ? 'Ẩn' : 'Xuất bản'}
                      </button>
                      <button
                        onClick={() => navigate(`/admin/news/edit/${news._id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(news._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;
