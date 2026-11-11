import { Component, inject, input, OnDestroy } from '@angular/core';
import { RunCounter } from '@shared/utils/run-counter';

/**
 * DEMO ONLY: stands for a heavy component, like a chart. It counts when it is created
 * and destroyed, so the demo can show whether hiding it really removed it.
 */
@Component({
  selector: 'app-chart-widget',
  template: `<span class="mono">📊 chart ({{ label() }})</span>`,
  styles: ':host { display: block; padding: var(--space-2) 0; }',
})
export class ChartWidget implements OnDestroy {
  private readonly counter = inject(RunCounter);
  readonly label = input('');
  readonly id = input.required<string>();

  constructor() {
    // Counted after the inputs are set
    queueMicrotask(() => this.counter.add(`${this.id()}.created`));
  }

  ngOnDestroy(): void {
    this.counter.add(`${this.id()}.destroyed`);
  }
}
