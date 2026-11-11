## Definition

A **custom pipe** is a class with the **`@Pipe` [[decorator|decorator]]** that implements the **`PipeTransform`** interface. Its **`transform()`** method receives the value and returns what to show.

## Example

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20, trail = '…'): string {
    return value.length > limit ? value.slice(0, limit) + trail : value;
  }
}
```

<!-- prettier-ignore -->
```html
<p>{{ longText | truncate }}</p>               <!-- 20 characters, then … -->
<p>{{ longText | truncate: 15 }}</p>
<p>{{ longText | truncate: 15 : ' [more]' }}</p>
```

## Key points

- **The first parameter is the value before the `|`.** The others come after the colons, in order.
- **`name`** is what we write in the [[template|template]], in camelCase. The class goes in the [[component|component]]'s `imports`.
- Create one with the CLI: `ng generate pipe truncate` (short: `ng g p truncate`). It creates `truncate-pipe.ts`.
- The parameters are type-checked. `{{ count | truncate }}` with a number fails the build.
- **A custom pipe is pure by default**, so it runs again only when an input changes. That bites the classic `timeAgo` pipe: if it reads the clock inside `transform()`, "2 min ago" stays on screen forever.
- **The fix is to pass the time in**, so it becomes an input. This is the demo's version:

```ts
transform(value: Date, now: number): string { … }
```

```html
{{ post.createdAt | timeAgo: now() }}
```

- A pipe can use [[service|services]] with `inject()`.
- To reuse the same logic in a class, keep it in a plain function and call that function from the pipe and from the class.
- **Search and sort pipes:** the Angular team advises against them. Filter in the [[component|component]] with [[computed|`computed()`]] instead. The last lesson of this topic measures why.

## Say it like this

"To create a custom pipe, I run `ng g p name`. That gives a class with the `@Pipe` decorator and a name, implementing `PipeTransform` with a `transform` method. The first parameter is the value before the pipe symbol, and the rest are the parameters after the colons. Then I import the pipe in the component and use it in the template. I have written pipes like truncate for long text and time-ago for dates. Custom pipes are pure by default, so anything that changes over time must come in as a parameter."
