## Definition

**Interpolation** `{{ }}` displays component data in HTML. Angular evaluates the expression inside the braces, converts the result to a **string** and puts it in the page.

## Example

```html
<p>Hi! My name is {{ name() }} and I am {{ age() }} years old.</p>
<p>{{ 10 + 20 }} | {{ name().toUpperCase() }}</p>
<p>{{ user()?.city ?? 'No city yet' }}</p>
```

```ts
name = signal('Thomas');
age = signal(22);
user = signal<User | null>(null);
```

## What works inside `{{ }}`

Checked against the Angular 22 compiler:

| Works ✅                                  | Not allowed ❌                       |
| ----------------------------------------- | ------------------------------------ |
| Signals and fields: `name()`, `count`     | Assignments: `count = 5`             |
| Math and strings: `price() * qty()`       | `new Date()`                         |
| Method calls: `name().toUpperCase()`      | `count++` and `count--`              |
| Ternary, `?.` and `??`                    | Several statements: `a; b`           |
| Template literals: `` `${qty()} items` `` | Globals: `Math`, `window`, `console` |
| `typeof`, `in`, `**` and arrow functions  | Bitwise `\|` (it means a **pipe**)   |

Keep template expressions short. When there's real logic, move it into a `computed()` signal and just read that in the template.

## Always a string

- An array shows as `angular,signals,rxjs`
- An object shows as `[object Object]` (use the `json` pipe while debugging)
- `null` and `undefined` show nothing, without an error
- `true` shows as `true`

That's why non-string values like `disabled` need property binding, which is the next lesson.

## Say it like this

"Interpolation uses double curly braces to show component data in the template. Angular evaluates the expression, converts the result to a string and puts it in the page. We can use simple expressions like math, method calls, the ternary operator and optional chaining, but not assignments, `new`, or globals like `Math`. And since the result is always a string, for non-string values like `disabled` we use property binding instead."
