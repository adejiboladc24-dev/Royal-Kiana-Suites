import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  requestPasswordReset: (email) => api.post('/auth/request-password-reset', { email }),
  verifyResetCode: (email, code) => api.post('/auth/verify-reset-code', { email, code }),
  resetPassword: (email, code, newPassword) => api.post('/auth/reset-password', { email, code, newPassword }),
};

// Dashboard endpoints
export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
  getProfile: () => api.get('/dashboard/profile'),
  updateProfile: (data) => api.put('/dashboard/profile', data),
};

// Booking endpoints
export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
};

// Payment endpoints
export const paymentAPI = {
  initialize: (data) => api.post('/payment/opay/initialize', data),
  verify: (data) => api.post('/payment/opay/verify', data),
};

// Admin/Staff endpoints
export const adminAPI = {
  staffLogin: (data) => api.post('/admin/staff/login', data),
  getStats: () => api.get('/admin/stats'),
  getBookings: () => api.get('/admin/bookings'),
  updateBookingStatus: (id, status) => api.patch(`/admin/bookings/${id}/status`, { status }),
  getUsers: () => api.get('/admin/users'),
};

// Analytics endpoints
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
};

export default api;
