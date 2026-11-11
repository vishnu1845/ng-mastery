## Definition

**`viewChild()`** is a **pull-based** approach where the parent gets a **direct reference to a single child** [[component|component]] instance, and reads its properties or calls its methods. The child stays passive: it doesn't know the parent exists.

**`viewChildren()`** is the plural. It is used when the parent needs to act on **a whole group of children at once**.

## Example

```ts
export class Quiz {
  private readonly questions = viewChildren(Question);

  protected readonly answered = computed(
    () => this.questions().filter((question) => question.isAnswered()).length,
  );

  resetAll() {
    this.questions().forEach((question) => question.reset());
  }
}
```

```html
@for (text of texts; track text) {
<app-question [text]="text" />
}
<p>Answered {{ answered() }} of 3</p>
```

## Old vs new

```ts
// OLDER
@ViewChild(Question) question!: Question;
@ViewChildren(Question) questions!: QueryList<Question>;
```

|               | `@ViewChild()` / `@ViewChildren()`   | `viewChild()` / `viewChildren()`                                   |
| ------------- | ------------------------------------ | ------------------------------------------------------------------ |
| Returns       | A plain reference / a `QueryList`    | A [[signal\|signal]]: `this.question()`                            |
| Iterate       | `.toArray()`, `.forEach()`           | A normal readonly array                                            |
| Track changes | `QueryList.changes`, an `Observable` | Automatic, in [[computed\|`computed()`]] or [[effect\|`effect()`]] |
| Not null      | Needs `!`                            | `viewChild.required(Question)`                                     |

## When is the child there?

The demo reads every kind of query at each moment:

| Read in           | `@ViewChild` | `@ViewChild` with `static: true` | `viewChild()` | `viewChild()`, child inside `@if` |
| ----------------- | ------------ | -------------------------------- | ------------- | --------------------------------- |
| constructor       | undefined    | undefined                        | undefined     | undefined                         |
| `ngOnInit`        | undefined    | **the child**                    | **the child** | undefined                         |
| `ngAfterViewInit` | the child    | the child                        | the child     | the child                         |

- The old `@ViewChild` is filled only just before `ngAfterViewInit`, unless the query is `static: true`.
- A **[[signal|signal]] query** looks for the child when we read it. A child written straight in the [[template|template]] is already there in `ngOnInit`. A child inside `@if` or `@for` is created later, so it is only there from `ngAfterViewInit`.
- `viewChild.required()` read before its child exists throws **NG0951** _Child query result is required but no value is available_.
- In practice, read queries inside `computed()`, `effect()` or event handlers. Then the timing never matters.
- Never use `QueryList._results`. It is private and can break in any version.

## Common uses

1. **Read state** from a child.
2. **Call methods** on a child: `reset()`, `focus()`.
3. **Aggregate or validate** many children: count answered, enable Submit.
4. **Bulk commands**: reset all, expand all.
5. Reach a **[[dom|DOM]] element**: `viewChild<ElementRef>('box')` to focus an input.

## Say it like this

"`viewChild()` gives the parent a direct reference to one child, so it can read its state or call its methods. It's pull-based, and the child stays passive. `viewChildren()` is the plural, for working with a whole group, like counting answered questions or resetting all of them. The old `@ViewChild` decorators return a plain reference or a `QueryList` that is ready only around `ngAfterViewInit`. The new functions return signals, so they work inside `computed` and update by themselves, and `.required` removes the need for the non-null assertion."
