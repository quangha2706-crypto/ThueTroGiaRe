import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Không thể tải dữ liệu thống kê');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">Đang tải...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-empty-state">
          <div className="icon">❌</div>
          <p>{error}</p>
          <button onClick={fetchStats} className="action-btn view">
            Thử lại
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card info">
          <div className="stat-header">
            <span className="stat-icon">👥</span>
          </div>
          <div className="stat-value">{stats?.users?.total || 0}</div>
          <div className="stat-label">Tổng người dùng</div>
        </div>

        <div className="admin-stat-card success">
          <div className="stat-header">
            <span className="stat-icon">🏠</span>
          </div>
          <div className="stat-value">{stats?.listings?.total || 0}</div>
          <div className="stat-label">Tổng tin đăng</div>
        </div>

        <div className="admin-stat-card warning">
          <div className="stat-header">
            <span className="stat-icon">⏳</span>
          </div>
          <div className="stat-value">{stats?.listings?.pending || 0}</div>
          <div className="stat-label">Chờ duyệt</div>
        </div>

        <div className="admin-stat-card danger">
          <div className="stat-header">
            <span className="stat-icon">⚠️</span>
          </div>
          <div className="stat-value">{stats?.reports?.pending || 0}</div>
          <div className="stat-label">Báo cáo vi phạm</div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-icon">✅</span>
          </div>
          <div className="stat-value">{stats?.listings?.approved || 0}</div>
          <div className="stat-label">Đã duyệt</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-icon">❌</span>
          </div>
          <div className="stat-value">{stats?.listings?.rejected || 0}</div>
          <div className="stat-label">Đã từ chối</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-icon">📈</span>
          </div>
          <div className="stat-value">{stats?.users?.newThisWeek || 0}</div>
          <div className="stat-label">User mới tuần này</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-icon">🔒</span>
          </div>
          <div className="stat-value">{stats?.users?.locked || 0}</div>
          <div className="stat-label">Tài khoản bị khóa</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-table-container" style={{ marginTop: '20px' }}>
        <div className="admin-table-header">
          <h2>Hành động nhanh</h2>
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link to="/admin/pending" className="action-btn view" style={{ padding: '12px 24px', fontSize: '1rem' }}>
            ⏳ Duyệt tin đăng ({stats?.listings?.pending || 0})
          </Link>
          <Link to="/admin/reports" className="action-btn approve" style={{ padding: '12px 24px', fontSize: '1rem' }}>
            ⚠️ Xử lý báo cáo ({stats?.reports?.pending || 0})
          </Link>
          <Link to="/admin/users" className="action-btn edit" style={{ padding: '12px 24px', fontSize: '1rem' }}>
            👥 Quản lý User
          </Link>
          <Link to="/admin/listings" className="action-btn" style={{ padding: '12px 24px', fontSize: '1rem', background: '#636e72', color: '#fff' }}>
            🏠 Quản lý Tin đăng
          </Link>
        </div>
      </div>

      {/* Users by Role */}
      {stats?.users?.byRole && (
        <div className="admin-table-container" style={{ marginTop: '20px' }}>
          <div className="admin-table-header">
            <h2>Phân bố người dùng theo Role</h2>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.byRole.map((item) => (
                <tr key={item.role}>
                  <td>
                    <span className={`role-badge role-${item.role}`}>{item.role}</span>
                  </td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
