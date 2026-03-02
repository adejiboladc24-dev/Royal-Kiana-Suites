# 🚀 Setup Email in 3 Steps (2 Minutes)

## Step 1: Get App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification if asked
3. Create app password: Mail → Royal Kiana
4. **COPY the 16-character password**

## Step 2: Update .env
Open `royal-kiana-backend/.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```
(Remove spaces from password!)

## Step 3: Restart Backend
```bash
cd royal-kiana-backend
npm start
```

## Test It!
1. Go to login page
2. Click "Forgot Password?"
3. Enter your email
4. Check inbox for code!

---

**Done! Emails now sent to real Gmail accounts! 🎉**

Need help? Read: `QUICK_START_EMAIL.md`
