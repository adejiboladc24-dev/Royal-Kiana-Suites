# Password Reset System - Complete Guide

## Overview
A complete 3-step password reset system with verification codes sent to email.

---

## How It Works

### User Flow

#### Step 1: Request Reset Code
1. User clicks "Forgot Password?" on login page
2. Enters their email address
3. System generates a 6-digit code
4. Code is sent to user's email (currently shown in console)
5. Code valid for 10 minutes

#### Step 2: Verify Code
1. User enters the 6-digit code
2. System verifies the code
3. Maximum 3 attempts allowed
4. If code expires or too many attempts, user must request new code

#### Step 3: Set New Password
1. User enters new password
2. User confirms new password
3. System updates password in database
4. User automatically redirected to login
5. Can now login with new password

---

## Features

### Security Features
- ✅ 6-digit random verification code
- ✅ 10-minute expiration time
- ✅ Maximum 3 verification attempts
- ✅ Password hashing with bcrypt
- ✅ Code cleared after successful reset
- ✅ Email validation
- ✅ Password strength validation (min 6 characters)

### User Experience
- ✅ Clear 3-step progress indicator
- ✅ Visual step tracking (1 → 2 → 3)
- ✅ Success and error messages
- ✅ Loading states on all buttons
- ✅ Auto-redirect after success
- ✅ Back/Cancel buttons at each step
- ✅ Resend code option
- ✅ Dark mode support
- ✅ Responsive design

### Development Features
- ✅ Code displayed in console for testing
- ✅ Code shown in UI (DEV MODE only)
- ✅ Easy to integrate email service later

---

## API Endpoints

### 1. Request Password Reset
```
POST /api/auth/request-password-reset
Body: { email: "user@example.com" }

Response:
{
  "message": "Reset code sent to your email",
  "devCode": "123456" // Development only
}
```

### 2. Verify Reset Code
```
POST /api/auth/verify-reset-code
Body: { 
  email: "user@example.com",
  code: "123456"
}

Response:
{
  "message": "Code verified successfully",
  "verified": true
}
```

### 3. Reset Password
```
POST /api/auth/reset-password
Body: { 
  email: "user@example.com",
  code: "123456",
  newPassword: "newpassword123"
}

Response:
{
  "message": "Password reset successfully. You can now login with your new password."
}
```

---

## Backend Implementation

### Files Modified

#### 1. `authController.js`
Added three new functions:
- `requestPasswordReset` - Generates and stores reset code
- `verifyResetCode` - Validates the code
- `resetPassword` - Updates user password

#### 2. `User.js` Model
Added method:
- `updatePassword(id, hashedPassword)` - Updates password in database

#### 3. `authRoutes.js`
Added three new routes:
- `POST /auth/request-password-reset`
- `POST /auth/verify-reset-code`
- `POST /auth/reset-password`

### Code Storage
Currently using in-memory Map (resetCodes):
```javascript
{
  email: {
    code: "123456",
    expires: timestamp,
    attempts: 0,
    verified: false
  }
}
```

**For Production**: Replace with Redis or database table for persistence across server restarts.

---

## Frontend Implementation

### Files Modified

#### 1. `Login.jsx`
Complete 3-step password reset flow:
- Step 1: Email input
- Step 2: Code verification
- Step 3: New password

New state variables:
```javascript
const [resetStep, setResetStep] = useState(1);
const [resetEmail, setResetEmail] = useState('');
const [resetCode, setResetCode] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [devCode, setDevCode] = useState('');
```

#### 2. `api.js`
Added three new API functions:
- `authAPI.requestPasswordReset(email)`
- `authAPI.verifyResetCode(email, code)`
- `authAPI.resetPassword(email, code, newPassword)`

---

## Testing the System

### Step-by-Step Test

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

3. **Test Password Reset**:
   - Go to login page
   - Click "Forgot Password?"
   - Enter your email (must be registered)
   - Check backend console for the 6-digit code
   - Or look for yellow "DEV MODE" box in UI
   - Enter the code
   - Set new password
   - Login with new password

