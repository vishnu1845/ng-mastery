import { Component, computed, signal } from '@angular/core';

// TYPED FUNCTION: TypeScript only lets numbers in
function add(a: number, b: number): number {
  return a + b;
}

/**
 * An <input> always gives us a string, even when we type a number.
 * JavaScript happily joins the strings. TypeScript stops the bug before the app runs.
 */
@Component({
  selector: 'app-why-typescript-demo',
  styleUrl: './why-typescript-demo.scss',
  templateUrl: './why-typescript-demo.html',
})
export default class WhyTypescriptDemo {
  // INPUT VALUES (strings, like every form field)
  protected readonly a = signal('5');
  protected readonly b = signal('2');

  // JAVASCRIPT: no types, so '5' + '2' quietly becomes '52'
  protected readonly jsResult = computed(() => this.a() + this.b());

  // TYPESCRIPT: add('5', '2') won't compile, so we convert to numbers first
  protected readonly tsResult = computed(() => add(Number(this.a()), Number(this.b())));
}
