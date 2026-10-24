## Definition

`tsconfig.json` is the **configuration file for the TypeScript compiler**. It decides how strict type checking is and how the code is compiled. **Strict mode** turns on all the strong safety checks, and new Angular projects are strict by default.

## Example

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "paths": { "@core/*": ["./src/app/core/*"] }
  },
  "angularCompilerOptions": {
    "strictTemplates": true,
    "strictInjectionParameters": true
  }
}
```

```ts
let user: User | null = null;
user.name; // ❌ strict: 'user' is possibly null
user?.name; // ✅
```

## Important flags

| Flag                           | What it does                                          |
| ------------------------------ | ----------------------------------------------------- |
| `strictNullChecks`             | `null` / `undefined` must be handled                  |
| `noImplicitAny`                | No silent `any` types                                 |
| `strictPropertyInitialization` | Class properties need a value (that's why we see `!`) |
| `strictTemplates` (Angular)    | Type-checks our HTML [[template\|templates]]          |
| `paths`                        | Short import aliases like `@core/...`                 |

This project's real `tsconfig.json` is in the **Code** tab.

## Say it like this

"tsconfig.json is where we configure the TypeScript compiler. The most important setting is `strict: true`, which turns on checks like strictNullChecks and noImplicitAny, so we can't accidentally use null values or untyped code. And Angular adds its own options, like `strictTemplates`, which type-checks our HTML too. New Angular projects come with strict mode on by default."

## Rapid-fire (whole topic)

- **Can the browser run TypeScript?** → No, it's compiled to JavaScript first
- **Does TypeScript make the app faster?** → No, types are removed at compile time; it makes the code **safer**, not faster
- **Who created TypeScript?** → Microsoft
- **`any` vs `unknown`?** → `any` skips checks; `unknown` forces us to check first
- **`??` vs `||`?** → `??` falls back only for `null` / `undefined`; `||` also for `0`, `''`, `false`
- **What does `!` do at runtime?** → Nothing; it only silences the compiler
- **Interface or type for API models?** → Usually `interface`; just stay consistent
