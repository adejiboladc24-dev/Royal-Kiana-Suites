# Staff Management Portal - Integration Guide

## Overview
The Staff Management Portal is now fully integrated with the backend, providing real-time data for hotel staff to manage bookings, view statistics, and monitor operations.

## Features

### 1. Staff Authentication
- **Login Credentials**: 
  - Username: `staff`
  - Password: `royal2026`
- **Token-based Authentication**: JWT tokens stored in localStorage
- **Auto-login**: Persists staff session across page refreshes
- **Secure Logout**: Clears all authentication tokens

### 2. Dashboard Statistics (Real-time)
- **Total Bookings**: Count of all bookings in the system
- **Check-ins Today**: Bookings with check-in date = today
- **Check-outs Today**: Bookings with check-out date = today
- **Occupied Rooms**: Current active bookings (today between check-in and check-out)
- **Total Rooms**: Fixed at 50 rooms

### 3. Bookings Management
- **View All Bookings**: Complete list with guest details
- **Booking Information**:
  - Booking ID (shortened to last 8 characters)
  - Guest name and email
  - Room type
  - Check-in and check-out dates
  - Number of guests
  - Total amount (in Naira)
  - Current status
- **Status Management**: Update booking status via dropdown
  - Pending (yellow badge)
  - Confirmed (green badge)
  - Completed (blue badge)
  - Cancelled (red badge)
- **Refresh Button**: Manually refresh data

### 4. Professional UI
- Modern SVG icons (no emojis)
- Glassmorphism effects
- Responsive design
- Dark mode support
- Loading states
- Empty states

## API Endpoints

### Staff Authentication
```
POST /api/admin/staff/login
Body: { username, password }
Response: { token, staff: { username, role } }
```

### Get Dashboard Stats
```
GET /api/admin/stats
Headers: Authorization: Bearer <token>
Response: { stats: { totalBookings, checkInsToday, checkOutsToday, occupiedRooms, totalRooms } }
```

### Get All Bookings
```
GET /api/admin/bookings
Headers: Authorization: Bearer <token>
Response: { bookings: [...] }
```

### Update Booking Status
```
PATCH /api/admin/bookings/:id/status
Headers: Authorization: Bearer <token>
Body: { status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }
Response: { message, booking }
```

### Get All Users
```
GET /api/admin/users
Headers: Authorization: Bearer <token>
Response: { users: [...] }
```

## How to Access

1. **Navigate to Staff Portal**:
   - URL: `http://localhost:3000/staff-portal`
   - Or click "Staff Portal" link in the footer

2. **Login**:
   - Enter username: `staff`
   - Enter password: `royal2026`
   - Click "Login"

3. **View Dashboard**:
   - See real-time statistics
   - Browse bookings table
   - Update booking statuses

4. **Logout**:
   - Click "Logout" button in header
   - Returns to login screen

## Security Features

- JWT token authentication
- Token verification middleware
- Automatic logout on 401 errors
- 8-hour token expiration
- Separate staff authentication from user authentication

## Future Enhancements (Placeholders)

### Rooms Tab
- Room availability management
- Room status updates
- Maintenance scheduling

### Guests Tab
- Guest profiles
- Booking history per guest
- Guest preferences and notes

## Technical Stack

### Frontend
- React with hooks (useState, useEffect)
- Framer Motion for animations
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

### Backend
- Express.js
- PostgreSQL database
- JWT authentication
- bcrypt for password hashing (production)

## Testing

1. **Start Backend**:
   ```bash
   cd royal-kiana-backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   cd royal-kiana-frontend
   npm start
   ```

3. **Test Staff Login**:
   - Navigate to `/staff-portal`
   - Login with demo credentials
   - Verify dashboard loads with real data

4. **Test Booking Management**:
   - View bookings table
   - Change a booking status
   - Verify status updates in database

## Notes

- Staff portal is separate from user dashboard
- Staff can view all bookings from all users
- Real-time data fetching on mount and refresh
- Professional 2026 design standards
- Mobile responsive
- Accessible UI components

## Contact

For issues or questions:
- Email: adejiboladc24@gmail.com
- Phone: 07070279453
