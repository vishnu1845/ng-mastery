// MOCK DATA
// Seed rows for the fake backend. Every app start gets a fresh copy.

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  city: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'audio' | 'laptops' | 'phones' | 'wearables';
  price: number;
  stock: number;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export const MOCK_DATA = {
  users: [
    { id: 1, name: 'Aarav Mehta', email: 'aarav@example.dev', role: 'admin', city: 'Pune' },
    { id: 2, name: 'Diya Sharma', email: 'diya@example.dev', role: 'editor', city: 'Mumbai' },
    { id: 3, name: 'Kabir Rao', email: 'kabir@example.dev', role: 'viewer', city: 'Bengaluru' },
    { id: 4, name: 'Meera Iyer', email: 'meera@example.dev', role: 'editor', city: 'Chennai' },
    { id: 5, name: 'Rohan Das', email: 'rohan@example.dev', role: 'viewer', city: 'Kolkata' },
    { id: 6, name: 'Sara Khan', email: 'sara@example.dev', role: 'viewer', city: 'Hyderabad' },
    { id: 7, name: 'Vivaan Joshi', email: 'vivaan@example.dev', role: 'editor', city: 'Ahmedabad' },
    { id: 8, name: 'Zoya Ali', email: 'zoya@example.dev', role: 'viewer', city: 'Delhi' },
  ] satisfies User[],

  products: [
    { id: 1, name: 'Studio Headphones', category: 'audio', price: 8999, stock: 14 },
    { id: 2, name: 'Wireless Earbuds', category: 'audio', price: 3499, stock: 40 },
    { id: 3, name: 'Bluetooth Speaker', category: 'audio', price: 2799, stock: 0 },
    { id: 4, name: 'Ultrabook 14', category: 'laptops', price: 74999, stock: 6 },
    { id: 5, name: 'Gaming Laptop 16', category: 'laptops', price: 119999, stock: 3 },
    { id: 6, name: 'Phone Pro', category: 'phones', price: 64999, stock: 12 },
    { id: 7, name: 'Phone Lite', category: 'phones', price: 18999, stock: 25 },
    { id: 8, name: 'Smart Watch', category: 'wearables', price: 12499, stock: 9 },
    { id: 9, name: 'Fitness Band', category: 'wearables', price: 2999, stock: 31 },
    { id: 10, name: 'USB-C Dock', category: 'laptops', price: 6499, stock: 18 },
  ] satisfies Product[],

  posts: [
    {
      id: 1,
      userId: 1,
      title: 'Signals changed how I write components',
      body: 'State lives in signals, templates read them, and only the views that use them refresh.',
    },
    {
      id: 2,
      userId: 2,
      title: 'When I still reach for RxJS',
      body: 'Signals hold state. Streams over time, like search-as-you-type, still belong to RxJS.',
    },
    {
      id: 3,
      userId: 3,
      title: 'Standalone made my app smaller',
      body: 'Every component imports what it needs, so unused code is easy to tree-shake.',
    },
    {
      id: 4,
      userId: 1,
      title: 'Lazy loading in one line',
      body: 'loadComponent downloads a page only when someone opens it.',
    },
    {
      id: 5,
      userId: 4,
      title: 'Guards that redirect cleanly',
      body: 'Return a UrlTree instead of calling navigate() and returning false.',
    },
    {
      id: 6,
      userId: 2,
      title: 'OnPush is the default now',
      body: 'Angular 22 checks a component only when its inputs, events or signals change.',
    },
  ] satisfies Post[],

  todos: [
    { id: 1, title: 'Revise switchMap vs exhaustMap', done: true },
    { id: 2, title: 'Build a CRUD form with FormArray', done: false },
    { id: 3, title: 'Write a functional auth guard', done: false },
    { id: 4, title: 'Explain hydration in one minute', done: false },
  ] satisfies Todo[],
};

export type MockCollection = keyof typeof MOCK_DATA;
