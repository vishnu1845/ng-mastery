import { Component, computed, signal } from '@angular/core';
import { EventLog, LogBook } from '../_shared/event-log';
import { OLD_PRODUCT, Product, PRODUCTS } from './product';
import { ProductCard } from './product-card';
import { ProductCardOld } from './product-card-old';

/** A parent sends products down to three cards, and each card sends a quantity back up. */
@Component({
  selector: 'app-input-output-demo',
  imports: [ProductCard, ProductCardOld, EventLog],
  styleUrl: './input-output-demo.scss',
  templateUrl: './input-output-demo.html',
})
export default class InputOutputDemo {
  // PARENT STATE: the products go down, the cart is filled by what comes up
  protected readonly sale = signal(false);
  protected readonly products = computed(() => PRODUCTS.map((product) => this.priced(product)));
  protected readonly oldProduct = computed(() => this.priced(OLD_PRODUCT));

  protected readonly cart = signal<{ name: string; qty: number; price: number }[]>([]);
  protected readonly items = computed(() => this.cart().reduce((sum, line) => sum + line.qty, 0));
  protected readonly total = computed(() =>
    this.cart().reduce((sum, line) => sum + line.qty * line.price, 0),
  );

  protected readonly log = new LogBook();

  protected toggleSale(): void {
    this.sale.update((sale) => !sale);
    this.log.add(
      'input',
      this.sale() ? 'Parent sent new prices: 10% off' : 'Parent sent the normal prices',
    );
  }

  // $event is the number the child passed to emit()
  protected addToCart(product: Product, qty: number): void {
    this.cart.update((cart) => [...cart, { name: product.name, qty, price: product.price }]);
    this.log.addValue('output', `${product.name} sent $event = ${qty}`, qty);
  }

  protected clear(): void {
    this.cart.set([]);
    this.log.clear();
  }

  // A new object for each price change, so the child gets a new input value
  private priced(product: Product): Product {
    return this.sale() ? { ...product, price: Math.round(product.price * 0.9) } : product;
  }
}
