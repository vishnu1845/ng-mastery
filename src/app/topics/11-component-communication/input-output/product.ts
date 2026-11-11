export interface Product {
  id: number;
  name: string;
  price: number;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Angular course', price: 999 },
  { id: 2, name: 'Signals workshop', price: 1499 },
];

export const OLD_PRODUCT: Product = { id: 3, name: 'RxJS handbook', price: 499 };
