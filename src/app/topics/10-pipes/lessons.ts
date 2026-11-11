import { TopicContent } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/10-pipes';
const COUNTER = [`${FOLDER}/_shared/run-counter.ts`, `${FOLDER}/_shared/run-count.ts`];
const SEARCH = `${FOLDER}/_shared/search-pipe.ts`;

/** The demos, notes and Code tab files of each lesson. Loaded only when the topic opens. */
export default {
  'built-in': {
    component: () => import('./built-in/built-in-demo'),
    notes: () => import('./built-in/notes.md'),
  },
  'params-chaining': {
    component: () => import('./params-chaining/params-chaining-demo'),
    notes: () => import('./params-chaining/notes.md'),
  },
  'custom-pipe': {
    component: () => import('./custom-pipe/custom-pipe-demo'),
    notes: () => import('./custom-pipe/notes.md'),
    files: [`${FOLDER}/custom-pipe/truncate-pipe.ts`, `${FOLDER}/custom-pipe/time-ago-pipe.ts`],
  },
  'pure-vs-impure': {
    component: () => import('./pure-vs-impure/pure-vs-impure-demo'),
    notes: () => import('./pure-vs-impure/notes.md'),
    files: [SEARCH, `${FOLDER}/pure-vs-impure/search-impure-pipe.ts`, ...COUNTER],
  },
  'async-pipe': {
    component: () => import('./async-pipe/async-pipe-demo'),
    notes: () => import('./async-pipe/notes.md'),
  },
  'pipe-vs-method': {
    component: () => import('./pipe-vs-method/pipe-vs-method-demo'),
    notes: () => import('./pipe-vs-method/notes.md'),
    files: [`${FOLDER}/pipe-vs-method/inr-pipe.ts`, ...COUNTER],
  },
  'pipe-vs-computed': {
    component: () => import('./pipe-vs-computed/pipe-vs-computed-demo'),
    notes: () => import('./pipe-vs-computed/notes.md'),
    files: [SEARCH, ...COUNTER],
  },
} satisfies TopicContent;
