# Hướng Dẫn Cài Đặt Hệ Thống Bộ Lọc Tìm Kiếm Nâng Cao

## Tổng Quan

Hệ thống bộ lọc tìm kiếm nâng cao cho phép người dùng lọc phòng trọ theo nhiều tiêu chí:
- Khoảng giá và diện tích
- Tiện nghi (WC riêng, máy lạnh, bếp riêng, v.v.)
- Môi trường xung quanh (gần trường học, chợ, siêu thị, v.v.)
- Đối tượng phù hợp (sinh viên, người đi làm, gia đình, v.v.)
- Review (có review, có video review)

## Cài Đặt Database

### 1. Chạy Schema Mở Rộng

Từ thư mục gốc của dự án, chạy lệnh sau để tạo các bảng mới:

```bash
psql -U your_username -d your_database -f database/schema_filters.sql
```

Hoặc nếu bạn đang dùng script có sẵn:

```bash
# Kết nối PostgreSQL
psql -U postgres -d thue_tro_db

# Chạy lệnh trong PostgreSQL
\i database/schema_filters.sql
```

### 2. Chạy Seed Data

Sau khi tạo schema, chạy seed data để có dữ liệu mẫu cho các bộ lọc:

```bash
psql -U your_username -d your_database -f database/seed_filters.sql
```

Hoặc:

```bash
psql -U postgres -d thue_tro_db
\i database/seed_filters.sql
```

## Cấu Trúc Database Mới

### Bảng Mới

1. **amenities** - Danh sách tiện nghi
   - WC riêng, Gác lửng, Ban công, Máy lạnh, v.v.

2. **environment_tags** - Môi trường xung quanh
   - Gần trường học, Gần chợ, Khu yên tĩnh, v.v.

3. **target_audiences** - Đối tượng phù hợp
   - Sinh viên, Người đi làm, Gia đình, Nam, Nữ, v.v.

4. **reviews** - Đánh giá từ người dùng
   - listing_id, user_id, rating, comment

5. **review_videos** - Video review
   - review_id, video_url

### Bảng Junction (Many-to-Many)

1. **listing_amenities** - Liên kết listing với amenities
2. **listing_environment_tags** - Liên kết listing với environment_tags
3. **listing_target_audiences** - Liên kết listing với target_audiences

## API Endpoints Mới

### Filter Endpoints (Public)

```
GET /api/filters/amenities
Response: { success: true, data: { amenities: [...] } }

GET /api/filters/environments
Response: { success: true, data: { environments: [...] } }

GET /api/filters/audiences
Response: { success: true, data: { audiences: [...] } }
```

### Advanced Search (GET /api/listings)

Endpoint này đã được mở rộng để hỗ trợ các filter mới:

```
GET /api/listings?
  page=1&
  limit=12&
  type=phong-tro&
  province_id=1&
  min_price=1000000&
  max_price=5000000&
  min_area=20&
  max_area=50&
  amenities[]=1&
  amenities[]=2&
  environments[]=3&
  audiences[]=1&
  has_review=true&
  has_video_review=true
```

**Tham số mới:**
- `amenities[]` - Mảng ID tiện nghi
- `environments[]` - Mảng ID môi trường
- `audiences[]` - Mảng ID đối tượng
- `has_review` - true/false
- `has_video_review` - true/false

## Frontend Components

### FilterSidebar Component

Component chính cho bộ lọc, bao gồm:
- Range inputs cho giá và diện tích
- Checkbox groups cho tiện nghi và môi trường
- Checkbox group cho đối tượng phù hợp
- Checkbox cho review filters
- Nút "Áp Dụng Bộ Lọc" và "Xóa Bộ Lọc"

**Props:**
```javascript
<FilterSidebar
  filters={filters}           // Object chứa tất cả filter values
  onFilterChange={handler}    // Function(key, value)
  onApply={handler}          // Function gọi khi apply
  onClear={handler}          // Function gọi khi clear
/>
```

### Responsive Design

- **Desktop**: Sidebar hiển thị bên trái của danh sách
- **Mobile/Tablet**: Drawer trượt từ trái, có overlay để đóng

