## Definition

**`input()`** is used when the parent needs to pass data **down** to the child.

**`output()`** is used when the child needs to push data or events **up** to the parent. This is a **push-based** model: the child emits, the parent listens.

## Example

```ts
// child
export class ProductCard {
  readonly product = input.required<Product>();
  readonly added = output<number>();

  protected readonly qty = signal(1);
  protected readonly lineTotal = computed(() => this.product().price * this.qty());

  add() {
    this.added.emit(this.qty());
  }
}
```

```html
<!-- parent -->
<app-product-card [product]="item" (added)="addToCart(item, $event)" />
```

## Old vs new

```ts
// OLDER
@Input({ required: true }) product!: Product;
@Output() added = new EventEmitter<number>();
```

|                      | `@Input()`                       | `input()`                                                              |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| Type                 | Decorator                        | Signal-based function                                                  |
| Read value           | Direct: `this.product`           | Call it: `this.product()`                                              |
| React to a new value | Needs `ngOnChanges` or a setter  | Automatic, inside [[computed\|`computed()`]] or [[effect\|`effect()`]] |
| Default value        | `@Input() qty = 1`               | `input(1)`                                                             |
| Required             | `@Input({ required: true })`     | `input.required<Product>()`                                            |
| Child can change it  | Yes, by assigning (a common bug) | **No.** It is read-only                                                |

|                   | `@Output()` + `EventEmitter`            | `output()`                            |
| ----------------- | --------------------------------------- | ------------------------------------- |
| Type              | Decorator + an RxJS `Subject`           | Function returning `OutputEmitterRef` |
| Emit              | `.emit(value)`                          | `.emit(value)`, the same              |
| Subscribe in code | `.subscribe()`, and every RxJS operator | `.subscribe()` only, no `.pipe()`     |
| Template binding  | `(added)="…"`                           | The same                              |

## Key points

- **`$event` is whatever the child passed to `emit()`.** For a [[dom|DOM]] event like `(click)` it is the browser's `Event`. For our output it is a `number`, as the log in the demo shows. Its type is checked: handling it as a `string` fails the build.
- **Reacting to a new input.** Tick "Sale" in the demo. The new cards follow the price with a `computed()`. The old card needs `ngOnChanges`, which runs again for every new value and gets the previous and current value in `SimpleChanges`.
- **A new value means a new reference.** The parent creates a new product object for each price. Changing a property inside the same object would not count as a new input.
- **Don't name an output like a DOM event** (`click`, `change`, `ended`…). A native event that bubbles up to the child's tag would run the parent's handler too. Angular's lint rule `no-output-native` blocks those names.
- `output()` can only be declared in a class with `@Component` or `@Directive`. Anywhere else, like a plain base class, is the build error **NG8110**.
- For RxJS in code, `outputToObservable()` turns an output into an `Observable`, and `outputFromObservable()` turns an `Observable` into an output.

## Say it like this

"For parent to child, the child declares an `input()`, and the parent binds a value with square brackets. For child to parent, the child declares an `output()` and calls `emit()`, and the parent listens with parentheses, where `$event` is exactly the value that was emitted. The new functions replace `@Input()` and `@Output()` with `EventEmitter`. The big difference is that an `input()` is a signal, so a `computed()` follows it automatically, where the old `@Input()` needed `ngOnChanges`."
