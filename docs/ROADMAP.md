# Roadmap

The plan for taking NgMastery from its first live topics to a finished, public site.

## Goal

The first place an Angular developer opens to **understand** a concept and to **answer it in an interview**.

angular.dev stays the official reference, and MDN-style docs are complete but heavy to read. NgMastery wins on four things together, which no other Angular site has:

1. **Simple English.** A short definition first, then code, then key points.
2. **Proof, not claims.** Every lesson has a live demo that measures the real behaviour.
3. **Interview ready.** Every lesson ends with "Say it like this", an answer to say out loud.
4. **Verified.** Every Angular 22 fact is checked against the installed source and compiler, not copied from blog posts.

Every feature and lesson below is judged against these four.

## Where we are

|                | Done | Total                 |
| -------------- | ---- | --------------------- |
| Topics         | 9    | 52                    |
| Lessons        | 70   | 378                   |
| Glossary terms | 78   | grows with each topic |

Already shipped: dark and light themes with accent presets, SSR with every page prerendered, Ctrl+K search, progress tracking ("Mark as done", continue where you left off), Notes and Code tabs with copy buttons, previous/next links, MDN-style glossary links with hover cards, phone layout, CI (lint, format, tests, build).

## Syllabus check

**Resources, `@defer` and directives were already in the syllabus.** They are topics 34, 37 and 09. They look missing because the sidebar lists only finished topics. The home page shows all 52, with unfinished ones dimmed.

The full syllabus was then compared with the Angular 22 APIs installed in this repo. These 22 lessons were missing and are now in the outlines. No topic was added or renumbered, so the 52 topics still match the Notion pages one to one.

| Topic                 | Added lessons                                              | Why                                                                            |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 08 Control Flow       | `for-context-empty`                                        | `$index`, `$first`, `$even` and `@empty` are asked with every `@for` question  |
| 14 Dynamic Components | `angular-elements`                                         | "What are Angular Elements?" is a standard question                            |
| 17 Routing Basics     | `location-strategies`, `scroll-fragments`                  | Hash vs path strategy; scroll restoring and `#anchor` links                    |
| 19 Lazy Loading       | `route-reuse-strategy`                                     | Keeping a page alive between visits                                            |
| 22 Reactive Forms     | `typed-forms`, `update-on`                                 | Typed forms and `nonNullable`; validating on blur or submit                    |
| 24 Signal Forms       | `reactive-interop`                                         | Using an existing `FormControl` inside a signal form                           |
| 29 RxJS Operators     | `custom-operator`                                          | "Write your own operator" is a common coding question                          |
| 34 Resources          | `status-reload`, `local-updates`, `streaming`, `snapshots` | The six statuses, `reload()`, `set()`, streamed values, keeping the old value  |
| 37 Deferrable Views   | `loading-states`, `what-gets-deferred`, `testing-defer`    | `@placeholder` / `@loading` / `@error` timing; why a block is not split; tests |
| 40 SSR & Hydration    | `pending-tasks`                                            | Why the server waits, and how to debug an app that never becomes stable        |
| 42 Deployment         | `pwa-service-worker`                                       | Offline support and caching                                                    |
| 51 What's New         | `ai-tooling`                                               | `ng mcp` and the AI helpers that ship with the CLI                             |
| 52 Scenarios          | `data-table`, `multi-step-form`, `optimistic-update`       | Common machine-test tasks                                                      |

Experimental APIs (`snapshots`, `debounced`, parts of Signal Forms) get an "Experimental" label in the lesson, because their shape can still change.

## The lesson standard

A lesson is done only when all of this is true:

- [ ] **Definition** is the exact short one from the Notion notes.
- [ ] **Live demo** shows real, measured behaviour (DOM changes, timings, counts), never a fake animation.
- [ ] **Notes** follow: Definition → code → Key points → Say it like this. Simple English, one idea per sentence.
- [ ] **Facts are verified** against the installed Angular source or compiler output.
- [ ] **Old vs new** is shown where interviewers still ask about the old way (`*ngIf`, `@Input()`, NgModules).
- [ ] **Glossary:** new words are added, and the first mention of each known word is linked.
- [ ] **Code** is the simplest version that works: signals, `inject()`, `@if` / `@for`, no `any`, `// SECTION NAME` comments.
- [ ] **Checks pass:** lint, format, unit tests, build, no console errors, no sideways scroll at 360px.
- [ ] **Notion** page for the topic is updated to match.

## Site features

