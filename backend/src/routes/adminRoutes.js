const express = require('express');
const router = express.Router();
const { requireAdmin, requireSuperAdmin } = require('../middleware/auth');

// Controllers
const adminDashboardController = require('../controllers/adminDashboardController');
const adminUserController = require('../controllers/adminUserController');
const adminListingController = require('../controllers/adminListingController');
const adminReportController = require('../controllers/adminReportController');

// ============ Dashboard Routes ============
router.get('/dashboard/stats', requireAdmin, adminDashboardController.getDashboardStats);
router.get('/dashboard/activity-logs', requireAdmin, adminDashboardController.getActivityLogs);

// ============ User Management Routes ============
router.get('/users', requireAdmin, adminUserController.getUsers);
router.get('/users/:id', requireAdmin, adminUserController.getUserById);
router.patch('/users/:id/role', requireAdmin, adminUserController.updateUserRole);
router.patch('/users/:id/lock', requireAdmin, adminUserController.toggleUserLock);
router.post('/users/:id/reset-password', requireSuperAdmin, adminUserController.resetUserPassword);

// ============ Listing Management Routes ============
router.get('/listings', requireAdmin, adminListingController.getListings);
router.get('/listings/pending', requireAdmin, adminListingController.getPendingListings);
router.patch('/listings/:id/approve', requireAdmin, adminListingController.approveListing);
router.patch('/listings/:id/reject', requireAdmin, adminListingController.rejectListing);
router.patch('/listings/:id/visibility', requireAdmin, adminListingController.toggleListingVisibility);
router.put('/listings/:id', requireAdmin, adminListingController.updateListing);
router.delete('/listings/:id', requireAdmin, adminListingController.deleteListing);

// ============ Report Management Routes ============
router.get('/reports', requireAdmin, adminReportController.getReports);
router.get('/reports/pending', requireAdmin, adminReportController.getPendingReports);
router.get('/reports/:id', requireAdmin, adminReportController.getReportById);
router.patch('/reports/:id', requireAdmin, adminReportController.updateReportStatus);
router.post('/reports/:id/handle', requireAdmin, adminReportController.handleReport);

module.exports = router;
