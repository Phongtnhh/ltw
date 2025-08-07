# Chức năng Tìm kiếm Bài viết

## Tổng quan
Đã thêm chức năng tìm kiếm bài viết toàn diện cho trang tin tức, bao gồm tìm kiếm theo từ khóa và lọc theo danh mục.

## Các tính năng đã thêm

### 1. Backend API (BE/controllers/client/News.controller.js)
- **Tìm kiếm theo từ khóa**: Hỗ trợ tìm kiếm trong title, author, và excerpt
- **Lọc theo danh mục**: Lọc tin tức theo category (announcement, policy, service, event)
- **Phân trang**: Hỗ trợ phân trang với kết quả tìm kiếm
- **Tham số API**:
  - `search`: Từ khóa tìm kiếm
  - `category`: Danh mục (all, announcement, policy, service, event)
  - `page`: Số trang

### 2. Frontend Components

#### Giao diện tìm kiếm (FE/src/client/pages/News/index.jsx)
- **Thanh tìm kiếm**: Input với debounce 500ms để tránh gọi API quá nhiều
- **Bộ lọc danh mục**: Buttons để lọc theo category
- **Nút xóa tìm kiếm**: Xóa từ khóa tìm kiếm hiện tại
- **Hiển thị kết quả**: Thông báo số lượng kết quả tìm kiếm
- **Loading state**: Hiển thị spinner khi đang tải

#### Tính năng UX
- **Debounce**: Đợi 500ms sau khi user ngừng gõ mới gọi API
- **Real-time search**: Tìm kiếm tự động khi thay đổi từ khóa
- **Reset pagination**: Tự động về trang 1 khi tìm kiếm mới
- **Responsive design**: Tối ưu cho mobile

### 3. API Service (FE/src/shared/services/api.js)
- Cập nhật `getAllNews()` để hỗ trợ tham số tìm kiếm
- Tự động xây dựng query parameters

### 4. CSS Styling (FE/src/client/pages/News/News.module.css)
- Thiết kế modern cho thanh tìm kiếm
- Hover effects và transitions
- Loading spinner animation
- Responsive breakpoints

## Cách sử dụng

### 1. Tìm kiếm theo từ khóa
- Nhập từ khóa vào ô tìm kiếm
- Hệ thống sẽ tự động tìm kiếm sau 500ms
- Kết quả hiển thị ngay lập tức

### 2. Lọc theo danh mục
- Click vào các nút danh mục: Tất cả, Thông báo, Chính sách, Dịch vụ, Sự kiện
- Có thể kết hợp với tìm kiếm từ khóa

### 3. Xóa tìm kiếm
- Click nút X bên cạnh ô tìm kiếm để xóa từ khóa
- Hoặc xóa thủ công trong ô input

## Cấu trúc API Response

```json
{
  "massage": "Lấy tin tức thành công",
  "News": [...],
  "currentPage": 1,
  "totalPages": 5,
  "totalItems": 50
}
```

## Các file đã thay đổi

1. **BE/controllers/client/News.controller.js** - Thêm logic tìm kiếm
2. **FE/src/client/pages/News/index.jsx** - Component tìm kiếm
3. **FE/src/client/pages/News/News.module.css** - Styling
4. **FE/src/shared/services/api.js** - API service

## Testing

### Test cases cần kiểm tra:
1. Tìm kiếm với từ khóa hợp lệ
2. Tìm kiếm với từ khóa không tồn tại
3. Lọc theo từng danh mục
4. Kết hợp tìm kiếm + lọc danh mục
5. Phân trang với kết quả tìm kiếm
6. Xóa tìm kiếm
7. Responsive trên mobile

### Cách test:
1. Khởi động backend: `cd BE && npm start`
2. Khởi động frontend: `cd FE && npm run dev`
3. Truy cập `/news` và test các tính năng

## Lưu ý kỹ thuật

- **Debounce**: Tránh spam API calls khi user gõ nhanh
- **State management**: Tách riêng searchInput và searchTerm
- **Error handling**: Xử lý lỗi khi API call thất bại
- **Performance**: Chỉ gọi API khi cần thiết
- **SEO friendly**: URL có thể chứa search params (có thể mở rộng)

## Mở rộng trong tương lai

1. **URL params**: Lưu search state trong URL
2. **Search history**: Lưu lịch sử tìm kiếm
3. **Advanced filters**: Thêm filter theo ngày, tác giả
4. **Search suggestions**: Gợi ý từ khóa
5. **Full-text search**: Tìm kiếm trong nội dung bài viết
