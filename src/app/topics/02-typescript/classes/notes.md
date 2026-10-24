## Definition

TypeScript adds **access modifiers** to classes: `public` (default, everywhere), `protected` (class + subclasses), `private` (only inside the class) and `readonly` (set once). **Parameter properties** declare and assign a property in the constructor in one line, and an **abstract class** is a base class we **can't create directly**; it forces subclasses to implement its abstract methods.

## Access modifiers

| Keyword            | Access                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `public` (default) | Everywhere                                                                                |
| `protected`        | Class + subclasses (and the [[component\|component]]'s [[template\|template]] in Angular) |
| `private`          | Only inside the class                                                                     |
| `readonly`         | Set once, can't be reassigned                                                             |

## Example

```ts
// ANGULAR COMPONENT
export class UserList {
  private http = inject(HttpClient); // only this class
  protected users = signal<User[]>([]); // class + its template
  readonly pageSize = 10; // can't be reassigned
}

// ABSTRACT CLASS + PARAMETER PROPERTY
abstract class Shape {
  abstract area(): number; // subclasses must implement
}

class Circle extends Shape {
  constructor(private readonly radius: number) {
    super();
  }
  override area() {
    return Math.PI * this.radius ** 2;
  }
}

// new Shape();   // ❌ can't create an abstract class
```

## Key points

- **Angular style tip:** use `protected` for members used only by the template, and `readonly` for things Angular sets up, like `input()`, `output()` and queries.
- **Trap:** TypeScript `private` is checked **only at compile time**. JavaScript `#field` is private **at runtime** too.
- `override` marks a method that replaces a parent method. With `noImplicitOverride` (on in Angular projects) TypeScript requires it.

## Say it like this

"TypeScript gives classes access modifiers. `public` is the default, `private` is only for inside the class, and `protected` is for the class and its subclasses. In Angular, I mark template-only members as `protected` and anything Angular initializes as `readonly`. Then parameter properties let us declare and assign in the constructor in one line, and abstract classes act as base templates that subclasses must complete."
