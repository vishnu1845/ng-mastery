export interface Order {
  id: string;
  item: string;
  total: number;
}

export const ORDERS: Order[] = [
  { id: '101', item: 'Angular course', total: 999 },
  { id: '102', item: 'Signals workshop', total: 1499 },
  { id: '103', item: 'RxJS handbook', total: 499 },
];
