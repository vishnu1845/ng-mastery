## Definition

Angular **lifecycle** is the complete process of how a [[component]] is **created, rendered, updated and destroyed** in the [[dom|DOM]], and [[lifecycle-hook|lifecycle hooks]] are the methods Angular calls automatically at each of these stages, so we can run our own logic.

## Example

```ts
export class UserCard implements OnInit, OnDestroy {
  ngOnInit() {
    // the component is ready: inputs are set
  }

  ngOnDestroy() {
    // the component is about to be removed: clean up
  }
}
```

## The 8 hooks in order

| #   | Hook                    | Runs                                                          | How often |
| --- | ----------------------- | ------------------------------------------------------------- | --------- |
| 1   | `ngOnChanges`           | When a bound input gets a new value (first time: before init) | Many      |
| 2   | `ngOnInit`              | After the first `ngOnChanges`. The component is ready         | **Once**  |
| 3   | `ngDoCheck`             | Every time Angular checks the parent's view                   | Many      |
| 4   | `ngAfterContentInit`    | After the projected content (`<ng-content>`) is ready         | **Once**  |
| 5   | `ngAfterContentChecked` | After the projected content is checked                        | Many      |
| 6   | `ngAfterViewInit`       | After the component's own view and its children are ready     | **Once**  |
| 7   | `ngAfterViewChecked`    | After the view is checked                                     | Many      |
| 8   | `ngOnDestroy`           | Just before the component is destroyed                        | **Once**  |

Memory trick: **Changes → Init → DoCheck → Content (Init, Checked) → View (Init, Checked) → Destroy**.

## Key points

- **Measured order when the three components are created** (the demo's first step): the Parent runs `ngOnChanges`, `ngOnInit`, `ngDoCheck` and its content hooks first, then the Child does the same, then Projected. The view hooks come back the other way: **Projected → Child → Parent**. A parent's view is complete only after all its children's views are complete.
- **Destroy is children first** as well: Projected, Child, then Parent.
- **Once vs many**, from the counts table: the constructor, `ngOnInit`, `ngAfterContentInit`, `ngAfterViewInit` and `ngOnDestroy` run once. The other four run again on later checks.
- **No inputs, no `ngOnChanges`.** Projected has no inputs, and its count stays at 0.
- **"Click, nothing changes"** runs only the Parent's `ngDoCheck`, `ngAfterContentChecked` and `ngAfterViewChecked`. The click checks the demo's view, which owns the Parent. The Parent is [[onpush|OnPush]] (the default in Angular 22) and nothing it uses changed, so its own view is skipped, and the Child's hooks don't run. The `ngDoCheck` lesson measures this in detail.
- **Hooks are found by name.** Angular calls `ngOnInit` whether or not the class says `implements OnInit`. The interface catches typos: with `implements OnInit`, a method named `ngOnint` fails the build with **TS2420**. Without it, the typo just never runs. The lint rule `use-lifecycle-interface` warns when the interface is missing.
- Directives have the same hooks. A [[service]] gets only `ngOnDestroy` (see the `ngOnDestroy` lesson).

## Say it like this

"The lifecycle is how Angular creates, renders, updates and destroys a component, and lifecycle hooks are the methods Angular calls at each stage. In order: ngOnChanges, ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, and ngOnDestroy. ngOnInit, the two Init hooks for content and view, and ngOnDestroy run once. ngOnChanges and the Check hooks can run many times. Creation goes from parent to child, but ngAfterViewInit finishes child first, because a parent's view is complete only when its children are."
