const db = require('../config/db');

const createBookingsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      room_type VARCHAR(100) NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INTEGER NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      payment_status VARCHAR(50) DEFAULT 'pending',
      payment_reference VARCHAR(255),
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await db.query(query);
    console.log('Bookings table ready');
  } catch (error) {
    console.error('Error creating bookings table:', error);
  }
};

const Booking = {
  create: async (userId, roomType, checkIn, checkOut, guests, totalPrice) => {
    const query = `
      INSERT INTO bookings (user_id, room_type, check_in, check_out, guests, total_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [userId, roomType, checkIn, checkOut, guests, totalPrice];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  findByUserId: async (userId) => {
    const query = 'SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await db.query(query, [userId]);
    return result.rows;
  },

  findById: async (id) => {
    const query = 'SELECT * FROM bookings WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  updatePaymentStatus: async (id, status, reference) => {
    const query = `
      UPDATE bookings 
      SET payment_status = $1, payment_reference = $2, status = 'confirmed'
      WHERE id = $3
      RETURNING *
    `;
    const result = await db.query(query, [status, reference, id]);
    return result.rows[0];
  },

  getAll: async () => {
    const query = `
      SELECT b.*, u.name as user_name, u.email as user_email
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  getStats: async () => {
    const query = `
      SELECT 
        COUNT(*) as total_bookings,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_bookings,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_bookings,
        COALESCE(SUM(CASE WHEN payment_status = 'completed' THEN total_price ELSE 0 END), 0) as total_revenue
      FROM bookings
    `;
    const result = await db.query(query);
    return result.rows[0];
  }
};

module.exports = { Booking, createBookingsTable };
