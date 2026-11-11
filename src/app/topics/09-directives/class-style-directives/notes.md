## Definition

`NgClass`, `NgStyle` and `NgModel` are **built-in [[attribute-directive|attribute directives]]**. `NgClass` adds and removes CSS classes, `NgStyle` sets inline styles, and `NgModel` connects a form control to our data.

## Example

```html
<!-- Directives: need NgClass and NgStyle in imports -->
<button
  [ngClass]="{ 'is-bold': bold(), 'is-danger': danger() }"
  [ngStyle]="{ 'font-size.px': size() }"
>
  Save
</button>

<!-- Plain bindings: built into the template, no import -->
<button [class]="{ 'is-bold': bold(), 'is-danger': danger() }" [style.font-size.px]="size()">
  Save
</button>

<!-- NgModel: needs FormsModule -->
<input [(ngModel)]="email" required email />
```

## Key points

- For everyday use, the plain `[class]` and `[style]` bindings give **the same result with no import**. The demo shows both opening tags, and they are identical. The Angular style guide prefers the plain bindings.
- They are not the same in every case. The demo measures three differences:

| Case                                               | `NgClass` / `NgStyle`  | `[class]` / `[style]`                               |
| -------------------------------------------------- | ---------------------- | --------------------------------------------------- |
| The same object, changed in place                  | Updates                | **Does not update.** It needs a new object          |
| Two classes in one key: `{ 'a b': true }`          | Adds both              | Adds nothing                                        |
| A unit in the object key: `{ 'font-size.px': 22 }` | Sets `font-size: 22px` | Writes an invalid style. Use `[style.font-size.px]` |

- The first difference does not matter in modern code. With [[signal|signals]] we update [[immutability|immutably]], so every change is a new object anyway.
- `NgClass` and `NgStyle` are **not deprecated** in v22. We meet them in every older codebase.
- **`NgModel` is an attribute directive too.** Besides the [[two-way-binding|two-way binding]], it adds state classes to its element, which the demo shows live:

| Class pair                    | Meaning                         |
| ----------------------------- | ------------------------------- |
| `ng-untouched` / `ng-touched` | Has the control lost focus yet? |
| `ng-pristine` / `ng-dirty`    | Has the value been changed?     |
| `ng-valid` / `ng-invalid`     | Does it pass its validators?    |

## Say it like this

"`NgClass`, `NgStyle` and `NgModel` are Angular's built-in attribute directives. `NgClass` and `NgStyle` set classes and styles from an object, and `NgModel` gives two-way binding plus state classes like `ng-dirty` and `ng-invalid`. For classes and styles, I use the plain `[class]` and `[style]` bindings today, because they need no import. The one thing to know is that the plain bindings only react to a new object, while `NgClass` also notices a change inside the same object."
