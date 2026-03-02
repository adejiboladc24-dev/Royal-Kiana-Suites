const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

router.get('/', verifyToken, dashboardController.getDashboard);
router.get('/profile', verifyToken, dashboardController.getProfile);
router.put('/profile', verifyToken, dashboardController.updateProfile);

module.exports = router;
