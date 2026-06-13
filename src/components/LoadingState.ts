export function LoadingState(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8';
  el.innerHTML = `
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="relative w-10 h-10">
        <div class="absolute inset-0 rounded-full border-2 border-[var(--color-brand-100)]"></div>
        <div class="absolute inset-0 rounded-full border-2 border-t-[var(--color-brand-500)] animate-spin"></div>
      </div>
      <div>
        <p class="text-sm font-semibold text-[var(--color-fg)]">Generating your meal plan…</p>
        <p class="text-xs text-[var(--color-muted)] mt-0.5">This usually takes 5–10 seconds</p>
      </div>
    </div>
  `;
  return el;
}
