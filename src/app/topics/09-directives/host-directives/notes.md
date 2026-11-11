## Definition

**Host [[directive|directives]]** let a [[component|component]] or directive **apply other directives to its own [[host-element|host element]]**, from inside its [[decorator|decorator]]. This is the **directive composition API**.

## Example

```ts
@Component({
  selector: 'app-chip',
  template: `{{ label() }}`,
  hostDirectives: [
    { directive: Highlight, inputs: ['appHighlight: color'] },
    { directive: Pressable, outputs: ['pressed'] },
  ],
})
export class Chip {
  readonly label = input.required<string>();
}
```

```html
<!-- The user writes only this. Highlight and Pressable come with it. -->
<app-chip label="Signals" color="aqua" (pressed)="open()" />
```

## Key points

- **Behavior is reused, not rewritten.** Without composition, every use must remember `appPressable` and `[appHighlight]`. The demo shows both versions side by side.
- **Inputs and outputs are hidden by default.** We expose them by listing them, and `'appHighlight: color'` renames one. Binding an input that is not listed is the build error **NG8002**.
- The chip's real opening tag shows `role="button"` and `tabindex="0"`. They come from `Pressable`. The [[template|template]] never wrote them.
- **Creation order:** the host directives are created first, then the component. The demo logs it.
- **Rules the compiler enforces:**

| Rule                                  | Error      |
| ------------------------------------- | ---------- |
| A host directive must be standalone   | **NG2014** |
| A host directive can't be a component | **NG2015** |

- Host directives are fixed at build time. We can't add or remove one with a condition.
- A directive can have its own `hostDirectives`, so behaviors can be stacked.
- **Composition vs inheritance:** a class can extend only one base class, but it can compose many directives.

## Say it like this

"Host directives are Angular's directive composition API. In the `hostDirectives` array of a component or directive, I list other directives, and Angular applies them to the host element automatically. So a chip component can get highlight and press behavior without repeating that code, and without the user adding extra attributes. Their inputs and outputs are hidden unless I expose them in that array, and I can rename them there. The host directives must be standalone, and they can't be components."
