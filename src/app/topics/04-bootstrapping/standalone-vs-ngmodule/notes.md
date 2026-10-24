## Definition

An **NgModule** is a class marked with `@NgModule` that **groups related [[component|components]], [[directive|directives]], pipes and [[service|services]]**, and tells Angular how to compile and bootstrap the app. Older apps start from a root `AppModule`.

## Legacy NgModule bootstrap

```ts
// main.ts (classic, e.g. Angular 9)
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// app.module.ts
@NgModule({
  declarations: [AppComponent], // components of this module
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [], // module-level services
  bootstrap: [AppComponent], // root component to start
})
export class AppModule {}
```

**v22 update:** `platformBrowserDynamic` is now **deprecated**. NgModule apps on v22 use `platformBrowser().bootstrapModule(AppModule)` from `@angular/platform-browser`.

| `@NgModule` key | Meaning                                                   |
| --------------- | --------------------------------------------------------- |
| `declarations`  | Components, directives & pipes that belong to this module |
| `imports`       | Other modules this module needs                           |
| `exports`       | What this module shares with others                       |
| `providers`     | Services                                                  |
| `bootstrap`     | Root component to start (root module only)                |

## Standalone apps vs NgModule apps

|                        | Standalone (default since v17)         | NgModule (legacy)                     |
| ---------------------- | -------------------------------------- | ------------------------------------- |
| Bootstrap              | `bootstrapApplication(App, appConfig)` | `bootstrapModule(AppModule)`          |
| App-wide setup         | `app.config.ts` → `providers`          | `AppModule` → `imports` & `providers` |
| Component dependencies | Each component's own `imports`         | Module `declarations` + `imports`     |
| Routing                | `provideRouter(routes)`                | `RouterModule.forRoot(routes)`        |
| Lazy loading           | Per component (`loadComponent`)        | Per module (`loadChildren`)           |
| Boilerplate            | Less                                   | More                                  |
| Tree-shaking           | Better                                 | Weaker                                |

**Mixing is allowed:** a standalone component can import an NgModule (like `FormsModule`), and an NgModule can import standalone components. That's how big apps migrate step by step. Since v19, components are standalone by default, so a component that belongs to a module must say `standalone: false`.

## Say it like this

"In older Angular apps, `main.ts` bootstraps a root module instead of a component, and the `AppModule` declares the components, imports other modules and lists the root component in its `bootstrap` array. But NgModules added unnecessary boilerplate code. Every component had to be declared in a module, and managing imports across multiple modules became complex in large apps. Standalone components remove this dependency on NgModule: each component directly imports what it needs using the `imports` array, making the code simpler, more tree-shakable, and easier to lazy-load individually without needing a whole module wrapper. NgModules are not removed, though. They still work, and both can be mixed, which makes migration easy."

## Rapid-fire (whole topic)

- **Entry point of an Angular app?** → `main.ts`
- **Who adds the `<script>` tags to `index.html`?** → The CLI, at build time
- **Does Angular replace `<app-root>`?** → No, it renders **inside** it
- **What runs first: an app initializer or the root component?** → The app initializer
- **Can we bootstrap without `app.config.ts`?** → Yes, `bootstrapApplication(App)` works; [[provider|providers]] are optional
- **Where do we add `HttpClient` in a standalone app?** → Since v21 we don't have to: `inject(HttpClient)` just works. We add `provideHttpClient(...)` in `app.config.ts` only to configure it (interceptors, XSRF)
- **Are NgModules removed?** → No, still supported; standalone is just the default
