import { Directive, inject, output } from '@angular/core';
import { CreationLog } from './creation-log';

/** Makes any element act like a button: it can be focused, and Enter or Space presses it. */
@Directive({
  selector: '[appPressable]',
  host: {
    role: 'button',
    tabindex: '0',
    '(click)': 'pressed.emit()',
    '(keydown.enter)': 'pressed.emit()',
    '(keydown.space)': 'onSpace($event)',
  },
})
export class Pressable {
  readonly pressed = output<void>();

  constructor() {
    inject(CreationLog, { optional: true })?.add('Pressable directive');
  }

  protected onSpace(event: Event): void {
    event.preventDefault(); // stop the page from scrolling
    this.pressed.emit();
  }
}
