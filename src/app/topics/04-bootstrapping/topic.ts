import { Topic } from '@core/models/topic.model';

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
    { slug: 'execution-flow', title: 'Execution flow' },
    { slug: 'index-html', title: 'index.html & <app-root>' },
    { slug: 'main-ts', title: 'main.ts & bootstrapApplication()' },
    { slug: 'app-config', title: 'app.config.ts & providers' },
    { slug: 'app-initializer', title: 'provideAppInitializer()' },
    { slug: 'standalone-vs-ngmodule', title: 'Standalone vs NgModule' },
  ],
  content: () => import('./lessons'),
};
