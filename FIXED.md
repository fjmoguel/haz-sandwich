# ✅ CORS ISSUE FIXED!

The CORS error has been resolved by adding a serverless backend API.

## What Changed?

### Before (Direct API Call - CORS Error ❌)
```
Browser → Claude API (BLOCKED by CORS)
```

### After (Serverless Function - Works ✅)
```
Browser → Vercel Serverless Function → Claude API
```

## Files Added/Updated

1. **`api/sandwich.js`** - New serverless function that calls Claude API
2. **`src/SandwichApp.jsx`** - Updated to call `/api/sandwich` instead of Claude API directly
3. **`.env.example`** - Example environment file

## What You Need to Do:

### 1. Update Your Local Files

Copy the new `api` folder and updated `src/SandwichApp.jsx` to your local project:

```bash
# You should have these new files:
# - api/sandwich.js (NEW)
# - src/SandwichApp.jsx (UPDATED)
```

### 2. Setup Environment Variables

Create a `.env.local` file OR use Vercel CLI:

**Option A: Manual .env.local file**
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Option B: Vercel CLI (Recommended)**
```bash
vercel env add ANTHROPIC_API_KEY
vercel env pull
```

### 3. Run Locally with Vercel CLI

You MUST use Vercel CLI to run locally (not `npm run dev`):

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Login
vercel login

# Link project (first time only)
vercel link

# Add environment variable (first time only)
vercel env add ANTHROPIC_API_KEY

# Pull env vars
vercel env pull

# Run dev server
vercel dev
```

Open http://localhost:3000 and test!

**Why?** The `/api/sandwich` endpoint is a serverless function that only works with Vercel CLI locally.

### 4. Push to GitHub

```bash
git add .
git commit -m "Fix CORS issue with serverless API"
git push origin main
```

### 5. Update Vercel Environment Variable

In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. **Add** (or update) the variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key
   - Apply to: All environments

Note: Keep `VITE_ANTHROPIC_API_KEY` in your local `.env` for development!

### 6. Redeploy

Vercel should auto-deploy when you push, OR manually redeploy in the Vercel dashboard.

## How It Works Now

**Both Development and Production use the serverless function:**

1. User adds ingredients in browser
2. Frontend sends ingredients to `/api/sandwich`
3. Serverless function calls Claude API with `ANTHROPIC_API_KEY`
4. Results return to frontend and display

**Development:** Run with `vercel dev` (runs serverless functions locally)
**Production:** Vercel automatically runs serverless functions

✅ **No CORS issues anywhere**
✅ **API key always secure on server**
✅ **Same code works everywhere**

---

Test it and let me know if it works! 🥪✨