In priority order. Each one makes the site easier to read or more useful before an interview.

### 1. Reading

| Feature                        | What the reader gets                                                         |
| ------------------------------ | ---------------------------------------------------------------------------- |
| "On this page" list            | The sections of the lesson, with the current one highlighted while scrolling |
| Heading links                  | Every heading has a `#link`, so one exact answer can be shared               |
| Keyboard navigation            | `←` / `→` for previous and next lesson                                       |
| "Verified on Angular 22.x" tag | Shows which version the lesson was checked against                           |
| "Edit on GitHub" link          | One click to fix a typo, which is how open-source docs get contributors      |

### 2. Interview mode

This is what no official documentation has, so it is our strongest feature.

| Feature             | What the reader gets                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Questions per topic | Every question of a topic on one page, answers hidden until clicked                       |
| `/interview` page   | All questions across topics, filtered by topic and level (fresher, 2 years, senior)       |
| Flashcards          | Question on the front, "Say it like this" on the back, with "knew it" / "revise" tracking |
| Cheat sheet         | One printable page per topic                                                              |

The questions are built from the notes that already exist ("Say it like this" and the rapid-fire lists), so nothing is written twice.

### 3. Going public

The site runs only on localhost today. Nobody can choose it until it has a URL.

| Feature | Notes                                                                                  |
| ------- | -------------------------------------------------------------------------------------- |
| Deploy  | Every page is already prerendered, so free static hosting works                        |
| SEO     | A description per lesson, sitemap, canonical URLs, a share image                       |
| README  | Screenshots and a short clip of a demo, since the README is the first thing people see |

### 4. Later

- "Open in StackBlitz" on demos, to edit the code live.
- A true-black theme next to the current gray dark theme.
- Old vs new syntax switch on code samples.
- A "what changed" page listing new and updated lessons.

## Folder structure

No restructure is needed. The current layout is the modern Angular shape (feature folders, no `components/` or `services/` buckets, v20+ file names), and adding a lesson touches only its own folder.

Rules that keep it clean as it grows to 378 lessons:

- **One lesson, one folder:** `lesson-slug-demo.ts/.html/.scss` plus `notes.md`. Helper files sit next to the demo and are named for what they are (`stopwatch.ts`, `effect-lab.ts`).
- **Used by one topic:** put it in that topic's `_shared/`.
- **Used by two or more topics:** move it to `shared/ui` (components) or `shared/utils` (functions).
- **No UI and app-wide:** `core/`.
- **A file past roughly 150 lines** is a sign the demo is doing two things. Split it.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full tree.

## Sequence

Topics are built in syllabus order, because each one uses words from the ones before it. One site feature ships with each phase, so the site improves while the content grows.

| Phase | Topics | Content                                              | Lessons | Site feature shipped with it      |
| ----- | ------ | ---------------------------------------------------- | ------- | --------------------------------- |
| 0     |        | Go public                                            |         | Deploy, SEO basics, README        |
| 1     | 08–14  | Components & Templates (control flow, directives…)   | 50      | Reading features                  |
| 2     | 15–20  | Services & DI, Routing                               | 42      | Questions per topic               |
| 3     | 21–26  | Forms, HTTP                                          | 48      | `/interview` page                 |
| 4     | 27–32  | RxJS                                                 | 40      | Flashcards                        |
| 5     | 33–37  | Advanced signals, resources, change detection, defer | 37      | Cheat sheets                      |
| 6     | 38–42  | State, performance, SSR, build, deployment           | 38      | "Open in StackBlitz"              |
| 7     | 43–49  | Testing, security, animations, i18n, Material        | 40      | True-black theme, syntax switch   |
| 8     | 50–52  | Architecture, what's new, scenarios                  | 28      | "What changed" page, final polish |

Phase 0 comes first because it is small and everything after it then ships to real users.

### The loop for every topic

1. Read the Notion page for the topic and take the exact definitions.
2. Verify each Angular 22 fact against the installed source.
3. Build the demos, one lesson at a time.
4. Write the notes, add glossary terms, link known words.
5. Run the checks and look at every lesson on a phone-sized screen.
6. Push, wait for CI, update the Notion page.

## Open decisions

- **Hosting:** GitHub Pages (free, `vishnu1845.github.io/ng-mastery`) or a custom domain.
- **Theme:** keep the gray dark theme as the default and add true black as an option, or switch the default.
- **Order:** keep syllabus order, or pull topics 34 (resources) and 37 (`@defer`) forward.
