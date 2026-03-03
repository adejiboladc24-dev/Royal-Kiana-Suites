import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { dashboardAPI, bookingAPI, paymentAPI } from '../utils/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    stats: { totalBookings: 0, upcomingBookings: 0, completedBookings: 0 }
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState({});

  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const [dashRes, bookingsRes] = await Promise.all([
        dashboardAPI.getDashboard(),
        bookingAPI.getUserBookings()
      ]);
      setDashboardData(dashRes.data);
      setBookings(bookingsRes.data.bookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handlePayment = async (bookingId) => {
    setPaymentLoading(prev => ({ ...prev, [bookingId]: true }));
    
    try {
      const response = await paymentAPI.payForBooking(bookingId);
      
      // In a real implementation, redirect to payment gateway
      alert(`Payment initialized! Reference: ${response.data.reference}\nAmount: ₦${parseFloat(response.data.amount).toLocaleString()}\n\nIn production, this would redirect to the payment gateway.`);
      
      // Refresh bookings after payment initialization
      await fetchData();
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.error || 'Payment initialization failed');
    } finally {
      setPaymentLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const getBookingStatusColor = (status, paymentStatus) => {
    if (paymentStatus === 'completed') {
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    }
    if (status === 'confirmed') {
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    }
    if (status === 'cancelled') {
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    }
    return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
  };

  const getBookingStatusText = (status, paymentStatus) => {
    if (paymentStatus === 'completed') return 'Paid';
    if (status === 'confirmed') return 'Confirmed';
    if (status === 'cancelled') return 'Cancelled';
    return 'Pending Payment';
  };

  const isUpcoming = (checkIn) => {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    return checkInDate >= today;
  };

  const isCompleted = (checkOut) => {
    const today = new Date();
    const checkOutDate = new Date(checkOut);
    return checkOutDate < today;
  };

  const categorizeBookings = () => {
    const pending = bookings.filter(b => b.payment_status !== 'completed' && b.status !== 'cancelled');
    const upcoming = bookings.filter(b => b.payment_status === 'completed' && isUpcoming(b.check_in) && !isCompleted(b.check_out));
    const completed = bookings.filter(b => isCompleted(b.check_out));
    const cancelled = bookings.filter(b => b.status === 'cancelled');
    
    return { pending, upcoming, completed, cancelled };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-900">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Dashboard Access
              </h1>
              <p className="text-gray-600 dark:text-white/60 mb-8">
                Please login to access your dashboard and manage your bookings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Create Account</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  const { pending, upcoming, completed } = categorizeBookings();

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-900">
      <section className="py-12 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-white/90">Manage your bookings and profile</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-premium"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-white/60 text-sm mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {bookings.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-premium"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-white/60 text-sm mb-1">Pending Payment</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {pending.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-premium"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-white/60 text-sm mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {upcoming.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-premium"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-white/60 text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {completed.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Your Bookings
              </h2>

              {bookings.length === 0 ? (
                <div className="card-premium text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-gray-600 dark:text-white/60 mb-6">
                    Start planning your perfect stay at Royal Kiana Hotel
                  </p>
                  <a href="/booking" className="btn-primary inline-flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book Now</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card-premium"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-4 lg:mb-0 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {booking.room_type}
                            </h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBookingStatusColor(booking.status, booking.payment_status)}`}>
                              {getBookingStatusText(booking.status, booking.payment_status)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-white/60">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>
                                {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              <span>₦{parseFloat(booking.total_price).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {booking.payment_status !== 'completed' && booking.status !== 'cancelled' && (
                            <button
                              onClick={() => handlePayment(booking.id)}
                              disabled={paymentLoading[booking.id]}
                              className="btn-primary flex items-center space-x-2 text-sm px-4 py-2"
                            >
                              {paymentLoading[booking.id] ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  <span>Processing...</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                  </svg>
                                  <span>Pay Now</span>
                                </>
                              )}
                            </button>
                          )}
                          
                          {booking.payment_status === 'completed' && (
                            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-medium">Paid</span>
                            </div>
                          )}
                          
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              ₦{parseFloat(booking.total_price).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-white/50">
                              Booked {new Date(booking.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Profile
              </h2>
              <div className="card-premium">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/60">{user?.email}</p>
                </div>

                <div className="space-y-3">
                  <a href="/booking" className="block w-full btn-primary text-center">
                    New Booking
                  </a>
                  <button
                    onClick={logout}
                    className="block w-full btn-secondary text-center"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div className="card-premium">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Need Help?</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <a href="tel:07070279453" className="flex items-center space-x-3 text-gray-600 dark:text-white/70 hover:text-primary-500 transition-colors">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span>07070279453</span>
                  </a>
                  <a href="mailto:adejiboladc24@gmail.com" className="flex items-center space-x-3 text-gray-600 dark:text-white/70 hover:text-primary-500 transition-colors">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>Email Support</span>
                  </a>
                  <a href="https://wa.me/2347070279453" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-600 dark:text-white/70 hover:text-primary-500 transition-colors">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
