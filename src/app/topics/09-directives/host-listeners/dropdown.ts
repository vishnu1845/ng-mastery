import { Directive, ElementRef, inject, model, output } from '@angular/core';

/** Closes its host on an outside click or Escape. Written with the `host` property. */
@Directive({
  selector: '[appDropdown]',
  // HOST METADATA: bindings and listeners in one place, removed with the directive
  host: {
    '[class.is-open]': 'open()',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class Dropdown {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly open = model(false);
  /** Fires for every click anywhere on the page, to show the listener is alive. */
  readonly heard = output<void>();

  protected onDocumentClick(event: Event): void {
    this.heard.emit();
    const inside = event.target instanceof Node && this.host.contains(event.target);
    if (!inside) this.open.set(false);
  }
}
