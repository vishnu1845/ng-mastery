import { Component, Directive, input } from '@angular/core';

/** A directive on the <span>, so a query can read it with { read: Tint }. */
@Directive({
  selector: '[appTint]',
  host: { '[style.background]': 'color()' },
})
export class Tint {
  readonly color = input('color-mix(in oklab, gold 30%, transparent)', { alias: 'appTint' });
}

/** A component, so a query can return its instance or its host element. */
@Component({
  selector: 'app-badge',
  template: `<span class="mono">badge</span>`,
})
export class Badge {
  readonly kind = 'Badge instance';
}
