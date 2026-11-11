import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';

type Metal = 'gold' | 'silver';

/** A ticking price read with the async pipe, and a count of the subscriptions that are alive. */
@Component({
  selector: 'app-async-pipe-demo',
  imports: [AsyncPipe, DecimalPipe],
  styleUrl: './async-pipe-demo.scss',
  templateUrl: './async-pipe-demo.html',
})
export default class AsyncPipeDemo {
  // WHAT WE MEASURE
  protected readonly alive = signal(0);
  protected readonly started = signal(0);

  // CONTROLS
  protected readonly metals: Metal[] = ['gold', 'silver'];
  protected readonly visible = signal(false);
  protected readonly metal = signal<Metal>('gold');

  // No subscribe() anywhere in this class. The template does it.
  private readonly prices: Record<Metal, Observable<number>> = {
    gold: this.ticker(72_400, 35),
    silver: this.ticker(915, 4),
  };
  protected readonly price$ = computed(() => this.prices[this.metal()]);

  // A PROMISE works the same way
  protected readonly tip = signal<Promise<string> | null>(null);

  protected askForTip(): void {
    this.tip.set(
      new Promise((resolve) => setTimeout(() => resolve('Buy on dips, not on headlines.'), 900)),
    );
  }

  /** A cold stream: nothing happens until someone subscribes. Emits a new price every second. */
  private ticker(start: number, step: number): Observable<number> {
    return new Observable<number>((subscriber) => {
      this.count(+1);
      let price = start;
      const timer = setInterval(() => {
        price += Math.round((Math.random() - 0.45) * step);
        subscriber.next(price);
      }, 1000);

      // Runs when the async pipe unsubscribes
      return () => {
        clearInterval(timer);
        this.count(-1);
      };
    });
  }

  // DEMO ONLY: counted after the render, because the pipe subscribes during it
  private count(change: 1 | -1): void {
    queueMicrotask(() => {
      this.alive.update((alive) => alive + change);
      if (change === 1) this.started.update((started) => started + 1);
    });
  }
}
