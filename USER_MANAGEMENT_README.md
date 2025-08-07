# Chức năng Quản lý Người dùng

## Tổng quan
Đã tạo thành công chức năng quản lý người dùng hoàn chỉnh với API Backend và Frontend tương tác thực tế.

## Các tính năng đã triển khai

### Backend API
1. **User Controller** (`BE/controllers/admin/user.controller.js`)
   - `GET /admin/users` - Lấy danh sách người dùng với phân trang và tìm kiếm
   - `GET /admin/users/:id` - Lấy thông tin chi tiết một người dùng
   - `POST /admin/users` - Tạo người dùng mới
   - `PUT /admin/users/:id` - Cập nhật thông tin người dùng
   - `DELETE /admin/users/:id` - Xóa người dùng (soft delete)
   - `PATCH /admin/users/:id/status` - Thay đổi trạng thái người dùng
   - `GET /admin/users/stats` - Lấy thống kê người dùng

2. **Authentication Middleware** (`BE/middleware/auth.middleware.js`)
   - `authenticateToken` - Xác thực JWT token
   - `requireAdmin` - Yêu cầu quyền admin
   - `requireAdminOrSelf` - Cho phép admin hoặc chính user đó

3. **Routes** (`BE/routes/admin/user.route.js`)
   - Định nghĩa các endpoint với middleware bảo mật

### Frontend
1. **API Service** (`FE/src/shared/services/api.js`)
   - `userAPI.getUsers()` - Lấy danh sách người dùng
   - `userAPI.getUserById()` - Lấy thông tin người dùng
   - `userAPI.createUser()` - Tạo người dùng mới
   - `userAPI.updateUser()` - Cập nhật người dùng
   - `userAPI.deleteUser()` - Xóa người dùng
   - `userAPI.changeUserStatus()` - Thay đổi trạng thái
   - `userAPI.getUserStats()` - Lấy thống kê

2. **UserManagement Component** (`FE/src/admin/pages/UserManagement/index.jsx`)
   - Hiển thị danh sách người dùng với bảng
   - Tìm kiếm theo tên và email
   - Lọc theo vai trò và trạng thái
   - Phân trang
   - Modal tạo người dùng mới
   - Modal chỉnh sửa người dùng
   - Thay đổi trạng thái (kích hoạt/vô hiệu hóa)
   - Xóa người dùng
   - Loading states và error handling

## Cách sử dụng

### 1. Khởi động Backend
```bash
cd BE
npm start
```

### 2. Khởi động Frontend
```bash
cd FE
npm run dev
```

### 3. Truy cập trang quản lý người dùng
- Đăng nhập với tài khoản admin
- Vào menu "Quản lý Người dùng"

## Các tính năng chính

### Tìm kiếm và Lọc
- Tìm kiếm theo tên hoặc email
- Lọc theo vai trò (Admin, Editor, User)
- Lọc theo trạng thái (Hoạt động, Không hoạt động)

### Quản lý Người dùng
- **Tạo mới**: Thêm người dùng với đầy đủ thông tin
- **Chỉnh sửa**: Cập nhật thông tin người dùng
- **Xóa**: Soft delete người dùng
- **Thay đổi trạng thái**: Kích hoạt/vô hiệu hóa tài khoản

### Phân trang
- Hiển thị 10 người dùng mỗi trang
- Điều hướng trang với nút Previous/Next
- Hiển thị thông tin tổng số người dùng

### Bảo mật
- Tất cả API đều yêu cầu xác thực JWT
- Chỉ admin mới có quyền quản lý người dùng
- Mã hóa mật khẩu với bcrypt

## Cấu trúc Database
Model `Account` trong MongoDB:
```javascript
{
  fullName: String,
  email: String,
  password: String, // Mã hóa bằng bcrypt
  phone: String,
  role_id: String, // 'admin', 'editor', 'user'
  status: String, // 'active', 'inactive'
  deleted: Boolean,
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Required
Tất cả endpoints đều cần header:
```
Authorization: Bearer <JWT_TOKEN>
```

### User Management Endpoints
- `GET /admin/users?page=1&limit=10&search=&role=&status=`
- `GET /admin/users/:id`
- `POST /admin/users`
- `PUT /admin/users/:id`
- `DELETE /admin/users/:id`
- `PATCH /admin/users/:id/status`
- `GET /admin/users/stats`

## Lưu ý
- Đảm bảo có biến môi trường `JWT_SECRET` trong file `.env`
- Database MongoDB phải được kết nối
- Frontend sử dụng Tailwind CSS cho styling
- Tất cả API responses đều có format chuẩn với `success`, `message`, `data`
