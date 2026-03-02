# Royal Kiana Hotel - Frontend

Premium, fully functional React frontend for Royal Kiana Hotel with complete backend integration.

## ✨ Features

### Complete Pages
- ✅ Home - Hero section with featured rooms and services
- ✅ Rooms & Suites - Full room catalog with pricing in Naira
- ✅ Booking/Reservation - Functional booking form with backend integration
- ✅ About Us - Hotel information and features
- ✅ Contact - Contact form, phone, email, WhatsApp, Google Maps
- ✅ Policies - Hotel policies and terms
- ✅ Login - User authentication
- ✅ Sign Up - User registration
- ✅ Dashboard - User bookings and profile

### Premium Features
- 🎨 Dark/Light mode toggle (persisted)
- 🎭 Animated loader with brand colors
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations with Framer Motion
- 🔐 JWT authentication
- 💳 Booking system with Naira pricing
- 📞 Click-to-call: 07070279453
- 💬 WhatsApp integration
- 📧 Email: adejiboladc24@gmail.com
- 📍 Address: 12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria
- 🗺️ Google Maps integration

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will run on http://localhost:3000

## 🔧 Environment Variables

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📦 Tech Stack

- React 18
- Tailwind CSS
- Framer Motion (animations)
- React Router (routing)
- Axios (API calls)

## 🎯 Backend Integration

All pages are fully integrated with the backend:

- **Authentication**: Login/Signup connect to `/api/auth/*`
- **Bookings**: Booking form connects to `/api/bookings`
- **Dashboard**: Fetches user data from `/api/dashboard`
- **Profile**: User profile from `/api/dashboard/profile`

## 📱 Contact Information

- **Phone**: [07070279453](tel:07070279453)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/2347070279453)
- **Email**: [adejiboladc24@gmail.com](mailto:adejiboladc24@gmail.com)
- **Address**: 12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria

## 🎨 Design Features

- Premium orange/gold gradient theme
- Glass morphism effects
- Smooth page transitions
- Hover animations
- Custom scrollbar
- Professional typography
- Nigerian Naira (₦) currency

## 📄 Pages Overview

### Home
- Animated hero section
- Featured rooms
- Services showcase

### Rooms & Suites
- 6 room types with pricing
- Room features and amenities
- Direct booking links

### Booking
- Room selection
- Date picker (check-in/check-out)
- Guest count
- Special requests
- Total price calculation
- Backend integration

### Contact
- Contact form
- Phone, email, WhatsApp links
- Google Maps integration
- Business hours

### Dashboard
- User profile
- Booking history
- Booking statistics
- Quick actions

## 🔐 Authentication Flow

1. User signs up → Backend creates account
2. User logs in → Receives JWT token
3. Token stored in localStorage
4. Protected routes require authentication
5. Dashboard shows user-specific data

## 💰 Pricing (Nigerian Naira)

- Standard Room: ₦25,000/night
- Deluxe Room: ₦35,000/night
- Executive Suite: ₦50,000/night
- Family Suite: ₦60,000/night
- Presidential Suite: ₦120,000/night
- Honeymoon Suite: ₦80,000/night

## 🌓 Dark/Light Mode

Toggle between themes using the button in the navbar. Theme preference is saved to localStorage and persists across sessions.

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components are fully responsive with mobile-first design.

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy build folder to hosting service
```

## 📞 Support

For assistance:
- Call: 07070279453
- WhatsApp: https://wa.me/2347070279453
- Email: adejiboladc24@gmail.com

---

© 2026 Royal Kiana Hotel. All rights reserved. Made with ❤️ in Nigeria
