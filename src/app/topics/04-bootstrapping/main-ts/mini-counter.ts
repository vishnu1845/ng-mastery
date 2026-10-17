import { Component, inject, InjectionToken, signal } from '@angular/core';

/** A value we hand to the mini app through its own ApplicationConfig */
export const APP_NAME = new InjectionToken<string>('APP_NAME');

/** The root component of the second app. It knows nothing about NgMastery. */
@Component({
  selector: 'app-mini-counter',
  template: `
    <p class="mini-title">{{ name }}</p>
    <p class="mini-muted">A separate Angular app with its own injector</p>
    <button type="button" (click)="count.update((n) => n + 1)">
      Clicked {{ count() }} {{ count() === 1 ? 'time' : 'times' }}
    </button>
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--space-2);
      justify-items: start;
    }
    .mini-title {
      font-weight: 600;
    }
    .mini-muted {
      color: var(--text-muted);
      font-size: var(--fs-sm);
    }
  `,
})
export class MiniCounter {
  protected readonly name = inject(APP_NAME);
  protected readonly count = signal(0);
}
