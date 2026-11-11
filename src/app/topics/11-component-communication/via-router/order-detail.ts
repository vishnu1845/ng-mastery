import { Location } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ORDERS } from './orders';

/** Page 2: receives the param and the query param as inputs, and reads the state from history. */
@Component({
  selector: 'app-order-detail',
  imports: [RouterLink],
  styleUrl: './orders.scss',
  template: `
    <p class="muted small">Page 2: one order</p>
    @if (order(); as order) {
      <p>
        <strong>#{{ order.id }} · {{ order.item }}</strong> · ₹{{ order.total }}
      </p>
    } @else {
      <p class="error">No order #{{ id() }}</p>
    }

    <dl class="received">
      <dt>Path param <code>:id</code></dt>
      <dd class="mono">{{ id() }}</dd>
      <dt>Query param <code>?tab=</code></dt>
      <dd class="mono">{{ tab() ?? '(none)' }}</dd>
      <dt>Navigation state</dt>
      <dd class="mono">{{ state() }}</dd>
    </dl>

    <a class="btn" routerLink="..">Back to the list</a>
  `,
})
export class OrderDetail {
  private readonly location = inject(Location);

  // withComponentInputBinding() fills these from the URL, by name
  readonly id = input.required<string>();
  readonly tab = input<string>();

  protected readonly order = computed(() => ORDERS.find((order) => order.id === this.id()));

  // State never appears in the URL. It lives in the browser's history entry.
  protected readonly state = computed(() => {
    this.id(); // read again for every new order
    const { from, clickedAt } = (this.location.getState() ?? {}) as Record<string, string>;
    return from ? `from ${from} at ${clickedAt}` : '(none: this page was not opened by a click)';
  });
}
