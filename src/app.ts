import { DietSelector } from './components/DietSelector';
import { ProteinMatrix } from './components/ProteinMatrix';
import { BudgetSelector } from './components/BudgetSelector';
import { ContextInput } from './components/ContextInput';
import { ResultsPlaceholder } from './components/ResultsPlaceholder';
import { getState } from './state';

export function App(): HTMLElement {
  const root = document.createElement('div');
  root.className = 'min-h-screen bg-[var(--color-surface-alt)]';

  // ── Header ────────────────────────────────────────────────
  const header = document.createElement('header');
  header.className = 'bg-[var(--color-surface)] border-b border-[var(--color-border)] px-6 py-4';
  header.innerHTML = `
    <div class="max-w-3xl mx-auto flex items-center gap-3">
      <span class="text-2xl">🥘</span>
      <div>
        <h1 class="text-base font-semibold text-[var(--color-fg)] leading-tight">AI Meal Planner</h1>
        <p class="text-xs text-[var(--color-muted)]">Personalized Indian meal plans, powered by AI</p>
      </div>
    </div>
  `;

  // ── Main layout ───────────────────────────────────────────
  const main = document.createElement('main');
  main.className = 'max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6';

  // ── Input card ────────────────────────────────────────────
  const inputCard = document.createElement('section');
  inputCard.setAttribute('aria-label', 'Meal plan inputs');
  inputCard.className = [
    'bg-[var(--color-surface)] rounded-[var(--radius-xl)]',
    'border border-[var(--color-border)]',
    'shadow-[var(--shadow-card)]',
    'p-5 sm:p-6 flex flex-col gap-6',
  ].join(' ');

  const inputHeading = document.createElement('div');
  inputHeading.innerHTML = `
    <h2 class="text-base font-semibold text-[var(--color-fg)]">Your Preferences</h2>
    <p class="text-xs text-[var(--color-muted)] mt-0.5">Tell us about your diet and budget — we'll handle the rest</p>
  `;

  const divider = () => {
    const hr = document.createElement('hr');
    hr.className = 'border-0 border-t border-[var(--color-border)]';
    return hr;
  };

  // ── Submit button ─────────────────────────────────────────
  const submitWrapper = document.createElement('div');
  submitWrapper.innerHTML = `
    <button
      id="generate-btn"
      type="button"
      class="w-full py-3 px-6 rounded-[var(--radius-md)] bg-[var(--color-brand-500)] text-white
             font-semibold text-sm tracking-wide
             shadow-[var(--shadow-card)] hover:bg-[var(--color-brand-600)]
             active:scale-[0.98] transition-all duration-150 cursor-pointer
             disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate Meal Plan
    </button>
    <p id="submit-hint" class="text-xs text-center text-[var(--color-muted)] mt-2 hidden"></p>
  `;

  const generateBtn = submitWrapper.querySelector<HTMLButtonElement>('#generate-btn')!;
  generateBtn.addEventListener('click', () => {
    const state = getState();
    console.log('[Task 1] Form state ready for API handoff:', JSON.stringify(state, null, 2));
    // Task 2 will wire this to the DeepSeek API call
    const hint = submitWrapper.querySelector<HTMLParagraphElement>('#submit-hint')!;
    hint.textContent = `Diet: ${state.dietType} · Budget: ${state.budgetTier} · Proteins: ${state.selectedProteins.join(', ') || 'AI decides'}`;
    hint.classList.remove('hidden');
  });

  // ── Results section ───────────────────────────────────────
  const resultsSection = document.createElement('section');
  resultsSection.setAttribute('aria-label', 'Meal plan results');

  const resultsHeading = document.createElement('div');
  resultsHeading.className = 'mb-4';
  resultsHeading.innerHTML = `
    <h2 class="text-base font-semibold text-[var(--color-fg)]">Your Meal Plan</h2>
    <p class="text-xs text-[var(--color-muted)] mt-0.5">Meal itinerary, grocery list, and smart swaps</p>
  `;

  // Assemble input card
  inputCard.appendChild(inputHeading);
  inputCard.appendChild(divider());
  inputCard.appendChild(DietSelector());
  inputCard.appendChild(divider());
  inputCard.appendChild(ProteinMatrix());
  inputCard.appendChild(divider());
  inputCard.appendChild(BudgetSelector());
  inputCard.appendChild(divider());
  inputCard.appendChild(ContextInput());
  inputCard.appendChild(divider());
  inputCard.appendChild(submitWrapper);

  // Assemble results section
  resultsSection.appendChild(resultsHeading);
  resultsSection.appendChild(ResultsPlaceholder());

  // Assemble main
  main.appendChild(inputCard);
  main.appendChild(resultsSection);

  root.appendChild(header);
  root.appendChild(main);

  return root;
}
