import React, { useState } from 'react';
import styles from './OnlineServices.module.css';

const OnlineServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const onlineServices = [
    {
      id: 1,
      title: 'Đăng ký kinh doanh',
      description: 'Thực hiện thủ tục đăng ký kinh doanh hoàn toàn trực tuyến',
      icon: '🏢',
      status: 'available',
      steps: [
        'Đăng nhập hệ thống',
        'Điền thông tin doanh nghiệp',
        'Tải lên giấy tờ cần thiết',
        'Thanh toán phí',
        'Nhận kết quả'
      ]
    },
    {
      id: 2,
      title: 'Khai báo thuế',
      description: 'Khai báo và nộp thuế trực tuyến cho cá nhân và doanh nghiệp',
      icon: '💰',
      status: 'available',
      steps: [
        'Đăng nhập với mã số thuế',
        'Chọn loại tờ khai',
        'Nhập thông tin khai báo',
        'Kiểm tra và xác nhận',
        'Nộp thuế điện tử'
      ]
    },
    {
      id: 3,
      title: 'Đăng ký xe',
      description: 'Đăng ký biển số xe máy và ô tô trực tuyến',
      icon: '🚗',
      status: 'available',
      steps: [
        'Chuẩn bị hồ sơ',
        'Đăng ký trực tuyến',
        'Thanh toán phí',
        'Đặt lịch nhận biển',
        'Nhận biển số'
      ]
    },
    {
      id: 4,
      title: 'Cấp giấy phép lao động',
      description: 'Xin cấp giấy phép lao động cho người nước ngoài',
      icon: '👷',
      status: 'maintenance',
      steps: []
    }
  ];

  return (
    <div className={styles.onlineServicesPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Dịch Vụ Trực Tuyến</h1>
          <p className={styles.pageSubtitle}>Thực hiện các thủ tục hành chính một cách nhanh chóng và tiện lợi</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Services List */}
        <div className={styles.servicesArea}>
          <div className={styles.servicesGrid}>
            {onlineServices.map(service => (
              <div 
                key={service.id} 
                className={`${styles.serviceCard} ${
                  selectedService?.id === service.id ? styles.selected : ''
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <div className={styles.statusBadge}>
                      <span className={
                        service.status === 'available' 
                          ? styles.statusAvailable 
                          : styles.statusMaintenance
                      }>
                        {service.status === 'available' ? 'Hoạt động' : 'Bảo trì'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={styles.cardDescription}>{service.description}</p>
                
                <button 
                  className={`${styles.actionButton} ${
                    service.status === 'available'
                      ? styles.actionAvailable
                      : styles.actionDisabled
                  }`}
                  disabled={service.status !== 'available'}
                >
                  {service.status === 'available' ? 'Thực hiện ngay' : 'Đang bảo trì'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details */}
        <div className={styles.serviceDetails}>
          {selectedService ? (
            <div className={styles.detailsCard}>
              <div className={styles.detailsHeader}>
                <span className={styles.serviceIcon}>{selectedService.icon}</span>
                <h3 className={styles.detailsTitle}>{selectedService.title}</h3>
              </div>
              
              <p className={styles.detailsDescription}>{selectedService.description}</p>
              
              {selectedService.steps.length > 0 && (
                <>
                  <h4 className={styles.stepsTitle}>Các bước thực hiện:</h4>
                  <div className={styles.stepsList}>
                    {selectedService.steps.map((step, index) => (
                      <div key={index} className={styles.stepItem}>
                        <span className={styles.stepNumber}>
                          {index + 1}
                        </span>
                        <span className={styles.stepText}>{step}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={styles.startButton}>
                    Bắt đầu thực hiện
                  </button>
                </>
              )}
              
              {selectedService.status === 'maintenance' && (
                <div className={styles.maintenanceAlert}>
                  <div className={styles.alertHeader}>
                    <span>⚠️</span>
                    <h4 className={styles.alertTitle}>Đang bảo trì</h4>
                  </div>
                  <p className={styles.alertDescription}>
                    Dịch vụ này hiện đang được bảo trì. Vui lòng thử lại sau.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📋</span>
              <h3 className={styles.emptyTitle}>Chọn một dịch vụ</h3>
              <p className={styles.emptyDescription}>Chọn một dịch vụ để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className={styles.helpSection}>
        <div className="container mx-auto px-4">
          <h2 className={styles.helpTitle}>Cần Hỗ Trợ?</h2>
          <p className={styles.helpDescription}>
            Nếu bạn gặp khó khăn trong việc sử dụng dịch vụ trực tuyến, chúng tôi sẵn sàng hỗ trợ
          </p>
          <div className={styles.helpButtons}>
            <button className={`${styles.helpButton} ${styles.helpPrimary}`}>
              <span>💬</span>
              <span>Chat trực tuyến</span>
            </button>
            <button className={`${styles.helpButton} ${styles.helpSecondary}`}>
              <span>📞</span>
              <span>Gọi hotline</span>
            </button>
            <button className={`${styles.helpButton} ${styles.helpTertiary}`}>
              <span>📖</span>
              <span>Hướng dẫn sử dụng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineServices;
