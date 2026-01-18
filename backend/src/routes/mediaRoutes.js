const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/listings/:id/media', mediaController.getListingMedia);
router.get('/listings/:id/video-reviews', mediaController.getVideoReviews);

// Protected routes (require authentication)
router.post('/listings/:id/media', authMiddleware, mediaController.uploadListingMedia);
router.post('/listings/:id/video', authMiddleware, mediaController.uploadListingVideo);
router.post('/listings/:id/review-media', authMiddleware, mediaController.uploadReviewMedia);
router.put('/listings/:id/media-order', authMiddleware, mediaController.updateMediaOrder);
router.put('/listings/:id/hero-video/:videoId', authMiddleware, mediaController.setHeroVideo);

// Media interaction routes
router.post('/media/:mediaId/like', authMiddleware, mediaController.toggleMediaLike);
router.post('/media/:mediaId/report', authMiddleware, mediaController.reportMedia);
router.delete('/media/:mediaId', authMiddleware, mediaController.deleteMedia);

module.exports = router;
