## Definition

Angular follows a **component-based architecture**. A Component is a combination of a **Class** (business logic), a **Template** (HTML view), **Styles** (CSS) and a **Decorator** (metadata), controlling a portion of the UI.

## Example

```ts
// user-card.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-card', // custom HTML tag
  templateUrl: './user-card.html', // view
  styleUrl: './user-card.css', // styles
})
export class UserCard {
  name = signal('Pratik'); // logic / data
}
```

```html
<!-- user-card.html -->
<h3>Hello {{ name() }}</h3>
```

```ts
// app.ts: using it inside another component
@Component({
  selector: 'app-root',
  imports: [UserCard], // standalone → just import it
  template: `<app-user-card />`,
})
export class App {}
```

- **Root component** (`App`) = the starting component; **feature components** = one per task (header, product card, cart…).
- A page = a **tree of components**, each owning its own small piece of UI. Turn on **X-ray** in the demo to see the tree.

## Anatomy: class + template + styles + metadata

| Part     | File (v20+)                | Job                                             |
| -------- | -------------------------- | ----------------------------------------------- |
| Class    | `user-card.ts`             | Data & logic                                    |
| Template | `user-card.html`           | HTML + Angular syntax (bindings, `@if`, `@for`) |
| Styles   | `user-card.css`            | Look & feel, scoped to this component           |
| Metadata | Inside `@Component({...})` | Tells Angular how to create & render the class  |
| Test     | `user-card.spec.ts`        | Unit tests                                      |

**Inline option:** for small components, `template` and `styles` can live inside the `.ts` file (the demo's `shop-header.ts` does this).

```ts
@Component({
  selector: 'app-badge',
  template: `<span class="badge">New</span>`,
  styles: `
    .badge {
      color: white;
      background: green;
    }
  `,
})
export class Badge {}
```

## Generating components

```bash
ng g c features/user-card            # folder with .ts, .html, .css, .spec.ts
ng g c shared/badge -t -s            # inline template (-t) & styles (-s)
ng g c shared/badge --skip-tests     # no .spec.ts file
ng g c shared/badge --flat           # no new folder
ng g c shared/badge --dry-run        # preview only
```

Older projects (v19 and below) generate `user-card.component.ts` with class `UserCardComponent`.

## Say it like this

"Angular follows a component-based architecture, so we build the UI as a tree of small, reusable components. Each component has four parts: a class for the data and logic, a template for the HTML, styles for the CSS, and the `@Component` decorator whose metadata, like the selector, puts it all together. Then we use that selector as a custom HTML tag, like `<app-user-card />`, anywhere we need it. We create them with `ng g c`, and for small components we can even write the template and styles inline in the same TypeScript file."
