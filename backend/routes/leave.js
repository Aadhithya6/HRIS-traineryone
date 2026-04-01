const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const role = require('../middleware/role');
const {
  applyLeave,
  getMyLeaves,
  getTeamLeaves,
  managerAction,
  getAllLeaves,
  hrAction,
} = require('../controllers/leaveController');

// All leave routes require authentication
router.use(authMiddleware);

// EMPLOYEE routes
router.post('/apply', role('employee'), applyLeave);
router.get('/my', role('employee'), getMyLeaves);

// MANAGER routes
router.get('/team', role('manager'), getTeamLeaves);
router.patch('/:id/manager-action', role('manager'), managerAction);

// HR routes
router.get('/all', role('hr'), getAllLeaves);
router.patch('/:id/hr-action', role('hr'), hrAction);

module.exports = router;
