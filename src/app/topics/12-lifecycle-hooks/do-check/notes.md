## Definition

**`ngDoCheck`** runs on every [[change-detection|change detection]] cycle and lets us implement **custom change detection**, for example detecting mutations inside objects or arrays that `ngOnChanges` misses.

## Example

```ts
export class Watcher implements DoCheck {
  readonly items = input<string[]>([]);
  private lastList: string[] = [];
  private lastLength = 0;

  ngDoCheck() {
    const list = this.items();
    if (list === this.lastList && list.length !== this.lastLength) {
      console.log('Same array, new length: someone used push()');
    }
    this.lastList = list;
    this.lastLength = list.length;
  }
}
```

## Key points

- **"Every cycle" means every time Angular checks the parent's view.** A [[component|component]]'s `ngDoCheck` is called while its parent's [[template|template]] is checked, even if the component itself is then skipped.
- **Measured in the demo:**

  | Click                          | Watcher's `ngDoCheck`           |
  | ------------------------------ | ------------------------------- |
  | In the sibling                 | **Not called**                  |
  | In the parent, nothing changes | Called                          |
  | `push()` into the same array   | Called, and it catches the push |
  | Add with a new array           | Called, after `ngOnChanges`     |

- **Why the sibling click doesn't count:** in a [[zoneless]] app, a click marks only its own component and the components above it for checking. The Watcher's parent is next to the sibling, not above it, so it is not checked. With [[zone-js|Zone.js]] and the old `Eager` strategy, every component was checked after every event, which is where "runs on every cycle" comes from.
- **Mutation:** `push()` keeps the same array, so `ngOnChanges` stays silent, but `ngDoCheck` runs when the parent is checked and can compare by hand. Angular's `KeyValueDiffers` and `IterableDiffers` do this comparison for objects and arrays.
- **It runs often, so keep it tiny.** Heavy work here slows every check of the parent.
- **Prefer not to need it:** [[immutability|immutable]] updates make `ngOnChanges` or a [[computed|`computed()`]] see every change, and [[signal|signals]] tell Angular exactly what changed.

## Say it like this

"ngDoCheck runs whenever Angular checks the component's parent, and it lets us write custom change detection, like noticing a push into an array, which ngOnChanges misses because the reference is the same. It runs very often, so heavy logic there hurts performance. In a zoneless app with OnPush, it runs much less: only when the parent is actually checked. I rarely need it, because immutable updates and signals make changes visible without it."
