## Definition

An input can take **options**: a **default value**, **`required`**, an **`alias`**, and a **`transform`** function that changes the value on its way in.

## Example

```ts
export class ProfileChip {
  readonly name = input.required<string>(); // must be bound
  readonly size = input(14, { transform: numberAttribute }); // "22" → 22
  readonly verified = input(false, { transform: booleanAttribute }); // bare attribute → true
  readonly caption = input('', { alias: 'label' }); // parent writes [label]
}
```

```html
<app-profile-chip name="Ravi" size="22" verified />
```

## Key points

| Option      | What it does                               | If we get it wrong                                                 |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------ |
| Default     | The value when the parent binds nothing    | n/a                                                                |
| `required`  | The parent must bind it                    | Build error **NG8008** _Required input 'name' … must be specified_ |
| `alias`     | A different name for the parent to use     | The class name no longer works: **NG8002**                         |
| `transform` | Changes the value before the child sees it | n/a                                                                |

- **A plain attribute always passes a string.** `size="22"` sends `"22"`. `numberAttribute` turns it into `22`. The demo shows every value with its real type.
- **`booleanAttribute`** turns a bare attribute into `true`, like the HTML `disabled`. The string `"false"` becomes `false`.
- **Aliases are discouraged** by the style guide, because the [[template|template]] and the class then use different names. The project's lint rule flags them too.
- `@Input()` takes the same options: `@Input({ required: true, alias: 'label', transform: booleanAttribute })`.

## When is an input ready?

Inputs are set **after the constructor**. The demo reads them in both places:

| Read in       | `name` (required) | `size` (optional, parent passed 22) |
| ------------- | ----------------- | ----------------------------------- |
| `constructor` | **NG0950** error  | **14**, the default                 |
| `ngOnInit`    | `"Kabir"`         | `22`                                |

- Reading a required input **directly** in the constructor or a field initializer is caught at build time: **NG8118** _`name` is a required `input` and does not have a value in this context_.
- Through a helper method, the compiler can't see it, so it fails at runtime: **NG0950** _Input is required but no value is available yet_.
- An optional input doesn't fail. It quietly gives its **default**, which is a sneakier bug.
- **The fix:** read inputs in a [[computed|`computed()`]], an [[effect|`effect()`]], the template, or `ngOnInit`. Never in the constructor.

## Say it like this

"An input can be required, so the build fails if the parent forgets it, it can have a default, an alias, and a transform. Transforms matter because plain attributes always pass strings, so `numberAttribute` and `booleanAttribute` convert them, and a bare `disabled`-style attribute becomes true. One thing to remember is that inputs are not ready in the constructor: a required input throws, and an optional one gives its default. So I read inputs in a `computed`, in the template or in `ngOnInit`."
