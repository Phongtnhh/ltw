import React, { useState } from 'react';
import styles from './Documents.module.css';

const Documents = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const documentTypes = [
    { id: 'all', name: 'Tất cả văn bản' },
    { id: 'law', name: 'Luật' },
    { id: 'decree', name: 'Nghị định' },
    { id: 'circular', name: 'Thông tư' },
    { id: 'decision', name: 'Quyết định' },
    { id: 'directive', name: 'Chỉ thị' }
  ];

  const documents = [
    {
      id: 1,
      title: 'Luật Công nghệ thông tin số 67/2006/QH11',
      type: 'law',
      issuer: 'Quốc hội',
      date: '29/06/2006',
      effectiveDate: '01/01/2007',
      status: 'Có hiệu lực',
      summary: 'Quy định về hoạt động công nghệ thông tin, phát triển công nghiệp công nghệ thông tin...',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Nghị định số 15/2020/NĐ-CP về dịch vụ công trực tuyến',
      type: 'decree',
      issuer: 'Chính phủ',
      date: '03/02/2020',
      effectiveDate: '01/04/2020',
      status: 'Có hiệu lực',
      summary: 'Quy định về cung cấp dịch vụ công trực tuyến, thủ tục hành chính điện tử...',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Thông tư số 01/2021/TT-BTTTT về chữ ký số',
      type: 'circular',
      issuer: 'Bộ TT&TT',
      date: '15/01/2021',
      effectiveDate: '01/03/2021',
      status: 'Có hiệu lực',
      summary: 'Hướng dẫn về việc sử dụng chữ ký số trong giao dịch điện tử...',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Quyết định số 06/2020/QĐ-TTg về Chương trình chuyển đổi số quốc gia',
      type: 'decision',
      issuer: 'Thủ tướng Chính phủ',
      date: '06/01/2020',
      effectiveDate: '06/01/2020',
      status: 'Có hiệu lực',
      summary: 'Phê duyệt Chương trình chuyển đổi số quốc gia đến năm 2025, định hướng đến năm 2030...',
      downloadUrl: '#'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeClass = (type) => {
    const classes = {
      law: styles.typeLaw,
      decree: styles.typeDecree,
      circular: styles.typeCircular,
      decision: styles.typeDecision,
      directive: styles.typeDirective
    };
    return classes[type] || '';
  };

  const getTypeName = (type) => {
    const names = {
      law: 'Luật',
      decree: 'Nghị định',
      circular: 'Thông tư',
      decision: 'Quyết định',
      directive: 'Chỉ thị'
    };
    return names[type] || type;
  };

  return (
    <div className={styles.documentsPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Văn Bản Pháp Luật</h1>
          <p className={styles.pageSubtitle}>Tra cứu và tải về các văn bản pháp luật mới nhất</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Main Content */}
        <div className={styles.contentArea}>
          {/* Search and Filter */}
          <div className={styles.searchSection}>
            <div className={styles.searchRow}>
              <input
                type="text"
                placeholder="Tìm kiếm văn bản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>Tìm kiếm</button>
            </div>
            
            <div className={styles.filterButtons}>
              {documentTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`${styles.filterBtn} ${
                    selectedType === type.id ? styles.active : ''
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Documents List */}
          <div className={styles.documentsContainer}>
            {filteredDocuments.map(doc => (
              <div key={doc.id} className={styles.documentCard}>
                <div className={styles.documentHeader}>
                  <div className={styles.documentContent}>
                    <div className={styles.documentTags}>
                      <span className={`${styles.documentType} ${getTypeClass(doc.type)}`}>
                        {getTypeName(doc.type)}
                      </span>
                      <span className={styles.statusTag}>
                        {doc.status}
                      </span>
                    </div>
                    
                    <h3 className={styles.documentTitle}>
                      {doc.title}
                    </h3>
                    
                    <p className={styles.documentSummary}>
                      {doc.summary}
                    </p>
                    
                    <div className={styles.documentDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Cơ quan ban hành:</span>
                        <span className={styles.detailValue}>{doc.issuer}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Ngày ban hành:</span>
                        <span className={styles.detailValue}>{doc.date}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Ngày hiệu lực:</span>
                        <span className={styles.detailValue}>{doc.effectiveDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.documentActions}>
                    <button className={styles.actionButton}>
                      📄 Xem
                    </button>
                    <button className={styles.secondaryButton}>
                      ⬇️ Tải về
                    </button>
                  </div>
                </div>
              </div>
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
          {/* Quick Links */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Liên Kết Nhanh</h3>
            <div className={styles.quickLinks}>
              <a href="#" className={styles.quickLink}>📋 Văn bản mới ban hành</a>
              <a href="#" className={styles.quickLink}>🔄 Văn bản được sửa đổi</a>
              <a href="#" className={styles.quickLink}>❌ Văn bản bị bãi bỏ</a>
              <a href="#" className={styles.quickLink}>📊 Thống kê văn bản</a>
            </div>
          </div>

          {/* Statistics */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Thống Kê</h3>
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Tổng văn bản:</span>
                <span className={`${styles.statValue} ${styles.statTotal}`}>1,234</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Có hiệu lực:</span>
                <span className={`${styles.statValue} ${styles.statActive}`}>1,156</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Hết hiệu lực:</span>
                <span className={`${styles.statValue} ${styles.statInactive}`}>78</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Mới nhất:</span>
                <span className={`${styles.statValue} ${styles.statRecent}`}>15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
