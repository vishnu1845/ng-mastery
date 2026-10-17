import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/04-bootstrapping';

export const bootstrappingTopic: Topic = {
  id: 4,
  slug: 'bootstrapping',
  title: 'Bootstrapping & App Execution Flow',
  part: 'foundations',
  outline: [
    'execution-flow',
    'index-html',
    'main-ts',
    'app-config',
    'app-initializer',
    'standalone-vs-ngmodule',
  ],
  lessons: [
    {
      slug: 'execution-flow',
      title: 'Execution flow',
      component: () => import('./execution-flow/execution-flow-demo'),
      notes: () => import('./execution-flow/notes.md'),
      files: ['src/main.ts', 'src/app/app.ts', 'src/app/core/boot/boot-marks.ts'],
    },
    {
      slug: 'index-html',
      title: 'index.html & <app-root>',
      component: () => import('./index-html/index-html-demo'),
      notes: () => import('./index-html/notes.md'),
      files: [`${FOLDER}/index-html/html-report.ts`, 'src/index.html'],
    },
    {
      slug: 'main-ts',
      title: 'main.ts & bootstrapApplication()',
      component: () => import('./main-ts/main-ts-demo'),
      notes: () => import('./main-ts/notes.md'),
      files: [`${FOLDER}/mini-app.ts`, `${FOLDER}/main-ts/mini-counter.ts`, 'src/main.ts'],
    },
    {
      slug: 'app-config',
      title: 'app.config.ts & providers',
      component: () => import('./app-config/app-config-demo'),
      notes: () => import('./app-config/notes.md'),
      files: ['src/app/app.config.ts', 'src/app/app.config.server.ts'],
    },
    {
      slug: 'app-initializer',
      title: 'provideAppInitializer()',
      component: () => import('./app-initializer/app-initializer-demo'),
      notes: () => import('./app-initializer/notes.md'),
      files: [`${FOLDER}/app-initializer/remote-config.ts`],
    },
    {
      slug: 'standalone-vs-ngmodule',
      title: 'Standalone vs NgModule',
      component: () => import('./standalone-vs-ngmodule/standalone-vs-ngmodule-demo'),
      notes: () => import('./standalone-vs-ngmodule/notes.md'),
      files: [
        `${FOLDER}/standalone-vs-ngmodule/counter-module.ts`,
        `${FOLDER}/standalone-vs-ngmodule/standalone-counter.ts`,
      ],
    },
  ],
};
