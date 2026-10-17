import { Component, signal } from '@angular/core';
import { ButtonSize, ButtonTone, SizedButton } from './sized-button';

/** Literal union types in real Angular: inputs that only accept a few exact values. */
@Component({
  imports: [SizedButton],
  selector: 'app-union-intersection-demo',
  styleUrl: './union-intersection-demo.scss',
  templateUrl: './union-intersection-demo.html',
})
export default class UnionIntersectionDemo {
  // THE ALLOWED VALUES (TypeScript checks these arrays against the unions too)
  protected readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];
  protected readonly tones: ButtonTone[] = ['solid', 'outline'];

  protected readonly size = signal<ButtonSize>('md');
  protected readonly tone = signal<ButtonTone>('solid');
}
