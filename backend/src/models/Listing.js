const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Location = require('./Location');

// Import will be done after model definition to avoid circular dependency
let Amenity, EnvironmentTag, TargetAudience, Review;

// Approval status constants
const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const Listing = sequelize.define('Listing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  area: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['phong-tro', 'nha-nguyen-can', 'can-ho']]
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  province_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'locations',
      key: 'id'
    }
  },
  district_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'locations',
      key: 'id'
    }
  },
  ward_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'locations',
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
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'deleted']]
    }
  },
  approval_status: {
    type: DataTypes.STRING(50),
    defaultValue: APPROVAL_STATUS.PENDING,
    validate: {
      isIn: [[APPROVAL_STATUS.PENDING, APPROVAL_STATUS.APPROVED, APPROVAL_STATUS.REJECTED]]
    }
  },
  admin_note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewed_at: {
    type: DataTypes.DATE,
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
  tableName: 'listings',
  timestamps: false
});

// Export constants
Listing.APPROVAL_STATUS = APPROVAL_STATUS;

// Associations
Listing.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Listing.belongsTo(Location, { foreignKey: 'province_id', as: 'province' });
Listing.belongsTo(Location, { foreignKey: 'district_id', as: 'district' });
Listing.belongsTo(Location, { foreignKey: 'ward_id', as: 'ward' });

// Set up many-to-many associations after export to avoid circular dependencies
Listing.associate = () => {
  Amenity = require('./Amenity');
  EnvironmentTag = require('./EnvironmentTag');
  TargetAudience = require('./TargetAudience');
  Review = require('./Review');

  Listing.belongsToMany(Amenity, {
    through: 'listing_amenities',
    foreignKey: 'listing_id',
    otherKey: 'amenity_id',
    as: 'amenities'
  });

  Listing.belongsToMany(EnvironmentTag, {
    through: 'listing_environment_tags',
    foreignKey: 'listing_id',
    otherKey: 'environment_tag_id',
    as: 'environmentTags'
  });

  Listing.belongsToMany(TargetAudience, {
    through: 'listing_target_audiences',
    foreignKey: 'listing_id',
    otherKey: 'target_audience_id',
    as: 'targetAudiences'
  });

  Listing.hasMany(Review, {
    foreignKey: 'listing_id',
    as: 'reviews'
  });
};

module.exports = Listing;
