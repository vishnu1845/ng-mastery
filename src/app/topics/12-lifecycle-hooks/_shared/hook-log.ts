import { Service, signal } from '@angular/core';

/** Only the latest few button presses are kept, so the list stays readable. */
const KEEP_STEPS = 3;

export interface HookCall {
  id: number;
  /** Which component ran the hook, e.g. 'Parent'. */
  who: string;
  hook: string;
  /** Extra facts, e.g. what changed in ngOnChanges. */
  detail?: string;
}

/** One button press in the demo and every hook it caused, in the order they ran. */
export interface HookStep {
  id: number;
  label: string;
  calls: HookCall[];
}

/**
 * DEMO ONLY: records real lifecycle hook calls, so the demo can show them.
 *
 * Hooks run in the middle of change detection, so the calls are collected first and shown
 * after the render (in a microtask). Writing a signal inside a hook would ask Angular
 * to render again while it is still rendering.
 */
@Service()
export class HookLog {
  private nextId = 1;
  private pending: HookCall[] = [];
  private flushQueued = false;

  readonly steps = signal<HookStep[]>([]);
  /** How many times each hook ran, keyed 'Parent.ngOnInit'. */
  readonly counts = signal<Record<string, number>>({});

  /** Starts a new step. Every hook that runs after this belongs to it. */
  begin(label: string): void {
    this.flush();
    const step: HookStep = { id: this.nextId++, label, calls: [] };
    this.steps.update((steps) => [step, ...steps].slice(0, KEEP_STEPS));
  }

  record(who: string, hook: string, detail?: string): void {
    this.pending.push({ id: this.nextId++, who, hook, detail });
    if (!this.flushQueued) {
      this.flushQueued = true;
      queueMicrotask(() => this.flush());
    }
  }

  clear(): void {
    this.pending = [];
    this.steps.set([]);
    this.counts.set({});
  }

  private flush(): void {
    this.flushQueued = false;
    if (this.pending.length === 0) return;
    const calls = this.pending;
    this.pending = [];

    this.steps.update(([current, ...older]) => [
      {
        ...(current ?? { id: this.nextId++, label: 'First render' }),
        calls: [...(current?.calls ?? []), ...calls],
      },
      ...older,
    ]);
    this.counts.update((counts) => {
      const next = { ...counts };
      for (const call of calls)
        next[`${call.who}.${call.hook}`] = (next[`${call.who}.${call.hook}`] ?? 0) + 1;
      return next;
    });
  }
}
