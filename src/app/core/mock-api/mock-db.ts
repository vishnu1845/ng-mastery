import { Service } from '@angular/core';
import { MOCK_DATA, MockCollection } from './mock-data';

export interface Row {
  id: number;
  [field: string]: unknown;
}

/** In-memory tables behind the fake backend. Changes last until the page reloads. */
@Service()
export class MockDb {
  private readonly tables: Record<string, Row[]> = structuredClone(MOCK_DATA);

  has(collection: string): collection is MockCollection {
    return collection in this.tables;
  }

  list(collection: MockCollection): Row[] {
    return this.tables[collection];
  }

  find(collection: MockCollection, id: number): Row | undefined {
    return this.tables[collection].find((row) => row.id === id);
  }

  insert(collection: MockCollection, data: Record<string, unknown>): Row {
    const rows = this.tables[collection];
    const row: Row = { ...data, id: Math.max(0, ...rows.map((item) => item.id)) + 1 };
    rows.push(row);
    return row;
  }

  update(collection: MockCollection, id: number, data: Record<string, unknown>): Row | undefined {
    const row = this.find(collection, id);
    if (row) Object.assign(row, data, { id });
    return row;
  }

  remove(collection: MockCollection, id: number): boolean {
    const rows = this.tables[collection];
    const index = rows.findIndex((row) => row.id === id);
    if (index === -1) return false;
    rows.splice(index, 1);
    return true;
  }
}
