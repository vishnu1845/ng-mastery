## Definition

**Content hooks** (`ngAfterContentInit`, `ngAfterContentChecked`) deal with **[[content-projection|projected content]]**: the HTML passed from the parent into our [[component|component]] through `<ng-content>`. `ngAfterContentInit` fires **once** when that content is ready, and it is where `@ContentChild` queries become available.

**View hooks** (`ngAfterViewInit`, `ngAfterViewChecked`) deal with **our own [[template|template]]** and its child components. `ngAfterViewInit` fires **once** when the view is fully rendered, and it is where `@ViewChild` queries become available.

## Example

```ts
@Component({
  selector: 'app-card-panel',
  template: `
    <ng-content />
    <p #own>Card's own template</p>
  `,
})
export class CardPanel implements AfterContentInit, AfterViewInit {
  @ContentChild('projected') projected?: ElementRef; // from the parent
  @ViewChild('own') own?: ElementRef; // from our template

  ngAfterContentInit() {
    console.log(this.projected); // ready
  }

  ngAfterViewInit() {
    console.log(this.own); // ready
  }
}
```

```html
<app-card-panel>
  <p #projected>Projected by the parent</p>
</app-card-panel>
```

## Key points

- **Measured in the demo:**

  | Query            | constructor | `ngOnInit` | `ngAfterContentInit` | `ngAfterViewInit` |
  | ---------------- | ----------- | ---------- | -------------------- | ----------------- |
  | `@ContentChild`  | –           | –          | **found**            | found             |
  | `@ViewChild`     | –           | –          | –                    | **found**         |
  | `contentChild()` | –           | found      | found                | found             |
  | `viewChild()`    | –           | found      | found                | found             |

- **Content first, then view.** That is also the order the hooks run.
- **Signal queries are not tied to these hooks.** They look for the element when read, so an element written straight in the template is found already in `ngOnInit`. An element inside `@if` or `@for` is found only after the view is rendered (see [viewChild()](/component-communication/view-child)).
- **The trap: changing a bound value in `ngAfterViewInit`.** The view was already rendered with the old value.
  - **Plain property:** the demo keeps showing "set in the class". The new value appears only when something checks that component again, like the click inside the box.
  - **[[signal|Signal]]:** Angular is told about the change and renders again. No problem.
  - **The error:** with the old `ChangeDetectionStrategy.Eager` (called `Default` before), development mode throws **NG0100** `ExpressionChangedAfterItHasBeenCheckedError`. With [[onpush|OnPush]], the default in Angular 22, that check skips the component, so there is no error, only a stale screen. `provideCheckNoChangesConfig({ exhaustive: true })` turns the check on for OnPush components too.
- `ngAfterViewInit` is the classic place for [[dom|DOM]] work like focusing an input or starting a chart [[library|library]]. In modern code, `afterNextRender()` does that job (see the render hooks lesson).

## Say it like this

"Content hooks are about the HTML projected into my component through ng-content, and ngAfterContentInit is where ContentChild becomes available. View hooks are about my own template and child components, and ngAfterViewInit is where ViewChild becomes available. Content is initialized before the view. One trap: changing a bound value in ngAfterViewInit. With the old default strategy, that throws ExpressionChangedAfterItHasBeenChecked in dev mode. With OnPush it's worse: no error, just a stale screen. If I need to change state there, I use a signal."
