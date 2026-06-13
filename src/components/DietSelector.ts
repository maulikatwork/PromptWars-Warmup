import { type DietType } from '../types';
import { getState, setDietType, subscribe } from '../state';

const DIETS: { value: DietType; label: string; icon: string; desc: string }[] = [
  { value: 'vegetarian',     label: 'Vegetarian',     icon: '🌿', desc: 'No meat or eggs' },
  { value: 'eggitarian',     label: 'Eggitarian',     icon: '🥚', desc: 'Eggs allowed' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian', icon: '🍗', desc: 'All proteins' },
];

export function DietSelector(): HTMLElement {
  const section = document.createElement('div');

  function render() {
    const { dietType } = getState();
    section.innerHTML = `
      <fieldset class="border-0 p-0 m-0">
        <legend class="text-sm font-semibold text-[var(--color-fg)] mb-3 tracking-wide uppercase">
          Dietary Baseline
        </legend>
        <div class="grid grid-cols-3 gap-3">
          ${DIETS.map(d => `
            <label
              class="diet-card cursor-pointer rounded-[var(--radius-md)] border-2 p-3 flex flex-col gap-1 transition-all duration-150
                ${d.value === dietType
                  ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-300)]'
                }"
            >
              <input
                type="radio"
                name="diet"
                value="${d.value}"
                class="sr-only"
                ${d.value === dietType ? 'checked' : ''}
              />
              <span class="text-xl leading-none">${d.icon}</span>
              <span class="text-sm font-semibold text-[var(--color-fg)] leading-tight">${d.label}</span>
              <span class="text-xs text-[var(--color-muted)]">${d.desc}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>
    `;

    section.querySelectorAll<HTMLInputElement>('input[name="diet"]').forEach(input => {
      input.addEventListener('change', () => {
        setDietType(input.value as DietType);
      });
    });
  }

  render();
  subscribe(render);
  return section;
}
