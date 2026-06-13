import { type DashboardData } from '../types';

export function GrocerySection(groceries: DashboardData['groceries']): HTMLElement {
  const section = document.createElement('div');
  section.className = 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden';

  const header = document.createElement('div');
  header.className = 'px-5 sm:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]';
  header.innerHTML = `
    <h3 class="text-sm font-semibold text-[var(--color-fg)]">Grocery Manifest</h3>
  `;
  section.appendChild(header);

  const content = document.createElement('div');
  content.className = 'p-5 sm:p-6 flex flex-col gap-5';

  const categories = Object.entries(groceries || {});
  const hasAnyItems = categories.some(([_, items]) => items && items.length > 0);

  if (!hasAnyItems) {
    content.innerHTML = `
      <p class="text-xs text-[var(--color-muted)] text-center py-4">No groceries available</p>
    `;
  } else {
    categories.forEach(([category, items]) => {
      if (!items || items.length === 0) return;

      const categoryGroup = document.createElement('div');
      categoryGroup.className = 'flex flex-col gap-2';

      const categoryTitle = document.createElement('p');
      categoryTitle.className = 'text-xs font-semibold text-[var(--color-fg)] uppercase tracking-wide text-[var(--color-muted)]';
      categoryTitle.textContent = category;
      categoryGroup.appendChild(categoryTitle);

      const itemsList = document.createElement('div');
      itemsList.className = 'flex flex-col gap-2';

      items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'flex items-center justify-between p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border)]';
        itemEl.innerHTML = `
          <span class="text-sm text-[var(--color-fg)]">${item.item}</span>
          <span class="text-xs font-semibold text-[var(--color-brand-600)]">₹${item.cost.toFixed(0)}</span>
        `;
        itemsList.appendChild(itemEl);
      });

      categoryGroup.appendChild(itemsList);
      content.appendChild(categoryGroup);
    });
  }

  section.appendChild(content);
  return section;
}
