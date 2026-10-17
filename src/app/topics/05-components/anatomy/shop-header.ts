import { Component, input } from '@angular/core';

// The X-ray outline + label, shared by the two inline components below
const XRAY = `
  :host {
    position: relative;
    outline: var(--xray-outline, none);
    outline-offset: 3px;
  }
  :host::before {
    position: absolute;
    top: -0.7rem;
    left: var(--space-2);
    display: var(--xray-label, none);
    padding: 0 var(--space-1);
    border-radius: var(--radius-sm);
    background: var(--accent);
    color: var(--bg);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    content: attr(data-selector);
  }
`;

// INLINE COMPONENT: template and styles live in this .ts file
@Component({
  selector: 'app-cart-badge',
  template: `🛒 {{ count() }}`,
  styles: [
    XRAY,
    `
      :host {
        display: inline-block;
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-pill);
        background: var(--raised);
        font-size: var(--fs-sm);
      }
    `,
  ],
  host: { 'data-selector': 'app-cart-badge' },
})
export class CartBadge {
  readonly count = input(0);
}

@Component({
  selector: 'app-shop-header',
  imports: [CartBadge],
  template: `
    <p class="logo">Gadget Store</p>
    <app-cart-badge [count]="cartCount()" />
  `,
  styles: [
    XRAY,
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-3) var(--space-4);
        border-bottom: 1px solid var(--border);
      }
      .logo {
        font-weight: 600;
      }
    `,
  ],
  host: { 'data-selector': 'app-shop-header' },
})
export class ShopHeader {
  readonly cartCount = input(0);
}
