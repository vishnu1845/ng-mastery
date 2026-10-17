import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/05-components';

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
    {
      slug: 'anatomy',
      title: 'What a component is',
      component: () => import('./anatomy/anatomy-demo'),
      notes: () => import('./anatomy/notes.md'),
      files: [
        `${FOLDER}/anatomy/product-card.ts`,
        `${FOLDER}/anatomy/product-card.html`,
        `${FOLDER}/anatomy/product-card.scss`,
        `${FOLDER}/anatomy/shop-header.ts`,
      ],
    },
    {
      slug: 'metadata',
      title: '@Component metadata',
      component: () => import('./metadata/metadata-demo'),
      notes: () => import('./metadata/notes.md'),
      files: [`${FOLDER}/metadata/counter-store.ts`, `${FOLDER}/metadata/tallies.ts`],
    },
    {
      slug: 'decorator-types',
      title: 'Decorator types',
      component: () => import('./decorator-types/decorator-types-demo'),
      notes: () => import('./decorator-types/notes.md'),
      files: [
        `${FOLDER}/decorator-types/decorator-rating.ts`,
        `${FOLDER}/decorator-types/signal-rating.ts`,
      ],
    },
    {
      slug: 'selectors',
      title: 'Selector types',
      component: () => import('./selectors/selectors-demo'),
      notes: () => import('./selectors/notes.md'),
      files: [`${FOLDER}/selectors/selector-kinds.ts`, `${FOLDER}/dom-watch.ts`],
    },
    {
      slug: 'view-encapsulation',
      title: 'View encapsulation',
      component: () => import('./view-encapsulation/view-encapsulation-demo'),
      notes: () => import('./view-encapsulation/notes.md'),
      files: [`${FOLDER}/view-encapsulation/messages.ts`],
    },
    {
      slug: 'host-styling',
      title: ':host & ::ng-deep',
      component: () => import('./host-styling/host-styling-demo'),
      notes: () => import('./host-styling/notes.md'),
      files: [`${FOLDER}/host-styling/cards.ts`],
    },
    {
      slug: 'host-bindings',
      title: 'Host element & host bindings',
      component: () => import('./host-bindings/host-bindings-demo'),
      notes: () => import('./host-bindings/notes.md'),
      files: [`${FOLDER}/host-bindings/toggle-switch.ts`, `${FOLDER}/dom-watch.ts`],
    },
  ],
};
