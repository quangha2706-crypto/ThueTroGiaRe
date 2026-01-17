# ROADMAP XÂY DỰNG WEBSITE TÌM & ĐĂNG TIN CHO THUÊ (TƯƠNG TỰ tromoi.com)

## ✨ NEW: Advanced Search Filter System

**The advanced filter system has been implemented!** 

Features include:
- 🔍 **Advanced Filters**: Price range, area, amenities, environment, target audiences
- 🏠 **Amenities**: WC riêng, Máy lạnh, Bếp riêng, Camera an ninh, and more
- 🌍 **Environment Tags**: Gần trường học, Gần chợ, Khu yên tĩnh, etc.
- 👥 **Target Audiences**: Sinh viên, Người đi làm, Gia đình, etc.
- ⭐ **Review System**: Filter by reviews and video reviews
- 📱 **Mobile Responsive**: Drawer-style filters on mobile devices
- 🔗 **URL State**: Share search results via URL

**Setup Guide**: See [FILTER_SYSTEM_GUIDE.md](./FILTER_SYSTEM_GUIDE.md) for installation and usage instructions.

---

## 1. MỤC TIÊU
Xây dựng website cho phép:
- Người thuê tìm kiếm phòng trọ / nhà cho thuê theo vị trí, giá, diện tích
- **[NEW]** Lọc theo tiện nghi, môi trường xung quanh, đối tượng phù hợp
- **[NEW]** Lọc theo review và video review
- Chủ nhà đăng và quản lý tin cho thuê
- Hiển thị danh sách và chi tiết tin thuê

Không sao chép mã nguồn hoặc nội dung độc quyền. Chỉ xây dựng chức năng tương đương.

---

## 2. PHẠM VI CHỨC NĂNG (MVP)

### 2.1 Trang công khai
- Trang chủ
  - Thanh menu: Phòng trọ, Nhà nguyên căn, Căn hộ, Blog (tùy chọn)
  - Form tìm kiếm:
    - Tỉnh / Quận / Phường
    - Khoảng giá
    - Diện tích
    - **[NEW]** Tiện nghi (WC riêng, Máy lạnh, v.v.)
    - **[NEW]** Môi trường (Gần trường, Gần chợ, v.v.)
    - **[NEW]** Đối tượng phù hợp (Sinh viên, Người đi làm, v.v.)
    - **[NEW]** Lọc theo review
- Trang danh sách kết quả
  - Phân trang
  - Sắp xếp theo giá / mới nhất
  - **[NEW]** Sidebar filter với các bộ lọc nâng cao
  - **[NEW]** Mobile responsive với drawer filter
- Trang chi tiết tin
  - Tiêu đề
  - Giá
  - Diện tích
  - Địa chỉ
  - Mô tả
  - Hình ảnh
  - **[NEW]** Danh sách tiện nghi
  - **[NEW]** Môi trường xung quanh
  - **[NEW]** Reviews và video reviews

### 2.2 Người dùng
- Đăng ký
- Đăng nhập
- Đăng xuất

### 2.3 Chủ nhà
- Đăng tin cho thuê
- Sửa / xóa tin
- Quản lý danh sách tin đã đăng

---

## 3. KIẾN TRÚC TỔNG THỂ

### 3.1 Frontend
- Web SPA
- Giao tiếp backend qua REST API

### 3.2 Backend
- REST API
- Authentication (JWT hoặc session)
- Phân quyền: user thường / chủ tin

### 3.3 Database
- Cơ sở dữ liệu quan hệ

---

## 4. THIẾT KẾ DATABASE (TỐI THIỂU)

### Users
- id
- name
- email
- phone
- password_hash
- created_at

### Listings
- id
- title
- description
- price
- area
- type (phòng trọ / nhà / căn hộ)
- address
- province_id
- district_id
- ward_id
- user_id
- created_at
- updated_at

### Locations
- id
- name
- parent_id
- type (province / district / ward)

### ListingImages
- id
- listing_id
- image_url

### **[NEW]** Amenities (Tiện nghi)
- id
- code
- name

### **[NEW]** EnvironmentTags (Môi trường)
- id
- code
- name

### **[NEW]** TargetAudiences (Đối tượng)
- id
- code
- name

### **[NEW]** Reviews
- id
- listing_id
- user_id
- rating
- comment
- created_at

### **[NEW]** ReviewVideos
- id
- review_id
- video_url

### **[NEW]** Junction Tables
- listing_amenities
- listing_environment_tags
- listing_target_audiences

---

## 5. API CẦN XÂY DỰNG

### Auth
- POST /auth/register
- POST /auth/login
- GET /auth/me

### Listings
- GET /listings (with advanced filters)
- GET /listings/{id}
- POST /listings
- PUT /listings/{id}
- DELETE /listings/{id}

### Locations
- GET /locations/provinces
- GET /locations/districts?province_id=
- GET /locations/wards?district_id=

### **[NEW]** Filters
- GET /filters/amenities
- GET /filters/environments
- GET /filters/audiences

---

## 6. ROADMAP TRIỂN KHAI

### Giai đoạn 1: Chuẩn bị
- Phân tích yêu cầu
- Vẽ wireframe UI
- Thiết kế database schema

### Giai đoạn 2: Backend
- Khởi tạo project backend
- Auth (đăng ký, đăng nhập)
- CRUD listings
- API locations
- Upload ảnh

### Giai đoạn 3: Frontend
- Trang chủ + tìm kiếm
- Trang danh sách tin
- Trang chi tiết tin
- Đăng nhập / đăng ký

### Giai đoạn 4: Chủ nhà
- Form đăng tin
- Dashboard quản lý tin
- Phân quyền chỉnh sửa / xóa

### Giai đoạn 5: Hoàn thiện
- Validate dữ liệu
- Phân trang
- Responsive UI
- Kiểm thử

---

## 7. TÍNH NĂNG MỞ RỘNG (SAU MVP)
- Bản đồ Google Maps
- **[IMPLEMENTED]** Đánh giá / review
- **[IMPLEMENTED]** Bộ lọc tìm kiếm nâng cao
- Chat giữa người thuê và chủ nhà
- Tin nổi bật trả phí
- SEO & tối ưu tốc độ

---

## 8. YÊU CẦU PHÁP LÝ
- Trang điều khoản sử dụng
- Trang chính sách bảo mật
- Trang quy chế hoạt động

---

## 9. GHI CHÚ
- Chỉ triển khai chức năng tương đương, không sao chép giao diện hoặc nội dung
- Dữ liệu địa lý có thể dùng dữ liệu hành chính Việt Nam công khai
