import { Component, computed, inject, input } from '@angular/core';
import { RunCounter } from '@shared/utils/run-counter';

/**
 * Shows one counter. It is its own component on purpose: a new count refreshes only this
 * view, so showing the number never makes the parent's pipes run again.
 */
@Component({
  selector: 'app-run-count',
  template: `{{ count() }}`,
  styles: `
    :host {
      color: var(--accent);
      font-size: var(--fs-lg);
      font-variant-numeric: tabular-nums;
      font-weight: 600;
    }
  `,
})
export class RunCount {
  private readonly counter = inject(RunCounter);

  readonly name = input.required<string>();
  protected readonly count = computed(() => this.counter.runs()[this.name()] ?? 0);
}
