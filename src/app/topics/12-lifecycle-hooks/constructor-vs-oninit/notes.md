## Definition

The **constructor** is a [[typescript|TypeScript]]/JavaScript feature, not Angular's. It runs first, when the class is created, and should only be used for [[dependency-injection|dependency injection]]. **`ngOnInit`** is an Angular [[lifecycle-hook|lifecycle hook]] that runs after the inputs are set, so all initialization logic belongs there.

Short version: **constructor = inject dependencies, ngOnInit = initialize the [[component|component]].**

## Example

```ts
export class UserList implements OnInit {
  private readonly users = inject(UserService); // field initializer: injection context
  readonly teamId = input.required<number>();

  constructor() {
    effect(() => console.log(this.teamId())); // needs the injection context too
  }

  ngOnInit() {
    this.users.loadTeam(this.teamId()); // inputs are ready here
  }
}
```

|                   | constructor           | `ngOnInit`                      |
| ----------------- | --------------------- | ------------------------------- |
| Belongs to        | TypeScript            | Angular                         |
| Runs              | First, when created   | After the first `ngOnChanges`   |
| Inputs            | Not set yet           | Set                             |
| `inject()`        | Works                 | **NG0203**                      |
| `effect()`        | Works                 | **NG0203**                      |
| Template rendered | No                    | Not yet                         |
| Use it for        | DI and reactive setup | Initialization logic, API calls |

## Key points

- **Measured in the demo**, in each moment:
  - **Inputs:** in the constructor, both inputs still hold their defaults (`"Guest"`, `"Unknown"`). In `ngOnInit`, they hold the parent's values. An optional input reading its default is a quiet bug. A required input throws instead (see [Input options](/component-communication/input-options)).
  - **`inject()` and [[effect|`effect()`]]** work in the constructor and fail with **NG0203** in `ngOnInit` and `ngAfterViewInit`. They need an [[injection-context|injection context]], which exists only while the class is being created: field initializers and the constructor.
  - **The [[template|template]]:** the constructor finds no `<p>` yet. In `ngOnInit` the `<p>` exists but is still empty (`""`). The text appears in `ngAfterViewInit`.
- **"Keep the constructor empty"** means no business logic there. Reactive setup, like `effect()`, `afterNextRender()` or `takeUntilDestroyed()`, does belong in the constructor or in field initializers.
- These functions can run in `ngOnInit` only when we pass what they need: `takeUntilDestroyed(this.destroyRef)`, or `afterNextRender(fn, { injector })`.
- With [[signal|signal]] inputs, a [[computed|`computed()`]] can read an input from a field initializer, because it runs only when read. That is one reason modern code needs `ngOnInit` less.

## Say it like this

"The constructor is a TypeScript feature that runs first, when the class is created, so I use it only for dependency injection and reactive setup like effect or afterNextRender, which need the injection context. At that point the inputs are not set yet. ngOnInit is an Angular hook that runs after the inputs are bound, so initialization logic and API calls go there. Short version: constructor to inject, ngOnInit to initialize. And inject or effect called inside ngOnInit throws NG0203, because there is no injection context there."
