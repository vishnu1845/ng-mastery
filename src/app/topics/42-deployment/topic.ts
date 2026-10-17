import { Topic } from '@core/models/topic.model';

export const deploymentTopic: Topic = {
  id: 42,
  slug: 'deployment',
  title: 'Environments, Build Configs & Deployment',
  part: 'build',
  outline: ['environments', 'build-configs', 'base-href', 'hosting-spa-fallback', 'ci-cd'],
  lessons: [],
};
