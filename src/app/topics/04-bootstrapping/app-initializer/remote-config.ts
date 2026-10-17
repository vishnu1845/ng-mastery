import { Component, inject, Service, signal } from '@angular/core';

export interface Settings {
  currency: string;
  freeShippingFrom: number;
  features: string[];
}

/** Settings the app needs before it can show anything (in real life: GET /api/config). */
@Service()
export class RemoteConfig {
  readonly settings = signal<Settings | null>(null);

  // FAKE NETWORK CALL: waits, then resolves or rejects
  load(delayMs: number, fail: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fail) {
          reject(new Error('Config server is down (503)'));
          return;
        }
        this.settings.set({
          currency: 'INR',
          freeShippingFrom: 499,
          features: ['wishlist', 'offers'],
        });
        resolve();
      }, delayMs);
    });
  }
}

/** The root component of the mini app. It can trust that settings are already loaded. */
@Component({
  selector: 'app-shop-header',
  template: `
    @if (config.settings(); as s) {
      <p class="shop-title">Shop is open</p>
      <p class="shop-muted">
        Prices in {{ s.currency }}, free shipping from ₹{{ s.freeShippingFrom }}
      </p>
      <p class="shop-muted">Features on: {{ s.features.join(', ') }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--space-1);
    }
    .shop-title {
      font-weight: 600;
    }
    .shop-muted {
      color: var(--text-muted);
      font-size: var(--fs-sm);
    }
  `,
})
export class ShopHeader {
  protected readonly config = inject(RemoteConfig);
}
