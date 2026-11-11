## Definition

**`ngTemplateOutlet`** stamps an [[ng-template|`<ng-template>`]] at a place in the view, optionally with a context object. Unlike `<ng-content>`, which shows content the parent already created, **once**, a [[template|template]] is created by the [[component|component]] that stamps it: **when** it wants and **as many times** as it wants.

## Example

```ts
@Component({
  selector: 'app-people-list',
  imports: [NgTemplateOutlet],
  template: `
    @for (person of people(); track person.name; let i = $index) {
      <ng-container
        [ngTemplateOutlet]="row()"
        [ngTemplateOutletContext]="{ $implicit: person, index: i }"
      />
    }
  `,
})
export class PeopleList {
  readonly people = input.required<Person[]>();
  readonly row = input.required<TemplateRef<RowContext>>();
}
```

```html
<ng-template #detailedRow let-person let-i="index">
  <p>#{{ i + 1 }} {{ person.name }}</p>
</ng-template>

<app-people-list [people]="people" [row]="detailedRow" />
```

## Key points

- **Measured in the demo:**

  |                        | `<ng-content>` in `@if`    | Template in `@if`                    |
  | ---------------------- | -------------------------- | ------------------------------------ |
  | Created                | On page load, while closed | When opened                          |
  | Destroyed on close     | Never                      | Yes                                  |
  | Inside `@for` (3 rows) | Shown once, last row       | Stamped 3 times, with the row number |

- **Two ways to pass a template in:** as an input, like the list (`[row]="detailedRow"`), or between the tags, read with `contentChild(TemplateRef)`, like the collapsible and the repeat.
- **Context:** `$implicit` fills `let-person`, and other keys are named: `let-i="index"`.
- **The context is not type-checked.** `let-` variables from an outlet are `any`, so `person.nope` compiles. `TemplateRef<RowContext>` documents the shape, but the template itself does not check it.
- **Which one to use:**
  - `<ng-content>`: content that is always shown once, like a card body or a dialog's text.
  - A template: content that is lazy (tabs, accordions), repeated (list rows, table cells) or needs data from the child (the row's item and index).

## Say it like this

"ng-content shows content the parent has already created, once. ngTemplateOutlet stamps an ng-template, and the child decides when to create it and how many times, and can pass it data through a context. So if I hide ng-content with an @if, the content is still created, while a template is created only when shown and destroyed when hidden. For lazy or repeated content, like tabs or list rows, I accept a TemplateRef as an input or with contentChild and stamp it with ngTemplateOutlet."
