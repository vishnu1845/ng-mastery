import { Service } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartLine } from './cart-store';

/** OLDER: the same store with a BehaviorSubject. Still common, and still asked. */
@Service()
export class CartStoreRx {
  // Private, so only this service can push new values
  private readonly lines$ = new BehaviorSubject<CartLine[]>([]);

  // Components subscribe to these (usually with the async pipe)
  readonly items$ = this.lines$.asObservable();
  readonly count$ = this.lines$.pipe(map((lines) => lines.length));

  add(line: CartLine): void {
    this.lines$.next([...this.lines$.value, line]);
  }

  clear(): void {
    this.lines$.next([]);
  }
}
