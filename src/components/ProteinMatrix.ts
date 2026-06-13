import { PROTEIN_OPTIONS } from '../types';
import { getState, toggleProtein, subscribe } from '../state';

export function ProteinMatrix(): HTMLElement {
  const section = document.createElement('div');

  function render() {
    const { dietType, selectedProteins } = getState();
    const options = PROTEIN_OPTIONS[dietType];

    section.innerHTML = `
      <fieldset class="border-0 p-0 m-0">
        <legend class="text-sm font-semibold text-[var(--color-fg)] mb-1 tracking-wide uppercase">
          Protein Preferences
        </legend>
        <p class="text-xs text-[var(--color-muted)] mb-3">Select what you'd like included — leave blank for AI to decide</p>
        <div class="flex flex-wrap gap-2">
          ${options.map(protein => {
            const active = selectedProteins.includes(protein);
            return `
              <button
                type="button"
                data-protein="${protein}"
                class="protein-pill px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer
                  ${active
                    ? 'bg-[var(--color-brand-500)] border-[var(--color-brand-500)] text-white'
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-brand-400)]'
                  }"
              >
                ${protein}
              </button>
            `;
          }).join('')}
        </div>
      </fieldset>
    `;

    section.querySelectorAll<HTMLButtonElement>('[data-protein]').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleProtein(btn.dataset.protein!);
      });
    });
  }

  render();
  subscribe(render);
  return section;
}
