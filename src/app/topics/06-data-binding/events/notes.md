## Definition

**Event Binding** handles user actions (click, input, keyup...) using `(event)="method()"`.

**`$event`** is a built-in object that carries the **event data** from template to TS (event type, target element, value, key pressed...).

## Example

```html
<button (click)="onSubmit('Data')">Submit</button>
<input (input)="name.set($event.target.value)" />

<!-- on a component output, $event is the emitted value -->
<app-emoji-picker (picked)="mood.set($event)" />
```

```ts
onSubmit(data: string) {
  console.log(data);
}
```

## `$event` is fully typed

With `strictTemplates` (on by default), the compiler knows the exact type. Checked against Angular 22:

| Binding                   | `$event` type                    |
| ------------------------- | -------------------------------- |
| `(click)`                 | `PointerEvent`                   |
| `(input)`                 | `InputEvent`                     |
| `(keyup)` / `(keydown)`   | `KeyboardEvent`                  |
| `(keydown.enter)`         | `Event` (key filters lose it)    |
| `(picked)` on a component | whatever its `output<T>()` emits |

Since v20.2, even `$event.target` is typed, but only on **void elements** like `<input>`, where the target can only be the element itself. So on an `<input>`, `$event.target.value` is a `string` with **no cast**.

On elements with children, like `<select>` or `<textarea>`, `$event.target` stays `EventTarget | null`. There we use a template ref (`#box` then `box.value`) or a cast in TS: `(event.target as HTMLSelectElement).value`.

## Key points

- An event binding can hold several statements: `(click)="count.set(0); log('reset')"`.
- Event binding is the only binding where assignments are allowed.
- For a DOM event, `$event` is the real browser event. For a component `output()`, it's the plain value, so it has no `target`.

## Say it like this

"Event binding uses parentheses to listen to a user action, like `(click)` or `(input)`, and call a method in the component, so data flows from the view back to TS. `$event` carries the event data: for DOM events it's the real browser event, and for a component's `output()` it's the emitted value. And with strict templates, Angular types it, so on an input `$event.target.value` is already a string, no casting needed."
