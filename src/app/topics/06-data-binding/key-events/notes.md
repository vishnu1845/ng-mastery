## Definition

**Key event filters** listen to **one specific key** right in the [[template|template]], like `(keyup.enter)`, so we don't have to check `event.key` in [[typescript|TypeScript]].

## Example

```html
<textarea
  (keydown.enter)="send($event)"
  (keydown.escape)="clear()"
  (keydown.control.s)="saveDraft($event)"
></textarea>
```

```ts
send(event: Event) {
  event.preventDefault(); // stop the new line
  this.messages.update((list) => [...list, this.draft()]);
  this.draft.set('');
}
```

⚠️ With a key filter, the template types `$event` as a plain **`Event`**, not `KeyboardEvent` (checked on v22). So the handler takes `Event`, which is enough for `preventDefault()`. Plain `(keydown)` still gives a `KeyboardEvent`.

## How the matching works

Straight from Angular's `KeyEventsPlugin` source (v22):

- Filters work on `keydown` and `keyup` only.
- Modifiers: `alt`, `control`, `meta` and `shift`, in any combination: `(keydown.control.shift.z)`.
- The match is **exact**. `(keydown.enter)` does **not** fire for Shift+Enter, because Shift becomes part of the key. That's how chat apps send on Enter and add a new line on Shift+Enter.
- Friendly names: `space`, `dot`, `escape` (or `esc`), `tab`, `arrowUp`...
- `code.` matches the **physical key** (`event.code`) instead of the typed character: `(keydown.code.alt.keyS)`. On a Mac, Option+S types `ß`, so `(keydown.alt.s)` never fires there, but the `code.` version does.
- Use `keydown` when you need `preventDefault()`. By `keyup`, the new line is already typed.

## Say it like this

"Key event filters let us listen to one specific key right in the template, like `(keydown.enter)` or `(keyup.escape)`, so we don't need an if-check on `event.key` in TypeScript. We can combine modifiers like `(keydown.control.s)`, and the match is exact, so `(keydown.enter)` doesn't fire on Shift+Enter. That's exactly how we build a chat box: Enter sends, and Shift+Enter adds a new line."
