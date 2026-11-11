## Definition

**`model()`** creates a **two-way input**: it is an input the child can also **change**, and every change is sent back to the parent. The parent binds it with the banana-in-a-box syntax `[( )]`.

## Example

```ts
// child
export class VolumeKnob {
  readonly volume = model(50);

  turnUp() {
    this.volume.update((volume) => volume + 10); // also tells the parent
  }
}
```

```html
<!-- parent -->
<app-volume-knob [(volume)]="volume" />
```

## Old vs new

`[(volume)]` is short for `[volume]` plus `(volumeChange)`. Before `model()`, we wrote both halves by hand:

```ts
@Input() volume = 50;
@Output() volumeChange = new EventEmitter<number>(); // the name must be input + "Change"

setVolume(value: number) {
  this.volume = value;
  this.volumeChange.emit(value);
}
```

## Key points

- **[[input|`input()`]] vs `model()`:** an `input()` is read-only in the child. A `model()` has `.set()` and `.update()`, and each call emits `volumeChange`.
- **Both directions in the demo:** move the parent's slider and every child follows. Move a child's slider and the parent follows, and so do the other children.
- **Brackets only means one way.** `[volume]="volume()"` sends the value in, but the child's changes stay inside the child. It catches up the next time the parent's value changes.
- The parent can bind a **[[signal|signal]]** or a plain property: `[(volume)]="volume"`.
- **Build errors:**

| Mistake                                          | Error                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `[(qty)]` on a plain `input()`                   | **NG8007** _The property and event halves of the [[two-way-binding\|two-way binding]] are not bound to the same target_ |
| `[(volume)]="50"`, a value instead of a variable | **NG5002** _Unsupported expression in a two-way binding_                                                                |

- `model.required()` makes the binding mandatory.

## Say it like this

"`model()` gives a component a two-way input. The parent binds it with `[( )]`, and when the child calls `set` or `update` on it, the new value goes back to the parent. Under the hood, `[(volume)]` is just `[volume]` plus `(volumeChange)`, which is exactly what we used to write by hand with `@Input()` and an `@Output()` named with the `Change` suffix. The difference from `input()` is that an input is read-only in the child, and a model is writable."
