import { Component, inject } from '@angular/core';
import { CounterStore } from './counter-store';

const TEMPLATE = `
  <p class="who">CounterStore #{{ store.id }}</p>
  <p class="count">{{ store.count() }}</p>
  <button type="button" (click)="store.increment()">+1</button>
`;

const STYLES = `
  :host {
    display: grid;
    gap: var(--space-2);
    justify-items: start;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
  }
  .who {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
  .count {
    font-size: var(--fs-xl);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
`;

// NO providers: inject() walks up to the root injector, so every tally gets the SAME instance
@Component({
  selector: 'app-shared-tally',
  template: TEMPLATE,
  styles: STYLES,
})
export class SharedTally {
  protected readonly store = inject(CounterStore);
}

// providers in the metadata: Angular creates a NEW instance for each tally
@Component({
  selector: 'app-own-tally',
  providers: [CounterStore],
  template: TEMPLATE,
  styles: STYLES,
})
export class OwnTally {
  protected readonly store = inject(CounterStore);
}
