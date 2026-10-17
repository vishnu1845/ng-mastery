import { Topic } from '@core/models/topic.model';

export const securityTopic: Topic = {
  id: 45,
  slug: 'security',
  title: 'Security',
  part: 'security',
  outline: [
    'xss-sanitization',
    'dom-sanitizer',
    'xsrf',
    'jwt-storage',
    'csp-trusted-types',
    'guards-not-security',
    'no-secrets',
  ],
  lessons: [],
};
