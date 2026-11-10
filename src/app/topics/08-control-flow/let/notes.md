## Definition

`@let` declares a **read-only variable inside the [[template|template]]**. We compute a value once, give it a name, and use that name everywhere below it.

## Example

<!-- prettier-ignore -->
```html
@let subtotal = price * qty();
@let discount = subtotal >= 2700 ? subtotal / 10 : 0;
@let total = subtotal - discount;

<p>Total ₹{{ total }}</p>
<button>Pay ₹{{ total }}</button>

<!-- one subscription, used three times -->
@let profile = profile$ | async;
<p>{{ profile?.name }} · {{ profile?.email }} · {{ profile?.city }}</p>
```

## Key points

- **One `async` pipe instead of many.** Each [[async-pipe|`| async`]] is its own subscription. In the demo, three pipes send **3 HTTP requests** and `@let` sends **1**.
- **Scope:** a `@let` is visible only **after its line**, in the same block and the blocks inside it. A `@let` declared inside an `@if` or `@for` does not exist outside.
- The compiler enforces three rules:

| Error      | Rule                                                        |
| ---------- | ----------------------------------------------------------- |
| **NG8015** | It is read-only. `(click)="total = 0"` fails                |
| **NG8016** | It can't be read before the line that declares it           |
| **NG8017** | Its name must not clash with another symbol in the template |

- An unused `@let` gives the warning **NG8112**.
- **It is not cached.** The expression runs again on every refresh of the view. Heavy work belongs in a [[computed|`computed()`]].
- **It helps type narrowing.** `@if (user())` can't narrow a function call, but a variable can be narrowed:

<!-- prettier-ignore -->
```html
@let user = currentUser();
@if (user) {
  <p>{{ user.name }}</p>
}
```

- `@let` holds a **value**. A [[template-reference-variable|template reference variable]] (`#input`) holds an **element, [[component|component]] or [[directive|directive]]**.
- Available since v18.1 and stable since v19.

## Say it like this

"`@let` declares a read-only variable right in the template. I use it to compute a value once and reuse it, and mainly with the `async` pipe, so the template subscribes one time instead of once per usage. It is scoped to the block where it is declared, it can't be reassigned, and it can't be used before its line. It is not cached like `computed`, so it re-runs on every refresh, which means heavy logic still belongs in a `computed`."
