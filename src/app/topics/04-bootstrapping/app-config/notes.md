## Definition

`app.config.ts` exports an `ApplicationConfig` object whose **`providers` array sets up app-wide [[service|services]] and features** like routing, HTTP and [[hydration|hydration]]. It **replaced `AppModule`** in standalone apps.

## Example (default in a new project)

```ts
// app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
```

## Root providers (provideXxx() functions)

`provideXxx()` functions are **ready-made [[provider|provider]] helpers** that **register an Angular feature for the whole app**. We customize them with `withXxx()` feature functions.

```ts
// app.config.ts (a typical real app)
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(), // only when using SSR
  ],
};
```

| Provider                               | What it sets up                                                                           | Old NgModule way                |
| -------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------- |
| `provideRouter(routes)`                | Routing                                                                                   | `RouterModule.forRoot(routes)`  |
| `provideHttpClient(...)`               | Configures `HttpClient`: interceptors, XSRF, `withXhr()`                                  | `HttpClientModule` (deprecated) |
| `provideBrowserGlobalErrorListeners()` | Catches unhandled global errors (v20+)                                                    | —                               |
| `provideClientHydration()`             | Hydration for [[ssr\|SSR]] apps                                                           | —                               |
| `provideZoneChangeDetection()`         | Opt back into [[zone-js\|Zone.js]] (apps are [[zoneless\|zoneless]] by default since v21) | Zone.js was always on           |

## Key points

- **Since v21, `HttpClient` is injectable by default**, even without `provideHttpClient()` (and it uses Fetch). We still add `provideHttpClient(withInterceptors([...]))` when we need to **configure** it. Untick it in the demo: `inject(HttpClient)` still works.
- `Router` can be injected without `provideRouter()` too, but it has **0 routes** and there's **no `ActivatedRoute`**. So routing really needs `provideRouter(routes)`.
- With SSR, `app.config.server.ts` uses `mergeApplicationConfig(appConfig, serverConfig)` to add server-only providers. Both files of this project are in the **Code** tab.

## Say it like this

"`app.config.ts` is where we configure the whole app. It exports an `ApplicationConfig` with a `providers` array, and everything we register there is available app-wide. In standalone apps, every big feature has a provide function: `provideRouter()` sets up routing, `provideHttpClient()` configures HttpClient, for example with interceptors, and `provideClientHydration()` turns on hydration for SSR. Since v21, HttpClient itself is available by default. We tune them with `with` functions, like `withInterceptors()` or `withComponentInputBinding()`. So it does the job that `AppModule` and module imports like `RouterModule.forRoot()` used to do, but in a much simpler way."
