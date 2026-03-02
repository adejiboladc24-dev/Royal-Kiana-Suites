import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';

const StaffPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [staffAuth, setStaffAuth] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    checkInsToday: 0,
    checkOutsToday: 0,
    occupiedRooms: 0,
    totalRooms: 50
  });
  const [dataLoading, setDataLoading] = useState(false);

  // Check if staff is already logged in
  useEffect(() => {
    const staffToken = localStorage.getItem('staffToken');
    if (staffToken) {
      setStaffAuth(true);
      fetchDashboardData();
    }
  }, []);

  // Fetch dashboard data when authenticated
  useEffect(() => {
    if (staffAuth) {
      fetchDashboardData();
    }
  }, [staffAuth]);

  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getBookings()
      ]);
      
      setStats(statsRes.data.stats);
      setBookings(bookingsRes.data.bookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        handleStaffLogout();
      }
    } finally {
      setDataLoading(false);
    }
  };

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await adminAPI.staffLogin(credentials);
      localStorage.setItem('staffToken', response.data.token);
      localStorage.setItem('token', response.data.token); // For API interceptor
      setStaffAuth(true);
      setLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.error || 'Invalid credentials. Use username: staff, password: royal2026');
      setLoading(false);
    }
  };

  const handleStaffLogout = () => {
    localStorage.removeItem('staffToken');
    localStorage.removeItem('token');
    setStaffAuth(false);
    setCredentials({ username: '', password: '' });
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await adminAPI.updateBookingStatus(bookingId, newStatus);
      // Refresh bookings
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update booking status');
    }
  };

  const statsDisplay = [
    { 
      label: 'Total Bookings', 
      value: stats.totalBookings.toString(), 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    { 
      label: 'Check-ins Today', 
      value: stats.checkInsToday.toString(), 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400'
    },
    { 
      label: 'Check-outs Today', 
      value: stats.checkOutsToday.toString(), 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    { 
      label: 'Occupied Rooms', 
      value: `${stats.occupiedRooms}/${stats.totalRooms}`, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
  ];

  if (!staffAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="card-premium">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Staff Portal
              </h1>
              <p className="text-gray-600 dark:text-white/60">
                Login to access staff management
              </p>
            </div>

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="input-field"
                  placeholder="Enter staff username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="input-field"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-center text-sm text-gray-600 dark:text-white/60 mt-4">
                Demo credentials: <br />
                <code className="bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">staff / royal2026</code>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <section className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Staff Management Portal
              </h1>
              <p className="text-gray-600 dark:text-white/60 text-sm">
                Welcome back, Staff Member
              </p>
            </div>
            <button
              onClick={handleStaffLogout}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {dataLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-600 dark:text-white/60">Loading dashboard data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsDisplay.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-white/60 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center ${stat.textColor}`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-white/10">
            {['bookings', 'rooms', 'guests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-4 font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Recent Bookings
                </h2>
                <button
                  onClick={fetchDashboardData}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>
              
              {dataLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-white/60">No bookings found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Guest</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Room</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Check-in</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Check-out</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Guests</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">#{booking.id.toString().slice(-8)}</td>
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{booking.guest_name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-white/70">{booking.guest_email}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-white/70">{booking.room_type}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-white/70">{new Date(booking.check_in).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-white/70">{new Date(booking.check_out).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-white/70">{booking.guests}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">₦{parseInt(booking.total_price).toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                              className="text-sm border border-gray-300 dark:border-white/10 rounded-lg px-2 py-1 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium text-center py-12"
            >
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Room Management
              </h3>
              <p className="text-gray-600 dark:text-white/60">
                Room availability and management features coming soon
              </p>
            </motion.div>
          )}

          {/* Guests Tab */}
          {activeTab === 'guests' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium text-center py-12"
            >
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Guest Management
              </h3>
              <p className="text-gray-600 dark:text-white/60">
                Guest profiles and history features coming soon
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StaffPortal;
