## Definition

`<ng-template>` holds a piece of [[template|template]] that Angular **does not render by itself**. It appears only when something stamps it, like `ngTemplateOutlet`.

`<ng-container>` is a **grouping tag that creates no [[dom|DOM]] element**. Only what is inside it is rendered.

## Example

```html
<!-- defined once, renders nothing -->
<ng-template #card let-name let-talk="talk">
  <article>
    <strong>{{ name }}</strong>
    {{ talk }}
  </article>
</ng-template>

<!-- stamped here, with data -->
<ng-container
  [ngTemplateOutlet]="card"
  [ngTemplateOutletContext]="{ $implicit: 'Asha', talk: 'Signals in practice' }"
/>
```

## Key points

- **Passing data:** the outlet's context is an object. `let-name` reads its `$implicit` key, and `let-talk="talk"` reads the key named `talk`.
- The outlet renders the template **next to its host, as a sibling**, not inside it. That is why the host matters:
  - Host on `<ng-container>`: the DOM gets only the stamped content.
  - Host on `<div>`: every stamp also leaves an empty `<div></div>` behind. In the demo's grid, each one takes a whole cell.
- In the real DOM, an `<ng-container>` is only a comment: `<!--ng-container-->` in dev mode and `<!---->` in production. The demo shows the production one.
- With built-in control flow, we no longer need them for conditions and loops. `@if` / `@else` replaced `<ng-template #elseBlock>`, and blocks need no wrapper element.
- We still use `<ng-template>` for **reusable pieces of a template** and for **passing a template into a [[component|component]]**, like a custom row for a table.
- `NgTemplateOutlet` must be imported from `@angular/common`.

| Tag              | What it does                                                                   |
| ---------------- | ------------------------------------------------------------------------------ |
| `<ng-template>`  | Defines a template. Renders nothing until stamped                              |
| `<ng-container>` | Groups content or hosts a [[directive\|directive]], with no element in the DOM |
| `<ng-content>`   | Shows content that the **parent** passed into our component                    |

## Say it like this

"`ng-template` defines a chunk of template that is not rendered until we stamp it, for example with `ngTemplateOutlet`, and we can pass data to it through the outlet context. `ng-container` is a grouping element that leaves no element in the DOM, only a comment, so it is the right host for a directive when we don't want an extra `div`. With the new control flow we rarely need them for conditions and loops, but we still use them for reusable template pieces and for passing templates into components."
