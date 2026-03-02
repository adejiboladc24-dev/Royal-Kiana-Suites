# Royal Kiana Hotel - Complete Setup Guide

## 🎉 Project Overview

A premium, full-stack hotel booking website with:
- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Features**: Authentication, Booking System, Dark/Light Mode, Payment Integration

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (installed and running)
- npm or yarn

---

## 🚀 Backend Setup

### 1. Navigate to Backend Folder
```bash
cd royal-kiana-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Update `.env` file with your PostgreSQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=newpassword123
DB_NAME=royal_kiana
JWT_SECRET=royalkianasecret
```

### 4. Create Database

Open pgAdmin or psql and run:
```sql
CREATE DATABASE royal_kiana;
```

### 5. Start Backend Server
```bash
npm run dev
```

✅ Backend should now be running on **http://localhost:5000**

You should see:
```
Database Connected Successfully
Users table ready
Bookings table ready
Server running on port 5000
```

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Folder
```bash
cd royal-kiana-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

The `.env` file is already configured:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Server
```bash
npm start
```

✅ Frontend should now be running on **http://localhost:3000**

The browser will automatically open to the website.

---

## 📱 Website Features

### Pages
1. **Home** (`/`) - Hero section, featured rooms, services
2. **Rooms & Suites** (`/rooms`) - All available rooms with pricing
3. **Booking** (`/booking`) - Reservation form
4. **About Us** (`/about`) - Hotel information
5. **Contact** (`/contact`) - Contact form and information
6. **Policies** (`/policies`) - Hotel policies and terms
7. **Login** (`/login`) - User authentication
8. **Sign Up** (`/signup`) - User registration
9. **Dashboard** (`/dashboard`) - User bookings and profile

### Key Features
- ✅ Dark/Light mode toggle (persists across sessions)
- ✅ Animated loader on first visit
- ✅ Fully responsive design
- ✅ JWT authentication
- ✅ Booking system with Naira pricing
- ✅ Contact integration (phone, email, WhatsApp)
- ✅ Google Maps integration
- ✅ Smooth animations and transitions

---

## 🔐 Testing Authentication

### Create a Test Account

1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Sign Up"
4. You'll be redirected to the dashboard

### Login

1. Go to http://localhost:3000/login
2. Use the credentials you just created
3. Access your dashboard

---

## 💳 Testing Booking System

1. **Login** to your account
2. Go to **Rooms & Suites** or click **Book Now**
3. Fill in the booking form:
   - Select a room type
   - Choose check-in and check-out dates
   - Enter number of guests
   - Add special requests (optional)
4. Click **Confirm Booking**
5. View your booking in the **Dashboard**

---

## 📞 Contact Information

The website displays:
- **Phone**: 07070279453 (click-to-call)
- **WhatsApp**: https://wa.me/2347070279453
- **Email**: adejiboladc24@gmail.com
- **Address**: 12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria
- **Google Maps**: Integrated for directions

---

## 💰 Room Pricing (Nigerian Naira)

- Standard Room: ₦25,000/night
- Deluxe Room: ₦35,000/night
- Executive Suite: ₦50,000/night
- Family Suite: ₦60,000/night
- Presidential Suite: ₦120,000/night
- Honeymoon Suite: ₦80,000/night

---

## 🌓 Dark/Light Mode

Toggle the theme using the sun/moon icon in the navbar. Your preference is automatically saved.

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/profile` - Get user profile
- `PUT /api/dashboard/profile` - Update profile

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID

### Admin (Protected)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings

### Analytics
- `GET /api/analytics/stats` - Get statistics

### Payment
- `POST /api/payment/opay/initialize` - Initialize payment
- `POST /api/payment/opay/verify` - Verify payment

---

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure port 5000 is not in use

### Frontend won't start
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

### Database connection fails
- Verify PostgreSQL is running
- Check database name exists
- Confirm password is correct

### Pages show errors
- Ensure backend is running first
- Check browser console for errors
- Verify API_URL in frontend `.env`

---

## 📦 Project Structure

```
royal-kiana-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   └── dashboardController.js
├── models/
│   ├── User.js
│   └── Booking.js
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── dashboardRoutes.js
│   ├── adminRoutes.js
│   ├── paymentRoutes.js
│   └── analyticsRoutes.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   ├── validators.js
│   └── emailService.js
├── .env
├── server.js
└── package.json

royal-kiana-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   └── RoomCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Rooms.jsx
│   │   ├── Booking.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Policies.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useTheme.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Deployment

### Backend
1. Set up PostgreSQL database on hosting service
2. Update environment variables
3. Deploy to Heroku, Railway, or similar
4. Note the backend URL

### Frontend
1. Update `REACT_APP_API_URL` with backend URL
2. Run `npm run build`
3. Deploy `build/` folder to Vercel, Netlify, or similar

---

## 📞 Support

For questions or issues:
- **Phone**: 07070279453
- **WhatsApp**: https://wa.me/2347070279453
- **Email**: adejiboladc24@gmail.com

---

## ✅ Checklist

- [ ] PostgreSQL installed and running
- [ ] Backend dependencies installed
- [ ] Database created
- [ ] Backend `.env` configured
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Can access website in browser
- [ ] Can create account
- [ ] Can login
- [ ] Can make booking
- [ ] Dark/light mode works
- [ ] All pages load correctly

---

© 2026 Royal Kiana Hotel. All rights reserved. Made with ❤️ in Nigeria
