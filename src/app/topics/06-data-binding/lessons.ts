import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/06-data-binding';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  overview: {
    component: () => import('./overview/overview-demo'),
    notes: () => import('./overview/notes.md'),
  },
  interpolation: {
    component: () => import('./interpolation/interpolation-demo'),
    notes: () => import('./interpolation/notes.md'),
  },
  property: {
    component: () => import('./property/property-demo'),
    notes: () => import('./property/notes.md'),
    files: [`${FOLDER}/property/avatar.ts`],
  },
  attribute: {
    component: () => import('./attribute/attribute-demo'),
    notes: () => import('./attribute/notes.md'),
    files: ['src/app/shared/utils/dom-watch.ts'],
  },
  'class-style': {
    component: () => import('./class-style/class-style-demo'),
    notes: () => import('./class-style/notes.md'),
    files: ['src/app/shared/utils/dom-watch.ts'],
  },
  events: {
    component: () => import('./events/events-demo'),
    notes: () => import('./events/notes.md'),
    files: [`${FOLDER}/events/emoji-picker.ts`],
  },
  'key-events': {
    component: () => import('./key-events/key-events-demo'),
    notes: () => import('./key-events/notes.md'),
  },
  'two-way': {
    component: () => import('./two-way/two-way-demo'),
    notes: () => import('./two-way/notes.md'),
    files: [`${FOLDER}/two-way/qty-stepper.ts`],
  },
  'template-refs': {
    component: () => import('./template-refs/template-refs-demo'),
    notes: () => import('./template-refs/notes.md'),
    files: [`${FOLDER}/template-refs/stopwatch.ts`],
  },
  'property-vs-attribute': {
    component: () => import('./property-vs-attribute/property-vs-attribute-demo'),
    notes: () => import('./property-vs-attribute/notes.md'),
  },
} satisfies TopicContent;
