## Definition

Before v17, conditions and loops were written with **structural directives**: `*ngIf`, `*ngFor` and `ngSwitch`. A structural directive adds or removes elements in the [[dom|DOM]].

They are **deprecated since v20**. The built-in blocks `@if`, `@for` and `@switch` replace them. They still work in v22, and interviewers still ask about them.

## Example

<!-- prettier-ignore -->
```html
<!-- LEGACY -->
<p *ngIf="user; else guest">Hi {{ user.name }}</p>
<ng-template #guest><p>Please log in</p></ng-template>

<li *ngFor="let todo of todos; trackBy: byId; let i = index">{{ i + 1 }}. {{ todo.title }}</li>

<!-- BUILT-IN -->
@if (user) {
  <p>Hi {{ user.name }}</p>
} @else {
  <p>Please log in</p>
}

@for (todo of todos; track todo.id; let i = $index) {
  <li>{{ i + 1 }}. {{ todo.title }}</li>
}
```

## Key points

|                    | Legacy directives                       | Built-in blocks                  |
| ------------------ | --------------------------------------- | -------------------------------- |
| Import             | `NgIf`, `NgFor`… or `CommonModule`      | Nothing                          |
| Else branch        | A separate `<ng-template #name>`        | `@else`                          |
| Tracking           | `trackBy`, optional, needs a method     | `track`, required, an expression |
| Empty list         | An extra `*ngIf`                        | `@empty`                         |
| Two on one element | Not allowed, needs an `<ng-container>`  | Just nest the blocks             |
| Loop variables     | `index`, `first`, `last`, `even`, `odd` | `$index`, `$first`, `$last`…     |

- **The `*` is a shortcut.** `<p *ngIf="show">` means `<ng-template [ngIf]="show"><p>…</p></ng-template>`. That is also why two `*` directives can't sit on one element (**NG5002**).
- **Why `track` became required:** `trackBy` was optional, so most lists forgot it. In the demo, each reload rebuilds all 4 rows of the plain `*ngFor`, and 0 rows of the other two lists.
- **They cost [[bundle|bundle]] size.** The legacy directives are real classes that get shipped. In this app, importing `NgIf`, `NgFor` and `NgSwitch` for this one demo added about 12 kB to the bundle. The built-in blocks compile to instructions that are already in Angular's core.
- Forgot the import? The build warns with **NG8103** and suggests the built-in block.

**Migrating:** one command rewrites the [[template|templates]] and removes the unused imports.

```bash
ng generate @angular/core:control-flow
```

One thing to fix by hand after it: an `*ngFor` that had no `trackBy` becomes `track todo`, which tracks the object and still rebuilds on a refetch. Change it to `track todo.id`.

## Say it like this

"Before Angular 17, we used the structural directives `*ngIf`, `*ngFor` and `ngSwitch`. The star is sugar for wrapping the element in an `ng-template`. They are deprecated since version 20, and the built-in blocks `@if`, `@for` and `@switch` replace them. The new syntax needs no imports, has `@else` and `@empty` built in, and makes `track` mandatory, which was the most common performance mistake with `*ngFor`. To move an old project, we run `ng generate @angular/core:control-flow`, and then review the `track` expressions it generated."
