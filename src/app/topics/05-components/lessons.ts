import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/05-components';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  anatomy: {
    component: () => import('./anatomy/anatomy-demo'),
    notes: () => import('./anatomy/notes.md'),
    files: [
      `${FOLDER}/anatomy/product-card.ts`,
      `${FOLDER}/anatomy/product-card.html`,
      `${FOLDER}/anatomy/product-card.scss`,
      `${FOLDER}/anatomy/shop-header.ts`,
    ],
  },
  metadata: {
    component: () => import('./metadata/metadata-demo'),
    notes: () => import('./metadata/notes.md'),
    files: [`${FOLDER}/metadata/counter-store.ts`, `${FOLDER}/metadata/tallies.ts`],
  },
  'decorator-types': {
    component: () => import('./decorator-types/decorator-types-demo'),
    notes: () => import('./decorator-types/notes.md'),
    files: [
      `${FOLDER}/decorator-types/decorator-rating.ts`,
      `${FOLDER}/decorator-types/signal-rating.ts`,
    ],
  },
  selectors: {
    component: () => import('./selectors/selectors-demo'),
    notes: () => import('./selectors/notes.md'),
    files: [`${FOLDER}/selectors/selector-kinds.ts`, 'src/app/shared/utils/dom-watch.ts'],
  },
  'view-encapsulation': {
    component: () => import('./view-encapsulation/view-encapsulation-demo'),
    notes: () => import('./view-encapsulation/notes.md'),
    files: [`${FOLDER}/view-encapsulation/messages.ts`],
  },
  'host-styling': {
    component: () => import('./host-styling/host-styling-demo'),
    notes: () => import('./host-styling/notes.md'),
    files: [`${FOLDER}/host-styling/cards.ts`],
  },
  'host-bindings': {
    component: () => import('./host-bindings/host-bindings-demo'),
    notes: () => import('./host-bindings/notes.md'),
    files: [`${FOLDER}/host-bindings/toggle-switch.ts`, 'src/app/shared/utils/dom-watch.ts'],
  },
} satisfies TopicContent;
