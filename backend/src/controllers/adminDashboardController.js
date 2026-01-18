const { Op } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Report = require('../models/Report');
const AdminLog = require('../models/AdminLog');

// Get admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.count();
    
    // Get users by role
    const usersByRole = await User.findAll({
      attributes: [
        'role',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['role']
    });

    // Get total listings count
    const totalListings = await Listing.count({
      where: { status: { [Op.ne]: 'deleted' } }
    });

    // Get listings pending approval
    const pendingListings = await Listing.count({
      where: { 
        status: { [Op.ne]: 'deleted' },
        approval_status: 'pending'
      }
    });

    // Get approved listings
    const approvedListings = await Listing.count({
      where: { 
        status: { [Op.ne]: 'deleted' },
        approval_status: 'approved'
      }
    });

    // Get rejected listings
    const rejectedListings = await Listing.count({
      where: { 
        status: { [Op.ne]: 'deleted' },
        approval_status: 'rejected'
      }
    });

    // Get pending reports count
    const pendingReports = await Report.count({
      where: { status: 'pending' }
    });

    // Get total reports count
    const totalReports = await Report.count();

    // Get new users this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const newUsersThisWeek = await User.count({
      where: {
        created_at: { [Op.gte]: oneWeekAgo }
      }
    });

    // Get new listings this week
    const newListingsThisWeek = await Listing.count({
      where: {
        created_at: { [Op.gte]: oneWeekAgo },
        status: { [Op.ne]: 'deleted' }
      }
    });

    // Get locked users count
    const lockedUsers = await User.count({
      where: { is_locked: true }
    });

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          byRole: usersByRole,
          newThisWeek: newUsersThisWeek,
          locked: lockedUsers
        },
        listings: {
          total: totalListings,
          pending: pendingListings,
          approved: approvedListings,
          rejected: rejectedListings,
          newThisWeek: newListingsThisWeek
        },
        reports: {
          total: totalReports,
          pending: pendingReports
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Get recent admin activity logs
exports.getActivityLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: logs } = await AdminLog.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};
