import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
  };

  const departments = [
    { value: '', label: 'Chọn phòng ban' },
    { value: 'it', label: 'Phòng Công nghệ thông tin' },
    { value: 'admin', label: 'Phòng Hành chính' },
    { value: 'service', label: 'Phòng Dịch vụ công' },
    { value: 'legal', label: 'Phòng Pháp chế' },
    { value: 'support', label: 'Bộ phận Hỗ trợ kỹ thuật' }
  ];

  return (
    <div className={styles.contactPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Liên Hệ</h1>
          <p className={styles.pageSubtitle}>Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Contact Information */}
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Thông Tin Liên Hệ</h2>
            
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>📍</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Địa chỉ</h3>
                  <p>
                    123 Đường ABC, Phường XYZ<br />
                    Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>📞</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Điện thoại</h3>
                  <p>
                    Tổng đài: (028) 1234 5678<br />
                    Hotline: 1900 1234
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>✉️</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Email</h3>
                  <p>
                    info@congthongtin.gov.vn<br />
                    support@congthongtin.gov.vn
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>🕒</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Giờ làm việc</h3>
                  <p>
                    Thứ 2 - Thứ 6: 8:00 - 17:00<br />
                    Thứ 7: 8:00 - 12:00<br />
                    Chủ nhật: Nghỉ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Hỗ Trợ Nhanh</h2>
            <div className={styles.quickSupport}>
              <button className={`${styles.supportButton} ${styles.supportPrimary}`}>
                <span>💬</span>
                <span>Chat trực tuyến</span>
              </button>
              <button className={`${styles.supportButton} ${styles.supportSecondary}`}>
                <span>📞</span>
                <span>Gọi hotline</span>
              </button>
              <button className={`${styles.supportButton} ${styles.supportTertiary}`}>
                <span>❓</span>
                <span>FAQ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Gửi Tin Nhắn</h2>
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Họ và tên <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phòng ban liên quan</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Tiêu đề <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Nhập tiêu đề tin nhắn"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Nội dung <span className={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={styles.formTextarea}
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="agree"
                  required
                  className={styles.checkbox}
                />
                <label htmlFor="agree" className={styles.checkboxLabel}>
                  Tôi đồng ý với <a href="#">điều khoản sử dụng</a> và <a href="#">chính sách bảo mật</a>
                </label>
              </div>

              <button type="submit" className={styles.submitButton}>
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className="container mx-auto px-4">
          <div className={styles.mapCard}>
            <h2 className={styles.mapTitle}>Bản Đồ</h2>
            <div className={styles.mapPlaceholder}>
              <p>[Bản đồ Google Maps sẽ được tích hợp tại đây]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
