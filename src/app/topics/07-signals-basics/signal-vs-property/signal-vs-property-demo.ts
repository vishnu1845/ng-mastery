import { Component, inject } from '@angular/core';
import { PlainCounter, SignalCounter } from './counters';
import { Check, TimerChecks } from './timer-checks';

/**
 * Each counter lives in its own component, so a signal change in one can't refresh the other.
 * When a timer fires, we compare the value in TS with what is really on screen.
 */
@Component({
  imports: [PlainCounter, SignalCounter],
  providers: [TimerChecks],
  selector: 'app-signal-vs-property-demo',
  styleUrl: './signal-vs-property-demo.scss',
  templateUrl: './signal-vs-property-demo.html',
})
export default class SignalVsPropertyDemo {
  protected readonly timerChecks = inject(TimerChecks);

  protected isStale(check: Check): boolean {
    return String(check.inTs) !== check.onScreen;
  }
}
