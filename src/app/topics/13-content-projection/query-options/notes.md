## Definition

**Query options** change **what** a query returns and **how** it searches: `read` picks what to return from the matched element, `descendants` sets how deep a [[content-query|content query]] looks, and `static` ([[decorator|decorators]] only) resolves a query before [[change-detection|change detection]]. **`.required`** makes a [[signal|signal]] query throw instead of returning `undefined`.

## Example

```ts
export class QueryOptionsDemo {
  private readonly asElement = viewChild.required<ElementRef<HTMLElement>>('target');
  private readonly asDirective = viewChild.required('target', { read: Tint });
  private readonly asContainer = viewChild.required('target', { read: ViewContainerRef });
  private readonly greeting = viewChild.required<TemplateRef<{ $implicit: string }>>('greeting');

  stamp() {
    this.asContainer().createEmbeddedView(this.greeting(), { $implicit: 'Hinata' });
  }
}
```

```html
<span #target appTint>Hinata Hyuga</span>
<ng-template #greeting let-name>Hello {{ name }}!</ng-template>
```

## Key points

- **Measured: what each query returned**

  | Query                                             | Returns                                    |
  | ------------------------------------------------- | ------------------------------------------ |
  | `viewChild('target')` on an element               | [[element-ref\|`ElementRef`]]              |
  | `viewChild('target', { read: Tint })`             | The `Tint` directive                       |
  | `viewChild('target', { read: ViewContainerRef })` | [[view-container-ref\|`ViewContainerRef`]] |
  | `viewChild('badge')` on a component               | The component instance                     |
  | `viewChild('badge', { read: ElementRef })`        | The component's host element               |
  | `viewChild('greeting')` on `<ng-template>`        | [[template-ref\|`TemplateRef`]]            |
  | `viewChild.required('nothing')`                   | **NG0951**                                 |
  | `.required` read in the constructor               | **NG0951**                                 |

- **Without `read`**, a query returns the "main thing" at that spot: the [[component|component]] on a component, the `TemplateRef` on an [[ng-template|`<ng-template>`]], the `ElementRef` on a plain element.
- **`read: ViewContainerRef` with a `TemplateRef`** is the pair that [[structural-directive|structural directives]] use. "Stamp the [[template|template]]" inserts a new view right after the `<span>` each time.
- **[[ssr|SSR]]:** inserting views through a queried `ViewContainerRef` on a page the server rendered failed to hydrate in this demo. The component uses `host: { ngSkipHydration: 'true' }` so the browser renders it fresh.
- **`.required`** gives a non-null type, and throws **NG0951** when there is no result: nothing matches, or it is read before the view exists.
- **`static: true`** exists only on `@ViewChild` / `@ContentChild`, to read an element outside `@if` / `@for` already in `ngOnInit`. Signal queries reject it with the type error **TS2769**: they don't need it, because they look for the element whenever they are read.
- **`descendants`** is for content queries (see the previous lesson).

## Say it like this

"Queries take options. read chooses what I get back from the matched element: the ElementRef, a directive on it, a ViewContainerRef, or a TemplateRef. Without read, I get the component, the TemplateRef or the ElementRef, depending on what is there. required removes undefined from the type and throws NG0951 if nothing is found. static is only for the old decorators, to resolve a query before ngOnInit. Signal queries don't have it, because they resolve whenever they are read. And descendants controls how deep a content query looks."
