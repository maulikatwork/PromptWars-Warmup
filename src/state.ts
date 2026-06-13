import { type FormState, type DietType, type BudgetTier, type DashboardData, type ApiStatus, PROTEIN_OPTIONS } from './types';

// ── Combined app state ─────────────────────────────────────
interface AppState {
  form: FormState;
  apiStatus: ApiStatus;
  dashboardData: DashboardData | null;
  apiError: string | null;
}

type Listener = (state: AppState) => void;

const state: AppState = {
  form: {
    dietType: 'vegetarian',
    selectedProteins: [],
    budgetTier: 'medium',
    customRequest: '',
  },
  apiStatus: 'idle',
  dashboardData: null,
  apiError: null,
};

const listeners: Listener[] = [];

function snapshot(): AppState {
  return {
    ...state,
    form: { ...state.form, selectedProteins: [...state.form.selectedProteins] },
  };
}

function notify() {
  const snap = snapshot();
  listeners.forEach(fn => fn(snap));
}

export function getState(): AppState {
  return snapshot();
}

export function subscribe(fn: Listener): () => void {
  listeners.push(fn);
  return () => listeners.splice(listeners.indexOf(fn), 1);
}

// ── Form mutations ─────────────────────────────────────────
export function setDietType(diet: DietType) {
  state.form.dietType = diet;
  const valid = PROTEIN_OPTIONS[diet];
  state.form.selectedProteins = state.form.selectedProteins.filter(p => valid.includes(p));
  notify();
}

export function toggleProtein(protein: string) {
  const idx = state.form.selectedProteins.indexOf(protein);
  if (idx === -1) state.form.selectedProteins.push(protein);
  else state.form.selectedProteins.splice(idx, 1);
  notify();
}

export function setBudgetTier(tier: BudgetTier) {
  state.form.budgetTier = tier;
  notify();
}

export function setCustomRequest(text: string) {
  state.form.customRequest = text;
  notify();
}

// ── API state mutations ────────────────────────────────────
export function setLoading() {
  state.apiStatus = 'loading';
  state.apiError = null;
  notify();
}

export function setDashboardData(data: DashboardData) {
  state.apiStatus = 'success';
  state.dashboardData = data;
  state.apiError = null;
  notify();
}

export function setApiError(message: string) {
  state.apiStatus = 'error';
  state.apiError = message;
  notify();
}
