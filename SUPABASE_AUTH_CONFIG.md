# Fix Email Confirmation Redirect

## Problem
Email confirmation links redirect to `localhost:3000` instead of your production URL.

## Solution
Update the Site URL in your Supabase project settings.

### Steps:

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project: `todo-app-supabase`

2. **Navigate to Authentication Settings**
   - Click on **"Authentication"** in the left sidebar
   - Click on **"URL Configuration"**

3. **Update Site URL**
   - Find **"Site URL"** field
   - Change from: `http://localhost:3000`
   - Change to: `https://kiroween-to-do-list.onrender.com`

4. **Add Redirect URLs (Optional but Recommended)**
   - Scroll to **"Redirect URLs"** section
   - Add these URLs (one per line):
     ```
     https://kiroween-to-do-list.onrender.com/**
     http://localhost:5173/**
     ```
   - This allows both production and local development

5. **Save Changes**
   - Click **"Save"** at the bottom

### Test the Fix:

1. Sign up with a new email address
2. Check the confirmation email
3. The link should now point to `https://kiroween-to-do-list.onrender.com`
4. After clicking, you'll be redirected to your app and automatically signed in

### For Local Development:

When testing locally, you can temporarily change the Site URL back to:
- `http://localhost:5173`

Or keep the production URL and manually sign in after email confirmation.

## Alternative: Disable Email Confirmation (Not Recommended for Production)

If you want to skip email confirmation entirely:

1. Go to **Authentication** → **Providers** → **Email**
2. Toggle off **"Confirm email"**
3. Users will be able to sign in immediately without email confirmation

**Note:** This is less secure and not recommended for production apps.
