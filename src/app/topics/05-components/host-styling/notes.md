## Definition

`:host` styles the **component's own tag** (`<app-card>`), and `:host(.active)` applies only when the host has that class. `::ng-deep` pushes a style **into child components** and is ⚠️ **deprecated**, so we avoid it.

## Example

```scss
/* card.css */
:host {
  display: block; /* custom tags are inline by default */
  padding: 16px;
}
:host(.active) {
  border: 2px solid blue;
}

/* deprecated: styles leak into every child component */
:host ::ng-deep .mat-mdc-button {
  border-radius: 0;
}
```

## Better than ::ng-deep

CSS custom properties (variables), a child component input, or global `styles.css`. CSS variables **inherit through component boundaries**, so a parent can theme a child without breaking encapsulation:

```scss
/* parent */
.promo {
  --card-accent: #e11d48;
}

/* child card */
:host {
  border-top: 3px solid var(--card-accent, gray);
}
```

## Say it like this

"`:host` lets us style the component's own tag. A classic example is `:host { display: block }`, because custom elements are inline by default, so width and padding don't behave as expected. `::ng-deep` breaks encapsulation to style child components, but it's deprecated, so instead we prefer CSS variables, inputs, or global styles."
