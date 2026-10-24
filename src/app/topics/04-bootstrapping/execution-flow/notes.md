## Definition

**Bootstrapping** is the process of **starting an Angular app**: loading the entry file, setting up the app-wide [[provider|providers]], and rendering the root [[component|component]] into `index.html`.

## What happens when we run ng serve

```text
ng serve  /  npm start
   ↓
package.json      → "start": "ng serve"   (only when we use npm start)
   ↓
angular.json      → entry file (main.ts), styles, assets, builder
   ↓
Build in memory   → esbuild compiles TS + templates (AOT) and bundles them
   ↓
Dev server        → serves index.html on localhost:4200 (CLI injected the <script> tags)
   ↓
main.ts           → bootstrapApplication(App, appConfig)
   ↓
app.config.ts     → providers set up, app initializers run
   ↓
App component     → created and rendered inside <app-root>
   ↓
Router            → loads the page for the current URL into <router-outlet>
```

**Memory hook:** package.json → angular.json → build → index.html → main.ts → app.config → App → `<app-root>` → `<router-outlet>`

## Key points

- Angular renders **inside** `<app-root>`; it does **not replace** the tag.
- `ng serve` builds **in memory**; it doesn't write files to `dist/` (only `ng build` does).
- **With [[ssr|SSR]] / [[prerendering|prerendering]]** (like this site), the HTML already has the page in it, so the browser paints it **before** `main.ts` runs. Angular then **hydrates**: it reuses that [[dom|DOM]] instead of drawing it again.
- New apps are **[[zoneless|zoneless]]**: no [[zone-js|Zone.js]] is loaded, [[signal|signals]] and events tell Angular when to update the screen.

## Say it like this

"The Angular execution process starts when we run `ng serve` or `npm start`, which triggers the CLI. If we use npm start, npm first reads `package.json` and runs the start script, which is `ng serve`. Then the CLI reads `angular.json`. This is the CLI's config file, it tells the builder which file is our entry point, where our styles and assets are, and how to build the project. Next, the builder compiles and bundles our code, and the dev server serves `index.html` on localhost:4200. Then the browser executes `main.ts`, our entry point, where we bootstrap the app using `bootstrapApplication()`, passing in our root component `App` and the app config. Angular sets up all the providers from the app config, creates the `App` component and renders it inside the `<app-root>` tag in `index.html`. Finally, the router loads the page for the current URL, and the browser displays the complete application."
