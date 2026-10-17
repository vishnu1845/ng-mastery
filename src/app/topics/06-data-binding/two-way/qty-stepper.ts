import { Component, input, model } from '@angular/core';

/** model() creates a "value" input plus a "valueChange" output, so the parent can use [(value)]. */
@Component({
  selector: 'app-qty-stepper',
  template: `
    <button type="button" aria-label="One less" [disabled]="value() <= min()" (click)="change(-1)">
      −
    </button>
    <output class="value" aria-live="polite">{{ value() }}</output>
    <button type="button" aria-label="One more" [disabled]="value() >= max()" (click)="change(1)">
      +
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    .value {
      min-width: 2ch;
      font-variant-numeric: tabular-nums;
      text-align: center;
    }
  `,
})
export class QtyStepper {
  readonly value = model(1);
  readonly min = input(1);
  readonly max = input(10);

  protected change(by: number): void {
    // Setting a model() signal also emits valueChange to the parent
    this.value.update((value) => value + by);
  }
}
