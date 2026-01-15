import React, { useState } from 'react';
import { Loader2, Sparkles, Plus, X } from 'lucide-react';

export default function SandwichApp() {
  const [ingredients, setIngredients] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim().toLowerCase())) {
      setIngredients([...ingredients, currentInput.trim().toLowerCase()]);
      setCurrentInput('');
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const getSandwichRecommendations = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `I have these ingredients available: ${ingredients.join(', ')}.

Please provide:
1. Three creative sandwich recommendations I can make RIGHT NOW with ONLY these ingredients
2. 2-3 complementary ingredients I could add to elevate these sandwiches (things commonly available that would pair well)
3. Two similar sandwich recipes for future inspiration (can include additional ingredients)

Format your response as JSON with this structure:
{
  "sandwiches": [
    {
      "name": "Sandwich Name",
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": "Brief assembly instructions"
    }
  ],
  "complementary_ingredients": ["ingredient1", "ingredient2"],
  "future_inspiration": [
    {
      "name": "Sandwich Name",
      "description": "Brief description and what makes it special"
    }
  ]
}

Respond ONLY with the JSON object, no markdown backticks or preamble.`
            }
          ]
        })
      });

      const data = await response.json();
      const textContent = data.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      // Clean up any markdown formatting
      const cleanedText = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsedData = JSON.parse(cleanedText);
      setRecommendations(parsedData);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Daily Sandwich
          </h1>
          <p className="text-xl text-amber-800/80" style={{ fontFamily: 'Libre Baskerville, Georgia, serif' }}>
            What's in your kitchen today?
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 p-8 mb-8 border-2 border-amber-100">
          <label className="block text-2xl font-semibold text-amber-900 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Available Ingredients
          </label>
          
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type an ingredient..."
              className="flex-1 px-6 py-4 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all text-lg"
            />
            <button
              onClick={addIngredient}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {/* Ingredient Tags */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-full font-medium flex items-center gap-2 border border-amber-200 shadow-sm"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="hover:bg-amber-200 rounded-full p-0.5 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={getSandwichRecommendations}
            disabled={loading || ingredients.length === 0}
            className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-600/50 disabled:shadow-none flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Crafting recipes...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Get Sandwich Ideas
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800">
              {error}
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        {recommendations && (
          <div className="space-y-8 animate-fadeIn">
            {/* Sandwich Recommendations */}
            <section className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 p-8 border-2 border-amber-100">
              <h2 className="text-4xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Your Sandwiches
              </h2>
              <div className="space-y-6">
                {recommendations.sandwiches?.map((sandwich, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all"
                  >
                    <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      {sandwich.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sandwich.ingredients?.map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-amber-800 rounded-full text-sm font-medium border border-amber-200"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                    <p className="text-amber-800 leading-relaxed">
                      {sandwich.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Complementary Ingredients */}
            <section className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 p-8 border-2 border-amber-100">
              <h2 className="text-4xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Level Up
              </h2>
              <p className="text-amber-800 mb-4 text-lg">
                Consider adding these to elevate your sandwiches:
              </p>
              <div className="flex flex-wrap gap-3">
                {recommendations.complementary_ingredients?.map((ing, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-900 rounded-2xl font-semibold border-2 border-green-200 shadow-sm"
                  >
                    + {ing}
                  </span>
                ))}
              </div>
            </section>

            {/* Future Inspiration */}
            <section className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 p-8 border-2 border-amber-100">
              <h2 className="text-4xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Next Time
              </h2>
              <div className="space-y-4">
                {recommendations.future_inspiration?.map((recipe, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100"
                  >
                    <h3 className="text-2xl font-bold text-blue-900 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      {recipe.name}
                    </h3>
                    <p className="text-blue-800">
                      {recipe.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Libre+Baskerville:wght@400;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        * {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </div>
  );
}
