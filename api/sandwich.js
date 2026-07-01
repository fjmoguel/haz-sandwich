export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredients array is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: `I have these ingredients available: ${ingredients.join(', ')}.

STEP 1 - VALIDATE INGREDIENTS:
Check each ingredient in my list. Some may have typos or informal spelling (e.g. "lettce" = lettuce, "tomatoe" = tomato, "chz" = cheese) - correct these silently and treat them as valid.

However, if any items are NOT food/sandwich ingredients at all (e.g. "bullets", "rocks", "shoes", random gibberish, or anything not edible), respond with ONLY this JSON and nothing else:
{
  "error": "invalid_ingredients",
  "invalid_items": ["item1", "item2"]
}

If ALL ingredients are valid (after correcting typos), proceed to STEP 2 below using the corrected ingredient names.

STEP 2 - CREATE THREE COMPLETELY DIFFERENT sandwich recommendations with maximum variety:

1. **The Loaded One** - Use ALL or MOST of my ingredients to make a hearty, stacked sandwich
2. **The Simple Classic** - Use only 2-4 ingredients for a simple, timeless sandwich
3. **The Creative Wildcard** - An unexpected combination or fusion style using any ingredients

IMPORTANT VARIETY RULES:
- Make each sandwich COMPLETELY different in style and flavor profile
- Vary cooking methods: grilled, cold, toasted, pressed, open-faced, panini-style, etc.
- Vary cuisines: American deli, Mediterranean, Asian-fusion, Italian, Mexican-inspired, etc.
- Use different bread preparations if applicable
- Create different taste experiences: spicy, tangy, savory, fresh, comfort food, etc.
- NO REPETITION - if one uses turkey, the others should highlight different proteins or be vegetarian
- Only use ingredients from my (corrected) list, plus common pantry staples (salt, pepper, oil) - never invent ingredients I didn't mention

For complementary ingredients, organize by category:
- Proteins (meats, eggs, plant-based)
- Breads (different types to try)
- Veggies (fresh, pickled, roasted)
- Sauces & Spreads (condiments, dressings, mayo-based, oil-based)
- Toppings & Extras (cheese, herbs, spices, crunch elements)

Format your response as JSON with this structure:
{
  "sandwiches": [
    {
      "name": "Sandwich Name",
      "style": "cooking method and cuisine style (e.g., 'Grilled American Classic' or 'Cold Mediterranean')",
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": "Brief assembly instructions with cooking method if needed"
    }
  ],
  "complementary_ingredients": {
    "proteins": ["suggestion1", "suggestion2"],
    "breads": ["suggestion1", "suggestion2"],
    "veggies": ["suggestion1", "suggestion2"],
    "sauces": ["suggestion1", "suggestion2"],
    "extras": ["suggestion1", "suggestion2"]
  },
  "future_inspiration": [
    {
      "name": "Sandwich Name",
      "description": "Brief description highlighting what makes it special and different from the three recommendations above"
    }
  ]
}

Respond ONLY with the JSON object (either the error shape from STEP 1 or the sandwiches shape from STEP 2), no markdown backticks or preamble.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({ error: 'Failed to get recommendations from Claude' });
    }

    const data = await response.json();

    // Peek at Claude's actual text output to check for the invalid-ingredients case
    const textContent = data.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    try {
      const parsed = JSON.parse(textContent);
      if (parsed.error === 'invalid_ingredients') {
        const items = (parsed.invalid_items || []).join(', ');
        return res.status(400).json({
          error: `These don't look like sandwich ingredients: ${items}. Try again with real food items.`
        });
      }
    } catch (parseErr) {
      // If it doesn't parse cleanly here, let it pass through as-is;
      // the frontend's own JSON.parse will handle/report it the same way it already does.
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}