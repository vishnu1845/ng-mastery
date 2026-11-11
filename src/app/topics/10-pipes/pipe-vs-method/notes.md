## Definition

A **method call in a [[template|template]]** runs on **every** [[change-detection|change detection]] of that view, whether its input changed or not.

A **[[pure-pipe|pure pipe]]** is **[[memoization|memoized]]**: it runs only when its input changes.

## Example

```html
<!-- Method: called again on every refresh -->
<td>{{ format(course.price) }}</td>

<!-- Pure pipe: called again only when course.price changes -->
<td>{{ course.price | inr }}</td>
```

## Key points

The demo has 4 rows and counts the real calls:

| Action             | `format(price)` method | `price \| inr` pipe  |
| ------------------ | ---------------------- | -------------------- |
| First render       | 4 calls                | 4 runs               |
| A like (unrelated) | **4 more**, every time | 0                    |
| One price changes  | 4 more                 | **1**, only that row |

- **Why:** Angular cannot know what a method will return, so it has to call it to find out. A [[pure-pipe|pure pipe]] promises "same input, same output", so Angular can skip it.
- The cost grows with the page: rows × refreshes. With a slow function, or a list of hundreds of rows, this becomes visible lag.
- This is about methods in **bindings**, like `{{ format(x) }}` or `[title]="getTitle()"`. Event handlers such as `(click)="save()"` are fine. They run only on the event.
- Reading a [[signal|signal]], like `{{ count() }}`, is also fine. It is a cheap read of a stored value.
- **Use instead:** a pure pipe for formatting, or a [[computed|`computed()`]] for values derived from state.

## Say it like this

"A method call in a template binding runs on every change detection cycle, because Angular has no way to know whether its result changed. A pure pipe is memoized, so it runs only when its input changes. In a list, that is the difference between recalculating every row on every click and recalculating only the row that changed. So for formatting I use a pure pipe, and for derived data I use a `computed` signal."
