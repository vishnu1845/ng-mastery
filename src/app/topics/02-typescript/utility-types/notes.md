## Definition

**Utility types** are **built-in helpers that create new types from existing ones**, so we don't repeat the same interface again and again.

## Example

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>; // all optional → PATCH body
type UserPreview = Pick<User, 'id' | 'name'>; // only id & name
type NewUser = Omit<User, 'id'>; // all except id → POST body
type FrozenUser = Readonly<User>; // fields can't change
type RoleMap = Record<'admin' | 'user', string[]>; // key → value map

const perms: RoleMap = { admin: ['read', 'write'], user: ['read'] };
```

## Cheat sheet

| Utility        | What it does                        | Real use                           |
| -------------- | ----------------------------------- | ---------------------------------- |
| `Partial<T>`   | All properties optional             | Update / PATCH payloads            |
| `Required<T>`  | All properties required             | Final validated data               |
| `Pick<T, K>`   | Keep only some properties           | Card / list previews               |
| `Omit<T, K>`   | Remove some properties              | Create / POST payload without `id` |
| `Readonly<T>`  | All properties read-only            | Immutable state                    |
| `Record<K, V>` | Object with fixed key & value types | Lookups, maps, config              |

## Say it like this

"Utility types help us reuse one model instead of writing new interfaces. So from one `User` interface, we use `Omit` to drop the id for a create request, `Partial` to make everything optional for an update, and `Pick` when a card only needs the name. And `Record` is great for typed key-value maps, like roles to permissions."
