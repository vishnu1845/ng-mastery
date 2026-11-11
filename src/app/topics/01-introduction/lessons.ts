import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/01-introduction';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'what-is-angular': {
    component: () => import('./what-is-angular/what-is-angular-demo'),
    notes: () => import('./what-is-angular/notes.md'),
  },
  'spa-vs-mpa': {
    component: () => import('./spa-vs-mpa/spa-vs-mpa-demo'),
    notes: () => import('./spa-vs-mpa/notes.md'),
    files: [`${FOLDER}/spa-vs-mpa/mini-browser.ts`, `${FOLDER}/spa-vs-mpa/mini-browser.html`],
  },
  'framework-vs-library': {
    component: () => import('./framework-vs-library/framework-vs-library-demo'),
    notes: () => import('./framework-vs-library/notes.md'),
  },
  'angular-vs-angularjs': {
    component: () => import('./angular-vs-angularjs/angular-vs-angularjs-demo'),
    notes: () => import('./angular-vs-angularjs/notes.md'),
  },
  'release-cycle': {
    component: () => import('./release-cycle/release-cycle-demo'),
    notes: () => import('./release-cycle/notes.md'),
    files: [`${FOLDER}/release-cycle/releases.ts`],
  },
} satisfies TopicContent;
