import { Component, signal } from '@angular/core';
import { TimeAgoPipe } from './time-ago-pipe';
import { TruncatePipe } from './truncate-pipe';

const MINUTE = 60_000;
// A fixed "now", so the server and the browser render the same text
const START = new Date('2026-06-12T12:00:00Z').getTime();

/** Two pipes we wrote ourselves: one with optional parameters, one that depends on the time. */
@Component({
  selector: 'app-custom-pipe-demo',
  imports: [TruncatePipe, TimeAgoPipe],
  styleUrl: './custom-pipe-demo.scss',
  templateUrl: './custom-pipe-demo.html',
})
export default class CustomPipeDemo {
  // TRUNCATE
  protected readonly text = signal(
    'Angular is the framework where one team ships signals, the router and forms together.',
  );
  protected readonly limit = signal(28);

  // TIME AGO
  protected readonly now = signal(START);
  protected readonly posts = [
    { id: 1, title: 'Signals landed in our app', createdAt: new Date(START - 2 * MINUTE) },
    { id: 2, title: 'We removed Zone.js', createdAt: new Date(START - 50 * MINUTE) },
    { id: 3, title: 'First zoneless release', createdAt: new Date(START - 26 * 60 * MINUTE) },
  ];

  protected wait(minutes: number): void {
    this.now.update((now) => now + minutes * MINUTE);
  }

  protected reset(): void {
    this.now.set(START);
  }
}
