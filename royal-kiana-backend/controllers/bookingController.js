const { Booking } = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { roomType, checkIn, checkOut, guests, totalPrice } = req.body;
    const userId = req.user.id;

    if (!roomType || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({ error: 'All booking fields are required' });
    }

    const booking = await Booking.create(userId, roomType, checkIn, checkOut, guests, totalPrice);

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Server error creating booking' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findByUserId(req.user.id);

    res.status(200).json({
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Server error fetching bookings' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Server error fetching booking' });
  }
};
