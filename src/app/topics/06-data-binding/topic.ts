import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/06-data-binding';

export const dataBindingTopic: Topic = {
  id: 6,
  slug: 'data-binding',
  title: 'Data Binding',
  part: 'components',
  outline: [
    'overview',
    'interpolation',
    'property',
    'attribute',
    'class-style',
    'events',
    'key-events',
    'two-way',
    'template-refs',
    'property-vs-attribute',
  ],
  lessons: [
    {
      slug: 'overview',
      title: 'What data binding is',
      component: () => import('./overview/overview-demo'),
      notes: () => import('./overview/notes.md'),
    },
    {
      slug: 'interpolation',
      title: 'Interpolation {{ }}',
      component: () => import('./interpolation/interpolation-demo'),
      notes: () => import('./interpolation/notes.md'),
    },
    {
      slug: 'property',
      title: 'Property binding [prop]',
      component: () => import('./property/property-demo'),
      notes: () => import('./property/notes.md'),
      files: [`${FOLDER}/property/avatar.ts`],
    },
    {
      slug: 'attribute',
      title: 'Attribute binding [attr.x]',
      component: () => import('./attribute/attribute-demo'),
      notes: () => import('./attribute/notes.md'),
      files: ['src/app/shared/utils/dom-watch.ts'],
    },
    {
      slug: 'class-style',
      title: 'Class & style binding',
      component: () => import('./class-style/class-style-demo'),
      notes: () => import('./class-style/notes.md'),
      files: ['src/app/shared/utils/dom-watch.ts'],
    },
    {
      slug: 'events',
      title: 'Event binding & $event',
      component: () => import('./events/events-demo'),
      notes: () => import('./events/notes.md'),
      files: [`${FOLDER}/events/emoji-picker.ts`],
    },
    {
      slug: 'key-events',
      title: 'Key event filters',
      component: () => import('./key-events/key-events-demo'),
      notes: () => import('./key-events/notes.md'),
    },
    {
      slug: 'two-way',
      title: 'Two-way binding [( )]',
      component: () => import('./two-way/two-way-demo'),
      notes: () => import('./two-way/notes.md'),
      files: [`${FOLDER}/two-way/qty-stepper.ts`],
    },
    {
      slug: 'template-refs',
      title: 'Template reference variables #ref',
      component: () => import('./template-refs/template-refs-demo'),
      notes: () => import('./template-refs/notes.md'),
      files: [`${FOLDER}/template-refs/stopwatch.ts`],
    },
    {
      slug: 'property-vs-attribute',
      title: 'DOM property vs HTML attribute',
      component: () => import('./property-vs-attribute/property-vs-attribute-demo'),
      notes: () => import('./property-vs-attribute/notes.md'),
    },
  ],
};
