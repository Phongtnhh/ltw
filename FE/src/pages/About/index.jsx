import React from 'react';
import styles from './About.module.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Nguyễn Văn A',
      position: 'Giám đốc',
      image: 'https://via.placeholder.com/150',
      description: 'Có hơn 15 năm kinh nghiệm trong lĩnh vực quản lý công'
    },
    {
      name: 'Trần Thị B',
      position: 'Phó Giám đốc',
      image: 'https://via.placeholder.com/150',
      description: 'Chuyên gia về công nghệ thông tin và chuyển đổi số'
    },
    {
      name: 'Lê Văn C',
      position: 'Trưởng phòng IT',
      image: 'https://via.placeholder.com/150',
      description: 'Kỹ sư phần mềm với 10 năm kinh nghiệm phát triển hệ thống'
    },
    {
      name: 'Phạm Thị D',
      position: 'Trưởng phòng Dịch vụ',
      image: 'https://via.placeholder.com/150',
      description: 'Chuyên gia về quy trình và cải tiến dịch vụ công'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Thành lập Cổng thông tin',
      description: 'Ra mắt phiên bản đầu tiên của cổng thông tin điện tử'
    },
    {
      year: '2021',
      title: 'Triển khai dịch vụ trực tuyến',
      description: 'Đưa vào hoạt động 50+ dịch vụ công trực tuyến đầu tiên'
    },
    {
      year: '2022',
      title: 'Tích hợp hệ thống',
      description: 'Kết nối với các hệ thống quốc gia và địa phương'
    },
    {
      year: '2023',
      title: 'Chuyển đổi số toàn diện',
      description: 'Hoàn thành số hóa 90% thủ tục hành chính'
    },
    {
      year: '2024',
      title: 'Nâng cấp hệ thống',
      description: 'Triển khai AI và công nghệ mới để cải thiện trải nghiệm người dùng'
    }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Giới Thiệu</h1>
          <p className={styles.pageSubtitle}>Tìm hiểu về sứ mệnh và tầm nhìn của chúng tôi</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container mx-auto px-4">
          <h2 className={styles.heroTitle}>Cổng Thông Tin Điện Tử</h2>
          <p className={styles.heroDescription}>
            Chúng tôi cam kết xây dựng một cổng thông tin hiện đại, minh bạch và hiệu quả, 
            phục vụ tốt nhất nhu cầu của người dân và doanh nghiệp trong thời đại số.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionVision}>
        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>🎯</div>
            <h3 className={styles.mvTitle}>Sứ Mệnh</h3>
            <p className={styles.mvDescription}>
              Cung cấp dịch vụ công trực tuyến chất lượng cao, minh bạch và tiện lợi, 
              góp phần xây dựng chính quyền điện tử hiệu quả, phục vụ người dân và 
              doanh nghiệp một cách tốt nhất.
            </p>
          </div>
          
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>🔮</div>
            <h3 className={styles.mvTitle}>Tầm Nhìn</h3>
            <p className={styles.mvDescription}>
              Trở thành cổng thông tin điện tử hàng đầu, tiên phong trong việc ứng dụng 
              công nghệ mới, tạo ra trải nghiệm số tuyệt vời cho mọi người dân và 
              doanh nghiệp.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.coreValues}>
        <div className="container mx-auto px-4">
          <h2 className={styles.sectionTitle}>Giá Trị Cốt Lõi</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>
                <span>🤝</span>
              </div>
              <h3 className={styles.valueTitle}>Minh Bạch</h3>
              <p className={styles.valueDescription}>
                Cung cấp thông tin rõ ràng, chính xác và dễ tiếp cận
              </p>
            </div>
            
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>
                <span>⚡</span>
              </div>
              <h3 className={styles.valueTitle}>Hiệu Quả</h3>
              <p className={styles.valueDescription}>
                Tối ưu hóa quy trình, tiết kiệm thời gian và chi phí
              </p>
            </div>
            
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>
                <span>🔒</span>
              </div>
              <h3 className={styles.valueTitle}>Bảo Mật</h3>
              <p className={styles.valueDescription}>
                Đảm bảo an toàn thông tin và dữ liệu cá nhân
              </p>
            </div>
            
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>
                <span>💡</span>
              </div>
              <h3 className={styles.valueTitle}>Đổi Mới</h3>
              <p className={styles.valueDescription}>
                Không ngừng cải tiến và ứng dụng công nghệ mới
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className="container mx-auto px-4">
          <h2 className={styles.sectionTitle}>Lịch Sử Phát Triển</h2>
          <div className={styles.timelineContainer}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>
                  {milestone.year}
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDescription}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.team}>
        <div className="container mx-auto px-4">
          <h2 className={styles.sectionTitle}>Đội Ngũ Lãnh Đạo</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.memberImage}
                />
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberPosition}>{member.position}</p>
                <p className={styles.memberDescription}>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className={styles.statistics}>
        <div className="container mx-auto px-4">
          <h2 className={styles.sectionTitle}>Thành Tựu Đạt Được</h2>
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Dịch vụ trực tuyến</div>
            </div>
            <div>
              <div className={styles.statNumber}>1M+</div>
              <div className={styles.statLabel}>Người dùng</div>
            </div>
            <div>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Thời gian hoạt động</div>
            </div>
            <div>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Hỗ trợ liên tục</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.contactCta}>
        <div className="container mx-auto px-4">
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Liên Hệ Với Chúng Tôi</h2>
            <p className={styles.ctaDescription}>
              Bạn có câu hỏi hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng lắng nghe và giúp đỡ.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/contact" className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
                Liên hệ ngay
              </a>
              <a href="/services" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
                Xem dịch vụ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
