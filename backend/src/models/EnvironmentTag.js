const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EnvironmentTag = sequelize.define('EnvironmentTag', {
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
  tableName: 'environment_tags',
  timestamps: false
});

// Set up associations after export
EnvironmentTag.associate = () => {
  const Listing = require('./Listing');
  EnvironmentTag.belongsToMany(Listing, {
    through: 'listing_environment_tags',
    foreignKey: 'environment_tag_id',
    otherKey: 'listing_id',
    as: 'listings'
  });
};

module.exports = EnvironmentTag;
