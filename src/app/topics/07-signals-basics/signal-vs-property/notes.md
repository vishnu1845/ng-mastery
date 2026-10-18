## Definition

A **plain class property** is just a value: Angular can't tell when it changes. A **signal** tells Angular every time it changes. In a zoneless app (the default for new apps since v21), Angular refreshes a view only when:

- a signal it reads changes
- an event handler in its template runs
- `markForCheck()` is called
- the `async` pipe gets a new value

## Example

```ts
export class Clock {
  plain = 0; // Angular can't see this change
  count = signal(0); // Angular is told about this change

  later() {
    setTimeout(() => {
      this.plain++; // screen stays stale
      this.count.update((n) => n + 1); // screen updates
    }, 1000);
  }
}
```

## Key points

|                              | Plain property                | Signal               |
| ---------------------------- | ----------------------------- | -------------------- |
| Changed in a click handler   | Updates (the event refreshes) | Updates              |
| Changed in `setTimeout`/HTTP | **Stays stale** (zoneless)    | Updates              |
| Angular knows who reads it   | No                            | Yes                  |
| Derived values               | Getter runs on every check    | `computed()`, cached |

- A signal change refreshes the **whole component**, so a stale plain property in the **same** component catches up whenever any signal there changes. That hides the bug until it doesn't. The demo keeps each counter in its own component so you can see it.
- Gotcha straight from Angular's source: a listener on a **component's own tag**, like `(changed)` on `<app-counter>`, marks **that component** for refresh too. So when a child's `output()` fires, the child catches up. The demo reports through a service instead, so the bug stays visible.
- With zone.js, the `setTimeout` version also updated, because zone.js patched every browser API and checked the whole tree. That's exactly the work signals let Angular skip.
- Even with zone.js, an **OnPush** component ignored a plain property changed in a `setTimeout`. Signals fix both cases.

## Say it like this

"A plain property is just a value, so Angular can't know when it changes. It only shows the new value if something else triggers a refresh, like a click. A signal tells Angular itself that it changed. In a zoneless app, that difference is visible: if we update a plain property inside a setTimeout, the screen stays stale, but a signal updates right away. That's why in modern Angular, we keep every piece of state the template reads in a signal."

## Rapid-fire (whole topic)

- **What is a signal?** ➝ A reactive state variable. We read it by calling it, `count()`, and change it with `.set()` or `.update()`.
- **`signal` vs `computed` vs `effect`?** ➝ State, a value derived from state, and a side effect that runs when state changes.
- **`set()` vs `update()`?** ➝ `set()` replaces with a fixed value, `update()` transforms the current value.
- **Is `computed()` lazy?** ➝ Yes. It runs only when read, and it's cached until a dependency changes.
- **Can we write a signal inside `computed()`?** ➝ No. Angular throws: _Writing to signals is not allowed in a `computed`_.
- **Where do we create an `effect()`?** ➝ In the constructor or as a field initializer. Anywhere else, pass an injector or get NG0203.
- **Why didn't my array change show up?** ➝ We mutated the same array, so `Object.is` saw the same reference. Use `update()` with a new array.
- **Do we still need `markForCheck()` with signals?** ➝ No. Reading a signal in the template is enough for Angular to refresh that component.
- **Are signals synchronous?** ➝ Reading and setting are synchronous. Effects and re-rendering are scheduled for afterwards.
- **Signals vs RxJS?** ➝ Signals hold the **current value** of state. RxJS handles **events over time**, like debounced search or HTTP streams. Topic 35 connects them.
