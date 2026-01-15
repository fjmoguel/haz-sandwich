# 🔧 Local Development Setup

The Anthropic API blocks direct browser calls (CORS), so we need to run the serverless function locally too.

## Option 1: Vercel CLI (Recommended - Easiest)

This runs your serverless functions locally just like in production!

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Link Your Project (First Time Only)

```bash
vercel link
```

Follow the prompts to link to your GitHub project.

### Step 4: Add Environment Variable

```bash
vercel env add ANTHROPIC_API_KEY
```

Paste your API key when prompted.
Select: Development, Preview, Production (all three)

### Step 5: Pull Environment Variables Locally

```bash
vercel env pull
```

This creates a `.env.local` file with your API key.

### Step 6: Run Development Server

```bash
vercel dev
```

This will:
- Run your React app on http://localhost:3000
- Run your API functions on http://localhost:3000/api/sandwich
- Everything works together! ✅

### Step 7: Open Your App

Open http://localhost:3000 and test it!

---

## Option 2: Simple Node Script (Alternative)

If you don't want to use Vercel CLI, I can create a simple Express server that does the same thing. Let me know!

---

## Which .env File to Use?

- `.env.local` - Created by Vercel CLI (auto-generated, gitignored)
- `.env` - Manual backup (you can create this too)

Both work, but `.env.local` is created automatically by `vercel env pull`.

---

## Quick Commands

```bash
# Start local dev with Vercel CLI
vercel dev

# Or if you want to use regular Vite (won't work - CORS issues)
npm run dev  # ❌ This will have CORS errors
```

## TL;DR

1. `npm install -g vercel`
2. `vercel login`
3. `vercel link`
4. `vercel env add ANTHROPIC_API_KEY`
5. `vercel env pull`
6. `vercel dev`
7. Open http://localhost:3000

Done! 🎉
