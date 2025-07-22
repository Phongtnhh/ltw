const mongoose = require('mongoose');
const News = require('../model/News.model');

// Kết nối database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ltw', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Dữ liệu tin tức mẫu
const sampleNews = [
  {
    title: 'Thông báo về việc triển khai dịch vụ công trực tuyến mới',
    contentHtml: `
      <p>Từ ngày 20/07/2024, hệ thống sẽ triển khai các dịch vụ công trực tuyến mới nhằm phục vụ người dân tốt hơn.</p>
      <h3>Các dịch vụ mới bao gồm:</h3>
      <ul>
        <li>Dịch vụ đăng ký kinh doanh trực tuyến</li>
        <li>Dịch vụ cấp giấy phép xây dựng</li>
        <li>Dịch vụ đăng ký kết hôn</li>
        <li>Dịch vụ cấp hộ chiếu</li>
      </ul>
      <p>Người dân có thể truy cập vào hệ thống để sử dụng các dịch vụ này một cách thuận tiện và nhanh chóng.</p>
    `,
    author: 'Ban Quản Lý Hệ Thống',
    thumbnail: 'https://via.placeholder.com/400x200/667eea/ffffff?text=Dịch+vụ+công+trực+tuyến',
    status: 'published',
    category: 'announcement',
    excerpt: 'Hệ thống triển khai các dịch vụ công trực tuyến mới để phục vụ người dân tốt hơn từ ngày 20/07/2024.',
    featured: true
  },
  {
    title: 'Hướng dẫn sử dụng dịch vụ đăng ký kinh doanh online',
    contentHtml: `
      <p>Để đăng ký kinh doanh trực tuyến, người dân cần thực hiện các bước sau:</p>
      <ol>
        <li>Truy cập vào hệ thống dịch vụ công</li>
        <li>Chọn dịch vụ "Đăng ký kinh doanh"</li>
        <li>Điền đầy đủ thông tin theo yêu cầu</li>
        <li>Tải lên các giấy tờ cần thiết</li>
        <li>Thanh toán phí dịch vụ</li>
        <li>Chờ xử lý và nhận kết quả</li>
      </ol>
      <p>Thời gian xử lý: 3-5 ngày làm việc</p>
    `,
    author: 'Phòng Đăng Ký Kinh Doanh',
    thumbnail: 'https://via.placeholder.com/400x200/28a745/ffffff?text=Đăng+ký+kinh+doanh',
    status: 'published',
    category: 'service',
    excerpt: 'Hướng dẫn chi tiết các bước đăng ký kinh doanh trực tuyến một cách nhanh chóng và thuận tiện.',
    featured: false
  },
  {
    title: 'Chính sách mới về thuế doanh nghiệp năm 2024',
    contentHtml: `
      <p>Chính phủ đã ban hành chính sách thuế mới áp dụng từ năm 2024:</p>
      <h3>Những thay đổi chính:</h3>
      <ul>
        <li>Giảm thuế suất cho doanh nghiệp nhỏ và vừa</li>
        <li>Ưu đãi thuế cho các dự án công nghệ cao</li>
        <li>Đơn giản hóa thủ tục khai thuế</li>
        <li>Tăng cường hỗ trợ doanh nghiệp khởi nghiệp</li>
      </ul>
      <p>Các doanh nghiệp cần cập nhật thông tin để được hưởng các ưu đãi mới.</p>
    `,
    author: 'Cục Thuế',
    thumbnail: 'https://via.placeholder.com/400x200/dc3545/ffffff?text=Chính+sách+thuế',
    status: 'published',
    category: 'policy',
    excerpt: 'Chính phủ ban hành chính sách thuế mới với nhiều ưu đãi cho doanh nghiệp từ năm 2024.',
    featured: false
  },
  {
    title: 'Sự kiện: Hội thảo "Chuyển đổi số trong quản lý nhà nước"',
    contentHtml: `
      <p>Sở Thông tin và Truyền thông tổ chức hội thảo về chuyển đổi số:</p>
      <h3>Thông tin sự kiện:</h3>
      <ul>
        <li><strong>Thời gian:</strong> 8:00 - 17:00, ngày 25/07/2024</li>
        <li><strong>Địa điểm:</strong> Trung tâm Hội nghị Quốc gia</li>
        <li><strong>Đối tượng:</strong> Cán bộ, công chức các cơ quan nhà nước</li>
        <li><strong>Nội dung:</strong> Chia sẻ kinh nghiệm, giải pháp chuyển đổi số</li>
      </ul>
      <p>Đăng ký tham gia qua email: dangky@stttt.gov.vn</p>
    `,
    author: 'Sở Thông tin và Truyền thông',
    thumbnail: 'https://via.placeholder.com/400x200/6f42c1/ffffff?text=Hội+thảo+chuyển+đổi+số',
    status: 'published',
    category: 'event',
    excerpt: 'Hội thảo "Chuyển đổi số trong quản lý nhà nước" diễn ra ngày 25/07/2024 tại Trung tâm Hội nghị Quốc gia.',
    featured: false
  }
];

// Hàm seed dữ liệu
const seedNews = async () => {
  try {
    // Xóa dữ liệu cũ
    await News.deleteMany({});
    console.log('Đã xóa dữ liệu tin tức cũ');

    // Thêm dữ liệu mới
    const createdNews = await News.insertMany(sampleNews);
    console.log(`Đã tạo ${createdNews.length} tin tức mẫu`);

    console.log('Seed dữ liệu thành công!');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Chạy script
const run = async () => {
  await connectDB();
  await seedNews();
};

run();
