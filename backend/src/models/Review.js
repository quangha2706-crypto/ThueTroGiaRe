const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  listing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'listings',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reviews',
  timestamps: false
});

// Set up associations after export
Review.associate = () => {
  const Listing = require('./Listing');
  const User = require('./User');
  const ReviewVideo = require('./ReviewVideo');
  
  Review.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
  Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Review.hasMany(ReviewVideo, { foreignKey: 'review_id', as: 'videos' });
};

module.exports = Review;
