## Definition

**Attribute binding** `[attr.name]` sets an **HTML attribute** instead of a DOM property. We use it when the element has **no DOM property** to bind to, like `colspan`, `aria-*` and `data-*`.

## Example

```html
<td [attr.colspan]="span()">Total</td>

<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  [attr.aria-valuenow]="percent()"
  [attr.aria-busy]="uploading() ? true : null"
  [attr.data-state]="state()"
></div>
```

## Key points

- `[colspan]="2"` is a **compile error**: _Can't bind to 'colspan' since it isn't a known property of 'td'_ (NG8002). The DOM property is called `colSpan`, so we write `[attr.colspan]`.
- Binding `null` or `undefined` **removes** the attribute. Perfect for optional states like `aria-busy`.
- Values become strings: `true` turns into `aria-busy="true"`.
- `data-*` attributes make great CSS hooks: `[data-state='done'] { color: green; }`
- Angular 22 also accepts `[aria-label]` without `attr.`, and the compiler still turns it into an attribute binding. Most code you'll read uses `[attr.aria-label]`.

## Say it like this

"Attribute binding uses `[attr.name]` to set an HTML attribute instead of a DOM property. We need it when the element has no matching property, like `colspan`, ARIA attributes or `data-*` attributes. For example, `[colspan]` is actually a compile error, so we write `[attr.colspan]`. And a nice trick: if we bind `null`, Angular removes the attribute completely, which is perfect for optional ARIA states."
