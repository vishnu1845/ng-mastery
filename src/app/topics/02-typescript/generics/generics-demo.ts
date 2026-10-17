import { Component, computed, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const USERS: User[] = [
  { id: 1, name: 'Aarav Mehta', email: 'aarav@example.dev' },
  { id: 2, name: 'Diya Sharma', email: 'diya@example.dev' },
  { id: 3, name: 'Kabir Rao', email: 'kabir@example.dev' },
  { id: 4, name: 'Meera Iyer', email: 'meera@example.dev' },
];

const PRODUCTS: Product[] = [
  { id: 1, name: 'Noise-cancelling headphones', price: 8999 },
  { id: 2, name: 'Mechanical keyboard', price: 4499 },
  { id: 3, name: 'USB-C hub', price: 1999 },
  { id: 4, name: '4K monitor', price: 27999 },
];

// GENERIC FUNCTION WITH A CONSTRAINT: works for any list whose items have an id
function findById<T extends { id: number }>(list: T[], id: number): T | undefined {
  return list.find((item) => item.id === id);
}

/** One generic function, two different types, and both results stay fully typed. */
@Component({
  selector: 'app-generics-demo',
  styleUrl: './generics-demo.scss',
  templateUrl: './generics-demo.html',
})
export default class GenericsDemo {
  protected readonly id = signal(2);

  protected readonly user = computed(() => findById(USERS, this.id())); // User | undefined
  protected readonly product = computed(() => findById(PRODUCTS, this.id())); // Product | undefined
}
