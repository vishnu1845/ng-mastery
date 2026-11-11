## Definition

**`ngOnDestroy`** runs just before Angular destroys the [[component|component]], for example when we navigate away or when an `@if` removes it. It is for **cleanup to prevent [[memory-leak|memory leaks]]**: unsubscribing from [[observable|Observables]], clearing `setInterval` / `setTimeout`, removing manual event listeners and closing sockets.

## Example

```ts
export class CleanClock implements OnInit, OnDestroy {
  private intervalId?: ReturnType<typeof setInterval>;
  private readonly onResize = () => console.log('resized'); // kept: removal needs the same function

  ngOnInit() {
    this.intervalId = setInterval(() => console.log('tick'), 1000);
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    window.removeEventListener('resize', this.onResize);
  }
}
```

## Key points

- **Measured in the demo:** after "Remove all clocks", the leaky clock is gone from the page, but its interval keeps ticking and its window listener still answers "Ping the window". The clean clock stops both. Removing a component does not stop what it started.
- **What leaks if we don't clean up:**

  | Started by us                              | Clean up with                                 |
  | ------------------------------------------ | --------------------------------------------- |
  | `setInterval`, `setTimeout`                | `clearInterval`, `clearTimeout`               |
  | `addEventListener` on `window`/`document`  | `removeEventListener`, with the same function |
  | `.subscribe()` to a long-lived Observable  | `unsubscribe()`, or `takeUntilDestroyed()`    |
  | WebSocket, `ResizeObserver`, chart library | `close()`, `disconnect()`, `destroy()`        |

- **What Angular cleans up for us:** listeners written in the [[template|template]] (`(click)`, `host` listeners), the [[async-pipe|`async` pipe]], an [[effect|`effect()`]] created in a component, and subscriptions to an [[output|`output()`]] once the component that owns it is destroyed.
- **The same function reference:** `removeEventListener` with a new arrow function removes nothing. Keep the handler in a field.
- **Order:** children are destroyed before their parent (see the first lesson), and a component's `ngOnDestroy` runs before its [[destroy-ref|`DestroyRef`]] callbacks.
- **Services get `ngOnDestroy` too, and no other hook.** It runs when the [[provider|injector]] that created the [[service|service]] is destroyed: with the component, for a service in a component's `providers`, or when the app closes, for a root service. This demo's `LeakMeter` stops its own clock that way. `ngOnInit` in a service is never called, and the lint rule `contextual-lifecycle` reports it.
- The modern way to write cleanup is `DestroyRef` and `takeUntilDestroyed()` (see the `DestroyRef` lesson).

## Say it like this

"ngOnDestroy runs just before Angular destroys the component, for example when navigating away or when an @if removes it. It's for cleanup, to prevent memory leaks: I clear intervals and timeouts, remove event listeners I added myself, unsubscribe from long-lived Observables and close sockets. Removing the component does not stop those by itself. Template listeners, the async pipe and effects are cleaned up by Angular. In modern code I usually write the cleanup with DestroyRef or takeUntilDestroyed instead."
