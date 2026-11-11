import { afterNextRender, Component, inject, signal } from '@angular/core';
import { LeakMeter } from '../_shared/leak-meter';
import { CleanClock, LeakyClock, PING } from './clocks';

interface Clock {
  timerId: number;
  kind: 'leaky' | 'clean';
}

/** Adds and removes clocks, then shows which intervals and listeners are still alive. */
@Component({
  selector: 'app-on-destroy-demo',
  imports: [LeakyClock, CleanClock],
  providers: [LeakMeter],
  styleUrl: './on-destroy-demo.scss',
  templateUrl: './on-destroy-demo.html',
})
export default class OnDestroyDemo {
  protected readonly meter = inject(LeakMeter);
  protected readonly clocks = signal<Clock[]>([]);

  constructor() {
    // Created in the browser only: the clocks use setInterval and window
    afterNextRender(() => {
      this.add('leaky');
      this.add('clean');
    });
  }

  protected add(kind: Clock['kind']): void {
    const timerId = this.meter.start(kind);
    this.clocks.update((clocks) => [...clocks, { timerId, kind }]);
  }

  protected removeAll(): void {
    this.clocks().forEach((clock) => this.meter.removedFromPage(clock.timerId));
    this.clocks.set([]);
  }

  // Every window listener that is still attached answers
  protected ping(): void {
    this.meter.resetPings();
    window.dispatchEvent(new Event(PING));
  }
}
