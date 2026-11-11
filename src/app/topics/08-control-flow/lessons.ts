import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/08-control-flow';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'if-else': {
    component: () => import('./if-else/if-else-demo'),
    notes: () => import('./if-else/notes.md'),
    files: ['src/app/shared/utils/dom-watch.ts'],
  },
  'for-track': {
    component: () => import('./for-track/for-track-demo'),
    notes: () => import('./for-track/notes.md'),
    files: [`${FOLDER}/for-track/member-row.ts`, 'src/app/shared/utils/dom-watch.ts'],
  },
  'for-context-empty': {
    component: () => import('./for-context-empty/for-context-empty-demo'),
    notes: () => import('./for-context-empty/notes.md'),
  },
  switch: {
    component: () => import('./switch/switch-demo'),
    notes: () => import('./switch/notes.md'),
  },
  let: {
    component: () => import('./let/let-demo'),
    notes: () => import('./let/notes.md'),
  },
  'ng-template-container': {
    component: () => import('./ng-template-container/ng-template-container-demo'),
    notes: () => import('./ng-template-container/notes.md'),
  },
  'legacy-structural': {
    component: () => import('./legacy-structural/legacy-structural-demo'),
    notes: () => import('./legacy-structural/notes.md'),
  },
} satisfies TopicContent;
