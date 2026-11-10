import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { User } from '@core/mock-api/mock-data';

const PRICE = 900;

/** A cart total built with @let, then one async pipe against three. */
@Component({
  selector: 'app-let-demo',
  imports: [AsyncPipe],
  styleUrl: './let-demo.scss',
  templateUrl: './let-demo.html',
})
export default class LetDemo {
  private readonly http = inject(HttpClient);

  // CART
  protected readonly price = PRICE;
  protected readonly qty = signal(1);

  // PROFILE: the same request, read two ways
  protected readonly repeatedCalls = signal(0);
  protected readonly letCalls = signal(0);
  protected readonly repeated$ = signal<Observable<User> | null>(null);
  protected readonly withLet$ = signal<Observable<User> | null>(null);

  protected readonly errors = [
    { code: 'NG8015', text: "Cannot assign to @let declaration 'total'." },
    { code: 'NG8016', text: "Cannot read @let declaration 'total' before it has been defined." },
    {
      code: 'NG8017',
      text: "Cannot declare @let called 'total' as there is another symbol in the template with the same name.",
    },
  ];

  protected changeQty(by: number): void {
    this.qty.update((qty) => Math.min(Math.max(qty + by, 1), 5));
  }

  protected load(): void {
    this.repeatedCalls.set(0);
    this.letCalls.set(0);
    this.repeated$.set(this.profile(this.repeatedCalls));
    this.withLet$.set(this.profile(this.letCalls));
  }

  /** A cold request to the mock API. Every subscription sends it again, and is counted. */
  private profile(calls: WritableSignal<number>): Observable<User> {
    return defer(() => {
      // DEMO ONLY: counted after the render, because the async pipe subscribes during it
      queueMicrotask(() => calls.update((count) => count + 1));
      return this.http.get<User>('api/users/1?delay=700');
    });
  }
}
