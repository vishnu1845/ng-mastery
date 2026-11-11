import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { LeakMeter } from '../_shared/leak-meter';
import { attempt, MomentReport, Result } from '../_shared/moment-report';
import { Countdown } from './countdown';

/** A component whose timers stop themselves, plus what DestroyRef says after it is gone. */
@Component({
  selector: 'app-destroy-ref-demo',
  imports: [Countdown],
  providers: [LeakMeter, MomentReport],
  styleUrl: './destroy-ref-demo.scss',
  templateUrl: './destroy-ref-demo.html',
})
export default class DestroyRefDemo {
  private readonly injector = inject(Injector);
  protected readonly meter = inject(LeakMeter);
  protected readonly report = inject(MomentReport);
  protected readonly ngOnInitChecks = [
    'takeUntilDestroyed()',
    'takeUntilDestroyed(this.destroyRef)',
    'startTicker()',
    'inject(DestroyRef)',
  ];

  protected readonly ids = signal<{ ticker: number; stream: number } | null>(null);
  private readonly countdown = viewChild(Countdown);

  /** The DestroyRef of the last removed countdown, kept to ask it questions. */
  private oldRef?: DestroyRef;
  protected readonly destroyedFlag = signal<boolean | null>(null);
  protected readonly lateRegister = signal<Result | null>(null);

  constructor() {
    afterNextRender(() => this.create());
  }

  protected create(): void {
    this.report.clear();
    this.ids.set({
      ticker: this.meter.start('startTicker'),
      stream: this.meter.start('interval$'),
    });
  }

  protected remove(): void {
    const ids = this.ids();
    if (!ids) return;
    this.oldRef = this.countdown()?.destroyRef;
    this.meter.removedFromPage(ids.ticker);
    this.meter.removedFromPage(ids.stream);
    this.ids.set(null);
    this.lateRegister.set(null);

    // The component is removed during the next render, so ask after it.
    // Outside the constructor, afterNextRender needs the injector passed in
    afterNextRender(() => this.destroyedFlag.set(this.oldRef?.destroyed ?? null), {
      injector: this.injector,
    });
  }

  // Registering a cleanup on a DestroyRef that is already destroyed
  protected registerLate(): void {
    const ref = this.oldRef;
    if (ref) this.lateRegister.set(attempt(() => ref.onDestroy(() => undefined)));
  }
}
