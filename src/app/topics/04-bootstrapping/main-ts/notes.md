## Definition

`main.ts` is the **entry point** of the app. It calls `bootstrapApplication()`, which **starts Angular with the root component and the app config**.

## Example

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

## Key points

- **1st argument** → the root component (`App`).
- **2nd argument** → the `ApplicationConfig` with app-wide providers.
- Returns a **Promise**; `.catch()` logs any startup error.
- **Under the hood** it does two steps, the same ones the demo runs by hand: create the app (injector, providers, initializers), then create the root component in the page.

```ts
// what the demo does: the two steps of bootstrapApplication(), one by one
const appRef = await createApplication(appConfig); // injector + providers + initializers
appRef.bootstrap(MiniCounter, hostElement); // root component rendered
```

## Say it like this

"`main.ts` is the entry point the build starts from. In a standalone app, it just calls `bootstrapApplication()` with two things: our root component `App` and the `appConfig`. That one call starts Angular, sets up the providers and renders the root component. If anything fails during startup, the catch block logs the error."
