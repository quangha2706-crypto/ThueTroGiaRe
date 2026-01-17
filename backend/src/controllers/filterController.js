const Amenity = require('../models/Amenity');
const EnvironmentTag = require('../models/EnvironmentTag');
const TargetAudience = require('../models/TargetAudience');

// Get all amenities
exports.getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: { amenities }
    });
  } catch (error) {
    console.error('Get amenities error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Get all environment tags
exports.getEnvironments = async (req, res) => {
  try {
    const environments = await EnvironmentTag.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: { environments }
    });
  } catch (error) {
    console.error('Get environments error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};

// Get all target audiences
exports.getAudiences = async (req, res) => {
  try {
    const audiences = await TargetAudience.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: { audiences }
    });
  } catch (error) {
    console.error('Get audiences error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server', 
      error: error.message 
    });
  }
};
