const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdminLog = sequelize.define('AdminLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  target_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  target_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  details: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'admin_logs',
  timestamps: false
});

// Helper method to create log entry
AdminLog.logAction = async (adminId, action, targetType, targetId, details = null, ipAddress = null) => {
  try {
    await AdminLog.create({
      admin_id: adminId,
      action,
      target_type: targetType,
      target_id: targetId,
      details,
      ip_address: ipAddress
    });
  } catch (error) {
    console.error('Failed to create admin log:', error);
  }
};

module.exports = AdminLog;
