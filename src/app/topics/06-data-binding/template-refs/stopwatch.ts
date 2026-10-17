import { Component, DestroyRef, inject, signal } from '@angular/core';

/** A child component with public methods. The parent calls them through a #ref. */
@Component({
  selector: 'app-stopwatch',
  template: `<span class="time">{{ (tenths() / 10).toFixed(1) }}s</span>`,
  styles: `
    .time {
      font-family: var(--font-mono);
      font-size: var(--fs-2xl);
      font-variant-numeric: tabular-nums;
    }
  `,
})
export class Stopwatch {
  readonly tenths = signal(0);
  readonly running = signal(false);

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  start(): void {
    if (this.running()) return;
    this.running.set(true);
    this.timer = setInterval(() => this.tenths.update((tenths) => tenths + 1), 100);
  }

  stop(): void {
    clearInterval(this.timer);
    this.running.set(false);
  }

  reset(): void {
    this.stop();
    this.tenths.set(0);
  }
}
