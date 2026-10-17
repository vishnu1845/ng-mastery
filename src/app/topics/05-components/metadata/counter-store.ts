import { inject, Service, signal } from '@angular/core';

/** Hands out 1, 2, 3… so every CounterStore can show which instance it is. */
@Service()
export class InstanceNumbers {
  private next = 1;

  take(): number {
    return this.next++;
  }
}

/** A tiny counter service. Who gets which instance depends on where it is provided. */
@Service()
export class CounterStore {
  readonly id = inject(InstanceNumbers).take();
  readonly count = signal(0);

  increment(): void {
    this.count.update((n) => n + 1);
  }
}
