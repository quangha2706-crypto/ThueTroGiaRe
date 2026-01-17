# Website Thuê Trọ Giá Rẻ - Tổng Quan Dự Án

## Giới Thiệu

Đây là dự án website hoàn chỉnh cho phép người dùng tìm kiếm và đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ. Website được xây dựng theo roadmap đầy đủ với backend API, frontend React, và cơ sở dữ liệu PostgreSQL.

## Kiến Trúc Hệ Thống

### Backend (Node.js + Express)
- **REST API** với Express.js
- **Database**: PostgreSQL với Sequelize ORM
- **Authentication**: JWT tokens
- **Security**: bcryptjs cho mã hóa mật khẩu
- **CORS**: Hỗ trợ cross-origin requests

### Frontend (React)
- **SPA** (Single Page Application) với React 18
- **Routing**: React Router v6
- **State Management**: Context API
- **HTTP Client**: Axios
- **Styling**: Custom CSS

### Database (PostgreSQL)
- **Schema** được thiết kế chuẩn hóa
- **Relationships**: Foreign keys với cascade
- **Indexing**: Tối ưu hóa truy vấn
- **Seed Data**: Dữ liệu mẫu sẵn có

## Tính Năng Chi Tiết

### 1. Authentication & Authorization
- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập với email/password
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Session management

### 2. Tìm Kiếm & Lọc
- ✅ Tìm theo loại hình (Phòng trọ, Nhà, Căn hộ)
- ✅ Lọc theo tỉnh/thành phố
- ✅ Lọc theo quận/huyện
- ✅ Lọc theo phường/xã
- ✅ Lọc theo khoảng giá
- ✅ Lọc theo diện tích
- ✅ Sắp xếp theo giá/ngày đăng
- ✅ Phân trang kết quả

### 3. Quản Lý Tin Đăng
- ✅ Đăng tin mới
- ✅ Xem danh sách tin của mình
- ✅ Cập nhật tin đăng
- ✅ Xóa tin đăng
- ✅ Upload multiple images
- ✅ Trạng thái tin đăng (active/inactive)

### 4. Hiển Thị Tin Đăng
- ✅ Danh sách tin dạng grid
- ✅ Chi tiết tin đầy đủ
- ✅ Hiển thị hình ảnh
- ✅ Thông tin liên hệ
- ✅ Vị trí địa lý

### 5. Giao Diện Người Dùng
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Navigation menu
- ✅ Search bar
- ✅ Cards layout
- ✅ Forms với validation
- ✅ Loading states
- ✅ Error handling

## Cấu Trúc Database

### Bảng Users
```sql
- id (PK)
- name
- email (unique)
- phone
- password_hash
- created_at
```

### Bảng Listings
```sql
- id (PK)
- title
- description
- price
- area
- type (phong-tro/nha-nguyen-can/can-ho)
- address
- province_id (FK)
- district_id (FK)
- ward_id (FK)
- user_id (FK)
- status
- created_at
- updated_at
```

### Bảng Locations
```sql
- id (PK)
- name
- parent_id (FK self-reference)
- type (province/district/ward)
- created_at
```

### Bảng ListingImages
```sql
- id (PK)
- listing_id (FK)
- image_url
- is_primary
- created_at
```

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Đăng ký
POST   /api/auth/login         - Đăng nhập
GET    /api/auth/me            - Lấy thông tin user
```

### Listings
```
GET    /api/listings           - Danh sách tin (public)
GET    /api/listings/:id       - Chi tiết tin (public)
POST   /api/listings           - Tạo tin mới (protected)
PUT    /api/listings/:id       - Cập nhật tin (protected)
DELETE /api/listings/:id       - Xóa tin (protected)
GET    /api/listings/user/my-listings - Tin của user (protected)
```

### Locations
```
GET    /api/locations/provinces          - Danh sách tỉnh
GET    /api/locations/districts?province_id=X  - Danh sách quận
GET    /api/locations/wards?district_id=X      - Danh sách phường
```

## Công Nghệ & Thư Viện

### Backend
- express: ^4.18.2
- pg: ^8.11.0
- sequelize: ^6.32.0
- jsonwebtoken: ^9.0.0
- bcryptjs: ^2.4.3
- cors: ^2.8.5
- dotenv: ^16.0.3
- multer: ^1.4.5-lts.1

### Frontend
- react: ^18.2.0
- react-router-dom: ^6.x
- axios: ^1.4.0

## Tính Năng Bảo Mật

1. **Password Hashing**: Sử dụng bcryptjs với salt rounds = 10
2. **JWT Tokens**: Tokens có thời hạn 7 ngày
3. **Protected Routes**: Middleware xác thực cho các endpoint cần đăng nhập
4. **Input Validation**: Validate dữ liệu đầu vào
5. **SQL Injection Prevention**: Sử dụng Sequelize ORM
6. **CORS Configuration**: Chỉ cho phép origins được phép

## Tối Ưu Hóa

1. **Database Indexing**: Index trên các trường thường query
2. **Pagination**: Giới hạn số kết quả mỗi trang
3. **Eager Loading**: Load associations một lần
4. **Connection Pooling**: Quản lý kết nối database hiệu quả
5. **Code Splitting**: React lazy loading (có thể mở rộng)

## Testing

### Có thể test với:
1. **Manual Testing**: Sử dụng browser và Postman
2. **Sample Data**: Đã có sẵn trong seed_data.sql
3. **Multiple Users**: Test đa người dùng
4. **Edge Cases**: Test các trường hợp biên

## Deployment

### Production Ready Features
- Environment variables
- Error handling
- Logging
- CORS configuration
- Database migrations ready
- .gitignore configured

### Deployment Steps (Tham khảo)
1. **Backend**: Deploy lên Heroku/Railway/DigitalOcean
2. **Frontend**: Deploy lên Vercel/Netlify
3. **Database**: PostgreSQL trên cloud (ElephantSQL/Railway)
4. **Environment**: Cập nhật URLs production

## Hướng Phát Triển Tiếp

### Short-term
- [ ] Upload ảnh lên cloud storage (AWS S3, Cloudinary)
- [ ] Email verification
- [ ] Password reset
- [ ] User profile management
- [ ] Bookmarks/favorites

### Medium-term
- [ ] Google Maps integration
- [ ] Advanced filters (số phòng, tiện nghi)
- [ ] Image optimization
- [ ] SEO optimization
- [ ] Social sharing

### Long-term
- [ ] Chat system (Socket.io)
- [ ] Review & rating system
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Mobile app (React Native)

## Performance Metrics

### Estimated Load Capacity
- **Database**: Hàng triệu listings
- **Concurrent Users**: Hàng trăm (với scaling)
- **API Response Time**: < 200ms (average)
- **Page Load Time**: < 3s (first load)

## Maintenance

### Regular Tasks
- [ ] Database backup định kỳ
- [ ] Update dependencies
- [ ] Monitor error logs
- [ ] Performance monitoring
- [ ] Security patches

## Liên Hệ & Hỗ Trợ

- **Repository**: https://github.com/quangha2706-crypto/ThueTroGiaRe
- **Issues**: https://github.com/quangha2706-crypto/ThueTroGiaRe/issues
- **Documentation**: Xem INSTALLATION.md

## License

MIT License - Tự do sử dụng và chỉnh sửa

---

**Lưu ý**: Đây là dự án hoàn chỉnh và sẵn sàng để chạy. Hãy đọc INSTALLATION.md để biết cách cài đặt chi tiết.
