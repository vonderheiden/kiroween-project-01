# Render Deployment Guide

## Quick Deploy Steps

### 1. Sign in to Render
Go to [render.com](https://render.com) and sign in with your GitHub account.

### 2. Create New Static Site
1. Click **"New +"** button in the top right
2. Select **"Static Site"**

### 3. Connect Repository
1. Click **"Connect a repository"**
2. If this is your first time, authorize Render to access your GitHub
3. Search for and select: **`vonderheiden/kiroween-project-01`**

### 4. Configure the Site
Render will auto-detect settings from `render.yaml`, but verify:

- **Name**: `todo-app-supabase` (or choose your own)
- **Branch**: `main`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### 5. Add Environment Variables
Click **"Advanced"** and add these environment variables:

**Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://uyvthfisjmclxkmwbfrm.supabase.co`

**Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5dnRoZmlzam1jbHhrbXdiZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMjYwNDIsImV4cCI6MjA3OTYwMjA0Mn0.3_e6aHCLmiNGkae8gwdLlrbFczTGK_JO7gJLLNHGze0`

### 6. Deploy
1. Click **"Create Static Site"**
2. Render will start building your app (takes 2-3 minutes)
3. Watch the build logs for any errors

### 7. Access Your App
Once deployed, your app will be available at:
`https://todo-app-supabase.onrender.com` (or your custom name)

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure environment variables are set correctly
- Verify the repository is up to date

### App Loads but Can't Connect to Supabase
- Double-check environment variables are correct
- Ensure no extra spaces in the values
- Check browser console for errors

### Blank Page
- Check browser console for errors
- Verify the build completed successfully
- Ensure `dist` folder was created during build

## Auto-Deploy
Render will automatically redeploy when you push to the `main` branch on GitHub.

## Custom Domain (Optional)
1. Go to your site settings in Render
2. Click "Custom Domains"
3. Follow instructions to add your domain
