# Haz Sandwich 🥪

A personalized sandwich recipe generator that helps you create delicious sandwiches based on your available ingredients. Perfect for daily lunch prep!

## Features

- **Ingredient Input**: Add any ingredients you have on hand
- **AI-Powered Recommendations**: Get 3 creative sandwich recipes using your ingredients
- **Complementary Suggestions**: Discover ingredients that would enhance your sandwiches
- **Future Inspiration**: Get ideas for sandwiches to try next time

## Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Claude API** - AI-powered recipe generation
- **Vercel** - Deployment platform

## Local Development

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd haz-sandwich
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your repository

5. Vercel will automatically detect it's a Vite project

6. Click "Deploy"

### Environment Variables

For the API to work, you need to set your Anthropic API key:

**Local Development:**
Create a `.env` file in the root:
```
ANTHROPIC_API_KEY=your_api_key_here
```

**Vercel Deployment:**
Add the environment variable in Vercel dashboard:
- Go to Settings → Environment Variables
- Add `ANTHROPIC_API_KEY` with your key
- Apply to all environments (Production, Preview, Development)

## Project Structure

```
haz-sandwich/
├── api/
│   └── sandwich.js        # Vercel serverless function
├── src/
│   ├── SandwichApp.jsx    # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── postcss.config.js      # PostCSS configuration
```

## How It Works

1. **Input**: User enters available ingredients (bread, cheese, turkey, etc.)
2. **Frontend**: App sends ingredients to `/api/sandwich` serverless function
3. **Backend**: Serverless function calls Claude API securely with your API key
4. **Response**: Claude returns JSON with sandwich recipes, suggestions, and inspiration
5. **Display**: Beautiful UI shows all recommendations in organized sections

This architecture keeps your API key secure on the server side!

## Claude API Integration

The app uses the Claude Sonnet 4 model via the Anthropic API. The prompt is structured to return:

- 3 sandwich recipes using only available ingredients
- 2-3 complementary ingredients to enhance the sandwiches
- 2 similar recipes for future inspiration

All responses are formatted as JSON for easy parsing and display.

## Customization

### Styling

The app uses a warm, appetizing color scheme with:
- Amber/orange tones for a deli-inspired feel
- Playfair Display for elegant headings
- Libre Baskerville for refined body text

Modify `src/SandwichApp.jsx` to change colors, fonts, or layout.

### API Prompt

Edit the prompt in the `getSandwichRecommendations` function to:
- Request more or fewer recipes
- Add dietary restrictions
- Change the output format
- Add nutritional information

## Production Considerations

For production use, consider:

1. **API Key Security**: Move the API call to a backend/serverless function
2. **Rate Limiting**: Implement request throttling
3. **Caching**: Cache common ingredient combinations
4. **Error Handling**: Add retry logic and better error messages
5. **Analytics**: Track popular ingredients and recipes

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for better lunch breaks
