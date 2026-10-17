## Definition

A Decorator is a **TypeScript feature** (defined with the **@ symbol**) that tells Angular **how to process a class**. It adds metadata to modify or enhance the behavior of a class, property, method, or parameter — without changing its actual code.

## The four types

| Type          | Decorators                                                                   | Purpose                                         | Modern replacement                                                 |
| ------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| **Class**     | `@Component`, `@Directive`, `@Pipe`, `@Injectable`, `@NgModule`              | Tell Angular **what the class is**              | Stay (`@Service()` is new in v22)                                  |
| **Property**  | `@Input`, `@Output`, `@ViewChild(ren)`, `@ContentChild(ren)`, `@HostBinding` | Data in/out, queries, host bindings             | `input()`, `output()`, `viewChild()`, `contentChild()`, `host: {}` |
| **Method**    | `@HostListener`                                                              | Listen to host element events                   | `host: { '(click)': '...' }`                                       |
| **Parameter** | `@Inject`, `@Optional`, `@Self`, `@SkipSelf`, `@Host`                        | Control dependency injection in the constructor | `inject(Token, { optional: true })`                                |

## Example

```ts
// OLD STYLE
export class Child {
  @Input() title = '';
  @Output() saved = new EventEmitter<string>();
  @HostListener('click') onClick() {}
}

// MODERN STYLE (same purpose)
export class Child {
  title = input('');
  saved = output<string>();
}
```

## Key points

- The demo has the same star rating written **both ways**. The old one uses all four decorator types; the new one uses none except `@Component`. Both behave the same, and their events go to the same log.
- `@HostBinding` and `@HostListener` are **not deprecated**, but the Angular style guide prefers the `host` property.

## Say it like this

"A decorator is a TypeScript feature, prefixed with @, that attaches metadata to a class, property, method or parameter, telling Angular how to treat it. For example, `@Component` turns a plain class into a component, and `@Injectable` makes it available for dependency injection. So there are four types: class, property, method and parameter decorators. And in modern Angular, most property and parameter decorators are replaced by functions like `input()`, `output()`, `viewChild()` and `inject()`, which are reactive and work better in zoneless apps."
