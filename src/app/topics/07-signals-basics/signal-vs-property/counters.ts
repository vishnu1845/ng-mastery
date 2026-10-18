import { Component, ElementRef, inject, signal } from '@angular/core';
import { TimerChecks } from './timer-checks';

/** State in a plain property. Angular can't see when it changes. */
@Component({
  selector: 'app-plain-counter',
  template: `
    <p class="kind">value = 0 (plain property)</p>
    <strong class="value">{{ value }}</strong>
    <div class="buttons">
      <button type="button" (click)="addNow()">+1 now</button>
      <button type="button" class="btn-primary" (click)="addLater()">+1 in 1 second</button>
      <button type="button" class="btn-ghost" (click)="refresh()">Click to refresh</button>
    </div>
  `,
  styleUrl: './counters.scss',
})
export class PlainCounter {
  private readonly host = inject(ElementRef);
  private readonly timerChecks = inject(TimerChecks);

  value = 0;

  addNow(): void {
    this.value++;
  }

  addLater(): void {
    setTimeout(() => {
      this.value++;
      this.timerChecks.fired('plain', this.value, this.host.nativeElement);
    }, 1000);
  }

  refresh(): void {
    // Nothing to do: a click in this template is already enough for Angular to refresh it
  }
}

/** State in a signal. It tells Angular itself when it changes. */
@Component({
  selector: 'app-signal-counter',
  template: `
    <p class="kind">value = signal(0)</p>
    <strong class="value">{{ value() }}</strong>
    <div class="buttons">
      <button type="button" (click)="addNow()">+1 now</button>
      <button type="button" class="btn-primary" (click)="addLater()">+1 in 1 second</button>
      <button type="button" class="btn-ghost" (click)="refresh()">Click to refresh</button>
    </div>
  `,
  styleUrl: './counters.scss',
})
export class SignalCounter {
  private readonly host = inject(ElementRef);
  private readonly timerChecks = inject(TimerChecks);

  readonly value = signal(0);

  addNow(): void {
    this.value.update((value) => value + 1);
  }

  addLater(): void {
    setTimeout(() => {
      this.value.update((value) => value + 1);
      this.timerChecks.fired('signal', this.value(), this.host.nativeElement);
    }, 1000);
  }

  refresh(): void {
    // Nothing to do: a click in this template is already enough for Angular to refresh it
  }
}
