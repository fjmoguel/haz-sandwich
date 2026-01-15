# Deployment Guide for Haz Sandwich

## Quick Deploy to Vercel (Recommended)

### Method 1: GitHub + Vercel (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Haz Sandwich app"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"
   - Done! Your app is live in ~2 minutes

### Method 2: Vercel CLI (Alternative)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Vercel Configuration

The project includes everything Vercel needs:
- ✅ `package.json` with build scripts
- ✅ Vite configuration
- ✅ No environment variables needed (API calls from frontend)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero configuration required

## Build Settings (Auto-detected by Vercel)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Post-Deployment

### Testing Your Deployed App

1. Visit your Vercel URL (e.g., `your-app.vercel.app`)
2. Try adding ingredients: bread, cheese, turkey
3. Click "Get Sandwich Ideas"
4. Verify you get AI-generated recommendations

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Important Notes

### API Key Security

⚠️ **Current Setup**: The Claude API is called directly from the browser. This is fine for:
- Personal use
- Prototypes
- Demos

🔒 **For Production**: Consider moving API calls to a backend to:
- Protect your API key
- Implement rate limiting
- Add usage monitoring
- Cache responses

### Creating a Backend API Route (Optional)

If you want to secure the API key, create a Vercel serverless function:

1. Create `api/sandwich.js`:
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ingredients } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: `...` }]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
```

2. Add environment variable in Vercel:
   - Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` (not VITE_ANTHROPIC_API_KEY - that's only for frontend)
   - Value: Your Anthropic API key
   - Apply to: All environments

3. Update frontend to call `/api/sandwich` instead of Claude API directly

## Troubleshooting

### Build Fails
- Check Node.js version (16+ required)
- Delete `node_modules` and reinstall
- Verify all dependencies in `package.json`

### API Errors
- Verify Claude API is accessible
- Check browser console for CORS errors
- Ensure API response is valid JSON

### Styling Issues
- Clear browser cache
- Check Tailwind CSS is properly configured
- Verify fonts are loading from Google Fonts

## Monitoring & Analytics

Add Vercel Analytics (Optional):
```bash
npm install @vercel/analytics
```

In `src/main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SandwichApp />
    <Analytics />
  </React.StrictMode>,
)
```

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` triggers automatic deployment
- Preview deployments for pull requests
- Rollback to previous deployments anytime

## Cost

- Vercel Hobby Plan: FREE
  - Perfect for personal projects
  - Unlimited deployments
  - Automatic HTTPS
  - 100GB bandwidth/month

- Claude API: Pay per use
  - ~$0.003 per request (Sonnet 4)
  - Monitor usage in Anthropic Console

---

Need help? Check:
- Vercel Docs: https://vercel.com/docs
- Anthropic Docs: https://docs.anthropic.com
