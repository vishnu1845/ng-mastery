## Definition

A **pipe** is used to **transform data from one format to another in Angular [[template|templates]]**, without changing the original data. It is applied with the `|` (pipe) symbol.

## Example

```html
<p>{{ name | uppercase }}</p>
<!-- mikasa → MIKASA -->
```

## The built-in pipes

| Pipe                                  | What it does                                                  | Example                                            |
| ------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------- |
| `uppercase`, `lowercase`, `titlecase` | Changes the letter case                                       | `'mikasa ackerman' \| titlecase` → Mikasa Ackerman |
| `number`                              | Formats a number                                              | `1234.567 \| number: '1.2-2'` → 1,234.57           |
| `currency`                            | Formats money                                                 | `1234.567 \| currency: 'INR'` → ₹1,234.57          |
| `percent`                             | Turns a fraction into a percentage                            | `0.259 \| percent` → 26%                           |
| `date`                                | Formats a date                                                | `joined \| date: 'dd/MM/yyyy'` → 12/06/2026        |
| `slice`                               | A part of an array or a string                                | `skills \| slice: 0 : 3` → the first 3 items       |
| `json`                                | Shows an object as text, for debugging                        | `marks \| json` → `{ "typescript": 82 }`           |
| `keyvalue`                            | Lets `@for` loop over an object                               | `marks \| keyvalue` → pairs of key and value       |
| `async`                               | Reads an [[observable\|Observable]] or a [[promise\|Promise]] | `user$ \| async` → the latest value                |

## Key points

- Pipes change the value **only for display**. The value in the [[component|component]] stays the same, as the last line of the demo shows.
- Each pipe is a class that we add to the [[component|component]]'s `imports`: `DatePipe`, `CurrencyPipe`, `UpperCasePipe` and so on. A forgotten import is the build error **NG8004** _No pipe found with name 'uppercase'_.
- The input type is checked. Passing an object to `date` fails the build.
- Formats follow the app's **locale**, which is `en-US` by default. That is why the date shows as "Jun 12, 2026".
- `keyvalue` **sorts by key**. In the demo the object starts with `typescript`, but `angular` is shown first. Passing `null`, as in `keyvalue: null`, keeps the original order.
- Most built-in pipes are pure. Four are **impure**: `async`, `json`, `slice` and `keyvalue`.

## Say it like this

"A pipe transforms data for display in the template, without changing the original value in the component. We apply it with the pipe symbol, like `{{ price | currency }}`. Angular ships pipes for the common cases: `date`, `currency`, `number` and `percent` for formatting, `uppercase`, `lowercase` and `titlecase` for text, `slice`, `json` and `keyvalue` for lists and objects, and `async` for Observables. In a standalone component, we import the pipe class we use."
