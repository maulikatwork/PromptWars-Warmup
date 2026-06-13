export type DietType = 'vegetarian' | 'eggitarian' | 'non-vegetarian';
export type BudgetTier = 'low' | 'medium' | 'high';

export interface FormState {
  dietType: DietType;
  selectedProteins: string[];
  budgetTier: BudgetTier;
  customRequest: string;
}

// ── Dashboard data contract ────────────────────────────────
export interface Meal {
  type: string;   // 'Breakfast' | 'Lunch' | 'Dinner'
  dish: string;
  cost: number;
}

export interface GroceryItem {
  item: string;
  cost: number;
}

export interface Swap {
  originalIngredient: string;
  swapIngredient: string;
  reason: string;
  savings: number;
}

export interface DashboardData {
  meals: Meal[];
  groceries: {
    Produce: GroceryItem[];
    'Dairy/Meat': GroceryItem[];
    Pantry: GroceryItem[];
  };
  swaps: Swap[];
  totalCost: number;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

// ── Protein options ────────────────────────────────────────
export const PROTEIN_OPTIONS: Record<DietType, string[]> = {
  vegetarian: ['Paneer', 'Tofu', 'Soya', 'Lentils', 'Chickpeas', 'Kidney Beans'],
  eggitarian: ['Eggs', 'Paneer', 'Tofu', 'Soya', 'Lentils', 'Chickpeas'],
  'non-vegetarian': ['Chicken', 'Mutton', 'Fish', 'Eggs', 'Paneer', 'Tofu', 'Lentils'],
};
