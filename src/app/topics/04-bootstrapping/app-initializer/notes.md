## Definition

`provideAppInitializer()` runs a function **during app startup, before the root component renders**. If it returns a Promise or Observable, Angular **waits for it to finish**. It replaced the `APP_INITIALIZER` token (deprecated in v19).

## Example

```ts
// NEW WAY (v19+)
provideAppInitializer(() => {
  const config = inject(ConfigService); // inject() works here
  return config.load(); // app waits until this finishes
}),

// OLD WAY (APP_INITIALIZER)
{
  provide: APP_INITIALIZER,
  useFactory: (config: ConfigService) => () => config.load(),
  deps: [ConfigService],
  multi: true,
},
```

## Key points

- **Use cases:** load runtime config, restore the logged-in user from a token, set the app language.
- ⚠️ Keep it **fast**: a slow initializer means a blank screen for the user.
- If the Promise **rejects**, the app **doesn't start at all**: the bootstrap Promise in `main.ts` rejects with that error.
- This project uses one too: `app.config.ts` marks the boot timeline with `provideAppInitializer()`.

## Say it like this

"Sometimes we need data before the app even starts, like a config file or the logged-in user. For that we use `provideAppInitializer()` in the app config. Angular runs it during bootstrap, and if it returns a Promise or Observable, Angular waits for it before rendering the root component. It's the simpler replacement for the old `APP_INITIALIZER` token, because now we can just call `inject()` inside it."
