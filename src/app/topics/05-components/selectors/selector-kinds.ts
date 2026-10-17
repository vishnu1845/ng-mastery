import { Component } from '@angular/core';

// 1. ELEMENT selector: a new tag, <app-tag-badge>
@Component({
  selector: 'app-tag-badge',
  template: `<ng-content />`,
  styles: `
    :host {
      display: inline-block;
      padding: 0.1rem 0.6rem;
      border-radius: var(--radius-pill);
      background: var(--accent);
      color: var(--bg);
      font-size: var(--fs-xs);
      font-weight: 600;
    }
  `,
})
export class TagBadge {}

// 2. ATTRIBUTE selector on a native element: it stays a real <button>
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- this lesson shows an attribute selector
  selector: 'button[appPrimary]',
  template: `<ng-content />`,
  styles: `
    :host {
      border-color: transparent;
      background: var(--text);
      color: var(--bg);
    }
  `,
})
export class PrimaryButton {}

// 3. CLASS selector: any element with class="app-chip"
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- this lesson shows a class selector
  selector: '.app-chip',
  template: `# <ng-content />`,
  styles: `
    :host {
      display: inline-block;
      padding: 0.1rem 0.6rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
    }
  `,
})
export class Chip {}
