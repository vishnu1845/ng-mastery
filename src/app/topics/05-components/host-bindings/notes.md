## Definition

The **host element** is the **component's own tag** in the [[dom|DOM]] (like `<app-toggle>`). **Host bindings** let us add attributes, classes, styles and event listeners **to that tag** from inside the component.

## Example

```ts
@Component({
  selector: 'app-toggle',
  template: `{{ on() ? 'ON' : 'OFF' }}`,
  host: {
    role: 'button', // static attribute
    '[class.active]': 'on()', // class binding
    '(click)': 'toggle()', // event listener
  },
})
export class Toggle {
  on = signal(false);
  toggle() {
    this.on.update((value) => !value);
  }
}

// Rendered: <app-toggle role="button" class="active">ON</app-toggle>

// OLDER WAY (same result)
// @HostBinding('class.active') get active() { return this.on(); }
// @HostListener('click') toggle() { ... }
```

## Key points

- **Recommended:** the `host` property over `@HostBinding` / `@HostListener` (Angular style guide).
- The demo's switch also binds `aria-checked`, `tabindex` and keyboard keys, so it works with a keyboard and screen readers. Watch its real host HTML change as you use it.

## Say it like this

"The host element is the component's own tag in the DOM. Using the `host` property in the metadata, we can add attributes, bind classes and listen to events directly on that tag, like making a toggle clickable and adding an active class. Older code does the same with `@HostBinding` and `@HostListener`, but the `host` property is the recommended way now."

## Rapid-fire (whole topic)

- **Component vs Module?** → A component controls a piece of UI (class + [[template|template]] + metadata). A module is just a **container** that groups components, pipes, [[directive|directives]] and [[service|services]]. Standalone components removed the need for modules.
- **What is metadata?** → The configuration object inside a [[decorator|decorator]], like `selector`, `templateUrl` and `styleUrl` in `@Component`.
- **`@Component` vs `@Directive`?** → A component has a **template** and creates UI; a directive has **no template** and only adds behaviour. A component is a directive with a view.
- **Default view encapsulation?** → `Emulated`
- **Width/padding not working on my component?** → Add `:host { display: block; }`
- **Can a component have no template?** → No, it needs `template` or `templateUrl`
- **`styleUrl` vs `styleUrls`?** → `styleUrl` (v17+) takes one file; `styleUrls` takes an array (older style)
