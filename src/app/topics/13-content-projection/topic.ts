import { Topic } from '@core/models/topic.model';

export const contentProjectionTopic: Topic = {
  id: 13,
  slug: 'content-projection',
  title: 'Content Projection & View Queries',
  part: 'components',
  outline: [
    'ng-content',
    'multi-slot',
    'ng-project-as',
    'template-outlet',
    'view-queries',
    'content-queries',
    'query-options',
  ],
  lessons: [
    { slug: 'ng-content', title: 'Content projection with <ng-content>' },
    { slug: 'multi-slot', title: 'Multi-slot projection (select)' },
    { slug: 'ng-project-as', title: 'ngProjectAs' },
    { slug: 'template-outlet', title: 'ng-content vs ngTemplateOutlet' },
    { slug: 'view-queries', title: 'View queries' },
    { slug: 'content-queries', title: 'Content queries' },
    { slug: 'query-options', title: 'Query options: read, required, static' },
  ],
  content: () => import('./lessons'),
};
