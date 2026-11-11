## Definition

A **structural directive** changes the **[[dom|DOM]] layout**: it adds or removes elements.

A custom one injects two things: **`TemplateRef`**, the content to render, and **`ViewContainerRef`**, the place in the DOM to render it. The directive decides when to stamp the [[template|template]].

## Example

```ts
@Directive({ selector: '[appHasRole]' })
export class HasRole {
  private readonly template = inject(TemplateRef);
  private readonly container = inject(ViewContainerRef);
  private readonly session = inject(Session);

  readonly roles = input.required<Role | Role[]>({ alias: 'appHasRole' });

  constructor() {
    effect(() => {
      const allowed = [this.roles()].flat().includes(this.session.role());

      this.container.clear();
      if (allowed) this.container.createEmbeddedView(this.template);
    });
  }
}
```

```html
<button *appHasRole="'admin'">Delete report</button>
<button *appHasRole="['editor', 'admin']">Edit report</button>
```

## Key points

- **The `*` is a shortcut.** `<button *appHasRole="'admin'">` means `<ng-template [appHasRole]="'admin'"><button>…</button></ng-template>`. That wrapper is the `TemplateRef` we inject. The demo's last button is written in the long form and behaves the same.
- **Two methods do the work:** `container.createEmbeddedView(template)` adds the element, and `container.clear()` removes it. The element is really gone from the DOM, as the live HTML shows.
- **Extra words become inputs.** In `*appHasRole="'admin'; else locked"`, the word `else` fills an input named `appHasRoleElse`: the [[selector|selector]] plus the word.
- **Passing data to the template:** `createEmbeddedView(template, { $implicit: value })`, read with `let-item` on the template.
- Only **one** structural directive can sit on an element (**NG5002**).
- A forgotten import gives the build warning **NG8116**.
- With [[signal|signal]] inputs and an `effect`, the directive reacts to changes by itself. Older code does the same with a setter on an `@Input()`.
- **This is not security.** Hiding a button only cleans up the UI. The server must still check the role on every request.
- **Structural directive vs `[hidden]`:** this removes the element, while `[hidden]` keeps it in the DOM and only hides it.

## Say it like this

"A structural directive adds or removes elements. To write one, I inject `TemplateRef`, which is the element wrapped as a template, and `ViewContainerRef`, which is the place where it can be rendered. Then I call `createEmbeddedView` to show it and `clear` to remove it. The star in `*appHasRole` is sugar for wrapping the element in an `ng-template`. A typical use is a role directive that shows a button only to admins, but that is only for the UI, the server still has to check permissions."
