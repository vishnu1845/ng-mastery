## Definition

Components **without a parent-child relationship** (siblings, or [[component|components]] far apart in the tree) communicate through a **shared [[service|service]]**. Both inject the same instance: one writes its state, the others read it.

## Example

```ts
@Service()
export class CartStore {
  private readonly lines = signal<CartLine[]>([]);

  readonly items = this.lines.asReadonly();
  readonly count = computed(() => this.lines().length);

  add(line: CartLine) {
    this.lines.update((lines) => [...lines, line]);
  }
}
```

```ts
export class Shelf {
  private readonly store = inject(CartStore); // writes
}

export class CartBadge {
  protected readonly store = inject(CartStore); // reads: {{ store.count() }}
}
```

## Signals or BehaviorSubject

```ts
@Service()
export class CartStoreRx {
  private readonly lines$ = new BehaviorSubject<CartLine[]>([]);
  readonly count$ = this.lines$.pipe(map((lines) => lines.length));

  add(line: CartLine) {
    this.lines$.next([...this.lines$.value, line]);
  }
}
```

|                | Signals                      | `BehaviorSubject`                            |
| -------------- | ---------------------------- | -------------------------------------------- |
| Read           | `store.count()`              | `store.count$ \| async`, or `subscribe`      |
| Current value  | Always: `lines()`            | `lines$.value`                               |
| Derived values | [[computed\|`computed()`]]   | `pipe(map(…))`                               |
| Cleanup        | None needed                  | Unsubscribe, or the `async` [[pipe\|pipe]]   |
| Best for       | State: what the value **is** | Events over time: debounce, HTTP, websockets |

## Key points

- **Keep the writable state private.** Expose read-only views (`asReadonly()`, `asObservable()`) and change state only through the [[service|service]]'s methods. Then one place controls how the state can change.
- **Who shares the instance depends on where it is provided.** The demo shows it:
  - `@Service()` (like `providedIn: 'root'`) gives **one instance for the whole app**. Shop A and Shop B share one cart.
  - `providers: [CartStore]` on a component gives **that component and its children their own instance**. Shop C has a separate cart.
- Update [[immutability|immutably]], with a new array, so every reader sees a new value.
- When the state grows big, the same idea scales up to a [[signal|signal]] store or NgRx (topic 38).

## Say it like this

"For siblings or unrelated components, I use a shared service. Both components inject the same instance, one writes the state and the other reads it, and they never reference each other. In modern Angular I keep that state in signals, private and writable inside the service, with read-only signals and `computed` values outside. Before signals, the same pattern used a `BehaviorSubject` with the async pipe. And the scope matters: a root service is shared by the whole app, while providing it on a component gives that subtree its own instance."
