# NgMastery

**Angular that finally clicks.**

An open-source Angular 22 playground that covers the framework in 52 topics, from your first component to SSR. Every lesson pairs a working demo with the exact code behind it and a short answer you can say in an interview.

![Angular](https://img.shields.io/badge/Angular-22-dd0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6%20strict-3178c6?logo=typescript&logoColor=white)
![Zoneless](https://img.shields.io/badge/Zoneless-signals-7702ff)
![SSR](https://img.shields.io/badge/SSR-prerendered-111)

## What makes it different

- **Live demo + real code + interview answer on every lesson.** The Code tab loads the actual source files that power the demo, so nothing is copied twice.
- **One registry drives everything.** Routes, sidebar, search, previous/next links and the home map are generated from one list of 52 topics.
- **Modern Angular only.** Standalone components, signals, zoneless change detection, OnPush by default, `@Service()`, functional guards and interceptors.
- **Prerendered and hydrated.** Every lesson is static HTML at build time, so it loads fast and can be hosted anywhere.
- **No backend needed.** A mock API runs as an HTTP interceptor with real latency and errors you can force on purpose.
- **Dark by default.** Light and system modes plus three accent colors, with no theme flash on load.

## Syllabus

| Part | Topics |
|---|---|
| Foundations | 01–04: Introduction, TypeScript, CLI, bootstrapping |
| Components & Templates | 05–14: components, binding, signals, control flow, directives, pipes, communication, lifecycle, projection, dynamic components |
| Services & DI | 15–16 |
| Routing | 17–20: routing, params, lazy loading, guards & resolvers |
| Forms | 21–24: template-driven, reactive, ControlValueAccessor, Signal Forms |
| HTTP | 25–26: HttpClient, interceptors |
| RxJS | 27–32: observables, subjects, basic / combination / flattening operators, errors & sharing |
| Advanced reactivity | 33–35: advanced signals, resources, interop |
| Rendering | 36–37: change detection, `@defer` |
| State, performance, SSR | 38–40 |
| Build, testing, security | 41–46 |
| Extras & wrap-up | 47–52: animations, i18n, Material/CDK, architecture, what's new, machine-test scenarios |

## Getting started

Requires **Node.js 24.15+** (or 22.22.3+).

```bash
git clone https://github.com/vishnu1845/ng-mastery.git
cd ng-mastery
npm install
npm start          # http://localhost:4200
```

| Script | What it does |
|---|---|
| `npm start` | Dev server with SSR and hot reload |
| `npm run build` | Production build with prerendering |
| `npm run serve:ssr` | Serve the production build (http://localhost:4000) |
| `npm test` | Unit tests (Vitest) in watch mode |
| `npm run test:ci` | Unit tests once |
| `npm run lint` | angular-eslint |
| `npm run format` | Prettier |

## Project structure

```
src/app/
├── core/       # app-wide services: theme, progress, mock API, highlighter
├── layout/     # app shell, sidebar, top bar, search palette, topic shell
├── shared/     # reusable UI
├── pages/      # home, about, not found
└── topics/     # 01-introduction … 52-scenarios (one folder per topic)
    └── 01-introduction/
        ├── topic.ts
        └── spa-vs-mpa/
            ├── spa-vs-mpa-demo.ts / .html / .scss
            └── notes.md
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full structure, conventions and how to add a lesson.

## Author

Built by **Vishnu Bandgar**: [GitHub](https://github.com/vishnu1845) · [LinkedIn](https://www.linkedin.com/in/vishnu-bandgar)
