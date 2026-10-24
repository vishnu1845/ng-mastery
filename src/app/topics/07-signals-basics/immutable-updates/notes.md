## Definition

Signals compare values with **`Object.is`** by default. For objects and arrays, that means comparing the **reference**, not the content. If we change the inside of the same array or object, the signal thinks nothing changed, so we always create a **new** object or array when updating.

## Example

```ts
items = signal(['Milk', 'Bread']);
user = signal({ name: 'Vishnu', address: { city: 'Pune' } });

// ❌ same reference: nobody is notified
this.items().push('Eggs');
this.items.set(this.items());

// ✅ new array
this.items.update((list) => [...list, 'Eggs']);
this.items.update((list) => list.filter((item) => item !== 'Milk'));

// ✅ new object, and a new copy of every nested level we change
this.user.update((u) => ({ ...u, address: { ...u.address, city: 'Mumbai' } }));
```

## Key points

- The classic version of this bug: a child [[component|component]] gets the array through an `input()`. After a `push()`, the child receives the **same reference**, so Angular sees no new input and the child never updates. The demo shows exactly that.
- Mutating in place is sneaky: the change is really there, so it **shows up later**, when something else causes an update.
- Arrays: use spread, `map()`, `filter()`, `toSorted()`. Avoid `push()`, `splice()` and `sort()` on the signal's own array.
- Objects: spread every level you change: `{ ...u, address: { ...u.address, city } }`.
- A custom `equal` function can change the comparison (Topic 33), but immutable updates are the normal way.

## Say it like this

"Signals check for changes with `Object.is`, so for objects and arrays they compare the reference, not the content. If we push into the same array or change a property on the same object and set it back, the signal sees the same reference and notifies nobody. So we always update immutably, with `update()` and the spread operator, like `[...list, item]` or `{ ...user, name }`. That gives a new reference, and everything that depends on it updates."
