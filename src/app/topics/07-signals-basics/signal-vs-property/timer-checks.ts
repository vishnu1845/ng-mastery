import { afterNextRender, inject, Injector, Service, signal } from '@angular/core';

export type Kind = 'plain' | 'signal';

export interface Check {
  id: number;
  kind: Kind;
  inTs: number;
  onScreen: string;
}

/**
 * The counters report here when their timer fires. A service, not an output():
 * a listener on a component's tag would mark that component for refresh and hide the bug.
 */
@Service()
export class TimerChecks {
  private readonly injector = inject(Injector);
  private nextId = 0;

  readonly checks = signal<Check[]>([]);

  // Wait for Angular's next render, then read what the screen really shows
  fired(kind: Kind, inTs: number, host: HTMLElement): void {
    afterNextRender(
      () => {
        const onScreen = host.querySelector('.value')?.textContent?.trim() ?? '?';
        const check = { id: this.nextId++, kind, inTs, onScreen };
        this.checks.update((checks) => [check, ...checks].slice(0, 6));
      },
      { injector: this.injector },
    );
  }
}
