## Definition

**[[destroy-ref|`DestroyRef`]]** stands for the lifetime of the current [[component|component]], [[directive|directive]] or service. Its `onDestroy(callback)` registers cleanup that runs when that owner is destroyed. **`takeUntilDestroyed()`** is an RxJS operator that completes an [[observable|Observable]] at the same moment.

All these functions need an **[[injection-context|injection context]]**, which exists only in **field initializers and the constructor**, not in `ngOnInit`.

## Example

```ts
export class Countdown {
  constructor() {
    // An Observable that stops when the component is destroyed
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => console.log('tick'));

    // A helper function that cleans up after itself
    startTicker(() => console.log('tick'));
  }
}

export function startTicker(onTick: () => void, ms = 1000) {
  const destroyRef = inject(DestroyRef);
  const intervalId = setInterval(onTick, ms);
  destroyRef.onDestroy(() => clearInterval(intervalId));
}
```

| Goes in the constructor / a field initializer | Goes in `ngOnInit`                    |
| --------------------------------------------- | ------------------------------------- |
| `inject()`                                    | API calls, subscription logic         |
| `effect()`                                    | Reading route params                  |
| `afterNextRender()` / `afterEveryRender()`    | Form setup                            |
| `takeUntilDestroyed()` with no argument       | Anything that needs `@Input()` values |

## Key points

- **Measured in the demo:** after "Remove the component", both timers stop. The component has no `ngOnDestroy`.
- **The real win is cleanup inside functions.** `startTicker()` sets up its interval and its cleanup in one place, so every component that calls it is safe automatically. `ngOnDestroy` can only live in the class.
- **The same calls in `ngOnInit`**, measured: `takeUntilDestroyed()`, `startTicker()` and `inject(DestroyRef)` all fail with **NG0203**. `takeUntilDestroyed(this.destroyRef)` works, because we pass the `DestroyRef` saved earlier.
- **After destruction:** `destroyRef.destroyed` is `true`, and calling `onDestroy()` then throws **NG0911** "View has already been destroyed".
- `onDestroy()` returns a function that removes the callback again, for cleanup that is no longer needed.
- `takeUntilDestroyed` comes from `@angular/core/rxjs-interop`. Put it **last** in the `pipe()`, so no operator after it can keep the subscription alive.
- In a [[service]], `inject(DestroyRef)` follows the service's injector, so the cleanup runs when the service is destroyed.

## Say it like this

"DestroyRef represents the lifetime of the current component or service, and onDestroy registers cleanup for when it's destroyed. takeUntilDestroyed is the RxJS version: it completes the Observable automatically. Both need the injection context, so I use them in the constructor or in field initializers. In ngOnInit they throw NG0203, unless I pass the DestroyRef explicitly. The big advantage over ngOnDestroy is that cleanup can live inside a reusable function, right next to the setup, so components don't have to remember it."
