import { Directive, signal } from '@angular/core';

/** Shows or hides its host. The template reaches it through its exportAs name. */
@Directive({
  selector: '[appCollapse]',
  // The name used on the right side of #ref="appCollapse"
  exportAs: 'appCollapse',
  host: { '[hidden]': '!open()' },
})
export class Collapse {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((open) => !open);
  }
}
