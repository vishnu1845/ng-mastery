## Definition

The **`async` pipe** **subscribes to an [[observable|Observable]] or [[promise|Promise]]** directly in the [[template|template]], returns the latest value, and **automatically unsubscribes** when the [[component|component]] is destroyed. That prevents memory leaks.

## Example

```ts
export class Users {
  private http = inject(HttpClient);
  users$ = this.http.get<User[]>('/api/users'); // no subscribe() in the class
}
```

<!-- prettier-ignore -->
```html
@if (users$ | async; as users) {
  @for (user of users; track user.id) {
    <li>{{ user.name }}</li>
  }
} @else {
  <p>Loading…</p>
}
```

## Key points

- **Why use it instead of `subscribe()`:**
  1. It **unsubscribes automatically**, so there are no memory leaks.
  2. There is **no boilerplate**: no stored subscription and no `ngOnDestroy`.
  3. It **tells Angular to refresh the view** when a value arrives, so it also works with [[onpush|OnPush]] and in [[zoneless|zoneless]] apps.
- The demo counts live subscriptions. Show the price and the count is 1. Remove it from the page and the count is 0.
- **Before the first value it returns `null`.** That is why we pair it with `@if (… ; as value)` or `??`.
- **When the [[observable|Observable]] itself changes,** the pipe unsubscribes from the old one and subscribes to the new one. Switch the metal in the demo: one subscription stays alive, and a second one has been started.
- **Every `| async` is its own subscription.** Three pipes on one HTTP Observable send three requests. Save the value once with `@let user = user$ | async;`.
- It is an **impure** pipe, because it must show new values without any input changing. Its work on each refresh is small: it returns the value it already has.
- **The modern alternative** is `toSignal(users$)`, which turns the Observable into a [[signal|signal]]. Then the [[template|template]] just reads `users()`. Topic 35 covers it.

## Say it like this

"The async pipe subscribes to an Observable or a Promise in the template and gives the latest value. I prefer it over a manual `subscribe` for three reasons: it unsubscribes automatically when the component is destroyed, so there are no memory leaks, there is no boilerplate, and it marks the view for refresh when a new value arrives, so it works with OnPush. It returns `null` until the first value, so I use it with `@if` and `as`. And in modern Angular, `toSignal` is the alternative, where the template just reads a signal."
