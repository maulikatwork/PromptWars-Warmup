import { type DashboardData } from '../types';
import { MealSection } from './MealSection';
import { GrocerySection } from './GrocerySection';
import { SwapsSection } from './SwapsSection';
import { CostSummary } from './CostSummary';

export function Dashboard(data: DashboardData | null): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col gap-5';

  if (!data) {
    container.innerHTML = `
      <div class="text-center text-[var(--color-muted)] text-sm py-8">
        <p>No data available</p>
      </div>
    `;
    return container;
  }

  // Cost summary (prominent at top)
  container.appendChild(CostSummary(data.totalCost));

  // Meal itinerary
  container.appendChild(MealSection(data.meals || []));

  // Grocery manifest
  container.appendChild(GrocerySection(data.groceries || {}));

  // Smart swaps (optional)
  if (data.swaps && data.swaps.length > 0) {
    container.appendChild(SwapsSection(data.swaps));
  }

  return container;
}
