import { Topic } from '@core/models/topic.model';

export const servicesDiTopic: Topic = {
  id: 15,
  slug: 'services-di',
  title: 'Services & Dependency Injection',
  part: 'di',
  outline: [
    'create-service',
    'inject-vs-constructor',
    'singleton',
    'component-providers',
    'service-decorator',
    'shared-state',
  ],
  lessons: [],
};
