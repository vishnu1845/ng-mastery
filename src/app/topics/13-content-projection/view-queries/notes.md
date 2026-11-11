## Definition

A **view query** ([[view-child|`viewChild()`]], `viewChildren()`, or the old `@ViewChild` / `@ViewChildren`) finds an element, [[directive|directive]] or [[component|component]] from the **component's own [[template|template]]**.

## Example

```ts
export class SignupForm {
  // every <input #field> in this component's template
  protected readonly fields = viewChildren<ElementRef<HTMLInputElement>>('field');
  protected readonly address = viewChild(AddressBlock);

  focusLast() {
    this.fields().at(-1)?.nativeElement.focus();
  }
}
```

```html
@for (field of list(); track field.id) {
<input #field [placeholder]="field.label" />
}
<app-address-block />
```

## Key points

- **What it finds:** a string finds a [[template-reference-variable|template reference variable]] (`'field'`), and a class finds every element with that component or directive (`AddressBlock`).
- **Measured scope:**
  - The inputs in the demo's own template: **found**.
  - The input the demo **projects** into the card: **found**. It is written in the demo's template, even though the card shows it.
  - The input inside `<app-address-block>`, with the same `#field` name: **not found**. It belongs to that component's template. The query can find the component itself (`viewChild(AddressBlock)`), not what is inside it.
- **Old vs new, measured while adding and removing fields:**

  |                | `@ViewChildren`                  | `viewChildren()`                      |
  | -------------- | -------------------------------- | ------------------------------------- |
  | Returns        | A `QueryList`                    | A signal of a readonly array          |
  | Ready          | From `ngAfterViewInit`           | Whenever it is read after rendering   |
  | Follows `@for` | `changes` emits, once per change | A new array, and `computed()` follows |

- Angular completes `QueryList.changes` when the view is destroyed, so that subscription doesn't leak.
- Timing, `viewChild.required` and when the element exists are in [viewChild()](/component-communication/view-child). The options (`read`, `required`) are in the last lesson.

## Say it like this

"A view query, viewChild or viewChildren, finds elements, directives or components in the component's own template, by a template reference name or by a class. It sees what I wrote in my template, including content I project into a child, but never what is inside a child component's template. The old decorators return a QueryList with a changes Observable, ready in ngAfterViewInit. The new functions return signals, so the result updates by itself when @for adds or removes items, and works inside computed."
