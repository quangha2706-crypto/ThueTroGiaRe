const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReviewVideo = sequelize.define('ReviewVideo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'reviews',
      key: 'id'
    }
  },
  video_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'review_videos',
  timestamps: false
});

// Set up associations after export
ReviewVideo.associate = () => {
  const Review = require('./Review');
  ReviewVideo.belongsTo(Review, { foreignKey: 'review_id', as: 'review' });
};

module.exports = ReviewVideo;
