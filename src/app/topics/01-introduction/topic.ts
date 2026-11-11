import { Topic } from '@core/models/topic.model';

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
    { slug: 'what-is-angular', title: 'What is Angular' },
    { slug: 'spa-vs-mpa', title: 'SPA vs MPA' },
    { slug: 'framework-vs-library', title: 'Framework vs library' },
    { slug: 'angular-vs-angularjs', title: 'Angular vs AngularJS' },
    { slug: 'release-cycle', title: 'Release cycle & versions' },
  ],
  content: () => import('./lessons'),
};
