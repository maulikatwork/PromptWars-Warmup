export function CostSummary(totalCost: number): HTMLElement {
  const section = document.createElement('div');
  section.className = 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-alt)] overflow-hidden';

  section.innerHTML = `
    <div class="px-5 sm:px-6 py-6 flex flex-col gap-1">
      <p class="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide">Estimated Total Budget</p>
      <div class="flex items-baseline gap-2">
        <span class="text-4xl font-bold text-[var(--color-brand-600)]">₹${(totalCost || 0).toFixed(0)}</span>
        <span class="text-xs text-[var(--color-muted)]">for 3 meals</span>
      </div>
      <p class="text-xs text-[var(--color-muted)] mt-3">Per meal: ₹${((totalCost || 0) / 3).toFixed(0)}</p>
    </div>
  `;

  return section;
}
