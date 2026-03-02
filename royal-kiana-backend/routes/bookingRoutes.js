const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/', verifyToken, bookingController.createBooking);
router.get('/', verifyToken, bookingController.getUserBookings);
router.get('/:id', verifyToken, bookingController.getBookingById);

module.exports = router;
