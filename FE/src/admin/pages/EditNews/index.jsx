import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import styles from './EditNews.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const EditNews = () => {
  const { id } = useParams();
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
  const [currentThumbnail, setCurrentThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});
  
  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/admin/news/${id}/edit`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          const news = data.data;
          setFormData({
            title: news.title || '',
            contentHtml: news.contentHtml || '',
            author: news.author || '',
            status: news.status || 'draft',
            category: news.category || 'announcement',
            excerpt: news.excerpt || '',
            featured: news.featured || false
          });
          setCurrentThumbnail(news.thumbnail || '');
        } else {
          alert(data.message || 'Không thể tải thông tin tin tức');
          navigate('/admin/news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        alert('Có lỗi xảy ra khi tải thông tin tin tức');
        navigate('/admin/news');
      } finally {
        setFetchLoading(false);
      }
    };
    
    if (id) {
      fetchNews();
    }
  }, [id, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          thumbnail: 'Vui lòng chọn file ảnh'
        }));
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          thumbnail: 'File ảnh không được vượt quá 5MB'
        }));
        return;
      }
      
      setThumbnail(file);
      setErrors(prev => ({
        ...prev,
        thumbnail: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }
    
    if (!formData.contentHtml.trim()) {
      newErrors.contentHtml = 'Nội dung là bắt buộc';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Tác giả là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
        console.log(`FormData: ${key} = ${formData[key]}`);
      });
      
      if (thumbnail) {
        formDataToSend.append('thumbnail', thumbnail);
        console.log('New thumbnail added to FormData:', thumbnail.name);
      }
      
      console.log('Sending update news request...');
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formDataToSend,
      });
      
      const data = await response.json();
      console.log('Update news response:', data);

      if (data.success) {
        alert('Cập nhật bài viết thành công!');
        navigate('/admin/news');
      } else {
        console.error('Update news failed:', data);
        setErrors({ submit: data.message || 'Có lỗi xảy ra khi cập nhật bài viết' });
      }
    } catch (error) {
      console.error('Error updating news:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi cập nhật bài viết: ' + error.message });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy? Các thay đổi sẽ không được lưu.')) {
      navigate('/admin/news');
    }
  };
  
  if (fetchLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Đang tải thông tin tin tức...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Chỉnh sửa tin tức</h1>
        <p className={styles.pageSubtitle}>Cập nhật thông tin bài viết</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.formSection}>
            {/* Submit Error */}
            {errors.submit && (
              <div className={styles.submitError}>
                <p className={styles.submitErrorText}>{errors.submit}</p>
              </div>
            )}
            
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

            {/* Content */}
            <div className={styles.formGroup}>
              <label htmlFor="contentHtml" className={styles.label}>
                Nội dung <span className={styles.required}>*</span>
              </label>
              <textarea
                id="contentHtml"
                name="contentHtml"
                value={formData.contentHtml}
                onChange={handleInputChange}
                className={`${styles.textarea} ${styles.contentTextarea} ${errors.contentHtml ? styles.error : ''}`}
                placeholder="Nhập nội dung bài viết..."
                rows={15}
              />
              {errors.contentHtml && <p className={styles.errorMessage}>{errors.contentHtml}</p>}
            </div>

            {/* Excerpt */}
            <div className={styles.formGroup}>
              <label htmlFor="excerpt" className={styles.label}>
                Tóm tắt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Nhập tóm tắt ngắn gọn..."
                rows={3}
              />
            </div>

            {/* Settings Row */}
            <div className={styles.settingsRow}>
              <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.label}>
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Đã xuất bản</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Danh mục
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="announcement">Thông báo</option>
                  <option value="policy">Chính sách</option>
                  <option value="service">Dịch vụ</option>
                  <option value="event">Sự kiện</option>
                </select>
              </div>
            </div>

            {/* Thumbnail */}
            <div className={styles.formGroup}>
              <label htmlFor="thumbnail" className={styles.label}>
                Ảnh đại diện
              </label>
              
              {/* Current thumbnail */}
              {currentThumbnail && !thumbnail && (
                <div className={styles.currentThumbnail}>
                  <p>Ảnh hiện tại:</p>
                  <img 
                    src={`${API_BASE_URL}${currentThumbnail}`} 
                    alt="Current thumbnail" 
                    className={styles.previewImage}
                  />
                </div>
              )}
              
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleFileChange}
                className={styles.fileInput}
                accept="image/*"
              />
              
              {/* New thumbnail preview */}
              {thumbnail && (
                <div className={styles.thumbnailPreview}>
                  <p>Ảnh mới:</p>
                  <img 
                    src={URL.createObjectURL(thumbnail)} 
                    alt="New thumbnail preview" 
                    className={styles.previewImage}
                  />
                </div>
              )}
              
              {errors.thumbnail && <p className={styles.errorMessage}>{errors.thumbnail}</p>}
            </div>

            {/* Featured */}
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <label htmlFor="featured" className={styles.checkboxLabel}>
                Tin tức nổi bật
              </label>
            </div>
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
              {loading ? 'Đang cập nhật...' : 'Cập nhật tin tức'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
