export function ErrorState(message: string, onRetry: () => void): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rounded-[var(--radius-lg)] border border-[var(--color-danger)]/30 bg-red-50 p-6';
  el.innerHTML = `
    <div class="flex flex-col gap-3">
      <div class="flex items-start gap-3">
        <span class="text-lg leading-none mt-0.5">⚠️</span>
        <div>
          <p class="text-sm font-semibold text-[var(--color-danger)]">Something went wrong</p>
          <p class="text-xs text-[var(--color-danger)]/80 mt-1">${message}</p>
        </div>
      </div>
      <button
        type="button"
        id="retry-btn"
        class="self-start px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-danger)] text-white text-xs font-semibold
               hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
      >
        Try again
      </button>
    </div>
  `;
  el.querySelector('#retry-btn')!.addEventListener('click', onRetry);
  return el;
}
