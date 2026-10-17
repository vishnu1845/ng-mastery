## Definition

**Property Binding** binds DOM element properties (`src`, `href`, `disabled`, `value`) to component data, using `[property]="data"`.

## Example

```html
<img [src]="profile()" alt="Thomas" />
<button [disabled]="isLoading()">Save</button>
<progress [value]="uploaded()" max="100"></progress>

<!-- the same syntax passes data into a child component's input -->
<app-product-card [product]="product()" />
```

```ts
profile = signal('assets/thomas.jpg');
isLoading = signal(true);
uploaded = signal(40);
```

## Interpolation vs property binding

Both are one-way, TS ➝ View. Interpolation is for **text and strings**. Property binding works with **any data type**: boolean, number, object, array.

```html
<button [disabled]="false">Save</button>
<!-- ✅ enabled: Angular passes the boolean false -->

<button disabled="{{ false }}">Save</button>
<!-- ❌ disabled: Angular passes the string 'false' -->
```

Angular compiles `disabled="{{ false }}"` into a property binding with the **string** `'false'`. Any non-empty string is truthy, so the button gets disabled. The demo shows the real DOM value for both.

**Rule:** interpolation for text, `[property]` for everything else.

## Say it like this

"Property binding uses square brackets to set a DOM property from component data, like `[src]`, `[disabled]` or `[value]`, and the same syntax passes data into a child component's input. Unlike interpolation, it keeps the real type, so a boolean stays a boolean. That's the classic trap: `disabled=\"{{ false }}\"` passes the string 'false', which is truthy, so the button still gets disabled. So we use interpolation for text and property binding for everything else."
