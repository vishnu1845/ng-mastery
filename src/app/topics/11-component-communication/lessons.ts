import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/11-component-communication';
const LOG = `${FOLDER}/_shared/event-log.ts`;

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  overview: {
    component: () => import('./overview/overview-demo'),
    notes: () => import('./overview/notes.md'),
    files: [`${FOLDER}/overview/channels.ts`],
  },
  'input-output': {
    component: () => import('./input-output/input-output-demo'),
    notes: () => import('./input-output/notes.md'),
    files: [
      `${FOLDER}/input-output/product-card.ts`,
      `${FOLDER}/input-output/product-card-old.ts`,
      LOG,
    ],
  },
  'input-options': {
    component: () => import('./input-options/input-options-demo'),
    notes: () => import('./input-options/notes.md'),
    files: [`${FOLDER}/input-options/profile-chip.ts`],
  },
  'model-two-way': {
    component: () => import('./model-two-way/model-two-way-demo'),
    notes: () => import('./model-two-way/notes.md'),
    files: [`${FOLDER}/model-two-way/volume-knob.ts`, `${FOLDER}/model-two-way/volume-knob-old.ts`],
  },
  'template-ref': {
    component: () => import('./template-ref/template-ref-demo'),
    notes: () => import('./template-ref/notes.md'),
    files: [`${FOLDER}/template-ref/players.ts`],
  },
  'view-child': {
    component: () => import('./view-child/view-child-demo'),
    notes: () => import('./view-child/notes.md'),
    files: [`${FOLDER}/view-child/question.ts`, `${FOLDER}/view-child/query-timing.ts`],
  },
  'shared-service': {
    component: () => import('./shared-service/shared-service-demo'),
    notes: () => import('./shared-service/notes.md'),
    files: [
      `${FOLDER}/shared-service/cart-store.ts`,
      `${FOLDER}/shared-service/cart-store-rx.ts`,
      `${FOLDER}/shared-service/shop.ts`,
    ],
  },
  'via-router': {
    component: () => import('./via-router/via-router-demo'),
    notes: () => import('./via-router/notes.md'),
    children: [
      {
        path: '',
        loadComponent: () => import('./via-router/order-list').then((m) => m.OrderList),
      },
      {
        path: ':id',
        loadComponent: () => import('./via-router/order-detail').then((m) => m.OrderDetail),
      },
    ],
    files: [`${FOLDER}/via-router/order-list.ts`, `${FOLDER}/via-router/order-detail.ts`],
  },
} satisfies TopicContent;
