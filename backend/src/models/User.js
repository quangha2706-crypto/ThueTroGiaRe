const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Role constants for RBAC
const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(50),
    defaultValue: ROLES.USER,
    validate: {
      isIn: [[ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN]]
    }
  },
  is_locked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Static methods for role checking
User.ROLES = ROLES;

User.prototype.isAdmin = function() {
  return this.role === ROLES.ADMIN || this.role === ROLES.SUPER_ADMIN;
};

User.prototype.isSuperAdmin = function() {
  return this.role === ROLES.SUPER_ADMIN;
};

module.exports = User;
