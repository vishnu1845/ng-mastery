import { CodeLang } from '@core/content/code-highlighter';

// WHO USES THE FILE
export type Owner = 'browser' | 'cli' | 'npm' | 'copied' | 'editor' | 'later';

export const OWNER_LABELS: Record<Owner, string> = {
  browser: 'Compiled & runs in the browser',
  cli: 'Read by the Angular CLI',
  npm: 'Read by npm',
  copied: 'Copied as-is into the build',
  editor: 'Editor & tooling only',
  later: 'Created later, git-ignored',
};

export interface ProjectEntry {
  path: string;
  depth: number;
  isFolder?: boolean;
  owner: Owner;
  role: string;
  /** The file exactly as `ng new` writes it (Angular 22.2) */
  content?: string;
  lang?: CodeLang;
}

// THE FILES `ng new my-app` CREATES (Angular 22.2, css, no SSR), plus what appears later
export const NEW_PROJECT: ProjectEntry[] = [
  {
    path: '.angular/',
    depth: 0,
    isFolder: true,
    owner: 'later',
    role: 'The CLI build cache. Created on the first build; safe to delete.',
  },
  {
    path: '.vscode/',
    depth: 0,
    isFolder: true,
    owner: 'editor',
    role: 'Recommended VS Code extensions, debug and task settings.',
  },
  {
    path: 'dist/',
    depth: 0,
    isFolder: true,
    owner: 'later',
    role: 'The build output. ng build writes the deployable app to dist/my-app/browser.',
  },
  {
    path: 'node_modules/',
    depth: 0,
    isFolder: true,
    owner: 'later',
    role: 'Every installed package. Created by npm install, rebuilt from the lock file, never committed.',
  },
  {
    path: 'public/',
    depth: 0,
    isFolder: true,
    owner: 'copied',
    role: 'Static files (images, fonts, favicon). Copied to the root of the build, so we reference them without the public/ prefix.',
  },
  {
    path: 'favicon.ico',
    depth: 1,
    owner: 'copied',
    role: 'The browser tab icon. Lands at the build root as /favicon.ico.',
  },
  { path: 'src/', depth: 0, isFolder: true, owner: 'browser', role: 'All the code we write.' },
  {
    path: 'app/',
    depth: 1,
    isFolder: true,
    owner: 'browser',
    role: 'The application: components, routes and providers.',
  },
  {
    path: 'app.config.ts',
    depth: 2,
    owner: 'browser',
    role: 'App-wide providers (router, HTTP, …). Replaces the old AppModule.',
    lang: 'angular-ts',
    content: `import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};`,
  },
  {
    path: 'app.css',
    depth: 2,
    owner: 'browser',
    role: 'Styles for the root component only (empty to start).',
  },
  {
    path: 'app.html',
    depth: 2,
    owner: 'browser',
    role: 'The root template. A big placeholder page we delete, ending in <router-outlet />.',
  },
  {
    path: 'app.routes.ts',
    depth: 2,
    owner: 'browser',
    role: 'The route list. Empty until we add pages.',
    lang: 'angular-ts',
    content: `import { Routes } from '@angular/router';

export const routes: Routes = [];`,
  },
  {
    path: 'app.spec.ts',
    depth: 2,
    owner: 'cli',
    role: 'Unit tests for the root component. Run by ng test, never part of the app bundle.',
  },
  {
    path: 'app.ts',
    depth: 2,
    owner: 'browser',
    role: 'The root component, class App (no .component suffix since v20).',
    lang: 'angular-ts',
    content: `import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');
}`,
  },
  {
    path: 'index.html',
    depth: 1,
    owner: 'browser',
    role: 'The single HTML page of the SPA. Angular renders the app inside <app-root>.',
    lang: 'angular-html',
    content: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
  },
  {
    path: 'main.ts',
    depth: 1,
    owner: 'browser',
    role: 'The entry point. Starts the app with bootstrapApplication().',
    lang: 'angular-ts',
    content: `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));`,
  },
  { path: 'styles.css', depth: 1, owner: 'browser', role: 'Global styles for the whole app.' },
  {
    path: '.editorconfig',
    depth: 0,
    owner: 'editor',
    role: 'Indentation and line-ending rules every editor follows.',
  },
  {
    path: '.gitignore',
    depth: 0,
    owner: 'editor',
    role: 'Keeps node_modules, dist and .angular/cache out of git.',
  },
  {
    path: '.prettierrc',
    depth: 0,
    owner: 'editor',
    role: 'Prettier formatting rules (100 columns, single quotes).',
  },
  {
    path: 'angular.json',
    depth: 0,
    owner: 'cli',
    role: 'The brain of the CLI: how to build, serve and test the app.',
  },
  {
    path: 'package-lock.json',
    depth: 0,
    owner: 'later',
    role: 'Exact versions of every installed package. Created by npm install; commit it, never edit it.',
  },
  {
    path: 'package.json',
    depth: 0,
    owner: 'npm',
    role: 'The heart: dependencies with version ranges, and scripts like npm start.',
    lang: 'json',
    content: `{
  "name": "my-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "packageManager": "npm@10.9.4",
  "dependencies": {
    "@angular/common": "^22.2.0",
    "@angular/compiler": "^22.2.0",
    "@angular/core": "^22.2.0",
    "@angular/forms": "^22.2.0",
    "@angular/platform-browser": "^22.2.0",
    "@angular/router": "^22.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^22.2.3",
    "@angular/cli": "^22.2.3",
    "@angular/compiler-cli": "^22.2.0",
    "jsdom": "^30.0.0",
    "prettier": "^3.8.1",
    "typescript": "~6.0.2",
    "vitest": "^5.0.0"
  }
}`,
  },
  { path: 'README.md', depth: 0, owner: 'editor', role: 'How to run, build and test the project.' },
  {
    path: 'tsconfig.app.json',
    depth: 0,
    owner: 'cli',
    role: 'Extends tsconfig.json for app code and leaves out *.spec.ts files.',
  },
  {
    path: 'tsconfig.json',
    depth: 0,
    owner: 'cli',
    role: 'Base TypeScript config: strict mode, target, Angular compiler options.',
  },
  {
    path: 'tsconfig.spec.json',
    depth: 0,
    owner: 'cli',
    role: 'Extends tsconfig.json for tests, with the Vitest types.',
  },
];
