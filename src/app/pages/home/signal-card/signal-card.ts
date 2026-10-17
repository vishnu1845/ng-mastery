import { Component, computed, signal } from '@angular/core';

/** The home page's live demo: two signals next to the code that makes them, updating as you click. */
@Component({
  selector: 'app-signal-card',
  styleUrl: './signal-card.scss',
  templateUrl: './signal-card.html',
})
export class SignalCard {
  // STATE
  protected readonly count = signal(0);

  // DERIVED STATE
  protected readonly double = computed(() => this.count() * 2);

  protected increment(): void {
    this.count.update((n) => n + 1);
  }

  protected reset(): void {
    this.count.set(0);
  }
}
