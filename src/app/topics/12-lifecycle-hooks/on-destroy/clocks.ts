import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { LeakMeter } from '../_shared/leak-meter';

/** The event the demo's "Ping the window" button sends. */
export const PING = 'ngmastery-ping';

/** ❌ Starts an interval and a window listener, and never stops them. */
@Component({
  selector: 'app-leaky-clock',
  styleUrl: './clocks.scss',
  template: `<span class="kind leaky">leaky #{{ timerId() }}</span> {{ seconds() }}s`,
})
export class LeakyClock implements OnInit {
  private readonly meter = inject(LeakMeter);
  readonly timerId = input.required<number>();
  protected readonly seconds = signal(0);

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.seconds.update((seconds) => seconds + 1);
      this.meter.tick(this.timerId());
    }, 1000);

    const onPing = () => this.meter.answerPing(this.timerId());
    window.addEventListener(PING, onPing);

    // DEMO ONLY: stops the leak when you leave this lesson, so the site doesn't keep it
    this.meter.stopWhenLessonCloses(() => {
      clearInterval(intervalId);
      window.removeEventListener(PING, onPing);
    });
  }
  // No ngOnDestroy: both keep running after the component is removed
}

/** ✅ The same clock, cleaned up in ngOnDestroy. */
@Component({
  selector: 'app-clean-clock',
  styleUrl: './clocks.scss',
  template: `<span class="kind clean">clean #{{ timerId() }}</span> {{ seconds() }}s`,
})
export class CleanClock implements OnInit, OnDestroy {
  private readonly meter = inject(LeakMeter);
  readonly timerId = input.required<number>();
  protected readonly seconds = signal(0);

  private intervalId?: ReturnType<typeof setInterval>;
  // Kept in a field: removeEventListener needs the same function
  private readonly onPing = () => this.meter.answerPing(this.timerId());

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.seconds.update((seconds) => seconds + 1);
      this.meter.tick(this.timerId());
    }, 1000);

    window.addEventListener(PING, this.onPing);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    window.removeEventListener(PING, this.onPing);
  }
}
