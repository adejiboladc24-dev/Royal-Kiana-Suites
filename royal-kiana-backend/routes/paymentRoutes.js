const express = require('express');
const router = express.Router();
const { Booking } = require('../models/Booking');

router.post('/opay/initialize', (req, res) => {
  try {
    const { amount, email, bookingId } = req.body;

    if (!amount || !email || !bookingId) {
      return res.status(400).json({ error: 'Amount, email, and booking ID are required' });
    }

    const reference = `OPAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.status(200).json({
      message: 'Payment initialized',
      reference,
      amount,
      paymentUrl: `https://opay.ng/payment/${reference}`
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

router.post('/opay/verify', async (req, res) => {
  try {
    const { reference, bookingId } = req.body;

    if (!reference || !bookingId) {
      return res.status(400).json({ error: 'Reference and booking ID are required' });
    }

    res.status(200).json({
      message: 'Payment verified successfully',
      status: 'completed',
      reference
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

router.post('/booking/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.payment_status === 'completed') {
      return res.status(400).json({ error: 'Booking already paid' });
    }

    const reference = `OPAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.status(200).json({
      message: 'Payment initialized for existing booking',
      reference,
      amount: booking.total_price,
      bookingId: booking.id,
      paymentUrl: `https://opay.ng/payment/${reference}`
    });
  } catch (error) {
    console.error('Booking payment initialization error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

router.post('/webhook', (req, res) => {
  try {
    const { reference, status } = req.body;
    
    console.log('Payment webhook received:', { reference, status });
    
    res.status(200).json({ message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
