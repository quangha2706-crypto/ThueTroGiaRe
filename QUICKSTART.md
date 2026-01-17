# Quick Start Guide - Thuê Trọ Giá Rẻ

Hướng dẫn nhanh để chạy dự án trong 5 phút!

## Yêu Cầu

- Node.js 14+
- PostgreSQL 12+
- npm hoặc yarn

## Các Bước

### 1. Clone & Setup Database (2 phút)

```bash
# Clone repository
git clone https://github.com/quangha2706-crypto/ThueTroGiaRe.git
cd ThueTroGiaRe

# Tạo database
createdb thuetrodb

# Import schema và data
psql -U postgres -d thuetrodb -f database/schema.sql
psql -U postgres -d thuetrodb -f database/seed_locations.sql
psql -U postgres -d thuetrodb -f database/seed_data.sql
```

### 2. Setup Backend (1 phút)

```bash
cd backend

# Install dependencies
npm install

# Tạo .env file
cp .env.example .env

# Chỉnh sửa .env nếu cần (username/password PostgreSQL)
# Mặc định: postgres/postgres
```

### 3. Setup Frontend (1 phút)

```bash
cd ../frontend

# Install dependencies
npm install

# .env đã được tạo sẵn
```

### 4. Chạy Ứng Dụng (1 phút)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### 5. Truy Cập Website

Mở browser: `http://localhost:3000`

## Test Nhanh

### Tài khoản mẫu (nếu đã chạy seed_data.sql)
- Email: `test@example.com`
- Password: `password123`

*Lưu ý: Mật khẩu trong seed_data.sql là placeholder, bạn cần đăng ký tài khoản mới*

### Hoặc Đăng ký mới
1. Click "Đăng ký"
2. Điền thông tin
3. Submit
4. Tự động đăng nhập và chuyển đến Dashboard

## Chức Năng Có Thể Test Ngay

✅ Tìm kiếm phòng trọ theo tỉnh/thành
✅ Xem chi tiết tin đăng
✅ Đăng ký/Đăng nhập
✅ Đăng tin cho thuê
✅ Quản lý tin đăng

## Troubleshooting Nhanh

### Backend không chạy?
```bash
# Kiểm tra PostgreSQL
pg_isready

# Kiểm tra port 5000
lsof -i :5000
```

### Frontend không chạy?
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Database error?
- Kiểm tra PostgreSQL đang chạy
- Kiểm tra username/password trong .env
- Đảm bảo database "thuetrodb" đã được tạo

## URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api

## Đọc Thêm

- [INSTALLATION.md](INSTALLATION.md) - Hướng dẫn chi tiết
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Tổng quan dự án
- [backend/README.md](backend/README.md) - Backend API docs

## Cần Giúp Đỡ?

Tạo issue tại: https://github.com/quangha2706-crypto/ThueTroGiaRe/issues
