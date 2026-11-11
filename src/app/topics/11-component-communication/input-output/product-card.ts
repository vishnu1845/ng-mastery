import { Component, computed, input, output, signal } from '@angular/core';
import { Product } from './product';

/** MODERN: input() brings the product down, output() sends the quantity up. */
@Component({
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  template: `
    <span class="badge badge-accent">input() + output()</span>
    <strong>{{ product().name }}</strong>
    <span class="muted">₹{{ product().price }} each</span>

    <div class="qty">
      <button type="button" aria-label="One less" [disabled]="qty() === 1" (click)="change(-1)">
        −
      </button>
      <output class="mono" aria-label="Quantity">{{ qty() }}</output>
      <button type="button" aria-label="One more" (click)="change(1)">+</button>
    </div>

    <!-- A computed() follows the input by itself. No lifecycle hook needed. -->
    <span
      >Line total: <strong class="mono">₹{{ lineTotal() }}</strong></span
    >
    <button type="button" class="btn-primary" (click)="add()">Add to cart</button>
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly added = output<number>();

  protected readonly qty = signal(1);
  protected readonly lineTotal = computed(() => this.product().price * this.qty());

  protected change(by: number): void {
    this.qty.update((qty) => Math.max(qty + by, 1));
  }

  protected add(): void {
    // The value we emit is exactly what the parent receives as $event
    this.added.emit(this.qty());
  }
}
