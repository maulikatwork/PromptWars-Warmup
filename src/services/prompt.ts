import { type FormState } from '../types';

const SCHEMA = `{
  "meals": [
    { "type": "Breakfast", "dish": "string", "cost": number },
    { "type": "Lunch",     "dish": "string", "cost": number },
    { "type": "Dinner",    "dish": "string", "cost": number }
  ],
  "groceries": {
    "Produce":    [{ "item": "string", "cost": number }],
    "Dairy/Meat": [{ "item": "string", "cost": number }],
    "Pantry":     [{ "item": "string", "cost": number }]
  },
  "swaps": [
    {
      "originalIngredient": "string",
      "swapIngredient": "string",
      "reason": "string",
      "savings": number
    }
  ],
  "totalCost": number
}`;

export const SYSTEM_PROMPT = `You are an expert Indian culinary and household budget assistant.
Your sole job is to generate a single-day Indian meal plan with a matching grocery list and smart ingredient swaps.

RULES — follow every rule without exception:
1. Respond with ONLY a raw JSON object. No markdown, no code fences, no explanations, no conversational text.
2. The JSON must exactly match this schema (all fields required):
${SCHEMA}
3. All costs are realistic market prices in Indian Rupees (INR) as integers.
4. Dishes must be authentic, named Indian recipes (e.g., "Masala Dosa", "Dal Tadka", not generic terms).
5. The grocery list must cover the ingredients needed for all three meals grouped by aisle.
6. Provide at least one and at most three smart swaps that reduce cost while preserving nutrition.
7. totalCost = sum of all grocery item costs (not meal costs).`;

export function buildUserPrompt(form: FormState): string {
  const proteins = form.selectedProteins.length
    ? `Preferred proteins: ${form.selectedProteins.join(', ')}.`
    : 'No protein preference — choose appropriate options for the diet.';

  const budgetLabel: Record<string, string> = {
    low: 'low budget (under ₹200 total grocery spend)',
    medium: 'medium budget (₹200–400 total grocery spend)',
    high: 'premium budget (₹400+ total grocery spend)',
  };

  const custom = form.customRequest.trim()
    ? `Special request from user: "${form.customRequest.trim()}"`
    : '';

  return [
    `Diet: ${form.dietType}.`,
    proteins,
    `Budget: ${budgetLabel[form.budgetTier]}.`,
    custom,
    'Generate the meal plan now.',
  ]
    .filter(Boolean)
    .join('\n');
}
