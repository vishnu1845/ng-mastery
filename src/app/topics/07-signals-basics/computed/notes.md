## Definition

A **computed signal** is a read-only reactive value that is **derived** from one or more signals. It automatically recalculates when its dependencies change.

## Example

```ts
price = signal(499);
qty = signal(2);
total = computed(() => this.price() * this.qty());
```

```html
<p>Total: ₹{{ total() }}</p>
```

## Derived, lazy, cached

| Word        | What it means                                                      |
| ----------- | ------------------------------------------------------------------ |
| **Derived** | Its value comes only from other signals. We never set it.          |
| **Lazy**    | It doesn't run until someone reads it.                             |
| **Cached**  | Reading it again is free until one of the signals it read changes. |

## Key points

- **Dynamic dependencies:** a computed depends only on the signals it read **in its last run**. If a branch skipped a signal, changes to that signal don't re-run it.
- **Read-only:** a computed has no `.set()` or `.update()`.
- **Keep it pure:** no side effects, and no signal writes. Angular throws: _Writing to signals is not allowed in a `computed`_.
- If the result is the same as before (by `Object.is`), the things that read it aren't notified.
- Prefer `computed()` over a getter or a method in the template: a method runs on every check, a computed runs only when its inputs change.

## Say it like this

"A computed signal is a read-only value derived from other signals, like total from price and quantity. It's lazy, so it only runs when someone reads it, and it's cached, so reading it again is free until one of its dependencies changes. Angular tracks those dependencies automatically, only the signals it actually read in the last run. And since it's read-only and should stay pure, we never write to other signals inside it."
