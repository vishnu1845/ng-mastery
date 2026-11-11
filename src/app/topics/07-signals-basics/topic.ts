import { Topic } from '@core/models/topic.model';

export const signalsBasicsTopic: Topic = {
  id: 7,
  slug: 'signals-basics',
  title: 'Signals Basics',
  part: 'components',
  outline: [
    'what-is-a-signal',
    'signal-set-update',
    'computed',
    'effect',
    'injection-context',
    'signals-in-templates',
    'immutable-updates',
    'signal-vs-property',
  ],
  lessons: [
    { slug: 'what-is-a-signal', title: 'What a signal is & why' },
    { slug: 'signal-set-update', title: 'signal(): set & update' },
    { slug: 'computed', title: 'computed(): derived, lazy, cached' },
    { slug: 'effect', title: 'effect(): side effects only' },
    { slug: 'injection-context', title: 'The injection context rule' },
    { slug: 'signals-in-templates', title: 'Signals in templates' },
    { slug: 'immutable-updates', title: 'Immutable updates' },
    { slug: 'signal-vs-property', title: 'Signal vs plain property' },
  ],
  content: () => import('./lessons'),
};
