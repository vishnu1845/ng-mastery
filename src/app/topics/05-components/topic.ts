import { Topic } from '@core/models/topic.model';

export const componentsTopic: Topic = {
  id: 5,
  slug: 'components',
  title: 'Components & Decorators',
  part: 'components',
  outline: [
    'anatomy',
    'metadata',
    'decorator-types',
    'selectors',
    'view-encapsulation',
    'host-styling',
    'host-bindings',
  ],
  lessons: [
    { slug: 'anatomy', title: 'What a component is' },
    { slug: 'metadata', title: '@Component metadata' },
    { slug: 'decorator-types', title: 'Decorator types' },
    { slug: 'selectors', title: 'Selector types' },
    { slug: 'view-encapsulation', title: 'View encapsulation' },
    { slug: 'host-styling', title: ':host & ::ng-deep' },
    { slug: 'host-bindings', title: 'Host element & host bindings' },
  ],
  content: () => import('./lessons'),
};
