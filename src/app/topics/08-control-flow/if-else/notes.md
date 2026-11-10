## Definition

`@if` shows a block of the [[template|template]] **only when a condition is true**. `@else if` and `@else` handle the other cases. When the condition is false, the block is **not hidden, it is removed from the [[dom|DOM]]**.

`@if`, `@for` and `@switch` are Angular's **built-in control flow** (v17+). They are part of the template syntax, so there is nothing to import.

## Example

<!-- prettier-ignore -->
```html
@if (loading()) {
  <p>Checking your account…</p>
} @else if (user(); as user) {
  <p>Hi {{ user.name }}</p>
} @else {
  <p>You are not logged in.</p>
}
```

`as user` saves the result of the condition in a template variable. Inside the block, `user` is the logged-in user and can't be `null`.

## Key points

- Only **one branch** exists in the DOM at a time. When the branch changes, Angular destroys the old elements and [[component|components]] and creates the new ones.
- `@if` **removes**, `[hidden]` only **hides**. An element removed by `@if` loses its state (typed text, scroll position), and components inside it are destroyed. The demo shows both.

|                    | `@if`                                    | `[hidden]`                          |
| ------------------ | ---------------------------------------- | ----------------------------------- |
| When false         | Removed from the DOM                     | Stays in the DOM with `hidden`      |
| Components inside  | Destroyed, created again next time       | Stay alive                          |
| Typed text, scroll | Lost                                     | Kept                                |
| Use it for         | Things that may never show, heavy blocks | Small things that toggle very often |

- `as` works on `@if` and on `@else if`. It is the clean way to read a [[signal|signal]] once and get a non-null value: `@if (user(); as user)`.
- The condition is narrowed by [[typescript|TypeScript]] only for **plain properties and variables**. `@if (user())` followed by `user().name` still reports "possibly null", because `user()` is a function call. Use `as`.
- Forgot the `()` on a signal? `@if (user)` is always true. Angular 22 stops the build with **TS2774** and warns with **NG8109** (_user is a function and should be invoked_).
- `[hidden]` gotcha: any CSS `display` rule on the element beats the `hidden` attribute. The demo needs `.field[hidden] { display: none }` for that reason.

## Say it like this

"`@if` is Angular's built-in conditional block. When the condition is true, Angular creates that block in the DOM, and when it becomes false, Angular removes it and destroys any components inside. That is the difference from `[hidden]`, which keeps the element in the DOM and only hides it. We chain cases with `@else if` and `@else`, and with `as` we can save the condition's value, like `@if (user(); as user)`, so inside the block it is already non-null."
