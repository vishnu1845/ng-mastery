import { Component, ViewEncapsulation } from '@angular/core';

// THREE COMPONENTS, ONE CLASS NAME (.encap-msg), THREE ENCAPSULATION MODES

// EMULATED (default): Angular rewrites the selector to .encap-msg[_ngcontent-…]
@Component({
  selector: 'app-emulated-msg',
  template: `<p class="encap-msg">Emulated: my green stays inside me</p>`,
  styles: `
    .encap-msg {
      color: var(--success);
    }
  `,
})
export class EmulatedMsg {}

// NONE: the style is added to the page as-is, so it hits every .encap-msg
@Component({
  selector: 'app-none-msg',
  template: `<p class="encap-msg">None: my style is global</p>`,
  styles: `
    .encap-msg {
      color: var(--danger);
      text-decoration: underline wavy var(--danger);
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class NoneMsg {}

// SHADOW DOM: a real shadow root; outside styles can't get in, ours can't get out
@Component({
  selector: 'app-shadow-msg',
  template: `<p class="encap-msg">ShadowDom: nothing gets in or out</p>`,
  styles: `
    .encap-msg {
      margin: 0;
      color: #60a5fa;
    }
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowMsg {}
