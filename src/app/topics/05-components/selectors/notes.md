## Definition

A component's **selector** tells Angular **where to create it**: wherever a template has a matching **element**, **attribute** or **class**.

## Selector types

| Type                     | Selector      | Used as                        |
| ------------------------ | ------------- | ------------------------------ |
| Element ✅ (most common) | `'app-user'`  | `<app-user />`                 |
| Attribute                | `'[appUser]'` | `<div appUser></div>`          |
| Class                    | `'.app-user'` | `<div class="app-user"></div>` |

## Example

```ts
// ATTRIBUTE SELECTOR: keeps the native <button> (keyboard, form submit, a11y)
@Component({
  selector: 'button[appPrimary]',
  template: `<ng-content />`,
})
export class PrimaryButton {}
```

```html
<button appPrimary type="submit">Save</button>
```

## Key points

- Always **prefix** selectors (`app-`, `shop-`) to avoid clashes with real HTML tags.
- Self-closing tags like `<app-user />` work for components.
- In the demo, press **Enter** in the input: the attribute-selector button still submits the form, because it's a real `<button>`.

## Say it like this

"A selector can be an element, an attribute or a class. Most of the time we use element selectors like `app-user` with a prefix. But attribute selectors are really useful when we want to enhance a native element, like `button[appPrimary]`, because we keep all the built-in button behaviour, like keyboard support and form submit. That's exactly how Angular Material builds its buttons."
