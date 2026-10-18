import { Component, effect, signal } from '@angular/core';

interface Call {
  id: number;
  code: string;
  before: number;
  after: number;
}

interface Action {
  code: string;
  run: () => void;
}

/** Every button runs exactly the code on its label. */
@Component({
  selector: 'app-signal-set-update-demo',
  styleUrl: './signal-set-update-demo.scss',
  templateUrl: './signal-set-update-demo.html',
})
export default class SignalSetUpdateDemo {
  private nextId = 0;

  // THE SIGNAL
  protected readonly qty = signal(1);

  // WHO GOT NOTIFIED: this effect re-runs only when qty really changes
  protected readonly notified = signal(0);
  private readonly notify = effect(() => {
    this.qty();
    this.notified.update((count) => count + 1);
  });

  protected readonly calls = signal<Call[]>([]);

  protected readonly setActions: Action[] = [
    { code: 'qty.set(1)', run: () => this.qty.set(1) },
    { code: 'qty.set(5)', run: () => this.qty.set(5) },
    { code: 'qty.set(qty())', run: () => this.qty.set(this.qty()) },
  ];

  protected readonly updateActions: Action[] = [
    { code: 'qty.update(q => q + 1)', run: () => this.qty.update((q) => q + 1) },
    { code: 'qty.update(q => q * 2)', run: () => this.qty.update((q) => q * 2) },
    {
      code: 'qty.update(q => Math.max(1, q - 1))',
      run: () => this.qty.update((q) => Math.max(1, q - 1)),
    },
  ];

  protected run(action: Action): void {
    const before = this.qty(); // reading in TS: call it like a function
    action.run();
    const call = { id: this.nextId++, code: action.code, before, after: this.qty() };
    this.calls.update((calls) => [call, ...calls].slice(0, 6));
  }
}
