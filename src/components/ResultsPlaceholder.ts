export function ResultsPlaceholder(): HTMLElement {
  const section = document.createElement('div');

  section.innerHTML = `
    <div class="rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8">
      <div class="flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-center text-2xl">
          🍽️
        </div>
        <div>
          <p class="text-sm font-semibold text-[var(--color-fg)]">Your meal plan will appear here</p>
          <p class="text-xs text-[var(--color-muted)] mt-0.5">Fill in your preferences above and hit Generate</p>
        </div>
        <div class="w-full grid grid-cols-3 gap-2 mt-2 opacity-40 pointer-events-none select-none">
          ${['Breakfast', 'Lunch', 'Dinner'].map(meal => `
            <div class="rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] p-3 text-left">
              <div class="text-xs text-[var(--color-muted)] font-medium mb-2">${meal}</div>
              <div class="h-3 bg-[var(--color-border)] rounded mb-1.5 w-4/5"></div>
              <div class="h-2.5 bg-[var(--color-border)] rounded w-1/2"></div>
            </div>
          `).join('')}
        </div>
        <div class="w-full rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] p-3 opacity-40 pointer-events-none select-none">
          <div class="text-xs text-[var(--color-muted)] font-medium mb-2">Grocery List</div>
          <div class="flex gap-2 flex-wrap">
            ${['Produce', 'Dairy', 'Pantry'].map(cat => `
              <span class="px-2 py-0.5 rounded-full bg-[var(--color-border)] text-xs">${cat}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}
