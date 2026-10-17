import { Component, input } from '@angular/core';

// LITERAL UNION TYPES: only these exact values are allowed
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTone = 'solid' | 'outline';

/** A button whose inputs accept fixed values only. Anything else is a compile error. */
@Component({
  selector: 'app-sized-button',
  template: `
    <button type="button" class="sized" [attr.data-size]="size()" [attr.data-tone]="tone()">
      <ng-content />
    </button>
  `,
  styles: `
    .sized {
      border-color: transparent;
      background: var(--gradient);
      color: #fff;
      transition:
        padding var(--duration) var(--ease),
        font-size var(--duration) var(--ease);
    }
    [data-tone='outline'] {
      border-color: var(--accent);
      background: transparent;
      color: var(--accent);
    }
    [data-size='sm'] {
      min-height: 1.875rem;
      padding-inline: var(--space-3);
      font-size: var(--fs-xs);
    }
    [data-size='lg'] {
      min-height: 3rem;
      padding-inline: var(--space-6);
      font-size: var(--fs-md);
    }
  `,
})
export class SizedButton {
  readonly size = input<ButtonSize>('md');
  readonly tone = input<ButtonTone>('solid');
}
