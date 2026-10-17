import { Topic } from '@core/models/topic.model';

export const buildCompilationTopic: Topic = {
  id: 41,
  slug: 'build-compilation',
  title: 'Compilation & Build Process',
  part: 'build',
  outline: [
    'build-pipeline',
    'aot-vs-jit',
    'esbuild-vite',
    'output-hashing',
    'budgets',
    'source-maps-hmr',
  ],
  lessons: [],
};
