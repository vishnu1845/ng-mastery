import { Component, signal } from '@angular/core';
import { Product, ProductCard } from './product-card';
import { ShopHeader } from './shop-header';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless earbuds', price: 2499 },
  { id: 2, name: 'Mechanical keyboard', price: 4499 },
  { id: 3, name: 'USB-C hub', price: 1999 },
];

/** A small page made of real components. X-ray shows where each one starts and ends. */
@Component({
  imports: [ShopHeader, ProductCard],
  selector: 'app-anatomy-demo',
  styleUrl: './anatomy-demo.scss',
  templateUrl: './anatomy-demo.html',
})
export default class AnatomyDemo {
  protected readonly products = PRODUCTS;
  protected readonly xray = signal(true);
  protected readonly cart = signal<Product[]>([]);

  protected add(product: Product): void {
    this.cart.update((items) => [...items, product]);
  }
}
