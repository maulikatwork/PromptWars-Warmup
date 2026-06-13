export type DietType = 'vegetarian' | 'eggitarian' | 'non-vegetarian';
export type BudgetTier = 'low' | 'medium' | 'high';

export interface FormState {
  dietType: DietType;
  selectedProteins: string[];
  budgetTier: BudgetTier;
  customRequest: string;
}

export const PROTEIN_OPTIONS: Record<DietType, string[]> = {
  vegetarian: ['Paneer', 'Tofu', 'Soya', 'Lentils', 'Chickpeas', 'Kidney Beans'],
  eggitarian: ['Eggs', 'Paneer', 'Tofu', 'Soya', 'Lentils', 'Chickpeas'],
  'non-vegetarian': ['Chicken', 'Mutton', 'Fish', 'Eggs', 'Paneer', 'Tofu', 'Lentils'],
};
