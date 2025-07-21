import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsData, setNewsData] = useState([]);

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'announcement', name: 'Thông báo' },
    { id: 'policy', name: 'Chính sách' },
    { id: 'service', name: 'Dịch vụ' },
    { id: 'event', name: 'Sự kiện' }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/news');
        const data = await response.json();
        setNewsData(data.data); 

      } catch (error) {
        console.error('Lỗi khi tải tin tức:', error);
      }
    };

    fetchNews();
  }, []);

  const filteredNews =
    selectedCategory === 'all'
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  const featuredNews = newsData.find((news) => news.featured);
  const regularNews = filteredNews.filter((news) => !news.featured);

  return (
    <div className={styles.newsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Tin Tức</h1>
          <p className={styles.pageSubtitle}>Cập nhật thông tin mới nhất từ cổng thông tin</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Main Content */}
        <div className={styles.contentArea}>
          {/* Featured News */}
          {featuredNews && selectedCategory === 'all' && (
            <div className={styles.featuredSection}>
              <h2 className={styles.featuredTitle}>Tin Nổi Bật</h2>
              <article className={styles.featuredCard}>
                <img
                  src={featuredNews.thumbnail}
                  alt={featuredNews.title}
                  className={styles.featuredImage}
                />
                <div className={styles.featuredContent}>
                  <div className={styles.categoryTags}>
                    <span className={styles.categoryTag}>
                      {categories.find((cat) => cat.id === featuredNews.category)?.name}
                    </span>
                    <span className={styles.newsDate}>
                      {new Date(featuredNews.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <h3 className={styles.featuredNewsTitle}>
                    <Link to={`/news/${featuredNews._id}`} className={styles.newsLink}>
                      {featuredNews.title}
                    </Link>
                  </h3>
                  <p className={styles.newsExcerpt}>
                    {featuredNews.excerpt || 'Xem chi tiết nội dung...'}
                  </p>
                  <Link to={`/news/${featuredNews._id}`} className={styles.readMoreBtn}>
                    Đọc thêm →
                  </Link>
                </div>
              </article>
            </div>
          )}

          {/* Category Filter */}
          <div className={styles.filterSection}>
            <div className={styles.filterButtons}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${styles.filterBtn} ${
                    selectedCategory === category.id ? styles.active : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className={styles.newsGrid}>
            {regularNews.map((news) => (
              <article key={news._id} className={styles.newsCard}>
                <img src={news.thumbnail} alt={news.title} className={styles.newsImage} />
                <div className={styles.newsContent}>
                  <div className={styles.categoryTags}>
                    <span className={styles.categoryTag}>
                      {categories.find((cat) => cat.id === news.category)?.name}
                    </span>
                    <span className={styles.newsDate}>
                      {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <h3 className={styles.newsTitle}>
                    <Link to={`/news/${news._id}`} className={styles.newsLink}>
                      {news.title}
                    </Link>
                  </h3>
                  <p className={styles.newsCardExcerpt}>
                    {news.excerpt || 'Xem chi tiết nội dung...'}
                  </p>
                  <Link to={`/news/${news._id}`} className={styles.readMoreBtn}>
                    Đọc thêm →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationButtons}>
              <button className={styles.paginationBtn}>← Trước</button>
              <button className={`${styles.paginationBtn} ${styles.active}`}>1</button>
              <button className={styles.paginationBtn}>2</button>
              <button className={styles.paginationBtn}>3</button>
              <button className={styles.paginationBtn}>Sau →</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Search */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Tìm Kiếm</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>🔍</button>
            </div>
          </div>

          {/* Popular News */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Tin Phổ Biến</h3>
            <div className={styles.popularNews}>
              {newsData.slice(0, 5).map((news) => (
                <div key={news._id} className={styles.popularItem}>
                  <img src={news.thumbnail} alt={news.title} className={styles.popularImage} />
                  <div className={styles.popularContent}>
                    <h4 className={styles.popularTitle}>
                      <Link to={`/news/${news._id}`} className={styles.newsLink}>
                        {news.title}
                      </Link>
                    </h4>
                    <p className={styles.popularDate}>
                      {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
