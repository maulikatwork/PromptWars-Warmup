import { type DashboardData, type GroceryItem, type Meal, type Swap } from '../types';

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function validateMeal(m: unknown): m is Meal {
  if (!isObject(m)) return false;
  return typeof m.type === 'string' && typeof m.dish === 'string' && typeof m.cost === 'number';
}

function validateGroceryItem(g: unknown): g is GroceryItem {
  if (!isObject(g)) return false;
  return typeof g.item === 'string' && typeof g.cost === 'number';
}

function validateSwap(s: unknown): s is Swap {
  if (!isObject(s)) return false;
  return (
    typeof s.originalIngredient === 'string' &&
    typeof s.swapIngredient === 'string' &&
    typeof s.reason === 'string' &&
    typeof s.savings === 'number'
  );
}

export function validateDashboardData(raw: unknown): DashboardData {
  if (!isObject(raw)) throw new Error('Response is not a JSON object');

  // meals
  if (!Array.isArray(raw.meals) || raw.meals.length === 0)
    throw new Error('Missing or empty meals array');
  if (!raw.meals.every(validateMeal))
    throw new Error('One or more meal entries are malformed');

  // groceries
  if (!isObject(raw.groceries)) throw new Error('Missing groceries object');
  const g = raw.groceries as Record<string, unknown>;
  for (const key of ['Produce', 'Dairy/Meat', 'Pantry']) {
    if (!Array.isArray(g[key])) throw new Error(`Missing groceries.${key} array`);
    if (!(g[key] as unknown[]).every(validateGroceryItem))
      throw new Error(`Malformed item in groceries.${key}`);
  }

  // swaps
  if (!Array.isArray(raw.swaps)) throw new Error('Missing swaps array');
  if (!raw.swaps.every(validateSwap)) throw new Error('One or more swap entries are malformed');

  // totalCost
  if (typeof raw.totalCost !== 'number') throw new Error('Missing or invalid totalCost');

  return raw as unknown as DashboardData;
}

export function extractJson(text: string): unknown {
  // Strip markdown code fences if model adds them despite instructions
  const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
  return JSON.parse(stripped);
}
