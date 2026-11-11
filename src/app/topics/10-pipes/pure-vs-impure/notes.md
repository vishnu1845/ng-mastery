## Definition

**Pure pipe (the default):** runs **only when the input reference or primitive value changes**. If the same object or array is passed again, Angular skips it.

**Impure pipe (`pure: false`):** runs on **every [[change-detection|change detection]] cycle**, even when the input looks unchanged. It catches **mutations** inside objects and arrays, but it is expensive.

## Example

```ts
@Pipe({ name: 'search' }) // pure
export class SearchPipe implements PipeTransform { … }

@Pipe({ name: 'searchImpure', pure: false }) // impure
export class SearchImpurePipe implements PipeTransform { … }
```

## The mutation problem

```ts
people = [{ name: 'Mikasa' }, { name: 'Levi' }];

add() {
  // ❌ MUTATION: same array reference, so the pure pipe does not run. The list is stale.
  this.people.push({ name: 'Naruto' });

  // ✅ NEW REFERENCE: the pure pipe runs again and the list updates.
  this.people = [...this.people, { name: 'Naruto' }];
}
```

## Key points

The demo counts the real runs of both pipes:

| Action                   | Pure pipe                       | Impure pipe        |
| ------------------------ | ------------------------------- | ------------------ |
| Add with `push()`        | Does not run. **List is stale** | Runs, list updates |
| Add with a new array     | Runs, list updates              | Runs, list updates |
| A click on anything else | Does not run                    | **Runs again**     |

|                   | Pure (default)                       | Impure                                                 |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| Runs when         | The input reference or value changes | **Every** [[change-detection\|change detection]] cycle |
| Detects mutation  | No                                   | Yes                                                    |
| Performance       | Fast                                 | Costly                                                 |
| Built-in examples | `uppercase`, `date`, `currency`      | `async`, `json`, `slice`, `keyvalue`                   |

- **Immutability is the correct fix.** An impure pipe is the last resort, because its work is repeated on every refresh, whether anything changed or not.
- With [[signal|signals]] this problem mostly disappears. `list.update((list) => [...list, item])` always creates a new array.

## Say it like this

"A pure pipe runs again only when the input reference changes. So if I `push()` into an array, which is a mutation, the reference is the same, the pipe does not run, and the UI looks stale. There are two fixes. I can make the pipe impure, so it runs on every change detection cycle, but that costs performance. Or better, I follow immutability and create a new array with spread, so the pure pipe detects the change. Immutability is the correct fix, and impure pipes are the last resort."
