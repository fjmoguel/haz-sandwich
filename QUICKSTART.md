# 🚀 Quick Start Guide

Get your Haz Sandwich app running in 5 minutes!

## Step 1: Extract Files

Extract the `haz-sandwich` folder to your preferred location.

## Step 2: Install Dependencies

Open your terminal in the `haz-sandwich` folder and run:

```bash
npm install
```

This will install all required packages (React, Vite, Tailwind, etc.)

## Step 3: Setup for Local Development

Since the app uses a serverless API, you need Vercel CLI to run it locally:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add your API key
vercel env add ANTHROPIC_API_KEY

# Pull environment variables
vercel env pull
```

## Step 4: Run Locally

Start the development server:

```bash
vercel dev
```

Open your browser to: http://localhost:3000

**Note:** Don't use `npm run dev` - it won't work because the API endpoint needs Vercel to run!

## Step 5: Test It Out

1. Type some ingredients: "bread", "cheese", "turkey"
2. Click "Add" for each ingredient
3. Click "Get Sandwich Ideas"
4. See your AI-generated sandwich recipes! 🥪

## Step 6: Deploy to Vercel

### Option A: Via GitHub (Recommended)

1. Create a new repo on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Go to https://vercel.com
4. Click "New Project"
5. Import your GitHub repo
6. Click "Deploy"
7. Done! 🎉

### Option B: Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts, then deploy to production:
   ```bash
   vercel --prod
   ```

## What's Included

- ✅ Complete React app with beautiful UI
- ✅ Claude API integration
- ✅ Tailwind CSS styling
- ✅ Vite for fast development
- ✅ Ready for Vercel deployment
- ✅ Comprehensive documentation

## Customization Ideas

- Change color scheme in `src/SandwichApp.jsx`
- Add dietary restrictions (vegetarian, vegan, etc.)
- Include nutritional information
- Add a favorites/history feature
- Implement ingredient autocomplete

## Need Help?

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment troubleshooting
- Open an issue on GitHub

---

Happy sandwich making! 🥪✨
