import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/12-lifecycle-hooks';
const LOG = [`${FOLDER}/_shared/hook-log.ts`, `${FOLDER}/_shared/hook-timeline.ts`];
const REPORT = `${FOLDER}/_shared/moment-report.ts`;
const METER = `${FOLDER}/_shared/leak-meter.ts`;

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  visualizer: {
    component: () => import('./visualizer/visualizer-demo'),
    notes: () => import('./visualizer/notes.md'),
    files: [`${FOLDER}/visualizer/family.ts`, `${FOLDER}/_shared/logged.ts`, ...LOG],
  },
  'constructor-vs-oninit': {
    component: () => import('./constructor-vs-oninit/constructor-vs-oninit-demo'),
    notes: () => import('./constructor-vs-oninit/notes.md'),
    files: [`${FOLDER}/constructor-vs-oninit/ready-check.ts`, REPORT],
  },
  'on-changes': {
    component: () => import('./on-changes/on-changes-demo'),
    notes: () => import('./on-changes/notes.md'),
    files: [`${FOLDER}/on-changes/profile-card.ts`, ...LOG],
  },
  'do-check': {
    component: () => import('./do-check/do-check-demo'),
    notes: () => import('./do-check/notes.md'),
    files: [`${FOLDER}/do-check/watcher.ts`, `${FOLDER}/do-check/panels.ts`, ...LOG],
  },
  'content-vs-view': {
    component: () => import('./content-vs-view/content-vs-view-demo'),
    notes: () => import('./content-vs-view/notes.md'),
    files: [
      `${FOLDER}/content-vs-view/card-panel.ts`,
      `${FOLDER}/content-vs-view/late-change.ts`,
      REPORT,
    ],
  },
  'on-destroy': {
    component: () => import('./on-destroy/on-destroy-demo'),
    notes: () => import('./on-destroy/notes.md'),
    files: [`${FOLDER}/on-destroy/clocks.ts`, METER],
  },
  'render-hooks': {
    component: () => import('./render-hooks/render-hooks-demo'),
    notes: () => import('./render-hooks/notes.md'),
    files: [
      `${FOLDER}/render-hooks/runs-where.ts`,
      `${FOLDER}/render-hooks/runs-where.html`,
      `${FOLDER}/render-hooks/dom-work.ts`,
    ],
  },
  'destroy-ref': {
    component: () => import('./destroy-ref/destroy-ref-demo'),
    notes: () => import('./destroy-ref/notes.md'),
    files: [`${FOLDER}/destroy-ref/ticker.ts`, `${FOLDER}/destroy-ref/countdown.ts`, METER, REPORT],
  },
  'hooks-with-signals': {
    component: () => import('./hooks-with-signals/hooks-with-signals-demo'),
    notes: () => import('./hooks-with-signals/notes.md'),
    files: [`${FOLDER}/hooks-with-signals/name-badges.ts`, 'src/app/shared/utils/run-counter.ts'],
  },
} satisfies TopicContent;
