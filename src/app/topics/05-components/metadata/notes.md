## Definition

**Metadata** is **additional information about data**. In Angular, metadata is the configuration object passed **inside a decorator** that tells Angular how to process, render, and style the class.

💬 **One-liner:** "Decorator is the function; metadata is the configuration object you pass into it."

## @Component metadata

```ts
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  providers: [CartService], // new instance per component
  changeDetection: ChangeDetectionStrategy.OnPush, // default in v22
  encapsulation: ViewEncapsulation.Emulated, // default
  host: { class: 'card' },
})
export class ProductCard {}
```

| Property                   | What it does                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| `selector`                 | The tag / attribute / class that places this component              |
| `template` / `templateUrl` | Inline HTML / path to the HTML file                                 |
| `styles` / `styleUrl`      | Inline CSS / path to the CSS file (`styleUrls` array in older code) |
| `imports`                  | Components, directives & pipes this template uses                   |
| `providers`                | Services scoped to this component & its children                    |
| `changeDetection`          | `OnPush` (default in v22) or `Eager` (old default)                  |
| `encapsulation`            | How styles are scoped (`Emulated`, `None`, `ShadowDom`)             |
| `host`                     | Bindings & listeners on the component's own tag                     |
| `standalone`               | Only written as `standalone: false` for NgModule components (v19+)  |

**v22 note:** the old default strategy is now called `ChangeDetectionStrategy.Eager`. `ChangeDetectionStrategy.Default` still works but is deprecated.

## Standalone (default since v19)

A **standalone component** manages its own dependencies through its `imports` array and **doesn't need to be declared in an NgModule**. It has been the **default since v19**.

| Angular version                | What we write                                                    |
| ------------------------------ | ---------------------------------------------------------------- |
| v13 and below (e.g. Angular 9) | No standalone; every component declared in a module              |
| v14–v18                        | `standalone: true` to make a component standalone                |
| v19+                           | Standalone by default; `standalone: false` for module components |

## Key points

- The demo shows one metadata line in action: the **same service class** is shared app-wide from the root injector, but `providers: [CounterStore]` gives **every component its own instance**.

## Say it like this

"The metadata is the config object we pass to `@Component`. The selector decides where the component goes, `templateUrl` and `styleUrl` point to its HTML and CSS, and `imports` lists everything the template uses, like other components and pipes. Then we have optional settings like `providers` for component-level services, `changeDetection` for performance, `encapsulation` for style scoping, and `host` for bindings on the component's own tag. And since v19, components are standalone by default, so we only write `standalone: false` when a component still lives in a module."
