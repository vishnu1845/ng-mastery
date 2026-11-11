import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Product } from './product';

/** OLDER: @Input() + @Output() with EventEmitter. To react to a new input it needs ngOnChanges. */
@Component({
  selector: 'app-product-card-old',
  styleUrl: './product-card.scss',
  template: `
    <span class="badge">&#64;Input() + &#64;Output()</span>
    <strong>{{ product.name }}</strong>
    <span class="muted">₹{{ product.price }} each</span>

    <div class="qty">
      <button type="button" aria-label="One less" [disabled]="qty() === 1" (click)="change(-1)">
        −
      </button>
      <output class="mono" aria-label="Quantity">{{ qty() }}</output>
      <button type="button" aria-label="One more" (click)="change(1)">+</button>
    </div>

    <span class="changes">
      ngOnChanges ran <strong>{{ changeCount }}</strong> {{ changeCount === 1 ? 'time' : 'times' }}.
      Last: {{ lastChange }}
    </span>
    <button type="button" class="btn-primary" (click)="add()">Add to cart</button>
  `,
})
export class ProductCardOld implements OnChanges {
  @Input({ required: true }) product!: Product;
  @Output() added = new EventEmitter<number>();

  protected readonly qty = signal(1);
  protected changeCount = 0;
  protected lastChange = '';

  // Runs before the view updates, every time the parent passes a new input value
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['product'];
    if (!change) return;
    this.changeCount++;
    this.lastChange = change.firstChange
      ? `first value, ₹${change.currentValue.price}`
      : `₹${change.previousValue.price} → ₹${change.currentValue.price}`;
  }

  protected change(by: number): void {
    this.qty.update((qty) => Math.max(qty + by, 1));
  }

  protected add(): void {
    this.added.emit(this.qty());
  }
}