## Cách Sử Dụng Trong Code

### 1. Thêm Amenities cho Listing

```javascript
// Khi tạo listing mới
const listing = await Listing.create({...data});

// Thêm amenities
await listing.setAmenities([1, 2, 3]); // Array of amenity IDs
```

### 2. Query Listings với Filters

```javascript
// Frontend - gọi API
const response = await listingsAPI.getListings({
  page: 1,
  limit: 12,
  amenities: [1, 2],
  environments: [3, 4],
  has_review: 'true'
});
```

### 3. URL Query Params

Filter state được lưu trong URL, cho phép:
- Share link với bộ lọc cụ thể
- Bookmark tìm kiếm
- Browser back/forward hoạt động đúng

Ví dụ URL:
```
/listings?min_price=1000000&max_price=5000000&amenities[]=1&amenities[]=2&has_review=true
```

## Testing

### 1. Test Backend API

```bash
# Test filter endpoints
curl http://localhost:5000/api/filters/amenities
curl http://localhost:5000/api/filters/environments
curl http://localhost:5000/api/filters/audiences

# Test advanced search
curl "http://localhost:5000/api/listings?amenities[]=1&amenities[]=2&has_review=true"
```

### 2. Test Frontend

1. Khởi động backend: `cd backend && npm run dev`
2. Khởi động frontend: `cd frontend && npm start`
3. Truy cập http://localhost:3000/listings
4. Thử các bộ lọc khác nhau
5. Kiểm tra URL có cập nhật đúng không
6. Test responsive trên mobile

## Performance Optimization

### Indexes đã được thêm:

```sql
-- Indexes trên junction tables
CREATE INDEX idx_listing_amenities_listing_id ON listing_amenities(listing_id);
CREATE INDEX idx_listing_amenities_amenity_id ON listing_amenities(amenity_id);
CREATE INDEX idx_listing_environment_tags_listing_id ON listing_environment_tags(listing_id);
CREATE INDEX idx_listings_area ON listings(area);
```

### Query Optimization

- Chỉ join bảng liên quan khi filter được sử dụng
- Sử dụng `distinct: true` và `subQuery: false` để tránh count không chính xác
- Eager loading với `include` thay vì N+1 queries

## Mở Rộng Tương Lai

### Thêm Amenity/Environment/Audience Mới

Thêm trực tiếp vào database:

```sql
INSERT INTO amenities (code, name) VALUES ('wifi', 'Wifi miễn phí');
INSERT INTO environment_tags (code, name) VALUES ('gan_cong_vien', 'Gần công viên');
INSERT INTO target_audiences (code, name) VALUES ('cap_doi', 'Cặp đôi');
```

### Thêm Review System

Tạo review mới:

```javascript
const review = await Review.create({
  listing_id: 1,
  user_id: 2,
  rating: 5,
  comment: 'Phòng đẹp, chủ nhà nhiệt tình'
});

// Thêm video review (optional)
await ReviewVideo.create({
  review_id: review.id,
  video_url: 'https://youtube.com/...'
});
```

## Troubleshooting

### Lỗi: "Cannot read property 'associate' of undefined"

Đảm bảo tất cả models được import trong `server.js` và associations được khởi tạo:

```javascript
const Listing = require('./models/Listing');
const Amenity = require('./models/Amenity');
// ... other imports

if (Listing.associate) Listing.associate();
if (Amenity.associate) Amenity.associate();
```

### Lỗi: "Table does not exist"

Chạy lại schema migrations:
```bash
psql -U postgres -d thue_tro_db -f database/schema_filters.sql
```

### Filter không hoạt động

1. Kiểm tra console log trong browser để xem API calls
2. Kiểm tra backend logs để xem query được tạo
3. Verify rằng seed data đã được load

## Tài Liệu Tham Khảo

- [Sequelize Many-to-Many Associations](https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships)
- [React Router URL Search Params](https://reactrouter.com/en/main/hooks/use-search-params)
- [PostgreSQL Indexes](https://www.postgresql.org/docs/current/indexes.html)

## Liên Hệ & Hỗ Trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.
