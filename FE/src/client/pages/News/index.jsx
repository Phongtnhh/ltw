import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../../shared/contexts/AuthContext';
import { newsAPI } from '../../../shared/services/api';
import styles from './News.module.css';

const News = () => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Giá trị hiển thị trong input
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

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
        setLoading(true);

        // Tạo tham số cho API
        const params = {
          page: currentPage,
          ...(searchTerm && { search: searchTerm }),
          ...(selectedCategory !== 'all' && { category: selectedCategory })
        };

        const data = await newsAPI.getAllNews(params);

        // Gắn domain cho thumbnail
        const formattedNews = data.News.map((item) => ({
          ...item,
          thumbnail: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${item.thumbnail}`
        }));

        setNewsData(formattedNews);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Lỗi khi tải tin tức:', error);
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentPage, searchTerm, selectedCategory]);

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value); // Cập nhật giá trị hiển thị ngay lập tức

    // Clear timeout cũ
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Đặt timeout mới để debounce
    const newTimeout = setTimeout(() => {
      setSearchTerm(value);
      setCurrentPage(1); // Reset về trang đầu khi thay đổi từ khóa
    }, 500); // Đợi 500ms sau khi user ngừng gõ

    setSearchTimeout(newTimeout);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi category
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchInput('');
    setCurrentPage(1);
  };

  const featuredNews = newsData.find((news) => news.featured);
  const regularNews = newsData.filter((news) => !news.featured);

  // const handleCreateNews = () => {
  //   if (!isAuthenticated) {
  //     alert('Vui lòng đăng nhập để tạo bài viết mới');
  //     navigate('/login');
  //   } else {
  //     navigate('/news/create');
  //   }
  // };

  return (
    <div className={styles.newsPage}>
      {/* Header */}
      {/* <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Tin Tức</h1>
          <p className={styles.pageSubtitle}>Cập nhật thông tin mới nhất từ cổng thông tin</p>
          <button className={styles.createNewsBtn} onClick={handleCreateNews}>
            Tạo bài viết mới
          </button>
        </div>
      </div> */}

      <div className={styles.mainContent}>
        {/* Content */}
        <div className={styles.contentArea}>
          {/* Thanh tìm kiếm và bộ lọc */}
          <div className={styles.searchAndFilter}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputGroup}>
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className={styles.searchInput}
                />
                <div className={styles.searchButtons}>
                  {searchInput && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className={styles.clearButton}
                      title="Xóa tìm kiếm"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  <button type="submit" className={styles.searchButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            {/* Bộ lọc danh mục */}
            <div className={styles.categoryFilter}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${styles.categoryBtn} ${
                    selectedCategory === category.id ? styles.active : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Hiển thị trạng thái loading */}
          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Đang tải...</p>
            </div>
          )}

          {/* Hiển thị kết quả tìm kiếm */}
          {searchTerm && !loading && (
            <div className={styles.searchResults}>
              <p>Kết quả tìm kiếm cho: <strong>"{searchTerm}"</strong></p>
              {newsData.length === 0 && (
                <p className={styles.noResults}>Không tìm thấy bài viết nào phù hợp.</p>
              )}
            </div>
          )}
          {/* Tin nổi bật */}
          {featuredNews && selectedCategory === 'all' && !searchTerm && (
            <div className={styles.featuredSection}>
              <h2 className={styles.featuredTitle}>Tin Nổi Bật</h2>
              <article className={styles.featuredCard}>
                <img src={featuredNews.thumbnail} alt={featuredNews.title} />
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



          {/* Danh sách tin tức */}
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

          {/* Phân trang */}
          <div className={styles.pagination}>
            <div className={styles.paginationButtons}>
              <button
                className={styles.paginationBtn}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ← Trước
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${styles.paginationBtn} ${
                    currentPage === index + 1 ? styles.active : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={styles.paginationBtn}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Tin phổ biến */}
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
