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
  lessons: [],
};
