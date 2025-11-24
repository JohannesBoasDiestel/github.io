# Deployment Guide - Voddev Website

This guide walks you through deploying your Voddev website to **Render.com** (free hosting).

## Why Render?

- **Free tier** with 750 hours/month
- Supports **Node.js backend** with file storage
- Handles **large file uploads** (your 200MB videos)
- Easy **GitHub integration**
- Automatic deployments on git push

## Prerequisites

1. GitHub account (you already have this)
2. Create a Render account at https://render.com (free, sign up with GitHub)

## Step 1: Push Code to GitHub

Your code is already on GitHub at: https://github.com/JohannesBoasDiestel/github.io

Make sure the latest changes are pushed (run these commands):

```bash
cd github.io
git add .
git commit -m "Prepare for Render deployment"
git push
```

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

## Step 3: Deploy Your Backend

### Create New Web Service

1. In Render dashboard, click **"New +"** > **"Web Service"**
2. Connect your GitHub repository: `JohannesBoasDiestel/github.io`
3. Configure the service:

   **Basic Settings:**
   - Name: `voddev-backend`
   - Region: Choose closest to you (e.g., Frankfurt for Europe)
   - Branch: `main`
   - Root Directory: (leave empty)
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`

   **Plan:**
   - Select **"Free"** plan

4. Click **"Advanced"** and add Environment Variables:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `SESSION_SECRET` | `your-random-secret-here-change-this` |
   | `EMAIL_USER` | `your-gmail@gmail.com` |
   | `EMAIL_PASS` | `your-gmail-app-password` |

   **Important:**
   - Change `SESSION_SECRET` to a random string
   - Use your actual Gmail and app password for email notifications

5. Click **"Create Web Service"**

### Wait for Deployment

- Render will build and deploy your app (takes 5-10 minutes first time)
- Watch the logs in the dashboard
- When complete, you'll see "Live" status

## Step 4: Get Your Render URL

After deployment, Render gives you a URL like:
```
https://voddev-backend.onrender.com
```

**Copy this URL** - you'll need it next!

## Step 5: Update Frontend API URL

1. Open `js/main.js` in your code
2. Find this line:
   ```javascript
   : 'https://voddev-backend.onrender.com/api'; // Update this after deployment
   ```
3. Replace `voddev-backend.onrender.com` with **your actual Render URL**

4. Do the same in `upload.html` (around line 200)

5. Save, commit, and push:
   ```bash
   git add .
   git commit -m "Update API URL with Render deployment"
   git push
   ```

## Step 6: Upload Your Videos to Render

**Problem:** Your 167MB videos can't be in git. You need to upload them directly to Render.

**Solution: Use the Upload Interface**

1. After deployment, visit your Render URL: `https://your-app.onrender.com`
2. Sign up / Log in
3. Go to Upload page
4. Upload your `CombatTest33.mp4` and `CombatTest34.mp4` files
5. They'll be saved on Render's server

**⚠️ Important Note:**
- Render's free tier uses **ephemeral storage**
- Files may be deleted when the service restarts
- For permanent storage, upgrade to paid plan or use cloud storage (AWS S3, Cloudinary)

## Step 7: Deploy Frontend to GitHub Pages

Your frontend (HTML/CSS/JS) can stay on GitHub Pages:

1. Your site is already live at: `https://johannesboasdiestel.github.io`
2. It now connects to your Render backend for authentication and features
3. Videos are served from Render

## Alternative: Deploy Everything to Render

If you want **both** frontend and backend on Render:

1. Your current setup already serves static files
2. Just visit your Render URL directly: `https://voddev-backend.onrender.com`
3. Everything works together!

## CORS Configuration (If Needed)

If you get CORS errors, update `server.js`:

```javascript
app.use(cors({
    origin: [
        'https://johannesboasdiestel.github.io',
        'http://localhost:3000',
        'https://voddev-backend.onrender.com'
    ],
    credentials: true
}));
```

## Cost Summary

**Render Free Tier:**
- ✅ 750 hours/month (enough for one app)
- ✅ 512MB RAM
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Spins down after 15 mins of inactivity (cold start ~30s)
- ⚠️ Ephemeral storage (files deleted on restart)

**To Keep Files Permanent:**
- Upgrade to Render paid plan ($7/month for persistent disk)
- OR use external storage (Cloudinary, AWS S3) for videos

## Troubleshooting

### Service Won't Start
- Check Render logs in dashboard
- Verify all environment variables are set
- Make sure `package.json` and `server.js` are in root directory

### Can't Log In
- Check CORS settings
- Verify `SESSION_SECRET` is set
- Check browser console for errors

### Videos Not Playing
- Upload videos via the Upload page
- Remember: they'll be deleted on service restart (free tier limitation)

### Email Notifications Not Working
- Verify `EMAIL_USER` and `EMAIL_PASS` in Render environment variables
- Check Gmail app password is correct
- Check Render logs for email errors

## Next Steps After Deployment

1. Test all features on your live site
2. Upload your video files
3. Share your live URL: `https://voddev-backend.onrender.com`
4. Consider upgrading to paid plan for persistent storage

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com

---

**Your deployment is ready to go! Follow these steps and your site will be live with all features working.**
