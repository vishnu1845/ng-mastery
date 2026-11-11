import { Service, signal } from '@angular/core';

export interface Result {
  ok: boolean;
  text: string;
}

/**
 * DEMO ONLY: what a check found at each moment (constructor, ngOnInit…), shown after the render.
 * Checks run inside hooks, so the results are written in a microtask, after Angular has finished.
 */
@Service()
export class MomentReport {
  readonly results = signal<Record<string, Result>>({});
  private pending: Record<string, Result> = {};

  record(check: string, moment: string, result: Result): void {
    this.pending[`${check}.${moment}`] = result;
    queueMicrotask(() => {
      this.results.update((results) => ({ ...results, ...this.pending }));
      this.pending = {};
    });
  }

  clear(): void {
    this.results.set({});
  }
}

/** Runs a call and reports whether Angular allowed it there, with the error code if not. */
export function attempt(call: () => unknown): Result {
  try {
    call();
    return { ok: true, text: 'works' };
  } catch (error) {
    const code = String((error as Error).message).match(/NG0\d+/)?.[0] ?? 'error';
    return { ok: false, text: code };
  }
}
