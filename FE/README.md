# Cổng Thông Tin Điện Tử

Một ứng dụng web hiện đại được xây dựng bằng React và Tailwind CSS, cung cấp các dịch vụ công trực tuyến và thông tin cho người dân.

## 🚀 Tính Năng

### Trang Chính
- **Trang Chủ**: Giới thiệu tổng quan, dịch vụ nhanh, tin tức mới nhất và thống kê
- **Tin Tức**: Hệ thống tin tức với phân loại, tìm kiếm và tin nổi bật
- **Dịch Vụ Công**: Danh sách các dịch vụ trực tuyến với phân loại và tìm kiếm
- **Văn Bản Pháp Luật**: Tra cứu và tải về các văn bản pháp luật
- **Liên Hệ**: Form liên hệ và thông tin liên lạc
- **Giới Thiệu**: Thông tin về tổ chức, sứ mệnh, tầm nhìn

### Dịch Vụ Con
- **Dịch Vụ Trực Tuyến**: Thực hiện các thủ tục hành chính online
- **Hỗ Trợ Kỹ Thuật**: Hệ thống hỗ trợ 24/7 với nhiều kênh
- **Góp Ý Kiến**: Thu thập phản hồi từ người dân
- **FAQ**: Câu hỏi thường gặp được phân loại chi tiết
- **Thủ Tục Hành Chính**: Hướng dẫn chi tiết các thủ tục

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM
- **Build Tool**: Vite 7.0.4
- **Linting**: ESLint

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js >= 20.19.0
- npm >= 10.8.2

### Cài Đặt
```bash
# Cài đặt dependencies
npm install
```

### Chạy Development Server
```bash
npm run dev
```
Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Cấu Trúc Thư Mục

```
src/
├── components/
│   └── Layout/
│       ├── Header.jsx          # Header với navigation
│       ├── Footer.jsx          # Footer với thông tin liên hệ
│       └── Layout.jsx          # Layout wrapper
├── pages/
│   ├── Home.jsx               # Trang chủ
│   ├── News.jsx               # Trang tin tức
│   ├── Services.jsx           # Trang dịch vụ
│   ├── Documents.jsx          # Trang văn bản pháp luật
│   ├── Contact.jsx            # Trang liên hệ
│   ├── About.jsx              # Trang giới thiệu
│   └── services/
│       ├── OnlineServices.jsx  # Dịch vụ trực tuyến
│       ├── Support.jsx         # Hỗ trợ kỹ thuật
│       ├── Feedback.jsx        # Góp ý kiến
│       ├── FAQ.jsx             # Câu hỏi thường gặp
│       └── Procedures.jsx      # Thủ tục hành chính
├── router/
│   └── AppRouter.jsx          # Cấu hình routing
├── App.jsx                    # Component chính
├── main.jsx                   # Entry point
└── index.css                  # Styles chính
```

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Thiết Kế UI/UX

### Màu Sắc Chính
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#059669)
- **Warning**: Yellow (#d97706)
- **Error**: Red (#dc2626)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Font weight 600-800
- **Body**: Font weight 400-500

## 📞 Liên Hệ

- **Email**: info@congthongtin.gov.vn
- **Phone**: (028) 1234 5678
- **Website**: www.congthongtin.gov.vn
