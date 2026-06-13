import { type Meal } from '../types';

export function MealSection(meals: Meal[]): HTMLElement {
  const section = document.createElement('div');
  section.className = 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden';

  if (!meals || meals.length === 0) {
    section.innerHTML = `
      <div class="p-5 sm:p-6 text-center text-[var(--color-muted)] text-xs">
        <p>No meals available</p>
      </div>
    `;
    return section;
  }

  // Group meals by type (assuming unique types)
  const groupedMeals: { [key: string]: Meal[] } = {};
  ['Breakfast', 'Lunch', 'Dinner'].forEach(type => {
    groupedMeals[type] = meals.filter(m => m.type === type);
  });

  const header = document.createElement('div');
  header.className = 'px-5 sm:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]';
  header.innerHTML = `
    <h3 class="text-sm font-semibold text-[var(--color-fg)]">Meal Itinerary</h3>
  `;
  section.appendChild(header);

  const content = document.createElement('div');
  content.className = 'p-5 sm:p-6 flex flex-col gap-4';

  Object.entries(groupedMeals).forEach(([type, typeMeals]) => {
    const mealGroup = document.createElement('div');
    mealGroup.className = 'flex flex-col gap-2';

    const groupTitle = document.createElement('p');
    groupTitle.className = 'text-xs font-semibold text-[var(--color-fg)] uppercase tracking-wide text-[var(--color-muted)]';
    groupTitle.textContent = type;
    mealGroup.appendChild(groupTitle);

    if (typeMeals.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'text-xs text-[var(--color-muted)]';
      empty.textContent = 'No meal planned';
      mealGroup.appendChild(empty);
    } else {
      typeMeals.forEach(meal => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border)]';
        item.innerHTML = `
          <span class="text-sm text-[var(--color-fg)] font-medium">${meal.dish}</span>
          <span class="text-sm font-semibold text-[var(--color-brand-600)]">₹${meal.cost.toFixed(0)}</span>
        `;
        mealGroup.appendChild(item);
      });
    }

    content.appendChild(mealGroup);
  });

  section.appendChild(content);
  return section;
}
