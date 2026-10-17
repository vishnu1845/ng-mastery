## Definition

`any` switches type checking **off**. `unknown` is the **safe version of `any`**: it can hold anything, but we **must check the type before using it**. `never` is a value that **never happens**, like a function that always throws.

## Example

```ts
// ANY: switches type checking OFF
let a: any = 'hi';
a.toFixed(); // ✅ compiles, 💥 crashes at runtime

// UNKNOWN: safe version of any, must check before use
let u: unknown = 'hi';
// u.toUpperCase();   // ❌ error
if (typeof u === 'string') u.toUpperCase(); // ✅

// NEVER: a value that never happens
function fail(msg: string): never {
  throw new Error(msg); // function never returns
}
```

## never for exhaustive checks

```ts
type Status = 'active' | 'inactive';

function label(status: Status): string {
  switch (status) {
    case 'active':
      return 'On';
    case 'inactive':
      return 'Off';
    default: {
      // ❌ Error here if we add a new Status and forget to handle it
      const unhandled: never = status;
      return unhandled;
    }
  }
}
```

## Comparison

| Type      | Meaning                         | Use                                     |
| --------- | ------------------------------- | --------------------------------------- |
| `any`     | Anything, no checks             | Avoid (kills type safety)               |
| `unknown` | Anything, but must narrow first | Data we don't trust yet (API, JSON)     |
| `never`   | Never happens                   | Functions that throw, exhaustive checks |
| `void`    | Returns nothing                 | Functions with no return value          |

## Say it like this

"`any` switches type checking off completely, so we avoid it. `unknown` is the safe version: it can hold anything, but we must check the type before using it, which is perfect for API data we don't trust yet. And `never` means a value that never happens, like a function that always throws, or the default case of a switch that has handled every option."
