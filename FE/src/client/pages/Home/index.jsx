import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../../../shared/services/api';
import styles from './Home.module.css';

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        const response = await newsAPI.getLatestNews();
        if (response.success) {
          const formattedNews = response.data.map((item) => ({
            ...item,
            thumbnail: `http://localhost:3000${item.thumbnail}`
          }));
          setLatestNews(formattedNews);
        } else {
          setError('Không thể tải tin tức mới nhất');
        }
      } catch (err) {
        console.error('Error fetching latest news:', err);
        setError('Lỗi khi tải tin tức');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

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
            {loading ? (
              // Loading state
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Đang tải tin tức...</span>
              </div>
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-semibold">{error}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Thử lại
                </button>
              </div>
            ) : latestNews.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-lg font-semibold">Chưa có tin tức nào</p>
                </div>
              </div>
            ) : (
              // News articles
              latestNews.map((article) => (
                <Link
                  key={article._id}
                  to={`/news/${article._id}`}
                  className={styles.newsCard}
                >
                  <img
                    src={article.thumbnail || "https://via.placeholder.com/400x200"}
                    alt={article.title}
                    className={styles.newsImage}
                  />
                  <div className={styles.newsContent}>
                    <span className={styles.newsDate}>
                      {formatDate(article.createdAt)}
                    </span>
                    <h3 className={styles.newsTitle}>{article.title}</h3>
                    <p className={styles.newsExcerpt}>
                      {truncateText(article.description || article.content)}
                    </p>
                  </div>
                </Link>
              ))
            )}
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
