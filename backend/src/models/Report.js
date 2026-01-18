const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed'
};

const TARGET_TYPES = {
  LISTING: 'listing',
  USER: 'user',
  REVIEW: 'review'
};

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reporter_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  target_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [[TARGET_TYPES.LISTING, TARGET_TYPES.USER, TARGET_TYPES.REVIEW]]
    }
  },
  target_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  severity: {
    type: DataTypes.STRING(20),
    defaultValue: SEVERITY_LEVELS.LOW,
    validate: {
      isIn: [[SEVERITY_LEVELS.LOW, SEVERITY_LEVELS.MEDIUM, SEVERITY_LEVELS.HIGH, SEVERITY_LEVELS.CRITICAL]]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: REPORT_STATUS.PENDING,
    validate: {
      isIn: [[REPORT_STATUS.PENDING, REPORT_STATUS.REVIEWED, REPORT_STATUS.RESOLVED, REPORT_STATUS.DISMISSED]]
    }
  },
  handled_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  handled_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  admin_note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reports',
  timestamps: false
});

// Export constants
Report.SEVERITY_LEVELS = SEVERITY_LEVELS;
Report.REPORT_STATUS = REPORT_STATUS;
Report.TARGET_TYPES = TARGET_TYPES;

module.exports = Report;
