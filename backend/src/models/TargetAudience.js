const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TargetAudience = sequelize.define('TargetAudience', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'target_audiences',
  timestamps: false
});

// Set up associations after export
TargetAudience.associate = () => {
  const Listing = require('./Listing');
  TargetAudience.belongsToMany(Listing, {
    through: 'listing_target_audiences',
    foreignKey: 'target_audience_id',
    otherKey: 'listing_id',
    as: 'listings'
  });
};

module.exports = TargetAudience;
