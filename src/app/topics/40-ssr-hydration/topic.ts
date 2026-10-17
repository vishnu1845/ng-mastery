import { Topic } from '@core/models/topic.model';

export const ssrHydrationTopic: Topic = {
  id: 40,
  slug: 'ssr-hydration',
  title: 'SSR, SSG & Hydration',
  part: 'ssr',
  outline: [
    'rendering-modes',
    'how-this-app-renders',
    'hybrid-routes',
    'hydration-event-replay',
    'incremental-hydration',
    'transfer-cache',
    'browser-only-code',
    'skip-hydration',
  ],
  lessons: [],
};
