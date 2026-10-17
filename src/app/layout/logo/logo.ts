import { Component } from '@angular/core';

/**
 * The NgMastery mark: Angular's shield shape filled with the brand gradient.
 * Built with CSS (clip-path + gradient) so it follows the accent preset and needs no SVG ids.
 */
@Component({
  selector: 'app-logo',
  styles: `
    :host {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      width: 1.6rem;
      height: 1.6rem;
      background: var(--gradient);
      clip-path: polygon(50% 6%, 89% 23%, 83% 76%, 50% 94%, 17% 76%, 11% 23%);
    }

    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  `,
  template: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M11 21.5V11l10 10.5V11"
        fill="none"
        stroke="#fff"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class Logo {}
