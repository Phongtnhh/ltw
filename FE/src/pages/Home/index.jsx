import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container mx-auto px-4">
          <h1 className={styles.heroTitle}>
            Welcome to the GANG
          </h1>
          <p className={styles.heroSubtitle}>
            Nơi cung cấp thông tin chính thức, dịch vụ công trực tuyến và hỗ trợ người dân
          </p>
          <div className={styles.heroButtons}>
            <Link to="/services" className={styles.primaryButton}>
              Dịch Vụ Công
            </Link>
            <Link to="/news" className={styles.secondaryButton}>
              Tin Tức Mới
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className={styles.quickServices}>
        <div className="container mx-auto px-4">
          <h2 className={styles.sectionTitle}>Dịch Vụ Nhanh</h2>
          <div className={styles.servicesGrid}>
            <Link to="/documents" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📄</div>
              <h3 className={styles.serviceTitle}>Văn Bản Pháp Luật</h3>
              <p className={styles.serviceDescription}>Tra cứu các văn bản pháp luật mới nhất</p>
            </Link>
            
            <Link to="/services/support" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎧</div>
              <h3 className={styles.serviceTitle}>Hỗ Trợ Kỹ Thuật</h3>
              <p className={styles.serviceDescription}>Được hỗ trợ 24/7 khi cần thiết</p>
            </Link>
            
            <Link to="/services/feedback" className={styles.serviceCard}>
              <div className={styles.serviceIcon}>💬</div>
              <h3 className={styles.serviceTitle}>Góp Ý Kiến</h3>
              <p className={styles.serviceDescription}>Đóng góp ý kiến để cải thiện dịch vụ</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className={styles.latestNews}>
        <div className="container mx-auto px-4">
          <div className={styles.newsHeader}>
            <h2 className={styles.sectionTitle}>Tin Tức Mới Nhất</h2>
            <Link to="/news" className={styles.viewAllLink}>
              Xem tất cả →
            </Link>
          </div>
          <div className={styles.newsGrid}>
            <article className={styles.newsCard}>
              <img src="https://via.placeholder.com/400x200" alt="News" className={styles.newsImage} />
              <div className={styles.newsContent}>
                <span className={styles.newsDate}>15/07/2024</span>
                <h3 className={styles.newsTitle}>Thông báo về việc triển khai dịch vụ công trực tuyến mới</h3>
                <p className={styles.newsExcerpt}>Từ ngày 20/07/2024, hệ thống sẽ triển khai các dịch vụ công trực tuyến mới nhằm phục vụ người dân tốt hơn...</p>
              </div>
            </article>
            
            <article className={styles.newsCard}>
              <img src="https://via.placeholder.com/400x200" alt="News" className={styles.newsImage} />
              <div className={styles.newsContent}>
                <span className={styles.newsDate}>14/07/2024</span>
                <h3 className={styles.newsTitle}>Hướng dẫn sử dụng dịch vụ công trực tuyến</h3>
                <p className={styles.newsExcerpt}>Để giúp người dân sử dụng dịch vụ công trực tuyến một cách hiệu quả, chúng tôi cung cấp hướng dẫn chi tiết...</p>
              </div>
            </article>
            
            <article className={styles.newsCard}>
              <img src="https://via.placeholder.com/400x200" alt="News" className={styles.newsImage} />
              <div className={styles.newsContent}>
                <span className={styles.newsDate}>13/07/2024</span>
                <h3 className={styles.newsTitle}>Cập nhật danh sách thủ tục hành chính</h3>
                <p className={styles.newsExcerpt}>Danh sách các thủ tục hành chính đã được cập nhật với nhiều thay đổi quan trọng...</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className={styles.statistics}>
        <div className="container mx-auto px-4">
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statNumber}>1,234</div>
              <div className={styles.statLabel}>Dịch vụ trực tuyến</div>
            </div>
            <div>
              <div className={styles.statNumber}>56,789</div>
              <div className={styles.statLabel}>Người dùng đã đăng ký</div>
            </div>
            <div>
              <div className={styles.statNumber}>98.5%</div>
              <div className={styles.statLabel}>Tỷ lệ hài lòng</div>
            </div>
            <div>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Hỗ trợ liên tục</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
