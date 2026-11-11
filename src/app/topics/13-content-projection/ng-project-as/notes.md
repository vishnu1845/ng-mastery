## Definition

**`ngProjectAs`** makes a piece of [[content-projection|projected content]] match a slot's `select` **as if it were a different element**. It is used mostly on [[ng-container|`<ng-container>`]], which has no tag or attributes of its own that a [[selector|selector]] could match.

## Example

```html
<app-panel>
  <ng-container ngProjectAs="[panel-title]">
    <h3>Levi Ackerman</h3>
    <small>Captain</small>
  </ng-container>
  <p>Humanity's strongest soldier.</p>
</app-panel>
```

## Key points

- **Measured in the demo:**

  | Content                                     | Lands in     |
  | ------------------------------------------- | ------------ |
  | `<ng-container>` around the title and rank  | Default slot |
  | The same with `ngProjectAs="[panel-title]"` | Title slot   |
  | `@if` whose only root is `<h3 panel-title>` | Title slot   |

- **Why grouping needs it:** `select` matches top-level nodes. A plain `<ng-container>` matches nothing, so its children go to the default slot together.
- **`@if` and `@for` at the top level** are matched by their single root element. With **two or more** root nodes, the block goes to the default slot, and the build warns with **NG8011**. The fix is to wrap the block's content in an `<ng-container ngProjectAs="…">`.
- `ngProjectAs` is a plain string read at compile time, not a binding.
- It works on any element, for example a [[component|component]] that should fill a slot: `<app-avatar ngProjectAs="[panel-title]" />`.

## Say it like this

"ngProjectAs lets content match an ng-content select as if it were a different element. I use it mainly on ng-container, when I want to send several elements into one named slot, because a plain ng-container matches no selector and its children would end up in the default slot. It also fixes the case where an @if with several root nodes should go to a named slot, which Angular warns about with NG8011."
