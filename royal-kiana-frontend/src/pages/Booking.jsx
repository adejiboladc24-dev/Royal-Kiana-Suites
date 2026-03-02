import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { bookingAPI } from '../utils/api';

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomType: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const rooms = [
    { name: 'Standard Room', price: 25000 },
    { name: 'Deluxe Room', price: 35000 },
    { name: 'Executive Suite', price: 50000 },
    { name: 'Family Suite', price: 60000 },
    { name: 'Presidential Suite', price: 120000 },
    { name: 'Honeymoon Suite', price: 80000 }
  ];

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomType) return 0;
    const room = rooms.find(r => r.name === formData.roomType);
    if (!room) return 0;
    const days = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24));
    return days > 0 ? room.price * days : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login or create an account to complete your booking');
      setTimeout(() => {
        navigate('/login', { state: { from: '/booking' } });
      }, 2000);
      return;
    }

    // Validate dates
    if (formData.checkIn === formData.checkOut) {
      setError('Check-out date must be after check-in date');
      return;
    }

    const total = calculateTotal();
    if (total <= 0) {
      setError('Please select valid dates for your stay');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await bookingAPI.create({ ...formData, totalPrice: total });
      setBookingId(response.data.booking.id);
      setShowPayment(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setSuccess(true);
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-900">
      <section className="relative py-32 overflow-hidden">
        {/* Background Image - Hotel Lobby/Reception */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80)'
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Book Your Stay
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">Reserve your perfect room at Royal Kiana Hotel</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card-premium">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  Payment Confirmed!
                </h2>
                <p className="text-gray-600 dark:text-white/60 mb-6">
                  Your booking has been confirmed. Redirecting to dashboard...
                </p>
              </div>
            ) : showPayment ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    Complete Payment
                  </h2>
                  <p className="text-gray-600 dark:text-white/60">
                    Booking ID: <span className="font-semibold text-primary-600 dark:text-primary-400">#{bookingId.toString().slice(-8).toUpperCase()}</span>
                  </p>
                </div>

                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 dark:text-white/80 font-semibold">Total Amount:</span>
                    <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      ₦{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Choose Payment Method:</h3>
                  
                  {/* OPay - Direct Transfer */}
                  <button
                    onClick={() => {
                      const shortId = bookingId.toString().slice(-8).toUpperCase();
                      // Copy account number to clipboard
                      navigator.clipboard.writeText('7070279453');
                      // Open OPay app or web
                      window.open('opay://transfer?account=7070279453&amount=' + calculateTotal() + '&remark=' + shortId, '_blank');
                      // Fallback to web if app not installed
                      setTimeout(() => {
                        alert('Account Number: 7070279453 (Copied to clipboard)\nAccount Name: Idowu Mary Adeleke\nAmount: ₦' + calculateTotal().toLocaleString() + '\nReference: #' + shortId);
                      }, 500);
                    }}
                    className="w-full card-premium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-lg mb-1">Pay with OPay</h4>
                          <p className="text-sm text-white/90">Instant transfer - Opens OPay app</p>
                          <p className="text-xs text-white/80 mt-1">7070279453 • Idowu Mary Adeleke</p>
                        </div>
                      </div>
                      <svg className="w-6 h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Bank Transfer */}
                  <div className="card-premium bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Bank Transfer</h4>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('0123456789');
                          alert('Account number copied: 0123456789');
                        }}
                        className="flex items-center space-x-1 text-xs bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-white/70 ml-15">
                      <p><strong>Bank:</strong> Access Bank</p>
                      <p><strong>Account Name:</strong> Royal Kiana Hotel</p>
                      <p><strong>Account Number:</strong> 0123456789</p>
                      <div className="flex items-start space-x-2 text-xs text-primary-600 dark:text-primary-400 mt-3 bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Use reference: <strong>#{bookingId.toString().slice(-8).toUpperCase()}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Pay at Hotel */}
                  <div className="card-premium bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Pay at Hotel</h4>
                        <p className="text-sm text-gray-600 dark:text-white/70">
                          Pay when you arrive. Cash and card payments accepted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-700 dark:text-white/80">
                      Need Help with Payment?
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 ml-8">
                    <a 
                      href="tel:07070279453" 
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call Us</span>
                    </a>
                    <a 
                      href={"https://wa.me/2347070279453?text=Hi, I need help with my booking payment. Booking ID: #" + bookingId.toString().slice(-8).toUpperCase()} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePaymentComplete}
                    className="flex-1 btn-primary"
                  >
                    I've Made Payment
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 btn-secondary"
                  >
                    Pay Later
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
                  Reservation Details
                </h2>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Room Type
                    </label>
                    <select
                      required
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select a room</option>
                      {rooms.map(room => (
                        <option key={room.name} value={room.name}>
                          {room.name} - ₦{room.price.toLocaleString()}/night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        required
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows="4"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="input-field"
                      placeholder="Any special requirements or requests..."
                    />
                  </div>

                  {calculateTotal() > 0 && (
                    <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-white/80">Total Amount:</span>
                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          ₦{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-white/60">
                        Payment can be made via bank transfer or at the hotel
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
