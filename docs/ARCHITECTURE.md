# Architecture

How NgMastery is organised, and the rules that keep it clean as it grows to 52 topics and ~350 lessons.

## The four rules

1. **1 Notion topic = 1 topic folder.** `src/app/topics/01-introduction` … `52-scenarios`, same names and order as the notes.
2. **1 subtopic = 1 lesson = 1 small demo component + `notes.md`.** A lesson component stays around 50–100 lines. If it grows past ~150, split it into child components inside the lesson folder.
3. **One registry drives everything.** `topics/topic-registry.ts` lists the 52 topics. Routes, sidebar, search, previous/next and the home map are generated from it.
4. **Code lives where it is used.**
   - Used by one lesson → the lesson folder.
   - Used by 2+ lessons of one topic → that topic's `_shared/` folder.
   - Used across topics → `src/app/shared/` (UI) or `src/app/core/` (app-wide services).

## Folder structure

```
src/
├── index.html            # inline script applies the saved theme before Angular starts
├── main.ts · main.server.ts · server.ts
├── styles.scss           # imports the design system below
├── styles/               # _tokens (colors, type, spacing), _reset, _typography, _components, _code, _utilities
├── types/markdown.d.ts   # lets us import notes.md as text
└── app/
    ├── app.ts · app.config.ts · app.routes.ts · app.config.server.ts · app.routes.server.ts
    ├── core/             # app-wide, no UI
    │   ├── models/       # Topic, Lesson, Part types
    │   ├── theme/        # ThemeStore (dark / light / system + accent)
    │   ├── progress/     # ProgressStore ("mark as done", last lesson)
    │   ├── content/      # notes parser, markdown renderer, Shiki highlighter
    │   ├── mock-api/     # fake backend (interceptor + in-memory tables)
    │   ├── platform/     # SSR-safe localStorage
    │   ├── seo/          # page title strategy
    │   ├── boot/         # performance marks at each startup step (read by Topic 04)
    │   ├── icons.ts      # icons used by the app frame
    │   └── app-links.ts  # GitHub / LinkedIn links
    ├── layout/           # the frame around pages
    │   ├── app-shell/    # sidebar + top bar + outlet, mobile drawer, keyboard shortcuts
    │   ├── sidebar/ · topbar/ · theme-menu/ · command-palette/ · logo/
    │   └── topic-shell/  # renders every lesson page + builds the topic routes
    ├── shared/           # reusable UI (markdown, code-block, code-viewer, and later demo helpers)
    ├── pages/            # home, about, not-found
    └── topics/
        ├── parts.ts          # the 17 parts
        ├── topic-registry.ts # TOPICS: 01 → 52
        ├── catalog.ts        # lookups, prev/next, search
        └── NN-topic-slug/
            ├── topic.ts      # topic info, outline (planned lessons) and finished lessons
            ├── _shared/      # optional: code shared by lessons of this topic
            └── lesson-slug/
                ├── lesson-slug-demo.ts / .html / .scss
                └── notes.md
```

## How a lesson page renders

```
TOPICS ──► topicRoutes() ──► /rxjs-flattening/switch-map
                                   │
                                   ▼
                              TopicShell  (topic header, lesson links, definition)
                                   │
                    ┌──────────────┼───────────────┐
                    ▼              ▼               ▼
             <router-outlet>   Notes tab        Code tab
             (lazy demo)       (notes.md)       (real source files from /code)
```

