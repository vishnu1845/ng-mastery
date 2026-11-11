import { Service } from '@angular/core';

/** DEMO ONLY: remembers the order in which Angular created each class. */
@Service()
export class CreationLog {
  readonly names: string[] = [];

  add(name: string): void {
    this.names.push(name);
  }
}
