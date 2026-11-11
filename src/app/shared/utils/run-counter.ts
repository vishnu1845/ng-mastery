import { Service, signal } from '@angular/core';

/** DEMO ONLY: counts how many times a pipe, method, computed or hook really ran. */
@Service()
export class RunCounter {
  readonly runs = signal<Record<string, number>>({});

  add(name: string): void {
    // Counted after the render, because pipes and template methods run during it
    queueMicrotask(() => this.runs.update((runs) => ({ ...runs, [name]: (runs[name] ?? 0) + 1 })));
  }
}
