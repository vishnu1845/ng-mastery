import { Component, inject, signal } from '@angular/core';
import { CartStore } from './cart-store';
import { CartStoreRx } from './cart-store-rx';
import { Shop, ShopOwnCart } from './shop';

/** Siblings that share state through a service, and what changes when the service is scoped. */
@Component({
  selector: 'app-shared-service-demo',
  imports: [Shop, ShopOwnCart],
  // DEMO ONLY: a fresh pair of stores for this lesson, so the cart is empty each visit
  providers: [CartStore, CartStoreRx],
  styleUrl: './shared-service-demo.scss',
  templateUrl: './shared-service-demo.html',
})
export default class SharedServiceDemo {
  private readonly store = inject(CartStore);
  private readonly storeRx = inject(CartStoreRx);

  protected readonly useRx = signal(false);
  protected readonly kinds = [
    { rx: false, label: 'signal()' },
    { rx: true, label: 'BehaviorSubject' },
  ];

  protected emptyAll(): void {
    this.store.clear();
    this.storeRx.clear();
  }
}
