import { OnDestroy, Service, signal } from '@angular/core';

export interface Timer {
  id: number;
  kind: string;
  onPage: boolean;
  /** When its interval callback last ran, in ms. */
  lastTick: number;
  ticks: number;
  /** Its window listener answered the latest ping. */
  answeredPing: boolean;
}

/**
 * DEMO ONLY: watches the intervals the demo components start.
 * A timer whose component is gone from the page but still ticks is a leak.
 */
@Service()
export class LeakMeter implements OnDestroy {
  private nextId = 1;
  private leftovers: (() => void)[] = [];
  readonly timers = signal<Timer[]>([]);
  readonly now = signal(Date.now());

  // The meter's own clock. A service gets ngOnDestroy too: it runs when the demo is destroyed
  private readonly clock = setInterval(() => this.now.set(Date.now()), 500);

  start(kind: string): number {
    const id = this.nextId++;
    this.timers.update((timers) => [
      ...timers,
      { id, kind, onPage: true, lastTick: Date.now(), ticks: 0, answeredPing: false },
    ]);
    return id;
  }

  tick(id: number): void {
    const timer = this.timers().find((item) => item.id === id);
    this.update(id, { lastTick: Date.now(), ticks: (timer?.ticks ?? 0) + 1 });
  }

  answerPing(id: number): void {
    this.update(id, { answeredPing: true });
  }

  resetPings(): void {
    this.timers.update((timers) => timers.map((timer) => ({ ...timer, answeredPing: false })));
  }

  removedFromPage(id: number): void {
    this.update(id, { onPage: false });
  }

  /** Still ticking: its callback ran in the last 1.5 seconds. */
  isRunning(timer: Timer): boolean {
    return this.now() - timer.lastTick < 1500;
  }

  /** Leaky demo code hands its cleanup here, so the leak ends with the lesson. */
  stopWhenLessonCloses(cleanup: () => void): void {
    this.leftovers.push(cleanup);
  }

  private update(id: number, change: Partial<Timer>): void {
    this.timers.update((timers) =>
      timers.map((timer) => (timer.id === id ? { ...timer, ...change } : timer)),
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.clock);
    this.leftovers.forEach((cleanup) => cleanup());
  }
}
