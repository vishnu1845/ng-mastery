## Definition

An **effect** is a reactive function that automatically runs when the signals used inside it change. Use it only for side effects (not data storage): logging, syncing to localStorage, or calling a non-Angular API.

## Example

```ts
export class NoteEditor {
  draft = signal(localStorage.getItem('draft') ?? '');

  constructor() {
    effect(() => {
      localStorage.setItem('draft', this.draft()); // runs every time draft changes
    });
  }
}
```

**Rule of thumb:** use `computed()` when you need a **value** (returns something, used in [[template|templates]] or logic); use `effect()` when you need to **do** something (returns nothing, runs an action).

## Key points

- An effect runs **once at the start**, then again whenever a signal it read changes.
- Effects run **asynchronously**, during [[change-detection|change detection]]. Set a signal three times in a row and the effect runs **once**, with the last value.
- Writing to signals inside an effect is allowed by default (the old `allowSignalWrites` flag is deprecated). But if an effect only copies one signal into another, that's a `computed()` in disguise.
- The [[component|component]] also renders on the server, so guard browser-only APIs like `localStorage` (the demo checks `isPlatformBrowser`).

```ts
// ❌ effect used to derive a value
effect(() => this.fullName.set(`${this.first()} ${this.last()}`));

// ✅ computed
fullName = computed(() => `${this.first()} ${this.last()}`);
```

## Say it like this

"An effect is a function that runs automatically whenever the signals it reads change, and we use it only for side effects, like logging, saving to localStorage or calling a non-Angular library. The rule of thumb is: if we need a value, we use computed, and if we need to do something, we use effect. Effects run asynchronously, so if we set a signal three times in a row, the effect runs once with the final value."
