import { Topic } from '@core/models/topic.model';

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
    { slug: 'overview', title: 'What data binding is' },
    { slug: 'interpolation', title: 'Interpolation {{ }}' },
    { slug: 'property', title: 'Property binding [prop]' },
    { slug: 'attribute', title: 'Attribute binding [attr.x]' },
    { slug: 'class-style', title: 'Class & style binding' },
    { slug: 'events', title: 'Event binding & $event' },
    { slug: 'key-events', title: 'Key event filters' },
    { slug: 'two-way', title: 'Two-way binding [( )]' },
    { slug: 'template-refs', title: 'Template reference variables #ref' },
    { slug: 'property-vs-attribute', title: 'DOM property vs HTML attribute' },
  ],
  content: () => import('./lessons'),
};
