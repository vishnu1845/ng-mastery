## Definition

`@for` repeats a block of the [[template|template]] **once for each item** of a collection. Its `track` expression is **required**. It gives every item a **unique key**, so when the list changes Angular knows which [[dom|DOM]] row belongs to which item.

## Example

<!-- prettier-ignore -->
```html
@for (member of members(); track member.id) {
  <app-member-row [member]="member" />
}
```

## Key points

- When the list changes, Angular compares **keys**, not positions. Same key: the row is kept, and moved if needed. New key: a row is created. Key gone: the row is destroyed.
- The demo counts the real DOM work with a [[mutation-observer|`MutationObserver`]]. With 5 rows, this is what each key does:

| Action                          | `track member.id`     | `track $index`                   | `track member`         |
| ------------------------------- | --------------------- | -------------------------------- | ---------------------- |
| Reload (same data, new objects) | Nothing               | Nothing                          | 5 destroyed, 5 created |
| Add to top                      | 1 row created         | 1 created, 20 elements rewritten | 1 row created          |
| Reverse                         | Rows move             | Every row rewritten              | Rows move              |
| A ticked checkbox               | Stays with the person | Stays on the position            | Lost on reload         |

- **Best key: a unique id from the data**, like `track user.id`.
- `track $index` is only safe for a list that never reorders and never gets items in the middle. Otherwise the rows stay in place while the data slides through them, and anything the row remembers (a tick, typed text, focus) ends up on the wrong item.
- `track member` tracks the **object itself**. It works for strings and numbers. For objects, a refetch gives new objects, so every row is rebuilt. In dev mode Angular warns about that with **NG0956**.
- Two items with the same key give the dev-mode warning **NG0955** (duplicated keys).
- No `track` at all is a build error: **NG5002** _@for loop must have a "track" expression_.
- `@for` loops over any iterable: arrays, `Set`, `Map`. `null` and `undefined` count as an empty list. A plain object is not iterable, so use the `keyvalue` pipe for it.

## Say it like this

"`@for` renders a block for each item, and `track` is mandatory. `track` gives each item a unique key, and Angular uses that key to match items with their DOM rows. So when the list changes, it only creates, moves or removes the rows that really changed. I track by a unique id. `track $index` is fine only for static lists, because the row state stays on the position. And tracking the object itself rebuilds the whole list after a refetch, since every object is new."
