## Definition

`@switch` compares **one value** with several `@case` values and shows the block of the case that matches. `@default` shows when no case matches.

## Example

<!-- prettier-ignore -->
```html
@switch (status) {
  @case ('placed') {
    <p>Order placed.</p>
  }
  @case ('packed')
  @case ('shipped') {
    <p>On the way.</p>
  }
  @default {
    <p>Unknown status.</p>
  }
}
```

## Key points

- Cases are compared with **`===`**, so there is no type conversion. The string `'2'` from an `<input>` never matches `@case (2)`. The demo shows it: convert with `Number()` first.
- There is **no fallthrough** and no `break`. Only the matching block is created in the [[dom|DOM]].
- **Several cases, one block:** write the `@case` lines one after another, as in the example.
- `@default` is optional. Without it, a value that matches no case shows nothing.
- **Exhaustive check:** end the switch with `@default never;`. If a value of the [[union-type|union type]] has no case, the build fails:

<!-- prettier-ignore -->
```html
@let current = status();

@switch (current) {
  @case ('placed') { … }
  @case ('delivered') { … }
  @default never;
}
<!-- TS2322: Type '"cancelled"' is not assignable to type 'never'. -->
```

- That check only works on a **variable**. With a call like `@switch (status())`, [[typescript|TypeScript]] can't narrow the type, so it reports an error even when every case is covered. Save the [[signal|signal]] with `@let` first.
- Use `@switch` when **one value** picks between many options. Use `@if` / `@else if` when the conditions are different expressions.

## Say it like this

"`@switch` takes one value and renders the `@case` block that matches it, with `@default` as the fallback. It compares with triple equals, so a string never matches a number, and there is no fallthrough, so we don't write `break`. We can stack several `@case` lines on one block. And for union types, `@default never` makes the compiler check that every value has a case. For that check with a signal, I first save the value with `@let`."
