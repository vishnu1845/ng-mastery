## Definition

**`signal()`** creates reactive state that holds a value. We read it by calling it like a function.

- **`.set()`** directly overwrites the current value with a new one.
- **`.update()`** takes the current value and returns a new one. This is cleaner when the new value depends on the old one.

## Example

```ts
count = signal(0); // WritableSignal<number>
user = signal<User | null>(null); // typed when the start value isn't enough

// read
console.log(this.count()); // 0

// .set(): replace with a fixed value
reset() {
  this.count.set(0);
}

// .update(): transform the existing value
increment() {
  this.count.update((current) => current + 1);
}
```

```html
<p>Count: {{ count() }}</p>
```

## Key points

- **Difference to remember:** `.set()` replaces with a fixed value; `.update()` transforms the existing value.
- `this.count.set(this.count() + 1)` works too, but `.update()` says what we mean in one step.
- Setting the **same value** again notifies nobody. Signals compare with `Object.is`, and nothing changed.
- `signal()` returns a `WritableSignal`. Anything typed as plain `Signal` can only be read, which is how we share state without letting others change it.

## Say it like this

"We create a signal with `signal()` and a start value, and we read it by calling it like a function. To change it, we use `set()` when we already have the new value, like resetting a counter to zero, and `update()` when the new value depends on the old one, like count plus one. And if we set the same value again, Angular doesn't notify anyone, because nothing really changed."