- **Notes**: `notes.md` is imported as text (`"loader": { ".md": "text" }` in `angular.json`), so it is part of the prerendered HTML. Fenced code (` ```ts `, ` ```html `, ` ```json `, ` ```bash `, ` ```text ` for folder trees) is pulled out of the markdown and shown as a highlighted, copyable code block. Tables are wrapped in `.table-wrap`, so wide ones scroll on phones.
- **Code**: `angular.json` copies `src/**` and the root config files into `/code` as static assets. The Code tab fetches them, and Shiki highlights them in the browser. What you read is exactly what runs.

## How to add a lesson

1. Create `src/app/topics/NN-topic/lesson-slug/` with:
   - `lesson-slug-demo.ts`, using `export default class LessonSlugDemo`
   - `lesson-slug-demo.html` (and `.scss` if needed)
   - `notes.md` with these headings: `## Definition`, `## Key points`, `## Say it like this`
2. Add the lesson to that topic's `topic.ts`:

   ```ts
   {
     slug: 'switch-map',
     title: 'switchMap',
     component: () => import('./switch-map/switch-map-demo'),
     notes: () => import('./switch-map/notes.md'),
     files: [], // optional extra files for the Code tab (project paths)
   },
   ```

3. Keep `lessons` in the same order as `outline`. The registry test fails otherwise.
4. Run `npm start`. The route, sidebar entry, search result and previous/next links appear automatically.

Optional lesson fields: `children` (child routes for routing demos), `providers` (route-level providers, e.g. an NgRx store), and no `component` for a theory-only lesson.

## Coding conventions

- **Modern Angular only:** standalone components, signals for state, `inject()`, `@if` / `@for` / `@switch`, `@Service()` for services, functional guards / interceptors / resolvers. OnPush and zoneless are the Angular 22 defaults.
- **Naming:** kebab-case files with v20+ naming (`theme-store.ts` → `ThemeStore`). Demo components end in `Demo`.
- **Imports:** use the path aliases `@core/*`, `@layout/*`, `@shared/*`, `@topics/*`.
- **Comments:** English, with section headers written as `// SECTION NAME`.
- **No `any`.** Strict TypeScript and strict templates are on.
- **Legacy syntax** (`*ngIf`, `@Input()`, class guards) appears only in lessons that compare old and new, because interviewers still ask about it.

## Design system

- Every color, size and radius is a CSS variable in `src/styles/_tokens.scss`.
- Dark is the default theme. Light mode and the accent presets (Angular, Ocean, Lime) only swap variables.
- Backgrounds are neutral warm grays that get lighter as a surface rises: `--sidebar-bg` < `--bg` < `--surface` < `--raised`. Only the accent carries color, so text stays easy to read.
- Plain elements already look right: a `<button>` looks like a button. Variants are `.btn-primary`, `.btn-ghost` and `.icon-btn`. Surfaces are `.panel` and `.callout`, plus `.badge`, `.data-table` and `.segmented` (a `role="radiogroup"` of buttons). Layout helpers for demos: `.stack`, `.row`, `.cols` (responsive columns), `.field` (label above input) and `.table-wrap` (a table that scrolls sideways on small screens).
- The brand gradient appears only where it means something: the logo, live topics, the active topic and the demo stage.

## Mock API

`core/mock-api/mock-api-interceptor.ts` answers every `api/...` request, so API demos work without a server, including on the deployed site.

| Request                     | Result                                     |
| --------------------------- | ------------------------------------------ |
| `GET api/users`             | List (supports `?q=`, `?page=`, `?limit=`) |
| `GET api/users/3`           | One row                                    |
| `POST api/users`            | Create                                     |
| `PUT` / `PATCH api/users/3` | Replace / merge                            |
| `DELETE api/users/3`        | Delete                                     |
| `POST api/auth/login`       | Fake JWT (the password is `angular`)       |

Collections: `users`, `products`, `posts`, `todos`. Add `?delay=2000` to any URL to simulate a slow network, or `?fail=500` to force an error.

## SSR and prerendering

- Every route is prerendered at build time (`app.routes.server.ts`).
- Browser-only code (localStorage, matchMedia, the clipboard) is guarded. `ProgressStore` loads after the first render, so server and browser HTML match during hydration.
- **Deploying the SSR server:** add your domain to `security.allowedHosts` in `angular.json` (or set the `NG_ALLOWED_HOSTS` env var). Angular rejects unknown hosts to prevent SSRF.
- **Static hosting:** `dist/ng-mastery/browser` contains a prerendered HTML file per route.

## Quality gates

| Command                | Checks                                                   |
| ---------------------- | -------------------------------------------------------- |
| `npm run lint`         | angular-eslint (TypeScript + template accessibility)     |
| `npm run test:ci`      | Vitest unit tests, including the registry structure test |
| `npm run build`        | Production build, budgets and prerendering               |
| `npm run format:check` | Prettier formatting                                      |

CI (`.github/workflows/ci.yml`) runs all four on every push.

## Packages added later, when their topics arrive

| Topic                               | Package                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| 38 State management                 | `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`, `@ngrx/signals`, `@ngrx/store-devtools` |
| 39 / 49 Performance, Material & CDK | `@angular/material`, `@angular/cdk`                                                     |
| 44 Testing (E2E)                    | `@playwright/test`                                                                      |
