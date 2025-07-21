import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './Detailnews.module.css';

const Detailnews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in real app, this would come from API
  const newsData = [
    {
      id: 1,
      title: 'Thông báo về việc triển khai dịch vụ công trực tuyến mới',
      content: `
        <p>Từ ngày 20/07/2024, hệ thống sẽ triển khai các dịch vụ công trực tuyến mới nhằm phục vụ người dân tốt hơn.</p>

        <h3>Các dịch vụ mới bao gồm:</h3>
        <ul>
          <li>Dịch vụ đăng ký kinh doanh trực tuyến</li>
          <li>Dịch vụ cấp giấy phép xây dựng</li>
          <li>Dịch vụ đăng ký kết hôn</li>
          <li>Dịch vụ cấp hộ chiếu</li>
        </ul>

        <h3>Lợi ích của dịch vụ mới:</h3>
        <p>Việc triển khai các dịch vụ công trực tuyến mới sẽ mang lại nhiều lợi ích cho người dân:</p>
        <ul>
          <li>Tiết kiệm thời gian và chi phí đi lại</li>
          <li>Thủ tục đơn giản, minh bạch</li>
          <li>Có thể thực hiện 24/7</li>
          <li>Theo dõi tiến độ xử lý trực tuyến</li>
        </ul>

        <p>Để sử dụng các dịch vụ này, người dân cần đăng ký tài khoản trên hệ thống và cung cấp đầy đủ thông tin cá nhân.</p>
      `,
      date: '15/07/2024',
      category: 'announcement',
      image: 'https://via.placeholder.com/800x400',
      author: 'Ban Biên Tập',
      views: 1250,
      tags: ['dịch vụ công', 'trực tuyến', 'chính phủ điện tử']
    },
    {
      id: 2,
      title: 'Hướng dẫn sử dụng dịch vụ công trực tuyến',
      content: `
        <p>Để giúp người dân sử dụng dịch vụ công trực tuyến một cách hiệu quả, chúng tôi cung cấp hướng dẫn chi tiết.</p>

        <h3>Bước 1: Đăng ký tài khoản</h3>
        <p>Truy cập vào trang web chính thức và click vào nút "Đăng ký". Điền đầy đủ thông tin cá nhân và xác thực email.</p>

        <h3>Bước 2: Đăng nhập hệ thống</h3>
        <p>Sử dụng email và mật khẩu đã đăng ký để đăng nhập vào hệ thống.</p>

        <h3>Bước 3: Chọn dịch vụ</h3>
        <p>Từ menu chính, chọn dịch vụ mà bạn muốn sử dụng.</p>

        <h3>Bước 4: Điền thông tin</h3>
        <p>Điền đầy đủ thông tin theo yêu cầu và tải lên các tài liệu cần thiết.</p>

        <h3>Bước 5: Thanh toán (nếu có)</h3>
        <p>Thực hiện thanh toán lệ phí trực tuyến qua các phương thức được hỗ trợ.</p>

        <h3>Bước 6: Theo dõi tiến độ</h3>
        <p>Theo dõi tiến độ xử lý hồ sơ trong mục "Hồ sơ của tôi".</p>
      `,
      date: '14/07/2024',
      category: 'service',
      image: 'https://via.placeholder.com/800x400',
      author: 'Phòng Hỗ Trợ Kỹ Thuật',
      views: 890,
      tags: ['hướng dẫn', 'dịch vụ công', 'sử dụng']
    },
    // Add more mock data as needed...
  ];

  const categories = {
    'announcement': 'Thông báo',
    'policy': 'Chính sách',
    'service': 'Dịch vụ',
    'event': 'Sự kiện'
  };

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true);
      try {
        // In real app, this would be an API call
        const foundNews = newsData.find(item => item.id === parseInt(id));

        if (foundNews) {
          setNews(foundNews);
        } else {
          setError('Không tìm thấy tin tức');
        }
      } catch (err) {
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
              <div className={styles.categoryTag}>
                {categories[news.category] || news.category}
              </div>
              <h1 className={styles.articleTitle}>{news.title}</h1>

              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Ngày đăng:</span>
                  <span className={styles.metaValue}>{news.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Tác giả:</span>
                  <span className={styles.metaValue}>{news.author}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Lượt xem:</span>
                  <span className={styles.metaValue}>{news.views}</span>
                </div>
              </div>
            </header>

            {news.image && (
              <div className={styles.articleImage}>
                <img src={news.image} alt={news.title} />
              </div>
            )}

            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {news.tags && (
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

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Tin tức liên quan</h3>
            <div className={styles.relatedNews}>
              {newsData
                .filter(item => item.id !== news.id && item.category === news.category)
                .slice(0, 3)
                .map(relatedNews => (
                  <div key={relatedNews.id} className={styles.relatedItem}>
                    <Link to={`/news/${relatedNews.id}`} className={styles.relatedLink}>
                      <img
                        src={relatedNews.image}
                        alt={relatedNews.title}
                        className={styles.relatedImage}
                      />
                      <div className={styles.relatedContent}>
                        <h4 className={styles.relatedTitle}>
                          {relatedNews.title}
                        </h4>
                        <p className={styles.relatedDate}>{relatedNews.date}</p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Detailnews;
