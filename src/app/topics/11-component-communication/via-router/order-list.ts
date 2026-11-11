import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ORDERS } from './orders';

/** Page 1: sends data to page 2 in three ways. */
@Component({
  selector: 'app-order-list',
  imports: [RouterLink],
  styleUrl: './orders.scss',
  template: `
    <p class="muted small">Page 1: the order list</p>
    <ul class="orders">
      @for (order of orders; track order.id) {
        <li>
          <span>#{{ order.id }} · {{ order.item }}</span>
          <!-- PARAM in the path, QUERY PARAM after the ?, STATE outside the URL -->
          <a
            class="btn"
            [routerLink]="[order.id]"
            [queryParams]="{ tab: 'items' }"
            [state]="{ from: 'the order list', clickedAt: now() }"
          >
            Open
          </a>
        </li>
      }
    </ul>
    <button type="button" class="btn-ghost" (click)="openLatest()">
      Open the latest from code
    </button>
  `,
})
export class OrderList {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly orders = ORDERS;

  protected now(): string {
    return new Date().toLocaleTimeString('en-IN');
  }

  // The same three channels, from TypeScript
  protected openLatest(): void {
    const latest = ORDERS[ORDERS.length - 1];
    this.router.navigate([latest.id], {
      relativeTo: this.route,
      queryParams: { tab: 'payment' },
      state: { from: 'router.navigate()', clickedAt: this.now() },
    });
  }
}
