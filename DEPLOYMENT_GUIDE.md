# 🚀 ROYAL KIANA DEPLOYMENT GUIDE

## 📋 DEPLOYMENT OVERVIEW

Your Royal Kiana Hotel system consists of two parts that need to be deployed separately:

1. **Frontend** (React) → Vercel ✅
2. **Backend** (Node.js + PostgreSQL) → Railway/Render/Heroku

---

## 🎯 STEP 1: BACKEND DEPLOYMENT (Required First)

### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `Royal-Kiana-Suites` repository
5. Choose "Deploy Backend" and select `royal-kiana-backend` folder
6. Add environment variables:
   ```
   PORT=5000
   DB_HOST=<railway-postgres-host>
   DB_PORT=5432
   DB_USER=<railway-postgres-user>
   DB_PASSWORD=<railway-postgres-password>
   DB_NAME=<railway-postgres-database>
   JWT_SECRET=royalkianasecret
   EMAIL_USER=adejiboladc24@gmail.com
   EMAIL_PASSWORD=dovtynbgvitcghdp
   ```
7. Railway will provide a PostgreSQL database automatically
8. Deploy and get your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Render
1. Go to [render.com](https://render.com)
2. Connect GitHub repository
3. Create "Web Service" from `royal-kiana-backend`
4. Add PostgreSQL database
5. Set environment variables
6. Deploy and get URL

### Option C: Heroku
1. Install Heroku CLI
2. Create new app: `heroku create royal-kiana-backend`
3. Add PostgreSQL: `heroku addons:create heroku-postgresql:mini`
4. Set environment variables: `heroku config:set JWT_SECRET=royalkianasecret`
5. Deploy: `git subtree push --prefix royal-kiana-backend heroku main`

---

## 🎯 STEP 2: UPDATE FRONTEND API URL

Once your backend is deployed, update the production API URL:

1. **Get your backend URL** (from Railway/Render/Heroku)
2. **Update `.env.production`**:
   ```env
   GENERATE_SOURCEMAP=false
   DISABLE_ESLINT_PLUGIN=true
   CI=false
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
3. **Commit and push changes**:
   ```bash
   git add royal-kiana-frontend/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

---

## 🎯 STEP 3: VERCEL FRONTEND DEPLOYMENT

Your frontend will automatically deploy to Vercel when you push to GitHub:

1. **Vercel detects changes** and starts build
2. **Build process**:
   - Installs dependencies in `royal-kiana-frontend`
   - Runs `npm run build`
   - Uses production environment variables
3. **Deployment URL**: `https://royal-kiana-suites.vercel.app`

### Manual Deployment (if needed):
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel --prod
```

---

## 🔧 ENVIRONMENT VARIABLES SETUP

### Backend Environment Variables:
```env
PORT=5000
DB_HOST=<your-database-host>
DB_PORT=5432
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
JWT_SECRET=royalkianasecret
EMAIL_USER=adejiboladc24@gmail.com
EMAIL_PASSWORD=dovtynbgvitcghdp
```

### Frontend Environment Variables:
```env
REACT_APP_API_URL=https://your-backend-url/api
```

---

## ✅ DEPLOYMENT CHECKLIST

### Before Deployment:
- [ ] Backend code pushed to GitHub ✅
- [ ] Frontend code pushed to GitHub ✅
- [ ] Environment variables ready ✅
- [ ] Database schema ready ✅

### Backend Deployment:
- [ ] Choose hosting platform (Railway/Render/Heroku)
- [ ] Deploy backend with PostgreSQL
- [ ] Set all environment variables
- [ ] Test backend endpoints
- [ ] Get backend URL

### Frontend Deployment:
- [ ] Update `.env.production` with backend URL
- [ ] Push changes to GitHub
- [ ] Verify Vercel deployment
- [ ] Test complete system

### Post-Deployment Testing:
- [ ] User signup/login working
- [ ] Staff portal accessible (staff/royal2026)
- [ ] Password reset emails sending
- [ ] Booking system working
- [ ] Payment initialization working

---

## 🚨 IMPORTANT NOTES

1. **Deploy Backend First**: Frontend needs backend URL
2. **Database**: Use managed PostgreSQL (Railway/Render provide free tier)
3. **CORS**: Backend already configured for external access
4. **SSL**: All platforms provide HTTPS automatically
5. **Environment Variables**: Never commit secrets to GitHub

---

## 🔗 QUICK DEPLOYMENT COMMANDS

```bash
# 1. Update production API URL (after backend deployment)
# Edit royal-kiana-frontend/.env.production with your backend URL

# 2. Commit and push
git add .
git commit -m "Update production API URL for deployment"
git push origin main

# 3. Vercel will auto-deploy from GitHub
# Or manually: vercel --prod
```

---

## 📞 SUPPORT

If you encounter issues:
1. Check deployment logs on your hosting platform
2. Verify environment variables are set correctly
3. Test backend endpoints directly
4. Check CORS configuration
5. Verify database connection

**Status**: Ready for deployment 🚀