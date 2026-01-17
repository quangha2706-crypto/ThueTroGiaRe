const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');

// Public routes
router.get('/amenities', filterController.getAmenities);
router.get('/environments', filterController.getEnvironments);
router.get('/audiences', filterController.getAudiences);

module.exports = router;
