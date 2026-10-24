## Definition

- **Union** `A | B` → the value can be **one of** several types
- **Intersection** `A & B` → **combines** types; the value must have **all** properties
- **Literal type** → an **exact value** as a type, like `'admin'`

## Example

```ts
type ID = string | number; // union
type Role = 'admin' | 'user' | 'guest'; // literal union

type Timestamps = { createdAt: Date };
type Product = { id: ID; name: string } & Timestamps; // intersection

let role: Role = 'admin'; // ✅
// role = 'manager';        // ❌ not in the list

// ANGULAR USE: restrict an input to fixed values
size = input<'sm' | 'md' | 'lg'>('md');
```

## Key points

- A literal union is the simplest way to say "only these values": button sizes, roles, statuses.
- Angular checks inputs in [[template|templates]] too (`strictTemplates`), so `size="xl"` fails at build time.
- An intersection is how a `type` "extends" another shape.

## Say it like this

"A union means the value can be one of several types, like `string | number` for an ID. An intersection combines types, so the object must have all the properties. And literal types let us allow only exact values, like `'admin' | 'user'`. In Angular, we use literal unions a lot to restrict inputs, for example a button size that can only be sm, md or lg."
