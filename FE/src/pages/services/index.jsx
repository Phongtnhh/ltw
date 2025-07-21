import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả dịch vụ' },
    { id: 'online', name: 'Dịch vụ trực tuyến' },
    { id: 'administrative', name: 'Thủ tục hành chính' },
    { id: 'tax', name: 'Thuế' },
    { id: 'business', name: 'Doanh nghiệp' },
    { id: 'citizen', name: 'Công dân' }
  ];

  const services = [
    {
      id: 1,
      title: 'Đăng ký kinh doanh trực tuyến',
      description: 'Thực hiện thủ tục đăng ký kinh doanh hoàn toàn trực tuyến, nhanh chóng và tiện lợi',
      category: 'business',
      type: 'online',
      time: '3-5 ngày làm việc',
      fee: 'Miễn phí',
      icon: '🏢',
      popular: true
    },
    {
      id: 2,
      title: 'Khai báo thuế điện tử',
      description: 'Khai báo và nộp thuế trực tuyến cho cá nhân và doanh nghiệp',
      category: 'tax',
      type: 'online',
      time: '24/7',
      fee: 'Miễn phí',
      icon: '💰',
      popular: true
    },
    {
      id: 3,
      title: 'Cấp giấy chứng nhận tạm trú',
      description: 'Đăng ký tạm trú cho người nước ngoài và công dân Việt Nam',
      category: 'citizen',
      type: 'administrative',
      time: '1-2 ngày làm việc',
      fee: '50,000 VNĐ',
      icon: '🏠'
    },
    {
      id: 4,
      title: 'Đăng ký kết hôn',
      description: 'Thủ tục đăng ký kết hôn cho công dân Việt Nam',
      category: 'citizen',
      type: 'administrative',
      time: '1 ngày làm việc',
      fee: '20,000 VNĐ',
      icon: '💒'
    },
    {
      id: 5,
      title: 'Cấp phép xây dựng',
      description: 'Xin phép xây dựng nhà ở và công trình dân dụng',
      category: 'citizen',
      type: 'administrative',
      time: '15-20 ngày làm việc',
      fee: 'Theo quy định',
      icon: '🏗️'
    },
    {
      id: 6,
      title: 'Đăng ký xe trực tuyến',
      description: 'Đăng ký biển số xe máy và ô tô trực tuyến',
      category: 'citizen',
      type: 'online',
      time: '2-3 ngày làm việc',
      fee: 'Theo loại xe',
      icon: '🚗'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const popularServices = services.filter(service => service.popular);

  return (
    <div className={styles.servicesPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Dịch Vụ Công</h1>
          <p className={styles.pageSubtitle}>Thực hiện các thủ tục hành chính một cách nhanh chóng và tiện lợi</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Popular Services */}
        <section className={styles.popularSection}>
          <h2 className={styles.sectionTitle}>Dịch Vụ Phổ Biến</h2>
          <div className={styles.popularGrid}>
            {popularServices.map(service => (
              <div key={service.id} className={styles.popularCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <div className={styles.cardTitleArea}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <span className={styles.popularBadge}>Phổ biến</span>
                  </div>
                </div>
                <p className={styles.cardDescription}>{service.description}</p>
                <div className={styles.cardDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Thời gian:</span>
                    <span className={styles.detailValue}>{service.time}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Phí:</span>
                    <span className={`${styles.detailValue} ${styles.feeValue}`}>{service.fee}</span>
                  </div>
                </div>
                <button className={styles.actionButton}>
                  Thực hiện ngay
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* All Services */}
        <section className={styles.allServicesSection}>
          <div className={styles.searchAndFilter}>
            <div className={styles.searchRow}>
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>Tìm kiếm</button>
            </div>
            
            <div className={styles.filterButtons}>
              {categories.map(category => (
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

          <div className={styles.servicesGrid}>
            {filteredServices.map(service => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <div className={styles.serviceInfo}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <div className={styles.serviceTags}>
                      <span className={service.type === 'online' ? styles.onlineTag : styles.offlineTag}>
                        {service.type === 'online' ? 'Trực tuyến' : 'Trực tiếp'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.cardDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Thời gian:</span>
                    <span className={styles.detailValue}>{service.time}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Phí:</span>
                    <span className={`${styles.detailValue} ${styles.feeValue}`}>{service.fee}</span>
                  </div>
                </div>
                <div className={styles.serviceActions}>
                  <button className={styles.primaryAction}>Thực hiện</button>
                  <button className={styles.secondaryAction}>Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className={styles.helpSection}>
          <h2 className={styles.helpTitle}>Cần Hỗ Trợ?</h2>
          <p className={styles.helpDescription}>
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc thực hiện các thủ tục hành chính
          </p>
          <div className={styles.helpButtons}>
            <Link to="/contact" className={`${styles.helpButton} ${styles.helpPrimary}`}>
              Liên hệ hỗ trợ
            </Link>
            <Link to="/services/faq" className={`${styles.helpButton} ${styles.helpSecondary}`}>
              Câu hỏi thường gặp
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
