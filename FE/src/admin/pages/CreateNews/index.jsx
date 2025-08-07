import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import styles from './CreateNews.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const CreateNews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    contentHtml: '',
    author: user?.fullName || '',
    status: 'draft',
    category: 'announcement',
    excerpt: '',
    featured: false
  });
  
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, thumbnail: 'Chỉ cho phép upload file ảnh' }));
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, thumbnail: 'Kích thước file không được vượt quá 5MB' }));
        return;
      }
      
      setThumbnail(file);
      setErrors(prev => ({ ...prev, thumbnail: '' }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    }
    
    if (!formData.contentHtml.trim()) {
      newErrors.contentHtml = 'Nội dung không được để trống';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Tác giả không được để trống';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
        console.log(`FormData: ${key} = ${formData[key]}`);
      });

      if (thumbnail) {
        formDataToSend.append('thumbnail', thumbnail);
        console.log('Thumbnail added to FormData:', thumbnail.name);
      }

      console.log('Sending create news request...');

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/news`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formDataToSend,
      });

      const data = await response.json();
      console.log('Create news response:', data);

      if (data.success) {
        alert('Tạo bài viết thành công!');
        navigate('/admin/news');
      } else {
        console.error('Create news failed:', data);
        setErrors({ submit: data.message || 'Có lỗi xảy ra khi tạo bài viết' });
      }
    } catch (error) {
      console.error('Error creating news:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi tạo bài viết: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/news');
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Tạo tin tức mới</h1>
        <p className={styles.pageSubtitle}>Tạo và xuất bản tin tức mới</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.formSection}>
            {/* Title */}
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Tiêu đề <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.title ? styles.error : ''}`}
                placeholder="Nhập tiêu đề bài viết..."
              />
              {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
            </div>

            {/* Author */}
            <div className={styles.formGroup}>
              <label htmlFor="author" className={styles.label}>
                Tác giả <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.author ? styles.error : ''}`}
                placeholder="Nhập tên tác giả..."
              />
              {errors.author && <p className={styles.errorMessage}>{errors.author}</p>}
            </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Tóm tắt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tóm tắt ngắn gọn về bài viết..."
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="contentHtml" className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung *
            </label>
            <textarea
              id="contentHtml"
              name="contentHtml"
              value={formData.contentHtml}
              onChange={handleInputChange}
              rows={12}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contentHtml ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập nội dung bài viết..."
            />
            {errors.contentHtml && <p className="text-red-500 text-sm mt-1">{errors.contentHtml}</p>}
          </div>

          {/* Thumbnail */}
          <div className="mb-6">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh đại diện
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
            
            {thumbnailPreview && (
              <div className="mt-4">
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="announcement">Thông báo</option>
                <option value="policy">Chính sách</option>
                <option value="service">Dịch vụ</option>
                <option value="event">Sự kiện</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Nháp</option>
                <option value="published">Xuất bản</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Tin nổi bật
              </label>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading && <span className={styles.loadingSpinner}></span>}
              {loading ? 'Đang tạo...' : 'Tạo tin tức'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
