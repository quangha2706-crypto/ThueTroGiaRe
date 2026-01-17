const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Amenity = sequelize.define('Amenity', {
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
  tableName: 'amenities',
  timestamps: false
});

// Set up associations after export
Amenity.associate = () => {
  const Listing = require('./Listing');
  Amenity.belongsToMany(Listing, {
    through: 'listing_amenities',
    foreignKey: 'amenity_id',
    otherKey: 'listing_id',
    as: 'listings'
  });
};

module.exports = Amenity;
