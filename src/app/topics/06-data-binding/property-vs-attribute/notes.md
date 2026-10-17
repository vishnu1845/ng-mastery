## Definition

An **HTML attribute** is written in the HTML and sets the **initial** value. A **DOM property** lives on the element object in JavaScript and holds the **current** value. Angular's `[x]` bindings set **DOM properties**.

## Example

```html
<input value="Pune" />
```

```ts
// the user types " Camp"
input.getAttribute('value'); // 'Pune'      stays the same
input.value; // 'Pune Camp' always current
```

## Key points

|                           | HTML attribute    | DOM property          |
| ------------------------- | ----------------- | --------------------- |
| Lives in                  | the HTML markup   | the JS element object |
| Holds                     | the initial value | the current value     |
| Type                      | always a string   | any type              |
| Changes as the user types | No                | Yes                   |
| Angular binding           | `[attr.value]`    | `[value]`             |

- Once the user has typed (or JS has set `.value`), changing the `value` **attribute** no longer changes what's on screen. The demo shows it.
- Names don't always match: `class` ➝ `className`, `for` ➝ `htmlFor`, `tabindex` ➝ `tabIndex`, `readonly` ➝ `readOnly`, `colspan` ➝ `colSpan`. Angular maps the common ones for us, so `[tabindex]` and `[readonly]` work, but `[colspan]` doesn't.
- Boolean attributes like `disabled` work by **presence**: `disabled="false"` still disables. Same trap as `disabled="{{ false }}"` in the property binding lesson.

## Say it like this

"An HTML attribute is what we write in the HTML, and it only sets the initial value. The DOM property lives on the element object and holds the current value. For example, on an input, the value attribute stays 'Pune' while the user types, but the value property changes on every key. Angular's square-bracket bindings set DOM properties, which is why they keep real types, and when there's no property to bind, we fall back to `[attr.name]`."

## Rapid-fire (whole topic)

- **What is data binding and its types?** ➝ Communication between the component class and the template. Four types: interpolation and property binding (TS ➝ View), event binding (View ➝ TS) and two-way binding (both ways, with `[(ngModel)]`).
- **One-way vs two-way binding?** ➝ One-way flows in a single direction, either showing data or handling events. Two-way keeps both in sync, and under the hood it's just `[ngModel]` plus `(ngModelChange)`.
- **Interpolation vs property binding?** ➝ Interpolation always gives a string. Property binding keeps the real type, so `[disabled]="false"` works and `disabled="{{ false }}"` doesn't.
- **Why does ngModel need FormsModule?** ➝ `ngModel` is a directive that lives in FormsModule. Without the import, Angular doesn't recognise it and the template fails to compile.
- **What is `$event`?** ➝ The event data. For DOM events it's the browser event, for a component `output()` it's the emitted value.
- **When do we need `[attr.x]`?** ➝ When there's no DOM property, like `colspan`, `aria-*` or `data-*`. Binding `null` removes the attribute.
- **Template reference variable vs `viewChild()`?** ➝ `#var` is used inside the template itself. `viewChild()` brings that same reference into the TS class.
- **Is calling a method in a template bad?** ➝ A plain method runs again on every check. A signal or `computed()` is cheap to read because it only recalculates when its inputs change, so we prefer those.
- **Signals vs traditional binding?** ➝ Traditional binding relied on zone.js checking the component tree. With signals, Angular knows exactly which binding changed and updates only that DOM node. New apps are zoneless by default since v21.
