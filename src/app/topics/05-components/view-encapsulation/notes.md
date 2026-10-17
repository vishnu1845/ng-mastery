## Definition

**View encapsulation** decides **whether a component's styles stay inside that component or leak out** to the rest of the app.

## The modes

| Mode                  | How it works                                                                       | Styles leak out?                           |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------ |
| `Emulated` ✅ default | Angular adds unique attributes like `_ngcontent-xyz` to elements and CSS selectors | No                                         |
| `None`                | Styles are added globally                                                          | Yes, affects the whole app                 |
| `ShadowDom`           | Uses the browser's real Shadow DOM                                                 | No (and global styles can't get in either) |

There's also `ExperimentalIsolatedShadowDom` (experimental since v21), a stricter Shadow DOM mode. We won't use it in real projects yet.

## Example

```ts
@Component({
  selector: 'app-alert',
  template: `<p class="msg">Saved!</p>`,
  styles: `
    .msg {
      color: green;
    }
  `,
  encapsulation: ViewEncapsulation.Emulated, // default, usually omitted
})
export class Alert {}

// What the browser actually gets (Emulated):
// <p _ngcontent-ng-c123 class="msg">Saved!</p>
// .msg[_ngcontent-ng-c123] { color: green; }
```

The demo reads the **real** attribute and the **real** rewritten CSS from this page.

## Say it like this

"By default, Angular uses Emulated encapsulation. It adds a unique attribute to the component's elements and rewrites the CSS selectors, so a `.msg` style in one component never affects `.msg` in another. With `None`, the styles become global, and with `ShadowDom`, Angular uses the browser's native Shadow DOM for full isolation."
