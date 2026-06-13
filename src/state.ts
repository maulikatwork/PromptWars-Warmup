import { type FormState, type DietType, type BudgetTier, PROTEIN_OPTIONS } from './types';

type Listener = (state: FormState) => void;

const state: FormState = {
  dietType: 'vegetarian',
  selectedProteins: [],
  budgetTier: 'medium',
  customRequest: '',
};

const listeners: Listener[] = [];

function notify() {
  listeners.forEach(fn => fn({ ...state, selectedProteins: [...state.selectedProteins] }));
}

export function getState(): FormState {
  return { ...state, selectedProteins: [...state.selectedProteins] };
}

export function subscribe(fn: Listener): () => void {
  listeners.push(fn);
  return () => listeners.splice(listeners.indexOf(fn), 1);
}

export function setDietType(diet: DietType) {
  state.dietType = diet;
  // Drop proteins that are no longer valid for the new diet
  const valid = PROTEIN_OPTIONS[diet];
  state.selectedProteins = state.selectedProteins.filter(p => valid.includes(p));
  notify();
}

export function toggleProtein(protein: string) {
  const idx = state.selectedProteins.indexOf(protein);
  if (idx === -1) state.selectedProteins.push(protein);
  else state.selectedProteins.splice(idx, 1);
  notify();
}

export function setBudgetTier(tier: BudgetTier) {
  state.budgetTier = tier;
  notify();
}

export function setCustomRequest(text: string) {
  state.customRequest = text;
  notify();
}
