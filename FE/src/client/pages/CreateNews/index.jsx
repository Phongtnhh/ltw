import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { newsAPI } from '../../../shared/services/api';
import styles from './CreateNews.module.css';

const CreateNews = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    contentHtml: '',
    author: user?.fullName || '',
    status: 'published'
  });
  
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect nếu chưa đăng nhập
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          thumbnail: 'Vui lòng chọn file hình ảnh'
        }));
        return;
      }
      
      // Kiểm tra kích thước file (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          thumbnail: 'Kích thước file không được vượt quá 5MB'
        }));
        return;
      }
      
      setThumbnail(file);
      
      // Tạo preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Xóa lỗi
      if (errors.thumbnail) {
        setErrors(prev => ({
          ...prev,
          thumbnail: ''
        }));
      }
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
      formDataToSend.append('title', formData.title);
      formDataToSend.append('contentHtml', formData.contentHtml);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('status', formData.status);
      
      if (thumbnail) {
        formDataToSend.append('thumbnail', thumbnail);
      }
      
      const data = await newsAPI.createNews(formDataToSend);

      if (data.success) {
        alert('Tạo bài viết thành công!');
        navigate('/news');
      } else {
        setErrors({ submit: data.message || 'Có lỗi xảy ra khi tạo bài viết' });
      }
    } catch (error) {
      console.error('Error creating news:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi tạo bài viết' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/news');
  };

  if (!isAuthenticated) {
    return null; // hoặc loading spinner
  }

  return (
    <div className={styles.createNewsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tạo Bài Viết Mới</h1>
          <p className={styles.subtitle}>Tạo và chia sẻ tin tức mới với cộng đồng</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Tiêu đề */}
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
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              placeholder="Nhập tiêu đề bài viết..."
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          {/* Tác giả */}
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
              className={`${styles.input} ${errors.author ? styles.inputError : ''}`}
              placeholder="Nhập tên tác giả..."
            />
            {errors.author && <span className={styles.errorText}>{errors.author}</span>}
          </div>

          {/* Ảnh thumbnail */}
          <div className={styles.formGroup}>
            <label htmlFor="thumbnail" className={styles.label}>
              Ảnh đại diện
            </label>
            <div className={styles.thumbnailUpload}>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className={styles.fileInput}
              />
              <label htmlFor="thumbnail" className={styles.fileLabel}>
                {thumbnailPreview ? 'Thay đổi ảnh' : 'Chọn ảnh đại diện'}
              </label>
              {thumbnailPreview && (
                <div className={styles.thumbnailPreview}>
                  <img src={thumbnailPreview} alt="Preview" className={styles.previewImage} />
                </div>
              )}
            </div>
            {errors.thumbnail && <span className={styles.errorText}>{errors.thumbnail}</span>}
          </div>

          {/* Nội dung */}
          <div className={styles.formGroup}>
            <label htmlFor="contentHtml" className={styles.label}>
              Nội dung <span className={styles.required}>*</span>
            </label>
            <textarea
              id="contentHtml"
              name="contentHtml"
              value={formData.contentHtml}
              onChange={handleInputChange}
              className={`${styles.textarea} ${errors.contentHtml ? styles.inputError : ''}`}
              placeholder="Nhập nội dung bài viết..."
              rows={10}
            />
            {errors.contentHtml && <span className={styles.errorText}>{errors.contentHtml}</span>}
          </div>

          {/* Trạng thái */}
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
              <option value="published">Xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>

          {/* Lỗi submit */}
          {errors.submit && (
            <div className={styles.submitError}>
              {errors.submit}
            </div>
          )}

          {/* Buttons */}
          <div className={styles.buttonGroup}>
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
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Đang tạo...' : 'Tạo bài viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
