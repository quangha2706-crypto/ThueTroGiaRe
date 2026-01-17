-- Seed data for filter tables

-- Insert Amenities (Tiện nghi)
INSERT INTO amenities (code, name) VALUES
('wc_rieng', 'WC riêng'),
('gac_lung', 'Gác lửng'),
('ban_cong', 'Ban công'),
('may_lanh', 'Máy lạnh'),
('may_giat', 'Máy giặt'),
('tu_lanh', 'Tủ lạnh'),
('bep_rieng', 'Bếp riêng'),
('cho_de_xe', 'Chỗ để xe'),
('thang_may', 'Thang máy'),
('camera_an_ninh', 'Camera an ninh'),
('khoa_van_tay', 'Khóa vân tay')
ON CONFLICT (code) DO NOTHING;

-- Insert Environment Tags (Môi trường xung quanh)
INSERT INTO environment_tags (code, name) VALUES
('gan_truong_hoc', 'Gần trường học'),
('gan_khu_cong_nghiep', 'Gần khu công nghiệp'),
('gan_benh_vien', 'Gần bệnh viện'),
('gan_cho', 'Gần chợ'),
('gan_sieu_thi', 'Gần siêu thị'),
('khu_yen_tinh', 'Khu yên tĩnh'),
('khu_dong_dan_cu', 'Khu đông dân cư'),
('khong_ngap_nuoc', 'Không ngập nước')
ON CONFLICT (code) DO NOTHING;

-- Insert Target Audiences (Đối tượng phù hợp)
INSERT INTO target_audiences (code, name) VALUES
('sinh_vien', 'Sinh viên'),
('nguoi_di_lam', 'Người đi làm'),
('gia_dinh', 'Gia đình'),
('nam', 'Nam'),
('nu', 'Nữ'),
('o_ghep', 'Ở ghép')
ON CONFLICT (code) DO NOTHING;
