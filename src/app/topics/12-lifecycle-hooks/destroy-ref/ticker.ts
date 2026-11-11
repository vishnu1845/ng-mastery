import { DestroyRef, inject } from '@angular/core';

/**
 * Starts an interval that stops by itself when the component that called it is destroyed.
 * The cleanup lives next to the setup, inside the function. The component writes no ngOnDestroy.
 * Must be called in an injection context: a field initializer or the constructor.
 */
export function startTicker(onTick: () => void, ms = 1000): void {
  const destroyRef = inject(DestroyRef); // first, so a wrong call fails before starting anything
  const intervalId = setInterval(onTick, ms);
  destroyRef.onDestroy(() => clearInterval(intervalId));
}
