import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

/** Moves the keyboard focus to its host as soon as the host is on the page. */
@Directive({ selector: '[appAutoFocus]' })
export class AutoFocus {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

    // focus() needs a real browser, and afterNextRender never runs on the server
    afterNextRender(() => host.focus());
  }
}
