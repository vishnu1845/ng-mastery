## Definition

Inside `@for`, Angular gives us **six ready-made variables** about the current row: `$index`, `$count`, `$first`, `$last`, `$even` and `$odd`.

`@empty` is an optional block right after `@for`. It shows **when the collection has no items**.

## Example

<!-- prettier-ignore -->
```html
@for (song of songs(); track song.id) {
  <li [class.striped]="$odd">
    {{ $index + 1 }} of {{ $count }}: {{ song.title }}
  </li>
} @empty {
  <li>The queue is empty.</li>
}
```

## Key points

| Variable | Value                                |
| -------- | ------------------------------------ |
| `$index` | Position of the row, starting at `0` |
| `$count` | Total number of items in the list    |
| `$first` | `true` for the first row             |
| `$last`  | `true` for the last row              |
| `$even`  | `true` when `$index` is even         |
| `$odd`   | `true` when `$index` is odd          |

- `$even` and `$odd` are about the **index**, not the row number we see. The first row has index `0`, so it is **even**.
- Everyday uses: row numbers (`$index + 1`), "2 of 5" (`$count`), zebra rows (`$odd`), and separators (`$last`).
- In nested loops, the inner `$index` hides the outer one. Give them names with `let`:

<!-- prettier-ignore -->
```html
@for (row of rows; track row; let rowIndex = $index) {
  @for (seat of seats; track seat; let seatIndex = $index) {
    {{ rowIndex }},{{ seatIndex }}
  }
}
```

- These variables are **read-only**. Assigning to one, like `(click)="$index = 2"`, is a build error.
- `@empty` shows for an empty array, and also for `null` and `undefined`. That replaces the old extra `*ngIf="list.length === 0"`.
- `@empty` can only come right after a `@for` block. Anywhere else is a build error (**NG5002**).

## Say it like this

"Inside `@for`, we get six built-in variables: `$index`, `$count`, `$first`, `$last`, `$even` and `$odd`. We use them for numbering, zebra rows and separators. In nested loops, we give them an alias with `let i = $index`, because the inner loop hides the outer one. And `@empty` is an optional block after `@for` that shows when the list has no items, so we don't need a separate condition for the empty state."
