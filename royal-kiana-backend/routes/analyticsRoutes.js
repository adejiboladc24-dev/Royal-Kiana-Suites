const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { Booking } = require('../models/Booking');

router.get('/stats', verifyToken, async (req, res) => {
  try {
    const stats = await Booking.getStats();
    const userBookings = await Booking.findByUserId(req.user.id);
    
    res.status(200).json({
      userStats: {
        totalBookings: userBookings.length,
        pendingBookings: userBookings.filter(b => b.status === 'pending').length,
        confirmedBookings: userBookings.filter(b => b.status === 'confirmed').length
      },
      globalStats: stats
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
