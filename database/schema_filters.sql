-- Extended Schema for Advanced Search Filters
-- Add tables for Amenities, Environment Tags, Target Audiences, Reviews

-- Amenities table (Tiện nghi)
CREATE TABLE IF NOT EXISTS amenities (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ListingAmenities junction table
CREATE TABLE IF NOT EXISTS listing_amenities (
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    amenity_id INTEGER REFERENCES amenities(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (listing_id, amenity_id)
);

-- Environment Tags table (Môi trường xung quanh)
CREATE TABLE IF NOT EXISTS environment_tags (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ListingEnvironmentTags junction table
CREATE TABLE IF NOT EXISTS listing_environment_tags (
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    environment_tag_id INTEGER REFERENCES environment_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (listing_id, environment_tag_id)
);

-- Target Audiences table (Đối tượng phù hợp)
CREATE TABLE IF NOT EXISTS target_audiences (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ListingTargetAudiences junction table
CREATE TABLE IF NOT EXISTS listing_target_audiences (
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    target_audience_id INTEGER REFERENCES target_audiences(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (listing_id, target_audience_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review Videos table
CREATE TABLE IF NOT EXISTS review_videos (
    id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_listing_amenities_listing_id ON listing_amenities(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_amenities_amenity_id ON listing_amenities(amenity_id);
CREATE INDEX IF NOT EXISTS idx_listing_environment_tags_listing_id ON listing_environment_tags(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_environment_tags_tag_id ON listing_environment_tags(environment_tag_id);
CREATE INDEX IF NOT EXISTS idx_listing_target_audiences_listing_id ON listing_target_audiences(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_target_audiences_audience_id ON listing_target_audiences(target_audience_id);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_review_videos_review_id ON review_videos(review_id);
CREATE INDEX IF NOT EXISTS idx_listings_area ON listings(area);
