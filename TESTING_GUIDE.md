# Testing Guide - Royal Kiana Hotel Website

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd royal-kiana-backend
npm run dev
```
Backend will run on: http://localhost:5000

### 2. Start Frontend Server (in a new terminal)
```bash
cd royal-kiana-frontend
npm start
```
Frontend will run on: http://localhost:3000

## 🧪 Testing the Payment Flow

### Step 1: Create an Account
1. Go to http://localhost:3000
2. Click "Sign Up" in the navigation
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Sign Up"
5. You should be redirected to the home page (logged in)

### Step 2: Make a Booking
1. Click "Book Now" in the navigation or hero section
2. Fill in the booking form:
   - **Room Type:** Select any room (e.g., Deluxe Room - ₦35,000/night)
   - **Check-in Date:** Select today or future date
   - **Check-out Date:** Select a date after check-in
   - **Number of Guests:** Enter 2
   - **Special Requests:** (Optional) "Late check-in please"
3. You'll see the total amount calculated automatically
4. Click "Continue to Payment"

### Step 3: Payment Screen
You should now see the payment screen with:
- ✅ Your Booking ID (e.g., "Booking ID: 1")
- ✅ Total Amount in Naira (e.g., ₦70,000)
- ✅ Three payment options:
  - Bank Transfer (Access Bank - 0123456789)
  - OPay Transfer (7070279453)
  - Pay at Hotel

### Step 4: Complete Payment
Choose one of these actions:
- Click "I've Made Payment" → See success message → Auto-redirect to dashboard
- Click "Pay Later" → Redirect to dashboard immediately

### Step 5: View Dashboard
1. You should see your booking in the dashboard
2. Check the booking details:
   - Room type
   - Check-in and check-out dates
   - Number of guests
   - Total price
   - Status (confirmed or pending)

## 🔍 Additional Tests

### Test Dark/Light Mode
1. Click the theme toggle button in the navigation
2. Verify the entire site switches between dark and light themes
3. Refresh the page - theme should persist

### Test Dashboard Without Login
1. Logout from your account
2. Click "Dashboard" in navigation
3. You should see a login prompt screen (not a redirect)
4. Click "Login" or "Create Account" buttons

### Test All Pages
Visit each page and verify they load correctly:
- ✅ Home (http://localhost:3000/)
- ✅ Rooms (http://localhost:3000/rooms)
- ✅ Booking (http://localhost:3000/booking)
- ✅ About (http://localhost:3000/about)
- ✅ Contact (http://localhost:3000/contact)
- ✅ Policies (http://localhost:3000/policies)
- ✅ Login (http://localhost:3000/login)
- ✅ Signup (http://localhost:3000/signup)
- ✅ Dashboard (http://localhost:3000/dashboard)

### Test Contact Features
1. Go to Contact page
2. Click phone number → Should open phone dialer
3. Click WhatsApp link → Should open WhatsApp
4. Click email → Should open email client
5. Click address → Should open Google Maps

### Test Booking Without Login
1. Logout if logged in
2. Go to Booking page
3. Fill in the form and click "Continue to Payment"
4. You should see an error message: "Please login or create an account"
5. After 2 seconds, you'll be redirected to login page

## 📊 Expected Results

### ✅ Working Features
- User signup and login
- JWT authentication
- Protected routes
- Booking creation
- Payment screen display
- Dashboard with booking history
- Dark/light mode toggle
- Responsive design
- All navigation links
- Contact information (phone, email, WhatsApp)
- Real hotel images
- Smooth animations

### 🎯 Payment Options
All three payment methods should be clearly displayed:
1. Bank Transfer with account details
2. OPay Transfer with account number
3. Pay at Hotel option

### 📱 Contact Information
- Phone: 07070279453 (clickable)
- Email: adejiboladc24@gmail.com
- WhatsApp: Direct link
- Address: 12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check if PostgreSQL is running
# Verify .env file exists with correct database credentials
cd royal-kiana-backend
cat .env
```

### Frontend Not Starting
```bash
# Clear cache and reinstall
cd royal-kiana-frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Database Connection Error
```bash
# Test database connection
cd royal-kiana-backend
node test-connection.js
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
# Windows: netstat -ano | findstr :5000
# Then: taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)
# Windows: netstat -ano | findstr :3000
# Then: taskkill /PID <PID> /F
```

## ✨ Success Criteria

Your payment integration is working correctly if:
- ✅ Users can complete the entire booking flow
- ✅ Payment screen appears after booking submission
- ✅ Booking ID is displayed for reference
- ✅ All three payment options are visible
- ✅ Total amount is calculated correctly
- ✅ Users can confirm payment or pay later
- ✅ Bookings appear in dashboard
- ✅ Contact information is accessible
- ✅ No console errors in browser or terminal

## 🎉 You're All Set!

The payment integration is complete and ready for production use. Users can now book rooms and choose their preferred payment method.
