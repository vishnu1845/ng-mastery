## Definition

A **custom directive** is created by developers for **reusable behavior not covered by the built-ins**.

A custom **attribute directive** is a class with `@Directive` and a [[selector|selector]] in square brackets. We add it to an element like an attribute.

## Example

```ts
@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.background-color]': 'active() ? color() : null',
    '(pointerenter)': 'active.set(true)',
    '(pointerleave)': 'active.set(false)',
  },
})
export class Highlight {
  readonly color = input('gold', {
    alias: 'appHighlight',
    transform: (value: string) => value || 'gold',
  });
  protected readonly active = signal(false);
}
```

```html
<p appHighlight>Uses the default colour</p>
<p [appHighlight]="'aqua'">Uses aqua</p>
<button [appHighlight]="color()">Works on any element</button>
```

## Key points

- **Selector:** `[appHighlight]` matches any element with that attribute. The `app` prefix keeps it from clashing with real [[html-attribute|HTML attributes]].
- **Inputs** work like in a [[component|component]]: `input()`, `input.required()`, `alias` and `transform`.
- **Alias equal to the selector:** one attribute both applies the directive and passes its value, as in `[appHighlight]="'aqua'"`.
- **Gotcha:** the bare attribute `<p appHighlight>` passes an **empty string**, not the default value. That is why the directive needs the `transform`, which puts the default back.
- **Prefer host bindings.** This directive never touches the [[dom|DOM]] itself. Angular updates the style, and it works the same on the server.
- **When we do need the element,** we inject [[element-ref|`ElementRef`]]. It is an Angular [[service|service]] that wraps the actual DOM element, and `nativeElement` is the real HTML element. The autofocus directive in the demo uses it:

```ts
@Directive({ selector: '[appAutoFocus]' })
export class AutoFocus {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => host.focus()); // browser only, after the element is on the page
  }
}
```

- The directive must be in the component's `imports`. A forgotten import on a bare attribute gives **no error at all**.
- Create one with the CLI: `ng generate directive highlight` (short: `ng g d highlight`).
- Older code does the same with `@Input()`, `@HostListener()` and constructor injection.

## Say it like this

"A custom attribute directive is a class with `@Directive` and an attribute selector like `[appHighlight]`. It adds reusable behavior to any element. I bind styles, classes and events through the `host` property, and I make it configurable with `input()`. If I alias the input to the selector name, the same attribute applies the directive and passes the value. When I need the real element, for example to focus it, I inject `ElementRef` and do the work inside `afterNextRender`."
