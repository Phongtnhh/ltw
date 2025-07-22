import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import styles from './Detailnews.module.css';

const Detailnews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = {
    'announcement': 'Thông báo',
    'policy': 'Chính sách',
    'service': 'Dịch vụ',
    'event': 'Sự kiện'
  };

  useEffect(() => {
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/news/${id}`);
      const json = await res.json();

      if (res.ok && json.success && json.data) {
        const formattedNews = {
          ...json.data,
          thumbnail: `http://localhost:3000${json.data.thumbnail}`
        };
        setNews(formattedNews);
      } else {
        setError('Không tìm thấy tin tức');
      }
    } catch {
      setError('Đã xảy ra lỗi khi tải tin tức');
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchNews();
  }
}, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Đang tải tin tức...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className={styles.error}>
        <h2>Lỗi</h2>
        <p>{error || 'Không tìm thấy tin tức'}</p>
        <Link to="/news" className={styles.backButton}>
          ← Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link to="/" className={styles.breadcrumbLink}>Trang chủ</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link to="/news" className={styles.breadcrumbLink}>Tin tức</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Chi tiết</span>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Article */}
          <article className={styles.article}>  
            <header className={styles.articleHeader}>
              {/* <div className={styles.categoryTag}>
                {categories[news.category] || news.category}
              </div> */}
              <h1 className={styles.articleTitle}>{news.title}</h1>

              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Ngày đăng:</span>
                  <span className={styles.metaValue}>
                    {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Tác giả:</span>
                  <span className={styles.metaValue}>{news.author}</span>
                </div>
              </div>
            </header>

            {news.thumbnail && (
              <div className={styles.articleImage}>
                <img src={news.thumbnail} alt={news.title} />
              </div>
            )}

            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: news.contentHtml }}
            />

            {news.tags && news.tags.length > 0 && (
              <div className={styles.articleTags}>
                <span className={styles.tagsLabel}>Tags:</span>
                {news.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Navigation */}
          <div className={styles.articleNavigation}>
            <Link to="/news" className={styles.backButton}>
              ← Quay lại danh sách tin tức
            </Link>
          </div>
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Tin tức khác</h3>
            <p>Đang phát triển...</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Detailnews;
