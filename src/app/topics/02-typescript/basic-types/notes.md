## Definition

**Basic types:** `string`, `number`, `boolean`, arrays (`string[]`), tuples, `null`, `undefined`, `void`. **Type inference:** if we assign a value, TypeScript **guesses the type for us**, so we don't need to write it everywhere.

## Example

```ts
let title = 'Angular'; // inferred as string
let price: number = 499; // explicit type
let tags: string[] = ['new', 'sale']; // array
let point: [number, number] = [10, 20]; // tuple: fixed length & types

function log(message: string): void {
  // void: returns nothing
  console.log(message);
}
```

## Key points

- Inference reads the value, so `let title = 'Angular'` is already a `string`.
- `const` keeps the exact value as the type: `const title = 'Angular'` has the type `'Angular'`.
- `[10, 20]` is inferred as `number[]`. For a **tuple** we must write the type: `[number, number]`.
- We still write types where TypeScript can't guess: function parameters and empty values, like `signal<User[]>([])`.
- Types exist only at compile time. At runtime `typeof [10, 20]` is just `'object'`.

## Say it like this

"TypeScript gives us basic types like string, number and boolean, and most of the time it infers them for us. So we only write types where TypeScript can't guess, like function parameters or an empty array, and let inference handle the rest."
