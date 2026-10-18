import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/07-signals-basics';

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
    {
      slug: 'what-is-a-signal',
      title: 'What a signal is & why',
      component: () => import('./what-is-a-signal/what-is-a-signal-demo'),
      notes: () => import('./what-is-a-signal/notes.md'),
      files: ['src/app/shared/utils/dom-watch.ts'],
    },
    {
      slug: 'signal-set-update',
      title: 'signal(): set & update',
      component: () => import('./signal-set-update/signal-set-update-demo'),
      notes: () => import('./signal-set-update/notes.md'),
    },
    {
      slug: 'computed',
      title: 'computed(): derived, lazy, cached',
      component: () => import('./computed/computed-demo'),
      notes: () => import('./computed/notes.md'),
    },
    {
      slug: 'effect',
      title: 'effect(): side effects only',
      component: () => import('./effect/effect-demo'),
      notes: () => import('./effect/notes.md'),
    },
    {
      slug: 'injection-context',
      title: 'The injection context rule',
      component: () => import('./injection-context/injection-context-demo'),
      notes: () => import('./injection-context/notes.md'),
      files: [
        `${FOLDER}/injection-context/effect-lab.ts`,
        `${FOLDER}/injection-context/beat-child.ts`,
      ],
    },
    {
      slug: 'signals-in-templates',
      title: 'Signals in templates',
      component: () => import('./signals-in-templates/signals-in-templates-demo'),
      notes: () => import('./signals-in-templates/notes.md'),
    },
    {
      slug: 'immutable-updates',
      title: 'Immutable updates',
      component: () => import('./immutable-updates/immutable-updates-demo'),
      notes: () => import('./immutable-updates/notes.md'),
      files: [`${FOLDER}/immutable-updates/shop-views.ts`],
    },
    {
      slug: 'signal-vs-property',
      title: 'Signal vs plain property',
      component: () => import('./signal-vs-property/signal-vs-property-demo'),
      notes: () => import('./signal-vs-property/notes.md'),
      files: [
        `${FOLDER}/signal-vs-property/counters.ts`,
        `${FOLDER}/signal-vs-property/timer-checks.ts`,
      ],
    },
  ],
};
