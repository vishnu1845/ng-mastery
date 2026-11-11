import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { LeakMeter } from '../_shared/leak-meter';
import { attempt, MomentReport } from '../_shared/moment-report';
import { startTicker } from './ticker';

/** Two timers, and neither needs an ngOnDestroy. */
@Component({
  selector: 'app-countdown',
  styleUrl: './countdown.scss',
  template: `
    <span class="mono">startTicker #{{ tickerId() }}: {{ ticks() }}s</span>
    <span class="mono">interval$ #{{ streamId() }}: {{ streamed() }}s</span>
  `,
})
export class Countdown implements OnInit {
  private readonly meter = inject(LeakMeter);
  private readonly report = inject(MomentReport);
  readonly destroyRef = inject(DestroyRef);

  readonly tickerId = input.required<number>();
  readonly streamId = input.required<number>();
  protected readonly ticks = signal(0);
  protected readonly streamed = signal(0);

  constructor() {
    // 1. A helper function that cleans up after itself through DestroyRef
    startTicker(() => {
      this.ticks.update((ticks) => ticks + 1);
      this.meter.tick(this.tickerId());
    });

    // 2. An Observable that completes when the component is destroyed
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.streamed.update((count) => count + 1);
        this.meter.tick(this.streamId());
      });
  }

  // The same calls in ngOnInit, where there is no injection context
  ngOnInit(): void {
    this.report.record(
      'takeUntilDestroyed()',
      'ngOnInit',
      attempt(() => interval(1000).pipe(takeUntilDestroyed())),
    );
    this.report.record(
      'takeUntilDestroyed(this.destroyRef)',
      'ngOnInit',
      attempt(() => interval(1000).pipe(takeUntilDestroyed(this.destroyRef))),
    );
    this.report.record(
      'startTicker()',
      'ngOnInit',
      attempt(() => startTicker(() => undefined)),
    );
    this.report.record(
      'inject(DestroyRef)',
      'ngOnInit',
      attempt(() => inject(DestroyRef)),
    );
  }
}
