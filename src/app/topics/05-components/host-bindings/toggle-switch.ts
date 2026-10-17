import { Component, output, signal } from '@angular/core';

/** A switch built only with host bindings: the component's own tag is the control. */
@Component({
  selector: 'app-toggle-switch',
  template: `
    <span class="track"><span class="thumb"></span></span>
    <span class="state">{{ on() ? 'ON' : 'OFF' }}</span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1);
      border-radius: var(--radius-pill);
      cursor: pointer;
      user-select: none;
    }
    :host(:focus-visible) {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
    }
    .track {
      position: relative;
      width: 2.5rem;
      height: 1.4rem;
      border-radius: var(--radius-pill);
      background: var(--raised);
      transition: background var(--duration) var(--ease);
    }
    .thumb {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      width: 1rem;
      height: 1rem;
      border-radius: var(--radius-pill);
      background: var(--text-muted);
      transition: transform var(--duration) var(--ease);
    }
    :host(.active) .track {
      background: var(--accent);
    }
    :host(.active) .thumb {
      background: var(--bg);
      transform: translateX(1.1rem);
    }
    .state {
      min-width: 2rem;
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
    }
  `,
  // HOST BINDINGS: attributes, a class and listeners, all on <app-toggle-switch> itself
  host: {
    role: 'switch', // static attribute
    tabindex: '0',
    '[attr.aria-checked]': 'on()', // attribute binding
    '[class.active]': 'on()', // class binding
    '(click)': 'toggle()', // event listener
    '(keydown.enter)': 'toggle()',
    '(keydown.space)': 'onSpace($event)',
  },
})
export class ToggleSwitch {
  readonly on = signal(false);
  readonly changed = output<boolean>();

  protected toggle(): void {
    this.on.update((value) => !value);
    this.changed.emit(this.on());
  }

  protected onSpace(event: Event): void {
    event.preventDefault(); // stop the page from scrolling
    this.toggle();
  }
}
