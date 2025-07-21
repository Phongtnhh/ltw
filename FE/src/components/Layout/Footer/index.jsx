import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            {/* About Section */}
            <div className={styles.footerSection}>
              <h3>Về Chúng Tôi</h3>
              <div className={styles.footerLinks}>
                <Link to="/about" className={styles.footerLink}>
                  Giới thiệu
                </Link>
                <Link to="/about" className={styles.footerLink}>
                  Sứ mệnh & Tầm nhìn
                </Link>
                <Link to="/about" className={styles.footerLink}>
                  Lịch sử phát triển
                </Link>
                <Link to="/about" className={styles.footerLink}>
                  Đội ngũ lãnh đạo
                </Link>
              </div>
            </div>

            {/* Services Section */}
            <div className={styles.footerSection}>
              <h3>Dịch Vụ</h3>
              <div className={styles.footerLinks}>
                <Link to="/services/online" className={styles.footerLink}>
                  Dịch vụ trực tuyến
                </Link>
                <Link to="/services" className={styles.footerLink}>
                  Thủ tục hành chính
                </Link>
                <Link to="/documents" className={styles.footerLink}>
                  Văn bản pháp luật
                </Link>
                <Link to="/services/support" className={styles.footerLink}>
                  Hỗ trợ kỹ thuật
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div className={styles.footerSection}>
              <h3>Hỗ Trợ</h3>
              <div className={styles.footerLinks}>
                <Link to="/services/faq" className={styles.footerLink}>
                  Câu hỏi thường gặp
                </Link>
                <Link to="/services/support" className={styles.footerLink}>
                  Hướng dẫn sử dụng
                </Link>
                <Link to="/services/feedback" className={styles.footerLink}>
                  Góp ý kiến
                </Link>
                <Link to="/contact" className={styles.footerLink}>
                  Liên hệ
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.footerSection}>
              <h3>Liên Hệ</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span>123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>(028) 1234 5678</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>✉️</span>
                  <span>info@congthongtin.gov.vn</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🕒</span>
                  <span>T2-T6: 8:00-17:00, T7: 8:00-12:00</span>
                </div>
              </div>

              {/* Social Links */}
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  📘
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  🐦
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  📺
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  💼
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomLinks}>
            <Link to="/privacy" className={styles.bottomLink}>
              Chính sách bảo mật
            </Link>
            <Link to="/terms" className={styles.bottomLink}>
              Điều khoản sử dụng
            </Link>
            <Link to="/sitemap" className={styles.bottomLink}>
              Sơ đồ trang web
            </Link>
            <Link to="/accessibility" className={styles.bottomLink}>
              Hỗ trợ tiếp cận
            </Link>
          </div>
          
          <div className={styles.copyright}>
            © 2024 THE GANG. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
