import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

/** One quiz question. The parent never binds its answer: it reads it through a query. */
@Component({
  selector: 'app-question',
  styleUrl: './question.scss',
  template: `
    <label class="field">
      {{ text() }}
      <input #box type="text" [value]="answer()" (input)="answer.set(box.value)" />
    </label>
  `,
})
export class Question {
  private readonly box = viewChild.required<ElementRef<HTMLInputElement>>('box');

  readonly text = input.required<string>();
  readonly answer = signal('');

  // Public API the parent can call
  isAnswered(): boolean {
    return this.answer().trim().length > 0;
  }

  reset(): void {
    this.answer.set('');
  }

  focus(): void {
    this.box().nativeElement.focus();
  }
}
