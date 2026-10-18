import { Component, computed, signal } from '@angular/core';

interface Run {
  id: number;
  name: 'total' | 'greeting';
  text: string;
}

/** Watch exactly when a computed runs: lazy, cached, and only for what it read last time. */
@Component({
  selector: 'app-computed-demo',
  styleUrl: './computed-demo.scss',
  templateUrl: './computed-demo.html',
})
export default class ComputedDemo {
  private nextId = 0;
  private totalRuns = 0;

  // A "{" in template text starts an ICU message, so this label lives here
  protected readonly greetingCode = "vip() ? `Welcome back, ${name()}!` : 'Welcome!'";

  // STATE
  protected readonly price = signal(499);
  protected readonly qty = signal(2);
  protected readonly showTotal = signal(true);
  protected readonly vip = signal(false);
  protected readonly name = signal('Vishnu');

  // DERIVED STATE
  protected readonly total = computed(() => {
    const total = this.price() * this.qty();
    this.reportRun('total', `${this.price()} × ${this.qty()} = ${total}`);
    return total;
  });

  // name() is read only when vip() is true, so only then is it a dependency
  protected readonly greeting = computed(() => {
    const text = this.vip() ? `Welcome back, ${this.name()}!` : 'Welcome!';
    this.reportRun('greeting', `"${text}"`);
    return text;
  });

  protected readonly runs = signal<Run[]>([]);
  protected readonly readResult = signal('');

  protected addOne(): void {
    this.qty.update((qty) => qty + 1);
    this.readResult.set('');
  }

  protected readThreeTimes(): void {
    const before = this.totalRuns;
    this.total();
    this.total();
    this.total();
    const ran = this.totalRuns - before;
    this.readResult.set(
      ran
        ? `3 reads: it ran ${ran} time, because qty changed since the last read. The other 2 reads came from the cache.`
        : '3 reads: it ran 0 times. All 3 came from the cache.',
    );
  }

  // DEMO ONLY: a real computed never has side effects. This just lets you see each run.
  private reportRun(name: Run['name'], text: string): void {
    if (name === 'total') this.totalRuns++;
    const run = { id: this.nextId++, name, text };
    queueMicrotask(() => this.runs.update((runs) => [run, ...runs].slice(0, 8)));
  }
}
