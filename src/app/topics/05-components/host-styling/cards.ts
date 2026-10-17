import { Component } from '@angular/core';

// THE SAME LOOK FOR BOTH CARDS: a fixed width and padding on the host
const CARD_LOOK = `
  :host {
    width: 12rem;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    background: var(--surface);
  }
`;

// NO display rule: custom tags are display: inline, so the width is ignored
@Component({
  selector: 'app-inline-card',
  template: `<ng-content />`,
  styles: CARD_LOOK,
})
export class InlineCard {}

// :host { display: block } fixes it
@Component({
  selector: 'app-block-card',
  template: `<ng-content />`,
  styles: [
    CARD_LOOK,
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class BlockCard {}

// :host(.active) and a CSS variable the parent can set (instead of ::ng-deep)
@Component({
  selector: 'app-themed-card',
  template: `
    <p class="title"><ng-content /></p>
    <p class="hint">My accent comes from --card-accent</p>
  `,
  styles: `
    :host {
      display: block;
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--border);
      border-top: 4px solid var(--card-accent, var(--border-strong));
      border-radius: var(--radius-md);
      background: var(--surface);
      transition: box-shadow var(--duration) var(--ease);
    }
    :host(.active) {
      box-shadow: 0 0 0 2px var(--card-accent, var(--accent));
    }
    .title {
      color: var(--card-accent, var(--text));
      font-weight: 600;
    }
    .hint {
      color: var(--text-muted);
      font-size: var(--fs-xs);
    }
  `,
})
export class ThemedCard {}
