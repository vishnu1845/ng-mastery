## Definition

**`afterNextRender()`** runs a callback **once**, after Angular next finishes rendering the app. **`afterEveryRender()`** runs it after **every** render. They are the place for [[dom|DOM]] work: measuring, focusing, starting a third-party [[library|library]]. Both run **only in the browser**, never during [[ssr|SSR]], which makes them SSR-safe.

## Example

```ts
export class SearchBox {
  private readonly box = viewChild.required<ElementRef<HTMLInputElement>>('box');

  constructor() {
    afterNextRender({
      write: () => this.box().nativeElement.focus(),
      read: () => console.log(this.box().nativeElement.offsetWidth),
    });
  }
}
```

## Key points

- **Measured in the demo:** while the page was [[prerendering|prerendered]], the server ran the constructor, `ngOnInit` and `ngAfterViewInit`, and **never** the two render hooks. The browser ran all five, in this order: constructor, `ngOnInit`, `ngAfterViewInit`, then `afterNextRender`, then `afterEveryRender`.
- **After all view hooks.** A render hook waits until the whole app has rendered, so it runs after every [[component|component]]'s `ngAfterViewInit`.
- **The whole app, not one component.** "Render something else" changes a different component, and the list's `afterEveryRender` runs again anyway. A render that changes nothing on the page skips the render hooks.
- **Phases**, to avoid layout thrashing: `earlyRead` → `write` → `mixedReadWrite` → `read`. Each phase gets the value the previous one returned. A plain callback runs in `mixedReadWrite`.
- **Don't set a [[signal|signal]] in `afterEveryRender`.** It renders again, which calls the hook again, forever. The list demo writes its result straight into the DOM for that reason.
- **Injection context:** call them in the constructor or a field initializer. Elsewhere, pass `{ injector }`, as the DestroyRef demo does. They return an `AfterRenderRef` with `destroy()`.
- `afterRender()` was renamed `afterEveryRender()` in v20, and the old name is gone in v22.
- **`afterRenderEffect()`** is the [[effect|`effect()`]] version: it runs in these phases and again whenever a signal it read changes.

## Say it like this

"afterNextRender runs a callback once, after Angular next renders the app, and afterEveryRender runs it after every render. They are for DOM work like focusing an input, measuring an element or initializing a chart. They run only in the browser, never on the server, so they are SSR-safe, unlike ngAfterViewInit, which also runs during server rendering. They run after all the view hooks, and they have phases, earlyRead, write, mixedReadWrite and read, so reads and writes don't fight. I register them in the constructor, and I never set a signal inside afterEveryRender, because that would loop."
