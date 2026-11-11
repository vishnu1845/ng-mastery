import { Directive, input, signal } from '@angular/core';

const DEFAULT_COLOR = 'gold';

/** Highlights its host while the pointer is over it or the keyboard focus is on it. */
@Directive({
  selector: '[appHighlight]',
  // HOST BINDINGS: the directive never touches the DOM itself
  host: {
    '[style.background-color]': 'active() ? color() : null',
    '[style.color]': 'active() ? "#111" : null',
    '(pointerenter)': 'active.set(true)',
    '(pointerleave)': 'active.set(false)',
    '(focus)': 'active.set(true)',
    '(blur)': 'active.set(false)',
  },
})
export class Highlight {
  /**
   * The alias is the selector, so one attribute applies the directive and passes its value.
   * A bare `appHighlight` passes an empty string, so the transform puts the default back.
   */
  readonly color = input(DEFAULT_COLOR, {
    alias: 'appHighlight',
    transform: (value: string) => value || DEFAULT_COLOR,
  });

  protected readonly active = signal(false);
}
