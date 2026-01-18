const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Basic authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không tìm thấy token xác thực' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key');
    
    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token không hợp lệ hoặc đã hết hạn' 
    });
  }
};

// Admin authentication middleware - requires ADMIN or SUPER_ADMIN role
const requireAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không tìm thấy token xác thực' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key');
    
    // Check if user has admin role
    if (decoded.role !== User.ROLES.ADMIN && decoded.role !== User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Bạn không có quyền truy cập chức năng này' 
      });
    }

    // Verify user still exists and is not locked
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Người dùng không tồn tại' 
      });
    }

    if (user.is_locked) {
      return res.status(403).json({ 
        success: false, 
        message: 'Tài khoản đã bị khóa' 
      });
    }

    // Add user info to request
    req.user = decoded;
    req.adminUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token không hợp lệ hoặc đã hết hạn' 
    });
  }
};

// Super Admin authentication middleware - requires SUPER_ADMIN role only
const requireSuperAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không tìm thấy token xác thực' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key');
    
    // Check if user has super admin role
    if (decoded.role !== User.ROLES.SUPER_ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: 'Chỉ Super Admin mới có quyền thực hiện chức năng này' 
      });
    }

    // Verify user still exists and is not locked
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Người dùng không tồn tại' 
      });
    }

    if (user.is_locked) {
      return res.status(403).json({ 
        success: false, 
        message: 'Tài khoản đã bị khóa' 
      });
    }

    // Add user info to request
    req.user = decoded;
    req.adminUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token không hợp lệ hoặc đã hết hạn' 
    });
  }
};

module.exports = authMiddleware;
module.exports.requireAdmin = requireAdmin;
module.exports.requireSuperAdmin = requireSuperAdmin;
