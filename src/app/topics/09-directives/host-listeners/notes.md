## Definition

The **`host` property** of a [[directive|directive]] or [[component|component]] binds classes, attributes, styles and events **on its [[host-element|host element]]**.

`@HostBinding` and `@HostListener` are the **older [[decorator|decorators]]** for the same job.

## Example

```ts
// MODERN: everything in one place
@Directive({
  selector: '[appDropdown]',
  host: {
    '[class.is-open]': 'open()',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class Dropdown {
  readonly open = model(false);
}

// OLDER: one decorator per binding and per listener
export class DropdownDecorators {
  readonly open = model(false);

  @HostBinding('class.is-open')
  get isOpen() {
    return this.open();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.open.set(false);
  }
}
```

## Key points

|                              | `host` property                    | `@HostBinding` / `@HostListener`     |
| ---------------------------- | ---------------------------------- | ------------------------------------ |
| Where it lives               | In the decorator, all in one place | Spread over the class members        |
| Reading a [[signal\|signal]] | Direct: `'open()'`                 | Needs a getter                       |
| Passing the event            | `'onClick($event)'`                | `@HostListener('click', ['$event'])` |
| Status in v22                | Recommended by the style guide     | Not deprecated, common in older code |

- Both dropdowns in the demo behave the same, and their opening tags are identical.
- **Global targets:** prefix the event with `document:`, `window:` or `body:` to listen outside the host. That is how the dropdown hears a click anywhere on the page.
- **Cleanup is automatic.** Angular removes the listeners when the directive is destroyed. In the demo, untick the checkbox and both counters stop.
- **Key filters** work here too: `(keydown.escape)`, `(keydown.enter)`.
- The strings in `host` are **type-checked**. A typo like `'opne()'` fails the build with **TS2339**.

## Say it like this

"To bind something on the host element, I use the `host` property in the decorator. It holds class, attribute and style bindings and event listeners in one place, and it reads signals directly. `@HostBinding` and `@HostListener` are the older decorators for the same thing. They are not deprecated, but the style guide recommends `host`. For events outside the element, we prefix the event with `document:` or `window:`, and Angular removes the listener automatically when the directive is destroyed."
