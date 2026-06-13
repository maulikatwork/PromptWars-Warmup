import { type Swap } from '../types';

export function SwapsSection(swaps: Swap[]): HTMLElement {
  const section = document.createElement('div');
  section.className = 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden';

  const header = document.createElement('div');
  header.className = 'px-5 sm:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]';
  header.innerHTML = `
    <h3 class="text-sm font-semibold text-[var(--color-fg)]">Smart Swaps</h3>
    <p class="text-xs text-[var(--color-muted)] mt-1">Ingredient alternatives to save money and reduce waste</p>
  `;
  section.appendChild(header);

  const content = document.createElement('div');
  content.className = 'p-5 sm:p-6';

  if (!swaps || swaps.length === 0) {
    content.innerHTML = `
      <p class="text-xs text-[var(--color-muted)] text-center py-4">No swaps available</p>
    `;
  } else {
    const swapsList = document.createElement('div');
    swapsList.className = 'flex flex-col gap-3';

    swaps.forEach((swap) => {
      const swapCard = document.createElement('div');
      swapCard.className = 'p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-alt)]';

      swapCard.innerHTML = `
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2">
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-1">From</p>
              <p class="text-sm font-medium text-[var(--color-fg)] break-words">${swap.originalIngredient}</p>
            </div>
            <svg class="w-5 h-5 text-[var(--color-brand-500)] flex-shrink-0 mt-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-1">To</p>
              <p class="text-sm font-medium text-[var(--color-success)] break-words">${swap.swapIngredient}</p>
            </div>
          </div>
          <div>
            <p class="text-xs text-[var(--color-muted)] mb-1">Why:</p>
            <p class="text-xs text-[var(--color-fg)]">${swap.reason}</p>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
            <span class="text-xs text-[var(--color-muted)]">Potential savings</span>
            <span class="text-sm font-semibold text-[var(--color-success)]">₹${swap.savings.toFixed(0)}</span>
          </div>
        </div>
      `;

      swapsList.appendChild(swapCard);
    });

    content.appendChild(swapsList);
  }

  section.appendChild(content);
  return section;
}
