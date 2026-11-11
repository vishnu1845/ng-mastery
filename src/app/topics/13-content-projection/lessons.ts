import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/13-content-projection';
const PANEL = `${FOLDER}/_shared/panel.ts`;
const BOTH_WAYS = `${FOLDER}/_shared/content-vs-template.ts`;

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'ng-content': {
    component: () => import('./ng-content/ng-content-demo'),
    notes: () => import('./ng-content/notes.md'),
    files: [`${FOLDER}/_shared/info-card.ts`, BOTH_WAYS, `${FOLDER}/_shared/chart-widget.ts`],
  },
  'multi-slot': {
    component: () => import('./multi-slot/multi-slot-demo'),
    notes: () => import('./multi-slot/notes.md'),
    files: [PANEL],
  },
  'ng-project-as': {
    component: () => import('./ng-project-as/ng-project-as-demo'),
    notes: () => import('./ng-project-as/notes.md'),
    files: [PANEL],
  },
  'template-outlet': {
    component: () => import('./template-outlet/template-outlet-demo'),
    notes: () => import('./template-outlet/notes.md'),
    files: [BOTH_WAYS, `${FOLDER}/template-outlet/people-list.ts`],
  },
  'view-queries': {
    component: () => import('./view-queries/view-queries-demo'),
    notes: () => import('./view-queries/notes.md'),
    files: [`${FOLDER}/view-queries/address-block.ts`],
  },
  'content-queries': {
    component: () => import('./content-queries/content-queries-demo'),
    notes: () => import('./content-queries/notes.md'),
    files: [`${FOLDER}/content-queries/tabs.ts`],
  },
  'query-options': {
    component: () => import('./query-options/query-options-demo'),
    notes: () => import('./query-options/notes.md'),
    files: [`${FOLDER}/query-options/targets.ts`],
  },
} satisfies TopicContent;
