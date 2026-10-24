## Definition

**Narrowing** is when TypeScript **refines a broad type into a specific one** inside a check. A **type guard** is the check that does it.

## Example

```ts
// TYPEOF
function format(value: string | number) {
  if (typeof value === 'string') return value.toUpperCase(); // string here
  return value.toFixed(2); // number here
}

// DISCRIMINATED UNION: perfect for API state
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string };

function render(state: State) {
  switch (state.status) {
    case 'success':
      return state.data.length; // data available here
    case 'error':
      return state.message; // message available here
    default:
      return 'Loading...';
  }
}

// CUSTOM TYPE GUARD
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'name' in obj;
}
```

## Type guards

| Guard                 | Use for         | Example                            |
| --------------------- | --------------- | ---------------------------------- |
| `typeof`              | Primitives      | `typeof x === 'string'`            |
| `instanceof`          | Classes         | `err instanceof HttpErrorResponse` |
| `in`                  | Property exists | `'email' in obj`                   |
| Discriminant property | Tagged unions   | `state.status === 'success'`       |
| `obj is T`            | Custom checks   | `isUser(obj)`                      |

## In Angular templates

Narrowing works in [[template|templates]] too. Save the [[signal|signal]] value with `@let`, then `@if` or `@switch` on the discriminant:

<!-- prettier-ignore -->
```html
@let current = state();

@switch (current.status) {
  @case ('success') { {{ current.users.length }} users }
  @case ('error') { {{ current.message }} }
}
```

## Say it like this

"Narrowing means TypeScript figures out the exact type inside a check. So with `typeof`, `instanceof` or the `in` operator, TypeScript knows which type we're dealing with in that block. My favourite pattern is a discriminated union for API state: loading, success or error. Once we check the status, TypeScript knows exactly which properties exist. And for complex checks, we write a custom type guard that returns `obj is User`."
