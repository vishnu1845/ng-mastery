import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/07-signals-basics';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'what-is-a-signal': {
    component: () => import('./what-is-a-signal/what-is-a-signal-demo'),
    notes: () => import('./what-is-a-signal/notes.md'),
    files: ['src/app/shared/utils/dom-watch.ts'],
  },
  'signal-set-update': {
    component: () => import('./signal-set-update/signal-set-update-demo'),
    notes: () => import('./signal-set-update/notes.md'),
  },
  computed: {
    component: () => import('./computed/computed-demo'),
    notes: () => import('./computed/notes.md'),
  },
  effect: {
    component: () => import('./effect/effect-demo'),
    notes: () => import('./effect/notes.md'),
  },
  'injection-context': {
    component: () => import('./injection-context/injection-context-demo'),
    notes: () => import('./injection-context/notes.md'),
    files: [
      `${FOLDER}/injection-context/effect-lab.ts`,
      `${FOLDER}/injection-context/beat-child.ts`,
    ],
  },
  'signals-in-templates': {
    component: () => import('./signals-in-templates/signals-in-templates-demo'),
    notes: () => import('./signals-in-templates/notes.md'),
  },
  'immutable-updates': {
    component: () => import('./immutable-updates/immutable-updates-demo'),
    notes: () => import('./immutable-updates/notes.md'),
    files: [`${FOLDER}/immutable-updates/shop-views.ts`],
  },
  'signal-vs-property': {
    component: () => import('./signal-vs-property/signal-vs-property-demo'),
    notes: () => import('./signal-vs-property/notes.md'),
    files: [
      `${FOLDER}/signal-vs-property/counters.ts`,
      `${FOLDER}/signal-vs-property/timer-checks.ts`,
    ],
  },
} satisfies TopicContent;
