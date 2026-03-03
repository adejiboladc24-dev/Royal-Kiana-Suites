const express = require('express');
const router = express.Router();
const { verifyToken, requireStaff } = require('../middleware/authMiddleware');
const { pool } = require('../config/db');

// Staff login (separate from regular user login)
router.post('/staff/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple staff authentication (in production, use proper password hashing)
    if (username === 'staff' && password === 'royal2026') {
      // Generate a staff token
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { id: 'staff-001', role: 'staff', username },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        message: 'Staff login successful',
        token,
        staff: { username, role: 'staff' }
      });
    } else {
      res.status(401).json({ error: 'Invalid staff credentials' });
    }
  } catch (error) {
    console.error('Staff login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all bookings (staff only)
router.get('/bookings', verifyToken, requireStaff, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.room_type,
        b.check_in,
        b.check_out,
        b.guests,
        b.total_price,
        b.status,
        b.created_at,
        u.name as guest_name,
        u.email as guest_email
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
      LIMIT 50
    `);

    res.json({ bookings: result.rows });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get dashboard stats (staff only)
router.get('/stats', verifyToken, requireStaff, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Total bookings
    const totalBookings = await pool.query('SELECT COUNT(*) FROM bookings');
    
    // Check-ins today
    const checkInsToday = await pool.query(
      'SELECT COUNT(*) FROM bookings WHERE check_in = $1',
      [today]
    );
    
    // Check-outs today
    const checkOutsToday = await pool.query(
      'SELECT COUNT(*) FROM bookings WHERE check_out = $1',
      [today]
    );
    
    // Occupied rooms (bookings where today is between check-in and check-out)
    const occupiedRooms = await pool.query(
      'SELECT COUNT(*) FROM bookings WHERE check_in <= $1 AND check_out >= $1',
      [today]
    );

    res.json({
      stats: {
        totalBookings: parseInt(totalBookings.rows[0].count),
        checkInsToday: parseInt(checkInsToday.rows[0].count),
        checkOutsToday: parseInt(checkOutsToday.rows[0].count),
        occupiedRooms: parseInt(occupiedRooms.rows[0].count),
        totalRooms: 50
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update booking status (staff only)
router.patch('/bookings/:id/status', verifyToken, requireStaff, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      message: 'Booking status updated',
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (staff only)
router.get('/users', verifyToken, requireStaff, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        email,
        created_at,
        (SELECT COUNT(*) FROM bookings WHERE user_id = users.id) as total_bookings
      FROM users
      ORDER BY created_at DESC
    `);

    res.json({ users: result.rows });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
