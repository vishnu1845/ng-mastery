## Definition

**Multi-slot projection** uses several `<ng-content>` tags, each with a **`select`** attribute (a CSS [[selector|selector]]), so different parts of the [[content-projection|projected content]] land in different places. Content that matches no `select` goes to the `<ng-content>` without one, the **default slot**.

## Example

```html
<!-- panel template -->
<header><ng-content select="[panel-title]" /></header>
<div><ng-content /></div>
<footer><ng-content select="button, .actions" /></footer>
```

```html
<!-- parent -->
<app-panel>
  <h3 panel-title>Mikasa Ackerman</h3>
  <p>Survey Corps, best in her class.</p>
  <button>Follow</button>
</app-panel>
```

## Key points

- **`select` takes simple CSS selectors:** an element (`h3`), an attribute (`[panel-title]`), a class (`.actions`), or several separated by commas.
- **Only top-level nodes are matched.** Measured: `<span panel-title>` wrapped in a `<div>` did not go to the title slot. The whole `<div>` went to the default slot, because the `<div>` is what was projected.
- **No default slot, nothing for the rest.** The strict panel has no plain `<ng-content>`, so the paragraph and the plain text did not appear at all. They were still created, as in the first lesson.
- **Projected content keeps the parent's styles.** The panel's CSS has a rule `p { color: red }`, and the projected paragraph is not red. With emulated encapsulation, a [[component|component]]'s CSS reaches only elements from its own [[template|template]].
- Use an attribute like `panel-title` as the selector. It documents the slot better than a tag name, and any element can carry it.

## Say it like this

"Multi-slot projection means several ng-content tags, each with a select attribute that takes a CSS selector, like an attribute or a class. Each piece of content goes to the first slot it matches, and anything else goes to the ng-content without a select, the default slot. If there is no default slot, unmatched content is not shown. Only top-level nodes are matched, so an element wrapped in a div doesn't reach its slot, and for grouping I use ngProjectAs."
