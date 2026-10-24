## Definition

`effect()` must run inside an **injection context**. That means it has to be created either in the **constructor** or as a **field initializer** (class property). Both run within the injection context automatically.

## Example

```ts
// ✅ Field initializer: cleanest, most modern
export class Cart {
  count = signal(0);
  private logEffect = effect(() => console.log('Count is:', this.count()));
}

// ✅ Constructor: also correct
export class Cart {
  count = signal(0);
  constructor() {
    effect(() => console.log('Count is:', this.count()));
  }
}

// ⚠️ ngOnInit or a click handler: needs the injector passed in
export class Cart implements OnInit {
  count = signal(0);
  private injector = inject(Injector);

  ngOnInit() {
    effect(() => console.log(this.count()), { injector: this.injector });
  }
}
```

Without the injector, Angular 22 throws **NG0203**: _effect() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`_.

## Cleanup and leaks

- Created the normal way, an effect is tied to the [[component|component]]'s `DestroyRef`. When the component is destroyed, the effect is destroyed too. **No leak.**
- Calling `effect()` outside an injection context doesn't leak, it **throws NG0203**.
- The real leak: passing an injector that **lives longer** than the component (like the root or environment injector), or `manualCleanup: true`. The effect keeps running after the component is gone.
- **Fix:** use the component's own injector, or keep the `EffectRef` it returns and call `.destroy()` yourself.

The same rule applies to `inject()`, `toSignal()` and `takeUntilDestroyed()`.

## Say it like this

"`effect()` needs an injection context, so we create it in the constructor or as a field initializer. If we call it inside ngOnInit or a click handler, Angular throws NG0203, so there we pass the component's injector explicitly. Created the normal way, the effect is tied to the component and destroyed with it automatically. The leak happens when we attach it to a longer-lived injector, like the root injector: then it keeps running after the component is gone, so we have to destroy its EffectRef ourselves."
