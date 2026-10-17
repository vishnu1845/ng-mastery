import { Topic } from '@core/models/topic.model';

export const httpInterceptorsTopic: Topic = {
  id: 26,
  slug: 'http-interceptors',
  title: 'HTTP Interceptors',
  part: 'http',
  outline: [
    'execution-order',
    'auth-token',
    'error-handling',
    'loader',
    'retry',
    'caching',
    'logging',
    'skip-context',
    'refresh-token',
  ],
  lessons: [],
};
