import { Component, input, signal } from '@angular/core';

type Page = 'Home' | 'Products' | 'Cart';

/**
 * A tiny fake browser window.
 * In "mpa" mode every link reloads the whole page (and loses state);
 * in "spa" mode the view is swapped in place and state survives.
 */
@Component({
  selector: 'app-mini-browser',
  styleUrl: './mini-browser.scss',
  templateUrl: './mini-browser.html',
})
export class MiniBrowser {
  readonly mode = input.required<'spa' | 'mpa'>();

  protected readonly pages: Page[] = ['Home', 'Products', 'Cart'];
  protected readonly page = signal<Page>('Home');
  protected readonly cart = signal(0);
  protected readonly loading = signal(false);
  protected readonly reloads = signal(0);
  protected readonly requests = signal<string[]>(['GET /index.html (first load)']);

  protected open(target: Page): void {
    if (target === this.page() || this.loading()) return;

    if (this.mode() === 'mpa') {
      this.reloadTo(target);
    } else {
      this.page.set(target);
      this.logRequest(
        target === 'Products' ? 'GET /api/products (JSON only)' : 'No request, view swapped',
      );
    }
  }

  protected addToCart(): void {
    this.cart.update((count) => count + 1);
  }

  // MPA: the browser throws the page away and asks the server for a new one
  private reloadTo(target: Page): void {
    this.loading.set(true);
    this.reloads.update((count) => count + 1);
    this.logRequest(`GET /${target.toLowerCase()}.html (whole page)`);

    setTimeout(() => {
      this.page.set(target);
      this.cart.set(0); // JavaScript state is lost on reload
      this.loading.set(false);
    }, 700);
  }

  private logRequest(line: string): void {
    this.requests.update((lines) => [line, ...lines].slice(0, 4));
  }
}
