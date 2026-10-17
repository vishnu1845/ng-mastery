import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/01-introduction';

export const introductionTopic: Topic = {
  id: 1,
  slug: 'introduction',
  title: 'Angular Introduction & Versions',
  part: 'foundations',
  outline: [
    'what-is-angular',
    'spa-vs-mpa',
    'framework-vs-library',
    'angular-vs-angularjs',
    'release-cycle',
  ],
  lessons: [
    {
      slug: 'what-is-angular',
      title: 'What is Angular',
      component: () => import('./what-is-angular/what-is-angular-demo'),
      notes: () => import('./what-is-angular/notes.md'),
    },
    {
      slug: 'spa-vs-mpa',
      title: 'SPA vs MPA',
      component: () => import('./spa-vs-mpa/spa-vs-mpa-demo'),
      notes: () => import('./spa-vs-mpa/notes.md'),
      files: [`${FOLDER}/spa-vs-mpa/mini-browser.ts`, `${FOLDER}/spa-vs-mpa/mini-browser.html`],
    },
    {
      slug: 'framework-vs-library',
      title: 'Framework vs library',
      component: () => import('./framework-vs-library/framework-vs-library-demo'),
      notes: () => import('./framework-vs-library/notes.md'),
    },
    {
      slug: 'angular-vs-angularjs',
      title: 'Angular vs AngularJS',
      component: () => import('./angular-vs-angularjs/angular-vs-angularjs-demo'),
      notes: () => import('./angular-vs-angularjs/notes.md'),
    },
    {
      slug: 'release-cycle',
      title: 'Release cycle & versions',
      component: () => import('./release-cycle/release-cycle-demo'),
      notes: () => import('./release-cycle/notes.md'),
      files: [`${FOLDER}/release-cycle/releases.ts`],
    },
  ],
};
