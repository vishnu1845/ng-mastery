## Definition

Both give a **cached value derived from other data**.

A **[[pure-pipe|pure pipe]]** is a reusable transformation for **[[template|templates]]**. A **[[computed|`computed()`]]** is derived **state of one [[component|component]]**, which the [[template|template]] and the class can both read.

## Example

<!-- prettier-ignore -->
```html
<!-- Pipe: the template asks for the result each place it needs it -->
<p>{{ (people() | search: term()).length }} found</p>
@for (person of people() | search: term(); track person.id) { … }
```

```ts
// computed(): one result, read wherever we want
matches = computed(() => filterPeople(this.people(), this.term()));
```

<!-- prettier-ignore -->
```html
<p>{{ matches().length }} found</p>
@for (person of matches(); track person.id) { … }
```

## Key points

|                            | Pure pipe                   | `computed()`                     |
| -------------------------- | --------------------------- | -------------------------------- |
| Lives in                   | Its own class               | The [[component\|component]]     |
| Reused across components   | Yes, import it anywhere     | No, it belongs to one component  |
| Result usable in the class | **No**, template only       | Yes                              |
| Cached                     | Per place it is written     | Once, for every reader           |
| Takes parameters           | Yes: `value \| pipe: a : b` | No, it reads [[signal\|signals]] |

- **Measured in the demo:** the result is needed in two places, the list and the count. Each key press runs the pipe's filter **2 times** and the computed's filter **1 time**.
- **The class can use a computed.** The demo's "Invite" button reads `matches()` in its click handler. With a pipe, the class would have to filter again.
- **Rule of thumb:**
  - **Formatting a value** for display (dates, money, text): a **pipe**. It is reusable everywhere.
  - **Deriving data** from state (filter, sort, totals): a **[[computed|`computed()`]]**.
- This is why the Angular team advises against search and sort pipes.

## Say it like this

"Both are cached, but they solve different problems. A pure pipe is a reusable formatter for templates, like a date or currency format, and I can import it in any component. A `computed` is derived state of one component: it is calculated once, and both the template and the class can read it. So I use pipes for formatting, and `computed` for things like filtering and sorting a list, where the result is usually needed in more than one place."
