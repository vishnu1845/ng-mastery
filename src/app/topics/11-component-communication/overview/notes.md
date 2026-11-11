## Definition

Sending or sharing data from one [[component|component]] to another component is called **Inter-Component Communication**.

There are two broad categories, based on how the components are related:

1. **Parent-child relationship:** [[input|`input()`]], [[output|`output()`]], [[model|`model()`]], a template reference, [[view-child|`viewChild()`]] and `viewChildren()`.
2. **No parent-child relationship** (siblings or unrelated components): a shared [[service|service]], the router, RxJS subjects, a [[signal|signal]] store, browser storage, or NgRx.

## Every way, in one table

| Need                                                            | Use                                                    | Direction      | Push or pull         |
| --------------------------------------------------------------- | ------------------------------------------------------ | -------------- | -------------------- |
| Send data down to a child                                       | `input()`                                              | Parent → child | Push from the parent |
| Tell the parent something happened                              | `output()`                                             | Child → parent | Push from the child  |
| Keep one value in sync                                          | `model()` with `[( )]`                                 | Both ways      | Push both ways       |
| Call a child's method or read it, in the [[template\|template]] | Template reference `#ref`                              | Parent ← child | Pull by the parent   |
| Use a child, or all of them, in the class                       | `viewChild()` / `viewChildren()`                       | Parent ← child | Pull by the parent   |
| Siblings or far-apart components                                | A shared [[service\|service]] with [[signal\|signals]] | Any            | Both read one source |
| Pass data to the next page                                      | Route params, query params, state                      | Page → page    | Through the URL      |

## Key points

- **Push or pull:** with `output()`, the child decides when to send. With a template reference or a query, the parent decides when to read. The child doesn't know the parent exists.
- **Start with the simplest one that fits.** Parent and child: inputs and outputs. Anything further apart: a service. Don't pass a value through three layers of inputs just to reach a grandchild.
- **Signals make every channel reactive.** A signal read through a reference or a service updates every view that reads it, with no extra code.
- Old and new APIs exist side by side. `@Input()`, `@Output()`, `@ViewChild()` and `@ViewChildren()` still work in v22 and fill most older codebases. The lessons show both.

## Say it like this

"Angular components communicate in two broad categories. For parent and child, the parent sends data down with `input()`, the child pushes events up with `output()`, and `model()` does both for two-way binding. The parent can also pull from the child, with a template reference in the template or with `viewChild()` in the class. For siblings or unrelated components, I use a shared service that holds the state in signals. And to pass data between pages, I use route params, query params or navigation state."
