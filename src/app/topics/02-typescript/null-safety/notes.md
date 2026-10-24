## Definition

- `?` → **optional** property or parameter
- `!` → **non-null assertion**: "trust me, this is not null" (compile time only, no runtime check)
- `?.` → **optional chaining**: stops and returns `undefined` if the value is `null` / `undefined`
- `??` → **nullish coalescing**: gives a default **only** for `null` / `undefined`

## Example

```ts
interface User {
  name: string;
  nickname?: string; // optional
  address?: { city: string };
}

const city = user.address?.city; // undefined if no address, no crash
const label = user.nickname ?? 'Guest'; // 'Guest' only if null/undefined

// ?? vs ||
const qty = 0;
qty || 1; // 1  ❌ treats 0 as "empty"
qty ?? 1; // 0  ✅ only null/undefined fall back

// ! : we promise it exists
const app = document.getElementById('app')!;
```

## Template note

`?.` and `??` both work in Angular [[template|templates]]. `??` in templates needs **Angular 12+** (it won't compile in Angular 9 templates).

## Say it like this

"The question mark makes a property optional. Optional chaining `?.` safely reads deep values, so if something in the middle is null, we get undefined instead of a crash. Nullish coalescing `??` gives a default only for null or undefined, which is safer than `||` because `||` also replaces 0 and empty strings. And the `!` operator just tells TypeScript the value isn't null; it does nothing at runtime, so we use it carefully."
