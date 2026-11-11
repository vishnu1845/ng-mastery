import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/04-bootstrapping';

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'execution-flow': {
    component: () => import('./execution-flow/execution-flow-demo'),
    notes: () => import('./execution-flow/notes.md'),
    files: ['src/main.ts', 'src/app/app.ts', 'src/app/core/boot/boot-marks.ts'],
  },
  'index-html': {
    component: () => import('./index-html/index-html-demo'),
    notes: () => import('./index-html/notes.md'),
    files: [`${FOLDER}/index-html/html-report.ts`, 'src/index.html'],
  },
  'main-ts': {
    component: () => import('./main-ts/main-ts-demo'),
    notes: () => import('./main-ts/notes.md'),
    files: [`${FOLDER}/mini-app.ts`, `${FOLDER}/main-ts/mini-counter.ts`, 'src/main.ts'],
  },
  'app-config': {
    component: () => import('./app-config/app-config-demo'),
    notes: () => import('./app-config/notes.md'),
    files: ['src/app/app.config.ts', 'src/app/app.config.server.ts'],
  },
  'app-initializer': {
    component: () => import('./app-initializer/app-initializer-demo'),
    notes: () => import('./app-initializer/notes.md'),
    files: [`${FOLDER}/app-initializer/remote-config.ts`],
  },
  'standalone-vs-ngmodule': {
    component: () => import('./standalone-vs-ngmodule/standalone-vs-ngmodule-demo'),
    notes: () => import('./standalone-vs-ngmodule/notes.md'),
    files: [
      `${FOLDER}/standalone-vs-ngmodule/counter-module.ts`,
      `${FOLDER}/standalone-vs-ngmodule/standalone-counter.ts`,
    ],
  },
} satisfies TopicContent;
