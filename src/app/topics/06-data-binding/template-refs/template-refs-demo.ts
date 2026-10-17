import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stopwatch } from './stopwatch';

/** #refs to an element, a component and a directive, plus the same element read in TS. */
@Component({
  imports: [FormsModule, Stopwatch],
  selector: 'app-template-refs-demo',
  styleUrl: './template-refs-demo.scss',
  templateUrl: './template-refs-demo.html',
})
export default class TemplateRefsDemo {
  // The same #email the template uses, brought into the class
  private readonly emailBox = viewChild.required<ElementRef<HTMLInputElement>>('email');

  protected readonly subscribed = signal('');

  protected readonly scopeExample = [
    '@if (show()) {',
    '  <input #inner />',
    '}',
    '<p>{{ inner.value }}</p>   <!-- inner only exists inside the @if -->',
  ].join('\n');

  protected focusEmail(): void {
    this.emailBox().nativeElement.focus();
  }
}
