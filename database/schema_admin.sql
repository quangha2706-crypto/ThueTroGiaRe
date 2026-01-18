-- Admin System Schema
-- Compatible with PostgreSQL

-- Add role column to users table if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'USER' 
            CHECK (role IN ('USER', 'ADMIN', 'SUPER_ADMIN'));
    END IF;
END $$;

-- Add is_locked column to users table for account locking
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'is_locked') THEN
        ALTER TABLE users ADD COLUMN is_locked BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Update listings status to include moderation states
-- Add approval_status for content moderation workflow
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'listings' AND column_name = 'approval_status') THEN
        ALTER TABLE listings ADD COLUMN approval_status VARCHAR(50) DEFAULT 'pending' 
            CHECK (approval_status IN ('pending', 'approved', 'rejected'));
    END IF;
END $$;

-- Add admin_note for internal notes
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'listings' AND column_name = 'admin_note') THEN
        ALTER TABLE listings ADD COLUMN admin_note TEXT;
    END IF;
END $$;

-- Add reviewed_by and reviewed_at for moderation tracking
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'listings' AND column_name = 'reviewed_by') THEN
        ALTER TABLE listings ADD COLUMN reviewed_by INTEGER REFERENCES users(id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'listings' AND column_name = 'reviewed_at') THEN
        ALTER TABLE listings ADD COLUMN reviewed_at TIMESTAMP;
    END IF;
END $$;

-- Admin Audit Logs table for tracking admin actions
CREATE TABLE IF NOT EXISTS admin_logs (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id INTEGER,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports table for violation reporting
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id),
    target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('listing', 'user', 'review')),
    target_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    handled_by INTEGER REFERENCES users(id),
    handled_at TIMESTAMP,
    admin_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for admin tables
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_target ON admin_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_target ON reports(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_listings_approval_status ON listings(approval_status);
