import { type BudgetTier } from '../types';
import { getState, setBudgetTier, subscribe } from '../state';

const TIERS: { value: BudgetTier; label: string; range: string; icon: string }[] = [
  { value: 'low',    label: 'Budget',   range: '< ₹200/day',  icon: '🪙' },
  { value: 'medium', label: 'Standard', range: '₹200–400/day', icon: '💳' },
  { value: 'high',   label: 'Premium',  range: '₹400+/day',   icon: '✨' },
];

export function BudgetSelector(): HTMLElement {
  const section = document.createElement('div');

  function render() {
    const { budgetTier } = getState();

    section.innerHTML = `
      <fieldset class="border-0 p-0 m-0">
        <legend class="text-sm font-semibold text-[var(--color-fg)] mb-3 tracking-wide uppercase">
          Budget Tier
        </legend>
        <div class="grid grid-cols-3 gap-3">
          ${TIERS.map(t => `
            <label
              class="cursor-pointer rounded-[var(--radius-md)] border-2 p-3 flex flex-col gap-1 transition-all duration-150
                ${t.value === budgetTier
                  ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-300)]'
                }"
            >
              <input
                type="radio"
                name="budget"
                value="${t.value}"
                class="sr-only"
                ${t.value === budgetTier ? 'checked' : ''}
              />
              <span class="text-xl leading-none">${t.icon}</span>
              <span class="text-sm font-semibold text-[var(--color-fg)]">${t.label}</span>
              <span class="text-xs text-[var(--color-muted)]">${t.range}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>
    `;

    section.querySelectorAll<HTMLInputElement>('input[name="budget"]').forEach(input => {
      input.addEventListener('change', () => {
        setBudgetTier(input.value as BudgetTier);
      });
    });
  }

  render();
  subscribe(render);
  return section;
}
