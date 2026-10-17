import { Component, signal } from '@angular/core';

interface User {
  city: string;
}

// Real messages from the Angular 22 compiler for each expression
const NOT_ALLOWED = [
  { code: '{{ count = 5 }}', error: 'Bindings cannot contain assignments' },
  { code: '{{ new Date() }}', error: "Unexpected token 'Date'" },
  { code: '{{ count++ }}', error: 'Unexpected end of expression' },
  { code: '{{ count; total }}', error: 'Binding expression cannot contain chained expression' },
  { code: '{{ Math.max(1, 2) }}', error: "Property 'Math' does not exist on type 'Cart'" },
  { code: '{{ 5 | 3 }}', error: 'Unexpected token 3, expected identifier or keyword' },
];

/** Every result on the right is rendered live by Angular from the expression on the left. */
@Component({
  selector: 'app-interpolation-demo',
  styleUrl: './interpolation-demo.scss',
  templateUrl: './interpolation-demo.html',
})
export default class InterpolationDemo {
  protected readonly notAllowed = NOT_ALLOWED;

  // COMPONENT STATE
  protected readonly name = signal('Vishnu');
  protected readonly qty = signal(2);
  protected readonly price = signal(499);
  protected readonly user = signal<User | null>(null);
  protected readonly tags = signal(['angular', 'signals', 'rxjs']);
  protected readonly settings = signal({ theme: 'dark' });
  protected readonly nothing = signal<string | null>(null);
  protected readonly isAdmin = signal(true);

  protected changeQty(by: number): void {
    this.qty.update((qty) => Math.max(1, qty + by));
  }

  protected toggleCity(hasCity: boolean): void {
    this.user.set(hasCity ? { city: 'Pune' } : null);
  }
}
