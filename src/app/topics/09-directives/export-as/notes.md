## Definition

`exportAs` gives a [[directive|directive]] a **name for template references**. With `#ref="name"`, the reference points at the **directive instance** instead of the [[dom|DOM]] element.

## Example

```ts
@Directive({
  selector: '[appCollapse]',
  exportAs: 'appCollapse',
  host: { '[hidden]': '!open()' },
})
export class Collapse {
  readonly open = signal(false);

  toggle() {
    this.open.update((open) => !open);
  }
}
```

```html
<button (click)="panel.toggle()">{{ panel.open() ? 'Hide' : 'Show' }}</button>
<p appCollapse #panel="appCollapse">The answer</p>
```

## Key points

| Reference                             | Points at                               |
| ------------------------------------- | --------------------------------------- |
| `#box` on an element                  | The DOM element                         |
| `#card` on a [[component\|component]] | The component instance                  |
| `#panel="appCollapse"`                | The directive with that `exportAs` name |

- The demo puts both kinds on **one input**: `#box` reads `tagName` from the element, and `#state="ngModel"` reads `valid`, `touched` and `errors` from the directive.
- **Built-in names we already use:** `ngModel` and `ngForm` in forms, and `routerLinkActive` in the router.
- A name that no directive exports is the build error **NG8003**.
- Only **public** members can be used through the reference. Calling a `protected` method from another component's [[template|template]] fails with **TS2445**.
- A reference is visible in its own template block. Inside `@for`, every row gets its own `#panel`.
- **In the class,** we reach the same instances with `viewChild(Collapse)` or `viewChildren(Collapse)`. The demo's "Open all" button does that.

## Say it like this

"By default, a template reference like `#box` gives the DOM element. With `exportAs`, a directive publishes a name, and then `#panel="appCollapse"` gives the directive instance, so the template can call its methods and read its state. The best-known example is `#email="ngModel"`, where we read `valid` and `touched` from the `NgModel` directive. In the class, I get the same instance with `viewChild`."
