-- Sample data to test filter system
-- Run this after running schema_filters.sql and seed_filters.sql

-- Note: Make sure you have at least one user and some listings in your database
-- This script assumes you have listing IDs 1, 2, 3, etc.

-- Add amenities to listings
-- Listing 1: Full amenities
INSERT INTO listing_amenities (listing_id, amenity_id) VALUES
(1, 1), -- WC riêng
(1, 4), -- Máy lạnh
(1, 5), -- Máy giặt
(1, 6), -- Tủ lạnh
(1, 8), -- Chỗ để xe
(1, 10) -- Camera an ninh
ON CONFLICT DO NOTHING;

-- Listing 2: Basic amenities
INSERT INTO listing_amenities (listing_id, amenity_id) VALUES
(2, 1), -- WC riêng
(2, 4), -- Máy lạnh
(2, 8)  -- Chỗ để xe
ON CONFLICT DO NOTHING;

-- Listing 3: Premium amenities
INSERT INTO listing_amenities (listing_id, amenity_id) VALUES
(3, 1),  -- WC riêng
(3, 3),  -- Ban công
(3, 4),  -- Máy lạnh
(3, 5),  -- Máy giặt
(3, 6),  -- Tủ lạnh
(3, 7),  -- Bếp riêng
(3, 9),  -- Thang máy
(3, 11)  -- Khóa vân tay
ON CONFLICT DO NOTHING;

-- Add environment tags to listings
-- Listing 1: Near university
INSERT INTO listing_environment_tags (listing_id, environment_tag_id) VALUES
(1, 1), -- Gần trường học
(1, 6), -- Khu yên tĩnh
(1, 8)  -- Không ngập nước
ON CONFLICT DO NOTHING;

-- Listing 2: Near industrial zone
INSERT INTO listing_environment_tags (listing_id, environment_tag_id) VALUES
(2, 2), -- Gần khu công nghiệp
(2, 4), -- Gần chợ
(2, 7)  -- Khu đông dân cư
ON CONFLICT DO NOTHING;

-- Listing 3: City center
INSERT INTO listing_environment_tags (listing_id, environment_tag_id) VALUES
(3, 3), -- Gần bệnh viện
(3, 5), -- Gần siêu thị
(3, 7), -- Khu đông dân cư
(3, 8)  -- Không ngập nước
ON CONFLICT DO NOTHING;

-- Add target audiences to listings
-- Listing 1: For students
INSERT INTO listing_target_audiences (listing_id, target_audience_id) VALUES
(1, 1), -- Sinh viên
(1, 6)  -- Ở ghép
ON CONFLICT DO NOTHING;

-- Listing 2: For workers
INSERT INTO listing_target_audiences (listing_id, target_audience_id) VALUES
(2, 2), -- Người đi làm
(2, 4)  -- Nam
ON CONFLICT DO NOTHING;

-- Listing 3: For families
INSERT INTO listing_target_audiences (listing_id, target_audience_id) VALUES
(3, 3)  -- Gia đình
ON CONFLICT DO NOTHING;

-- Add sample reviews (optional)
-- Make sure user_id 1 exists before running this
INSERT INTO reviews (listing_id, user_id, rating, comment, created_at) VALUES
(1, 1, 5, 'Phòng rất đẹp, chủ nhà thân thiện. Gần trường học nên tiện lợi cho sinh viên.', CURRENT_TIMESTAMP),
(2, 1, 4, 'Phòng khá ổn, giá cả hợp lý. Gần khu công nghiệp nên đi làm rất thuận tiện.', CURRENT_TIMESTAMP),
(3, 1, 5, 'Căn hộ sang trọng, đầy đủ tiện nghi. Phù hợp cho gia đình nhỏ.', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Add sample review videos (optional)
-- You can replace these with real video URLs
INSERT INTO review_videos (review_id, video_url, created_at) VALUES
(1, 'https://www.youtube.com/watch?v=example1', CURRENT_TIMESTAMP),
(3, 'https://www.youtube.com/watch?v=example2', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Verify data
SELECT 'Amenities count:' as info, COUNT(*) as count FROM amenities
UNION ALL
SELECT 'Environment tags count:', COUNT(*) FROM environment_tags
UNION ALL
SELECT 'Target audiences count:', COUNT(*) FROM target_audiences
UNION ALL
SELECT 'Listing amenities count:', COUNT(*) FROM listing_amenities
UNION ALL
SELECT 'Listing environment tags count:', COUNT(*) FROM listing_environment_tags
UNION ALL
SELECT 'Listing target audiences count:', COUNT(*) FROM listing_target_audiences
UNION ALL
SELECT 'Reviews count:', COUNT(*) FROM reviews
UNION ALL
SELECT 'Review videos count:', COUNT(*) FROM review_videos;
