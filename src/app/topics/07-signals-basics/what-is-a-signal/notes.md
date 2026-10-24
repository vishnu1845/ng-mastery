## Definition

A **Signal** is a reactive state variable. When its value changes, Angular knows exactly which parts of the UI depend on it and updates only those, instead of checking the whole [[component|component]] tree. We read a signal by calling it like a function, `count()`, and update it using `.set()` or `.update()`.

## Example

```ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <p>Total: ₹{{ total() }}</p>
    <button (click)="addOne()">Add one</button>
  `,
})
export class Cart {
  price = signal(499); // state
  qty = signal(2); // state
  total = computed(() => this.price() * this.qty()); // derived from both

  addOne() {
    this.qty.update((qty) => qty + 1);
  }
}
```

## Why Angular added signals

|               | zone.js (old way)                                   | Signals (modern way)                      |
| ------------- | --------------------------------------------------- | ----------------------------------------- |
| When to check | After **every** click, timer or HTTP call, anywhere | Only when a signal the view reads changes |
| What to check | The whole component tree, top to bottom             | Just the components that read that signal |
| How it knows  | It doesn't. It guesses, by patching browser APIs    | Each signal knows who reads it            |

- Every signal keeps a list of who reads it. A `computed()` is both: it reads signals and gets read. Templates and effects are the readers at the end.
- That graph is what made **[[zoneless|zoneless]]** Angular possible (the default for new apps since v21) and **[[onpush|OnPush]] by default** in v22.

## Say it like this

"A signal is a reactive state variable. When its value changes, Angular knows exactly which parts of the UI depend on it and updates only those, instead of checking the whole component tree like it did with zone.js. We read it by calling it like a function, and change it with set or update. That's why Angular added signals: they make apps faster, they remove the need for zone.js, and they're the base for everything modern, like signal inputs, computed values and zoneless change detection."