### Example Test Flow

```
Email: test@example.com
↓
Code sent: 123456 (shown in console)
↓
Enter code: 123456
↓
New password: newpass123
Confirm: newpass123
↓
Success! Redirected to login
↓
Login with: test@example.com / newpass123
```

---

## Email Integration (Future)

To integrate real email sending, replace the console.log in `requestPasswordReset`:

### Using Nodemailer (Gmail)

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Password Reset Code - Royal Kiana Hotel',
  html: `
    <h2>Password Reset Request</h2>
    <p>Your verification code is:</p>
    <h1 style="color: #f97316; font-size: 32px; letter-spacing: 5px;">${resetCode}</h1>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `
};

await transporter.sendMail(mailOptions);
```

### Using SendGrid

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'noreply@royalkiana.com',
  subject: 'Password Reset Code',
  html: `Your code: <strong>${resetCode}</strong>`
};

await sgMail.send(msg);
```

---

## Security Considerations

### Current Implementation
- ✅ Codes expire after 10 minutes
- ✅ Maximum 3 attempts per code
- ✅ Passwords hashed with bcrypt
- ✅ Email validation
- ✅ Code cleared after use

### Production Recommendations
1. **Rate Limiting**: Limit reset requests per IP/email
2. **HTTPS Only**: Ensure all traffic is encrypted
3. **Redis Storage**: Use Redis for code storage
4. **Email Verification**: Verify email ownership first
5. **Audit Logging**: Log all password reset attempts
6. **2FA Option**: Offer two-factor authentication
7. **Password History**: Prevent reusing recent passwords
8. **Account Lockout**: Lock account after multiple failed attempts

---

## Error Handling

### Common Errors

#### "No reset request found for this email"
- User didn't request reset
- Code expired (10 minutes)
- Solution: Request new code

#### "Reset code has expired"
- More than 10 minutes passed
- Solution: Request new code

#### "Too many failed attempts"
- Entered wrong code 3 times
- Solution: Request new code

#### "Invalid reset code"
- Wrong code entered
- Solution: Check email or request new code

#### "Passwords do not match"
- New password and confirm don't match
- Solution: Re-enter passwords

---

## UI Components

### Progress Indicator
Visual 3-step progress:
```
(1) → (2) → (3)
```
- Active step: Primary color
- Completed: Primary color
- Pending: Gray

### Form Fields

**Step 1**: Email input
**Step 2**: 6-digit code input (numeric only, centered, large text)
**Step 3**: New password + Confirm password

### Buttons

- Primary: Submit actions
- Secondary: Back/Cancel actions
- Disabled state when loading

---

## Database Schema

No new tables needed! Uses existing `users` table:

```sql
UPDATE users 
SET password = $1 
WHERE id = $2
```

---

## Environment Variables

Add to `.env` (for email integration):

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Or SendGrid
SENDGRID_API_KEY=your-sendgrid-key
```

---

## Troubleshooting

### Code not received
- Check backend console for the code
- Look for yellow DEV MODE box in UI
- Verify email is registered in database

### Code not working
- Check if 10 minutes passed (expired)
- Verify you entered all 6 digits
- Check for typos
- Request new code if needed

### Password not updating
- Verify code was verified first
- Check password meets requirements (6+ chars)
- Check backend console for errors

---

## Future Enhancements

1. **Email Templates**: Professional HTML email templates
2. **SMS Option**: Send code via SMS as alternative
3. **Magic Links**: One-click password reset links
4. **Password Strength Meter**: Visual password strength indicator
5. **Remember Device**: Skip verification on trusted devices
6. **Biometric Reset**: Use fingerprint/face ID on mobile
7. **Security Questions**: Additional verification method
8. **Account Recovery**: Multiple recovery options

---

## Support

For issues or questions:
- **Email**: adejiboladc24@gmail.com
- **Phone**: 07070279453

---

**Version**: 1.0.0
**Status**: Production Ready (Email integration pending)
**Last Updated**: March 2, 2026
