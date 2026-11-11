import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CartLine, CartStore } from './cart-store';
import { CartStoreRx } from './cart-store-rx';

const BOOKS: CartLine[] = [
  { name: 'Angular course', price: 999 },
  { name: 'RxJS handbook', price: 499 },
];

// SIBLING 1: only adds to the cart. It does not know the badge exists.
@Component({
  selector: 'app-shelf',
  styleUrl: './shop.scss',
  template: `
    @for (book of books; track book.name) {
      <button type="button" (click)="add(book)">+ {{ book.name }}</button>
    }
  `,
})
export class Shelf {
  private readonly store = inject(CartStore);
  private readonly storeRx = inject(CartStoreRx);

  readonly useRx = input(false);
  protected readonly books = BOOKS;

  protected add(book: CartLine): void {
    if (this.useRx()) this.storeRx.add(book);
    else this.store.add(book);
  }
}

// SIBLING 2: only shows the cart. It does not know the shelf exists.
@Component({
  selector: 'app-cart-badge',
  imports: [AsyncPipe],
  styleUrl: './shop.scss',
  template: `
    @if (useRx()) {
      <span class="badge-count" aria-live="polite">🛒 {{ storeRx.count$ | async }}</span>
    } @else {
      <span class="badge-count" aria-live="polite"
        >🛒 {{ store.count() }} · ₹{{ store.total() }}</span
      >
    }
  `,
})
export class CartBadge {
  protected readonly store = inject(CartStore);
  protected readonly storeRx = inject(CartStoreRx);

  readonly useRx = input(false);
}

/** A shop widget: a header with the badge and a shelf, which never talk to each other directly. */
@Component({
  selector: 'app-shop',
  imports: [Shelf, CartBadge],
  styleUrl: './shop.scss',
  template: `
    <header class="shop-head">
      <strong>{{ name() }}</strong>
      <app-cart-badge [useRx]="useRx()" />
    </header>
    <app-shelf [useRx]="useRx()" />
  `,
})
export class Shop {
  readonly name = input.required<string>();
  readonly useRx = input(false);
}

/** The same widget with its own store: providers here create a new CartStore for this subtree. */
@Component({
  selector: 'app-shop-own-cart',
  imports: [Shop],
  providers: [CartStore],
  template: `<app-shop [name]="name()" />`,
})
export class ShopOwnCart {
  readonly name = input.required<string>();
}
