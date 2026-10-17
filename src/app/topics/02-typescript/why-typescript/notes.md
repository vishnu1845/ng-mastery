## Definition

**TypeScript** is an open-source language by **Microsoft** and a **superset of JavaScript** that adds **static types**. Browsers can't run it directly, so it is **compiled (transpiled) to plain JavaScript**.

## Why Angular uses TypeScript

- Catches errors **while coding (compile time)**, not in production
- Rich **autocomplete & safe refactoring** in the editor
- Angular is built around **decorators & metadata**, a TypeScript feature
- **Strict template type checking**: Angular even type-checks our HTML
- Scales well for **big apps & big teams** (Angular 22 requires TypeScript 6)

## Example

```ts
// JAVASCRIPT: bug found only at runtime
function add(a, b) {
  return a + b;
}
add('5', 2); // '52' 😬

// TYPESCRIPT: bug caught before we even run the app
function add(a: number, b: number): number {
  return a + b;
}
add('5', 2); // ❌ Error: string is not assignable to number
```

## JavaScript vs TypeScript

|                 | JavaScript | TypeScript                                    |
| --------------- | ---------- | --------------------------------------------- |
| Typing          | Dynamic    | Static (types are optional)                   |
| Errors found    | At runtime | At compile time                               |
| Runs in browser | Directly   | After compiling to JS                         |
| Extra features  | —          | Interfaces, generics, enums, access modifiers |

## Say it like this

"TypeScript is JavaScript with static types, created by Microsoft. Since browsers only understand JavaScript, we compile TypeScript down to JS. Angular uses it because we catch errors while coding instead of in production, we get great autocomplete, and Angular itself is built on TypeScript decorators. So for large apps and teams, TypeScript keeps the code safe and predictable."
