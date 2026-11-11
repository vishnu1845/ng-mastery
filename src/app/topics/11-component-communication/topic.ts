import { Topic } from '@core/models/topic.model';

export const componentCommunicationTopic: Topic = {
  id: 11,
  slug: 'component-communication',
  title: 'Component Communication',
  part: 'components',
  outline: [
    'overview',
    'input-output',
    'input-options',
    'model-two-way',
    'template-ref',
    'view-child',
    'shared-service',
    'via-router',
  ],
  lessons: [
    { slug: 'overview', title: 'All the ways components talk' },
    { slug: 'input-output', title: 'input() & output()' },
    { slug: 'input-options', title: 'Input options: required, alias, transform' },
    { slug: 'model-two-way', title: 'Two-way binding with model()' },
    { slug: 'template-ref', title: 'Template reference: push vs pull' },
    { slug: 'view-child', title: 'viewChild() & viewChildren()' },
    { slug: 'shared-service', title: 'Siblings: a shared service' },
    { slug: 'via-router', title: 'Through the router' },
  ],
  content: () => import('./lessons'),
};
