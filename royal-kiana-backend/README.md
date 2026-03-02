# Royal Kiana Hotel Backend

Production-ready Node.js backend for Royal Kiana Hotel booking system.

## Features

- User authentication (signup/login) with JWT
- Password hashing with bcrypt
- User dashboard with profile management
- Booking system with PostgreSQL
- Payment integration (OPay)
- Admin panel for managing users and bookings
- Analytics and reporting
- Email notifications (scaffold)
- Protected routes with middleware

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- pg (node-postgres)
- dotenv
- cors

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=royal_kiana
JWT_SECRET=your_secret_key
```

## Database Setup

1. Install PostgreSQL
2. Create database: `CREATE DATABASE royal_kiana;`
3. Update `.env` with your credentials
4. Tables will be created automatically on server start

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Public Routes
- `GET /api/health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Protected Routes (require JWT token)
- `GET /api/dashboard` - User dashboard
- `GET /api/dashboard/profile` - User profile
- `PUT /api/dashboard/profile` - Update profile
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID

### Admin Routes (require JWT token)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings

### Payment Routes
- `POST /api/payment/opay/initialize` - Initialize payment
- `POST /api/payment/opay/verify` - Verify payment

### Analytics Routes
- `GET /api/analytics/stats` - Get statistics

## Authentication

Include JWT token in request headers:
```
Authorization: Bearer <your_token>
```

## Project Structure

```
royal-kiana-backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── bookingController.js
│   └── dashboardController.js
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js           # User model
│   └── Booking.js        # Booking model
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── dashboardRoutes.js
│   ├── adminRoutes.js
│   ├── paymentRoutes.js
│   └── analyticsRoutes.js
├── utils/
│   ├── validators.js     # Input validation
│   └── emailService.js   # Email utilities
├── .env                  # Environment variables
├── server.js            # Entry point
└── package.json
```

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens expire after 24 hours
- Protected routes require valid tokens
- Input validation on all endpoints
- SQL injection prevention with parameterized queries

## Frontend Integration

Backend runs on `http://localhost:5000`

Example fetch request:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await response.json();
```

## Notes

- Ensure PostgreSQL is running before starting the server
- Update DB_PASSWORD in .env with your actual password
- Payment integration is scaffolded for OPay
- Email service is scaffolded (console logs only)
