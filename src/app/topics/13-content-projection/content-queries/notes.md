## Definition

A **content query** (`contentChild()`, `contentChildren()`, or the old `@ContentChild` / `@ContentChildren`) finds elements, [[directive|directives]] or [[component|components]] in the content **projected from outside via `<ng-content>`**: what the parent put between our tags.

## Example

```ts
@Component({
  selector: 'app-tabs',
  template: `
    @for (tab of tabs(); track tab) {
      <button (click)="chosen.set(tab)">{{ tab.label() }}</button>
    }
    <ng-content />
  `,
})
export class Tabs {
  protected readonly tabs = contentChildren(Tab);
  // ...
}
```

```html
<app-tabs>
  <app-tab label="Edward">Fullmetal Alchemist.</app-tab>
  <app-tab label="Erza">Titania of Fairy Tail.</app-tab>
</app-tabs>
```

## Key points

- **Classic use:** a component that reads its children to build itself. Tabs build their header, an accordion its panels, a select its options.
- **`descendants` decides how deep it looks.** Measured: Sakura's tab is wrapped in a `<div>`.

  | Query                                         | Tabs found   |
  | --------------------------------------------- | ------------ |
  | `contentChildren(Tab)`                        | 2, no Sakura |
  | `contentChildren(Tab, { descendants: true })` | 3            |

- **The defaults differ:** `contentChildren()` and `@ContentChildren` look at **direct children only** (`descendants: false`). `contentChild()` and `@ContentChild` look at **all levels** (`descendants: true`).
- **It follows changes.** "Add a tab" adds an `<app-tab>` in the parent's `@for`, and the header updates by itself, because the query is a [[signal|signal]].
- **It sees only [[content-projection|projected content]],** never the component's own [[template|template]]. View queries do the opposite.
- **Ready:** the old [[decorator|decorators]] from `ngAfterContentInit` (see [Content hooks vs view hooks](/lifecycle-hooks/content-vs-view)). Signal queries whenever they are read.
- Each `Tab` knows whether it is active by injecting its `Tabs` parent. A projected component can inject the component it sits in, because DI follows where it is written in the parent's template.

## Say it like this

"A content query, contentChild or contentChildren, finds things in the content projected into my component, what the parent put between my tags. A tabs component uses contentChildren to find its tab children and build the header. By default contentChildren only looks at direct children, so a tab wrapped in a div is missed unless I set descendants to true, while contentChild searches all levels. The signal versions update automatically when the parent adds or removes content."
