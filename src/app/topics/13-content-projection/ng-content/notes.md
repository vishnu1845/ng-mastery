## Definition

**[[content-projection|Content projection]]** is passing HTML from a parent [[component|component]] into a child component. The child marks the place where it appears with **`<ng-content>`**.

## Example

```ts
@Component({
  selector: 'app-info-card',
  template: `
    <div class="body">
      <ng-content>Nothing was passed in.</ng-content>
    </div>
  `,
})
export class InfoCard {}
```

```html
<!-- parent -->
<app-info-card>
  <p>Hello {{ name() }}</p>
  <button (click)="like()">Like</button>
</app-info-card>
```

## Key points

- **The parent owns the projected content.** Its bindings and events use the parent's data: in the demo, the Like button sits inside the card, but the click changes the parent's count. The card only decides **where** it appears.
- **Styles come from the parent too.** A rule in the child's CSS does not reach a projected element (the multi-slot lesson checks this).
- **Fallback content** (Angular 18+): what is written inside `<ng-content>…</ng-content>` shows when the parent passes nothing. Measured: only whitespace or only a comment also counts as nothing.
- **Hiding `<ng-content>` does not stop the content being created.** The demo's chart sits inside an `@if` that starts closed, yet it was **created once on page load**, and opening and closing never destroyed it. The parent creates projected content whether the child shows it or not, so its constructor and `ngOnInit` run anyway. To create content lazily, pass a [[template|template]] instead (see [ng-content vs ngTemplateOutlet](/content-projection/template-outlet)).
- **One piece of content, one place.** `<ng-content>` inside `@for` shows the content only once, in the **last** row. Repeating content needs a template.
- `<ng-content>` is not a real element and creates nothing in the [[dom|DOM]]. It takes no bindings, only `select` (see the next lesson).

## Say it like this

"Content projection lets a parent pass HTML into a child component, and the child decides where it appears with ng-content. It's how we build reusable wrappers like cards, dialogs and layouts. The projected content still belongs to the parent: its bindings, events and styles all come from the parent. Two things to remember: the parent creates the content even if the child hides its ng-content behind an @if, and ng-content can't repeat content. For lazy or repeated content, I pass an ng-template and stamp it with ngTemplateOutlet."
