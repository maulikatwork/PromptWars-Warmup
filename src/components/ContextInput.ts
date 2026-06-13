import { getState, setCustomRequest, subscribe } from '../state';

const EXAMPLES = [
  'Feeling under the weather, keep it light',
  'Craving Maharashtrian food today',
  'Avoid anything too spicy',
  'High-protein day, gym session planned',
];

export function ContextInput(): HTMLElement {
  const section = document.createElement('div');
  let debounceTimer: ReturnType<typeof setTimeout>;

  function render() {
    const { customRequest } = getState().form;

    section.innerHTML = `
      <div>
        <label for="custom-request" class="text-sm font-semibold text-[var(--color-fg)] tracking-wide uppercase block mb-1">
          Custom Request
          <span class="font-normal normal-case text-[var(--color-muted)] ml-1">(optional)</span>
        </label>
        <p class="text-xs text-[var(--color-muted)] mb-3">Add any specific preferences, cravings, or dietary notes</p>
        <textarea
          id="custom-request"
          rows="3"
          placeholder="e.g. ${EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]}"
          class="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]
                 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)]
                 resize-none transition-all duration-150
                 focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[var(--color-brand-500)]/20"
        >${customRequest}</textarea>
        <div class="flex justify-between items-center mt-1.5">
          <div class="flex flex-wrap gap-1.5">
            ${EXAMPLES.slice(0, 2).map(ex => `
              <button
                type="button"
                data-example="${ex}"
                class="text-xs px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]
                       hover:border-[var(--color-brand-400)] hover:text-[var(--color-brand-600)] transition-colors duration-100 cursor-pointer"
              >${ex.length > 28 ? ex.slice(0, 28) + '…' : ex}</button>
            `).join('')}
          </div>
          <span class="text-xs text-[var(--color-muted)]">${customRequest.length}/300</span>
        </div>
      </div>
    `;

    const textarea = section.querySelector<HTMLTextAreaElement>('#custom-request')!;
    textarea.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const val = textarea.value.slice(0, 300);
      debounceTimer = setTimeout(() => setCustomRequest(val), 150);
      const counter = section.querySelector<HTMLSpanElement>('.char-counter');
      if (counter) counter.textContent = `${val.length}/300`;
    });

    section.querySelectorAll<HTMLButtonElement>('[data-example]').forEach(btn => {
      btn.addEventListener('click', () => {
        textarea.value = btn.dataset.example!;
        setCustomRequest(btn.dataset.example!);
      });
    });
  }

  render();
  subscribe((newState) => {
    const textarea = section.querySelector<HTMLTextAreaElement>('#custom-request');
    if (!textarea || document.activeElement === textarea) return;
    if (textarea.value !== newState.form.customRequest) render();
  });

  return section;
}
