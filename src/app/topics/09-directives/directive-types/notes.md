## Definition

**Directives** are responsible for **adding or removing elements from the [[dom|DOM]]** as well as **changing the behavior of the DOM**.

A directive is a class with the `@Directive` [[decorator|decorator]]. Angular attaches it to an element in a [[template|template]].

## The three types

| Type           | Job                                                           | Examples                                      |
| -------------- | ------------------------------------------------------------- | --------------------------------------------- |
| **Component**  | A directive **with a template**. Controls a section of the UI | `<app-root>`, `<app-initials>`                |
| **Structural** | **Adds or removes** elements                                  | `*ngIf`, `*ngFor`, a custom `*appHasRole`     |
| **Attribute**  | Changes the **look or behavior** of an existing element       | `ngClass`, `ngStyle`, `ngModel`, a custom one |

## Example

<!-- prettier-ignore -->
```html
<!-- Component: renders its own template inside its tag -->
<app-initials [name]="name()" />

<!-- Attribute directive: changes the element it sits on -->
<span [appTint]="tint()">Angular 22 course</span>

<!-- Structural directive: adds or removes its element -->
<button *appUnless="soldOut()">Enroll</button>
```

## Key points

- **Component vs directive:** a [[component|component]] is a special type of directive that has its **own template**. A plain directive has no template. It works on an element that already exists, called its **host**.
- An element can have **many directives**, but only **one component**.
- **`@if`, `@for` and `@switch` are not directives.** They are built into the template syntax, and they replaced the [[structural-directive|structural directives]] `*ngIf`, `*ngFor` and `ngSwitch`. We still write our own structural directives.
- We have used directives already: `routerLink` and `ngModel` are [[attribute-directive|attribute directives]].
- A directive only works when it is in the component's `imports`. The compiler reacts differently to a forgotten import:

| Written as                   | Forgotten import gives                  |
| ---------------------------- | --------------------------------------- |
| `<p appHighlight>`           | **Nothing.** No error, and no highlight |
| `<p [appHighlight]="color">` | Build error **NG8002**                  |
| `<p *appHasRole="'admin'">`  | Build warning **NG8116**                |

- Directives are standalone by default. `ng generate directive highlight` creates `highlight.ts`.

## Say it like this

"A directive is a class that adds behavior to an element in the template. There are three types. A component is a directive with its own template. A structural directive adds or removes elements, like the old `*ngIf` and `*ngFor`. And an attribute directive changes the look or behavior of an existing element, like `ngClass` or `ngModel`. In modern Angular, the built-in `@if` and `@for` blocks replaced the structural ones, but we still write custom directives for reusable behavior."
