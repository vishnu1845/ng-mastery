## Definition

**Class and style binding** add or remove CSS classes and inline styles from [[component|component]] data. For a **single** class or style, Angular gives direct binding: **no [[directive|directive]], no import, better performance**.

## Example

```html
<!-- Class binding: [class.name]="boolean" -->
<div class="toast" [class.is-error]="hasError()">Upload failed</div>

<!-- Several classes at once: bind an object to [class] -->
<div [class]="{ 'is-dense': dense(), 'is-pinned': pinned() }"></div>

<!-- Style binding: [style.prop]="value" -->
<p [style.color]="textColor()">Colored</p>
<p [style.font-size.px]="size()">With a unit</p>
<div [style.width.%]="progress()"></div>
<div [style.--accent]="accent()"></div>
```

## Key points

- Bound classes **merge** with the static `class` attribute. They never wipe it out.
- Units go after a dot: `.px`, `.%`, `.rem`, `.em`.
- CSS variables work too: `[style.--accent]`.
- `[class]="{ ... }"` handles **many** conditional classes natively, so we don't need `[ngClass]` for that anymore. Same for `[style]="{ ... }"` vs `[ngStyle]`.
- `NgClass` and `NgStyle` still work in Angular 22 (not deprecated), but they need an import, and the Angular style guide prefers the plain bindings.

| `[class.x]` / `[style.x]`             | `[ngClass]` / `[ngStyle]` |
| ------------------------------------- | ------------------------- |
| Built into the [[template\|template]] | Directives, need import   |
| No import                             | `NgClass` / `NgStyle`     |
| Recommended ✅                        | Fine in older code        |

## Say it like this

"For classes we use `[class.name]` with a boolean, and for styles `[style.property]`, even with a unit like `[style.width.px]`. If several classes depend on different conditions, we can bind an object to `[class]`. These bindings are built into the template, so we don't import anything, and they merge with the static classes on the element. That's why the Angular style guide prefers them over `ngClass` and `ngStyle`."
