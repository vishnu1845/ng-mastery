## Definition

**`ngOnChanges`** is called whenever a data-bound [[input]] property changes, and it is the only hook that runs even **before `ngOnInit`**. It receives a **`SimpleChanges`** object containing the `previousValue`, `currentValue` and a `firstChange` flag for each changed input.

## Example

```ts
export class ProfileCard implements OnChanges {
  readonly user = input<User>();
  readonly role = input('viewer');
  @Input() theme = 'light';

  ngOnChanges(changes: SimpleChanges<ProfileCard>) {
    if (changes.user) {
      console.log(changes.user.previousValue, changes.user.currentValue, changes.user.firstChange);
    }
  }
}
```

## Key points

- **Measured in the demo:**

  | Action                | `ngOnChanges` calls           | What the card shows      |
  | --------------------- | ----------------------------- | ------------------------ |
  | First render          | 1, every input with `(first)` | The parent's values      |
  | Replace the user      | 1, only `user`                | The new name             |
  | Mutate `user.name`    | **0**                         | **The old name (stale)** |
  | Change the role       | 1, only `role`                | The new role             |
  | Change role and theme | **1**, with both              | Both new values          |

- **Only a new reference counts.** Mutating `user.name` keeps the same object, so Angular sees no change: no `ngOnChanges`, and the [[onpush|OnPush]] card is not even refreshed. The parent shows the new name while the card still shows the old one. This is why we update objects with [[immutability|immutable]] updates.
- **One call per check.** Inputs changed together arrive together in one `SimpleChanges`, and unchanged inputs are not in it.
- **An unbound input never triggers it.** The second card has the same inputs but no bindings, and its `ngOnChanges` never runs.
- **It works for [[signal|signal]] inputs too.** `SimpleChanges` holds their plain values, not the signals.
- **Typed keys:** `SimpleChanges<ProfileCard>` knows each input's name and type, so `changes.user.currentValue` is a `User`. The plain `SimpleChanges` is a string-keyed object.
- **Modern code rarely needs it.** With signal inputs, a [[computed|`computed()`]] or [[effect|`effect()`]] follows an input by itself (see the last lesson of this topic).

## Say it like this

"ngOnChanges runs whenever a bound input gets a new value, and the first call happens even before ngOnInit. It receives SimpleChanges, with the previous value, the current value and a firstChange flag for each input that changed. It only notices a new reference, so mutating a property inside the same object does not trigger it, which is why I use immutable updates. It never runs for a component whose inputs are not bound. With signal inputs, I usually replace it with computed or effect."
