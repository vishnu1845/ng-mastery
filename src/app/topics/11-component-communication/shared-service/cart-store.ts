import { computed, Service, signal } from '@angular/core';

export interface CartLine {
  name: string;
  price: number;
}

/** MODERN: state in signals. Any component that injects this sees the same cart. */
@Service()
export class CartStore {
  private readonly lines = signal<CartLine[]>([]);

  // Read-only views for everyone
  readonly items = this.lines.asReadonly();
  readonly count = computed(() => this.lines().length);
  readonly total = computed(() => this.lines().reduce((sum, line) => sum + line.price, 0));

  // The only ways to change the cart
  add(line: CartLine): void {
    this.lines.update((lines) => [...lines, line]);
  }

  clear(): void {
    this.lines.set([]);
  }
}
