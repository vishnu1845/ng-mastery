## Definition

The **Angular CLI** (Command Line Interface) is the official tool to **create, run, generate, build, test and update** Angular apps from the terminal, using the `ng` command.

## Installing the CLI

```bash
npm install -g @angular/cli        # install latest globally
npm install -g @angular/cli@18     # install a specific major
ng version                         # verify

npx @angular/cli@latest new my-app # create an app without a global install
```

**Key distinction (global vs local CLI):** inside a project folder, `ng` automatically uses the project's **local CLI version** from `node_modules`. So a global v22 CLI still works with a v18 project.

## ng new & its options

`ng new` creates a **new Angular workspace with a ready-to-run app**: folders, config files, dependencies and a root [[component|component]].

```bash
ng new my-app                           # asks a few questions (styles, SSR…)
ng new my-app --style=scss --ssr        # answer with flags, no prompts
ng new my-app --skip-tests --dry-run    # preview files only, no spec files
cd my-app
ng serve -o                             # run & open http://localhost:4200
```

| Flag                                   | What it does                                            |
| -------------------------------------- | ------------------------------------------------------- |
| `--style=scss`                         | Stylesheet format (css, scss, sass, less)               |
| `--ssr` / `--no-ssr`                   | Add or skip server-side rendering                       |
| `--skip-tests`                         | Don't create `.spec.ts` files                           |
| `--prefix=shop`                        | Selector prefix (`shop-header` instead of `app-header`) |
| `--inline-template` / `--inline-style` | Template / styles inside the `.ts` file                 |
| `--dry-run`                            | Show what would be created, without creating it         |

## Must-know commands

| Command       | Short  | What it does                                                              |
| ------------- | ------ | ------------------------------------------------------------------------- |
| `ng new`      | —      | Create a new workspace + app                                              |
| `ng serve`    | `ng s` | Dev server on `localhost:4200` with live reload                           |
| `ng generate` | `ng g` | Create components, [[service\|services]], pipes, guards…                  |
| `ng build`    | `ng b` | Build to `dist/` (production by default)                                  |
| `ng test`     | `ng t` | Run unit tests (Vitest in new projects)                                   |
| `ng add`      | —      | Install a package **and** run its setup (e.g. `ng add @angular/material`) |
| `ng update`   | —      | Update Angular packages **and** run code migrations                       |
| `ng version`  | `ng v` | Show Angular, CLI, Node & package versions                                |

```bash
ng serve --port 4300 -o          # custom port + open browser

ng g c features/user-card        # component
ng g s core/auth                 # service
ng g d shared/highlight          # directive
ng g p shared/truncate           # pipe
ng g guard core/auth             # guard
ng g interceptor core/auth       # interceptor

ng build                         # production build → dist/my-app/browser
ng update @angular/core @angular/cli   # upgrade Angular
```

## What ng generate creates (v22)

| Command                      | Files                                                          | Exported name                  |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------ |
| `ng g c features/user-card`  | `features/user-card/user-card.ts`, `.html`, `.css`, `.spec.ts` | `UserCard`                     |
| `ng g s core/auth`           | `core/auth.ts` + spec                                          | `Auth` (with `@Service()`)     |
| `ng g d shared/highlight`    | `shared/highlight.ts` + spec                                   | `Highlight`                    |
| `ng g p shared/truncate`     | `shared/truncate-pipe.ts` + spec                               | `TruncatePipe`                 |
| `ng g guard core/auth`       | `core/auth-guard.ts` + spec                                    | `authGuard` (a function)       |
| `ng g interceptor core/auth` | `core/auth-interceptor.ts` + spec                              | `authInterceptor` (a function) |

A component gets **its own folder**; everything else is created **flat** in the folder we give.

## npm install vs ng add vs ng update

`npm install` only **downloads** a package. `ng add` downloads it **and** configures the project for us. `ng update` updates packages **and** fixes our code with migrations.

## Say it like this

"The Angular CLI is our main tool. We install it once globally with npm, and then the `ng` command lets us create apps, generate code, run the dev server, build and test. To start a project, we run `ng new`, and flags like `--style=scss` or `--skip-tests` skip the questions. Day to day, we mostly use `ng serve` to run the app on port 4200, `ng generate` to create components, services and pipes, and `ng build` to create the production bundle in the dist folder. For libraries we prefer `ng add` over plain npm install, because it also configures the project, and `ng update` upgrades Angular and migrates our code. One nice detail: inside a project, the global `ng` hands over to the project's own local CLI version, so different projects can stay on different Angular versions."
