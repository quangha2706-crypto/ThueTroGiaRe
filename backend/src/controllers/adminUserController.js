const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AdminLog = require('../models/AdminLog');

// Get all users with filters
exports.getUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search,
      role,
      is_locked,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    if (is_locked !== undefined) {
      where.is_locked = is_locked === 'true';
    }

    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: ['id', 'name', 'email', 'phone', 'role', 'is_locked', 'created_at'],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]]
    });

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Get single user details
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'phone', 'role', 'is_locked', 'created_at']
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy người dùng' 
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const adminId = req.user.id;
    const adminRole = req.user.role;

    // Validate role
    if (!Object.values(User.ROLES).includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Role không hợp lệ' 
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy người dùng' 
      });
    }

    // Prevent ADMIN from modifying SUPER_ADMIN
    if (user.role === User.ROLES.SUPER_ADMIN && adminRole !== User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Bạn không có quyền thay đổi role của Super Admin' 
      });
    }

    // Only SUPER_ADMIN can set SUPER_ADMIN role
    if (role === User.ROLES.SUPER_ADMIN && adminRole !== User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Chỉ Super Admin mới có quyền gán role Super Admin' 
      });
    }

    const oldRole = user.role;
    await user.update({ role });

    // Log admin action
    await AdminLog.logAction(
      adminId,
      'UPDATE_USER_ROLE',
      'user',
      user.id,
      { oldRole, newRole: role },
      req.ip
    );

    res.json({
      success: true,
      message: 'Cập nhật role thành công',
      data: { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Lock/Unlock user account
exports.toggleUserLock = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_locked, reason } = req.body;
    const adminId = req.user.id;
    const adminRole = req.user.role;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy người dùng' 
      });
    }

    // Prevent locking SUPER_ADMIN
    if (user.role === User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Không thể khóa tài khoản Super Admin' 
      });
    }

    // Prevent ADMIN from locking other ADMIN
    if (user.role === User.ROLES.ADMIN && adminRole !== User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Chỉ Super Admin mới có quyền khóa tài khoản Admin' 
      });
    }

    await user.update({ is_locked });

    // Log admin action
    await AdminLog.logAction(
      adminId,
      is_locked ? 'LOCK_USER' : 'UNLOCK_USER',
      'user',
      user.id,
      { reason },
      req.ip
    );

    res.json({
      success: true,
      message: is_locked ? 'Khóa tài khoản thành công' : 'Mở khóa tài khoản thành công',
      data: { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_locked: user.is_locked
        }
      }
    });
  } catch (error) {
    console.error('Toggle user lock error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Reset user password
exports.resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_password } = req.body;
    const adminId = req.user.id;
    const adminRole = req.user.role;

    if (!new_password || new_password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mật khẩu mới phải có ít nhất 6 ký tự' 
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy người dùng' 
      });
    }

    // Prevent resetting SUPER_ADMIN password by non-SUPER_ADMIN
    if (user.role === User.ROLES.SUPER_ADMIN && adminRole !== User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Bạn không có quyền đặt lại mật khẩu Super Admin' 
      });
    }

    // Hash new password
    const password_hash = await bcrypt.hash(new_password, 10);
    await user.update({ password_hash });

    // Log admin action
    await AdminLog.logAction(
      adminId,
      'RESET_USER_PASSWORD',
      'user',
      user.id,
      null,
      req.ip
    );

    res.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công'
    });
  } catch (error) {
    console.error('Reset user password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};
