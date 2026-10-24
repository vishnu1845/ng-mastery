## Definition

In a new Angular project, **everything we write lives in `src/app`**. `main.ts` is the **entry point**, `index.html` is the **single HTML page** that holds `<app-root>`, and at the root level `angular.json` is the **brain** of the CLI and `package.json` is the **heart** with our dependencies.

## Folder structure (ng new, v22)

```text
my-app/
├── public/                 # static files (favicon, images), copied as-is
├── src/
│   ├── app/
│   │   ├── app.ts          # root component (class App)
│   │   ├── app.html        # root template → <router-outlet />
│   │   ├── app.css         # root styles
│   │   ├── app.spec.ts     # root unit test
│   │   ├── app.config.ts   # app-wide providers (replaces AppModule)
│   │   └── app.routes.ts   # route config
│   ├── index.html          # SPA shell → contains <app-root>
│   ├── main.ts             # entry point → bootstrapApplication()
│   └── styles.css          # global styles
├── angular.json            # CLI workspace config → "brain"
├── package.json            # dependencies + scripts → "heart"
├── package-lock.json       # exact locked versions (never edit)
├── tsconfig.json           # base TypeScript config
├── tsconfig.app.json       # TS config for app code
└── tsconfig.spec.json      # TS config for tests
```

Also created: `node_modules/` (installed packages), `.angular/` (build cache, safe to delete), `.vscode/`, `.editorconfig`, `.gitignore`, `.prettierrc`, `README.md`.

## v20+ file naming

|                               | v20+ naming       | Older naming (v19 and below)        |
| ----------------------------- | ----------------- | ----------------------------------- |
| Component file                | `user-profile.ts` | `user-profile.component.ts`         |
| Class name                    | `UserProfile`     | `UserProfileComponent`              |
| Root [[component\|component]] | `app.ts` → `App`  | `app.component.ts` → `AppComponent` |
| Static files                  | `public/`         | `src/assets/`                       |

## tsconfig.json, tsconfig.app.json & tsconfig.spec.json

| File                 | Role                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `tsconfig.json`      | **Base config** shared by all: [[strict-mode\|strict mode]], path aliases, Angular compiler options |
| `tsconfig.app.json`  | **Extends the base** for app code (excludes `*.spec.ts`)                                            |
| `tsconfig.spec.json` | **Extends the base** for tests (includes `*.spec.ts` & test types)                                  |

```json
// tsconfig.app.json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
```

## public/ folder (static assets)

The `public/` folder holds **static files** (favicon, images, fonts, JSON) that are **copied as-is** to the build output. It replaced `src/assets/` in new projects from v18.

```html
<!-- file location: public/images/logo.png -->
<img src="images/logo.png" alt="Logo" />

<!-- older projects: src/assets/images/logo.png -->
<img src="assets/images/logo.png" alt="Logo" />
```

**Key point:** we don't write `public/` in the path; its contents land at the **root** of the built app.

## Say it like this

"In a new Angular project, everything we write lives in `src/app`: the root component, `app.config.ts` for app-wide providers, and `app.routes.ts` for routing. Then `main.ts` is the entry point, and `index.html` is the single HTML page that holds `<app-root>`. At the root level, `angular.json` is the brain of the CLI, `package.json` is the heart with our dependencies, and static files go in the `public` folder, copied as-is without the `public` prefix. We also get one base `tsconfig.json`, extended by `tsconfig.app.json` for the app and `tsconfig.spec.json` for tests. And since v20, files drop the `.component` suffix, so it's just `app.ts` with a class called `App`."
