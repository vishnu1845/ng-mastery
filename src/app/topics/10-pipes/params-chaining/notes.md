## Definition

A pipe takes **parameters after a colon**: `value | pipe: param1 : param2`.

**Chaining** sends the result of one pipe into the next one: `value | pipe1 | pipe2`.

## Example

<!-- prettier-ignore -->
```html
{{ 1234.5678 | number: '1.2-2' }}             <!-- 1,234.57 -->
{{ 1234.5678 | currency: 'INR' : 'code' }}    <!-- INR1,234.57 -->
{{ released | date: 'MMMM y' | uppercase }}   <!-- JUNE 2026 -->
```

## Key points

- **The number format** `'1.2-2'` means `minIntegerDigits.minFractionDigits-maxFractionDigits`: at least 1 digit before the point, and between 2 and 2 digits after it. The demo builds it from three boxes.
- **`currency` takes up to three:** the currency code, how to show it (`'symbol'` or `'code'`), and the same digits format.
- **Common `date` formats:**

| Format         | Shown                 |
| -------------- | --------------------- |
| `'dd/MM/yyyy'` | 12/06/2026            |
| `'MMMM y'`     | June 2026             |
| `'fullDate'`   | Friday, June 12, 2026 |
| `'shortTime'`  | 5:30 PM               |

- A parameter can be any expression, including a [[signal|signal]]: `number: digits()`.
- **Chains run left to right**, and the order matters. `title | slice: 0 : 15 | uppercase` cuts first, then changes the case. Each pipe must accept the type the one before it returns.
- **Gotcha: a pipe binds tighter than `? :`.** The demo shows it:

<!-- prettier-ignore -->
```html
{{ isPro ? 'pro plan' : 'free plan' | uppercase }}     <!-- pro plan, or FREE PLAN -->
{{ (isPro ? 'pro plan' : 'free plan') | uppercase }}   <!-- PRO PLAN, or FREE PLAN -->
```

Without brackets, the pipe belongs only to the last value. Prettier even rewrites the first line as `isPro ? 'pro plan' : ('free plan' | uppercase)`, which makes the problem easy to see.

## Say it like this

"We pass parameters to a pipe after a colon, like `date: 'dd/MM/yyyy'` or `number: '1.2-2'`, where the format means minimum integer digits, then minimum and maximum fraction digits. We can also chain pipes, and they run left to right, each one getting the result of the one before. One thing to watch is the ternary operator: the pipe applies only to the last value, so I wrap the whole condition in brackets."
