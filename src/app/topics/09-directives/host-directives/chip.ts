import { Component, inject, input } from '@angular/core';
import { Highlight } from '../_shared/highlight';
import { CreationLog } from './creation-log';
import { Pressable } from './pressable';

/** A chip that is highlightable and pressable, without writing either behaviour itself. */
@Component({
  selector: 'app-chip',
  template: `{{ label() }}`,
  styles: `
    :host {
      display: inline-flex;
      padding: 0.3rem 0.85rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-pill);
      cursor: pointer;
      font-size: var(--fs-sm);
      user-select: none;
    }
    :host(:focus-visible) {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
    }
  `,
  // COMPOSITION: both directives are applied to <app-chip> automatically
  hostDirectives: [
    // Their inputs and outputs stay hidden unless we list them here
    { directive: Highlight, inputs: ['appHighlight: color'] },
    { directive: Pressable, outputs: ['pressed'] },
  ],
})
export class Chip {
  readonly label = input.required<string>();

  constructor() {
    inject(CreationLog, { optional: true })?.add('Chip component');
  }
}
