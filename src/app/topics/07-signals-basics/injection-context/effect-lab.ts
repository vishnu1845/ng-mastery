import { EffectRef, Service, signal } from '@angular/core';

export type Tone = 'ok' | 'leak';

export interface LogLine {
  id: number;
  source: string;
  text: string;
  tone: Tone;
}

/** Shared state for the demo: a heartbeat signal, a log, and the effects we leaked on purpose. */
@Service()
export class EffectLab {
  private nextId = 0;
  private readonly leakedRefs: EffectRef[] = [];

  readonly beats = signal(0);
  readonly log = signal<LogLine[]>([]);
  readonly leaks = signal(0);

  beat(): void {
    this.beats.update((beats) => beats + 1);
  }

  write(source: string, text: string, tone: Tone): void {
    const line = { id: this.nextId++, source, text, tone };
    this.log.update((lines) => [line, ...lines].slice(0, 8));
  }

  keepLeak(ref: EffectRef): void {
    this.leakedRefs.push(ref);
    this.leaks.set(this.leakedRefs.length);
  }

  // THE FIX: destroy the EffectRef ourselves
  destroyLeaks(): void {
    this.leakedRefs.forEach((ref) => ref.destroy());
    this.leakedRefs.length = 0;
    this.leaks.set(0);
  }
}
