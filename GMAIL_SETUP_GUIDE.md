# Gmail Email Setup Guide for Password Reset

## Overview
This guide will help you set up Gmail to send password reset codes to users.

---

## Step 1: Enable 2-Step Verification on Your Gmail Account

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click on **2-Step Verification**
4. Follow the prompts to enable 2-Step Verification
5. You'll need your phone to verify

---

## Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Under "Signing in to Google", click on **App passwords**
3. You may need to sign in again
4. At the bottom, select:
   - **App**: Select "Mail"
   - **Device**: Select "Other (Custom name)"
   - Type: "Royal Kiana Hotel"
5. Click **Generate**
6. Google will show you a 16-character password
7. **COPY THIS PASSWORD** - you won't see it again!

---

## Step 3: Update Your .env File

Open `royal-kiana-backend/.env` and update these lines:

```env
# Replace with your actual Gmail address
EMAIL_USER=your-email@gmail.com

# Replace with the 16-character app password (no spaces)
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Example:
```env
EMAIL_USER=royalkianahotel@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**Important Notes:**
- Use the 16-character app password, NOT your regular Gmail password
- Remove all spaces from the app password
- Keep this file secure and never commit it to Git

---

## Step 4: Test the Email System

1. **Start the backend server**:
   ```bash
   cd royal-kiana-backend
   npm start
   ```

2. **Start the frontend**:
   ```bash
   cd royal-kiana-frontend
   npm start
   ```

3. **Test password reset**:
   - Go to login page
   - Click "Forgot Password?"
   - Enter a registered email address
   - Check that email's inbox for the reset code
   - The email should arrive within seconds

---

## Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution**: You're using your regular Gmail password instead of the app password.
- Generate a new app password (Step 2)
- Update EMAIL_PASSWORD in .env with the app password

### Error: "self signed certificate in certificate chain"

**Solution**: Add this to emailService.js transporter config:
```javascript
tls: {
  rejectUnauthorized: false
}
```

### Email not received

**Check these:**
1. ✅ 2-Step Verification is enabled
2. ✅ App password is correct (16 characters, no spaces)
3. ✅ EMAIL_USER is your full Gmail address
4. ✅ Backend server is running
5. ✅ Check spam/junk folder
6. ✅ Email address is registered in database

### "Failed to send reset email"

**Check backend console for detailed error**:
- Look for red error messages
- Common issues:
  - Wrong credentials
  - Network issues
  - Gmail blocking the app

---

## Alternative: Using a Dedicated Email Account

For production, consider creating a dedicated Gmail account:

1. Create new Gmail: `royalkianahotel@gmail.com`
2. Enable 2-Step Verification
3. Generate App Password
4. Use this account for all hotel emails

**Benefits:**
- Professional appearance
- Separate from personal email
- Better tracking
- Can be managed by multiple staff

---

## Email Template Preview

Users will receive a professional email with:

```
🏨 Royal Kiana Hotel
Password Reset Request

Hello [User Name],

We received a request to reset your password.

Your verification code is:

┌─────────────────┐
│   123456        │
└─────────────────┘

⚠️ Important:
• This code expires in 10 minutes
• You have 3 attempts
• Don't share this code

Need help?
📞 07070279453
✉️ adejiboladc24@gmail.com

Royal Kiana Hotel
12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria
```

---

## Security Best Practices

### DO:
✅ Use app passwords, not regular passwords
✅ Keep .env file secure
✅ Add .env to .gitignore
✅ Use a dedicated email account
✅ Monitor email sending logs
✅ Set up email rate limiting

### DON'T:
❌ Share your app password
❌ Commit .env to Git
❌ Use your personal Gmail
❌ Disable 2-Step Verification
❌ Share credentials with unauthorized people

---

## Production Recommendations

### 1. Use Professional Email Service

For production, consider:
- **SendGrid**: 100 emails/day free
- **AWS SES**: Very cheap, reliable
- **Mailgun**: Good for transactional emails
- **Postmark**: Excellent deliverability

### 2. Custom Domain Email

Instead of `@gmail.com`, use:
- `noreply@royalkianahotel.com`
- `support@royalkianahotel.com`

### 3. Email Monitoring

Set up:
- Delivery tracking
- Bounce handling
- Spam complaint monitoring
- Send rate monitoring

---

## Quick Setup Checklist

- [ ] Enable 2-Step Verification on Gmail
- [ ] Generate App Password
- [ ] Update EMAIL_USER in .env
- [ ] Update EMAIL_PASSWORD in .env
- [ ] Restart backend server
- [ ] Test password reset
- [ ] Check email inbox
- [ ] Verify email looks professional
- [ ] Test on multiple email providers (Gmail, Yahoo, Outlook)
- [ ] Check spam folder

---

## Support

If you need help setting this up:

**Contact:**
- Email: adejiboladc24@gmail.com
- Phone: 07070279453

**Common Questions:**

**Q: Can I use Yahoo or Outlook instead of Gmail?**
A: Yes! Just change the service in emailService.js:
```javascript
service: 'yahoo' // or 'outlook'
```

**Q: How many emails can I send per day?**
A: Gmail allows ~500 emails/day for regular accounts, 2000/day for Google Workspace.

**Q: Will emails go to spam?**
A: Initially, some might. To improve:
- Use a dedicated account
- Send consistently
- Avoid spam trigger words
- Set up SPF/DKIM records (advanced)

---

## Next Steps

After email is working:

1. ✅ Test with real users
2. ✅ Monitor email delivery
3. ✅ Set up email templates for bookings
4. ✅ Add email notifications for:
   - Booking confirmations
   - Check-in reminders
   - Check-out thank you
   - Special offers

---

**Last Updated**: March 2, 2026
**Status**: Ready for Setup
