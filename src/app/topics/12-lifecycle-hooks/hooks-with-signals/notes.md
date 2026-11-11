## Definition

In modern, [[signal]]-based Angular, several hooks are needed less: signal inputs with [[computed|`computed()`]] replace `ngOnChanges`, `afterNextRender()` replaces [[dom|DOM]] work in `ngAfterViewInit`, and `takeUntilDestroyed()` or [[destroy-ref|`DestroyRef`]] replace manual cleanup in `ngOnDestroy`.

**`ngOnInit` and `ngOnDestroy` remain fully relevant. The Check hooks are rarely used in signals and [[zoneless]] apps.**

## Example

```ts
// OLD: ngOnChanges rebuilds the value when ANY input changes
export class NameOld implements OnChanges {
  @Input() first = '';
  @Input() last = '';
  @Input() theme = 'light';
  fullName = '';

  ngOnChanges() {
    this.fullName = `${this.first} ${this.last}`;
  }
}

// NEW: computed() rebuilds it only when first or last changes
export class NameNew {
  readonly first = input('');
  readonly last = input('');
  readonly theme = input('light');
  readonly fullName = computed(() => `${this.first()} ${this.last()}`);
}
```

| Old way                               | Modern way                                            |
| ------------------------------------- | ----------------------------------------------------- |
| `ngOnChanges` to react to an input    | Signal input + `computed()` or [[effect\|`effect()`]] |
| `ngDoCheck` to catch mutations        | Immutable updates + signals                           |
| `ngAfterViewInit` to use `@ViewChild` | `viewChild()` read in `computed()` or an event        |
| `ngAfterViewInit` for DOM work        | `afterNextRender()`                                   |
| `ngAfterViewChecked` to read the DOM  | `afterEveryRender()`                                  |
| `ngOnDestroy` to unsubscribe          | `takeUntilDestroyed()`                                |
| `ngOnDestroy` for other cleanup       | `DestroyRef.onDestroy()`, or still `ngOnDestroy`      |
| `ngOnInit` for setup                  | Still `ngOnInit`                                      |

## Key points

- **Measured in the demo:** two theme changes made the old badge rebuild the name **twice more**, because `ngOnChanges` runs for any input. The `computed()` did not run at all: it reads only `first` and `last`. Changing the person ran each once.
- **A `computed()` is also lazy and cached.** Nothing runs until something reads it, and it returns the saved value until a signal it read changes.
- **`ngOnInit` is still the place** for one-time setup that needs input values, like starting a request. Many of those become a `computed()` or a `resource()` later in the course.
- **`ngOnDestroy` is not wrong.** It is still fine in a [[component|component]]. `DestroyRef` wins when the cleanup belongs to a function or a [[service|service]].
- The old hooks are **not deprecated** and work in Angular 22. Interviewers still ask about all eight.

## Say it like this

"In modern signal-based Angular, I need fewer hooks. Instead of ngOnChanges, signal inputs with computed or effect react to input changes automatically, and computed only recalculates when the inputs it reads change. Instead of DOM work in ngAfterViewInit, I use afterNextRender, which is SSR-safe. Instead of unsubscribing in ngOnDestroy, I use takeUntilDestroyed or DestroyRef. ngOnInit and ngOnDestroy are still fully relevant, and the Check hooks are rarely needed in signals and zoneless apps."
