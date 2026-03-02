# Quick Start - Email Setup in 5 Minutes

## What You Need
- A Gmail account
- 5 minutes

---

## Step 1: Get Your App Password (2 minutes)

1. Open: https://myaccount.google.com/apppasswords
   - If link doesn't work, go to Google Account → Security → App passwords

2. You'll be asked to enable 2-Step Verification first if you haven't
   - Click "Get Started"
   - Follow the prompts (use your phone)

3. After 2-Step is enabled, go back to App passwords

4. Create app password:
   - App: **Mail**
   - Device: **Other** → Type "Royal Kiana"
   - Click **Generate**

5. **COPY the 16-character password** (looks like: `abcd efgh ijkl mnop`)

---

## Step 2: Update .env File (1 minute)

Open `royal-kiana-backend/.env` and update:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**Example:**
```env
EMAIL_USER=johndoe@gmail.com
EMAIL_PASSWORD=xyzw abcd efgh ijkl
```

**Important:** Remove spaces from the password!

---

## Step 3: Restart Backend (1 minute)

```bash
# Stop the backend (Ctrl+C)
# Then restart:
cd royal-kiana-backend
npm start
```

---

## Step 4: Test It! (1 minute)

1. Go to your website login page
2. Click "Forgot Password?"
3. Enter your email (must be registered)
4. Check your email inbox
5. You should receive a code within seconds!

---

## That's It! 🎉

Your password reset system is now sending real emails!

---

## Troubleshooting

### "Invalid login" error?
- You're using your regular password instead of app password
- Go back to Step 1 and generate a new app password

### Email not received?
- Check spam/junk folder
- Make sure email is registered in database
- Check backend console for errors
- Verify EMAIL_USER and EMAIL_PASSWORD are correct

### Still not working?
- Read the full guide: `GMAIL_SETUP_GUIDE.md`
- Contact: adejiboladc24@gmail.com

---

## What Happens Now?

When users forget their password:

1. They enter their email
2. System generates a 6-digit code
3. **Email is sent to their Gmail** ✉️
4. They enter the code
5. They set a new password
6. Done!

**The code is SECRET** - only sent to their email, not shown anywhere else!

---

## Security Features

✅ Code expires in 10 minutes
✅ Maximum 3 attempts
✅ Code sent only to registered email
✅ Password hashed in database
✅ Professional email template

---

Ready to go! 🚀
