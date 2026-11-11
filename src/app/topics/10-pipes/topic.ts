import { Topic } from '@core/models/topic.model';

const FOLDER = 'src/app/topics/10-pipes';
const COUNTER = [`${FOLDER}/_shared/run-counter.ts`, `${FOLDER}/_shared/run-count.ts`];
const SEARCH = `${FOLDER}/_shared/search-pipe.ts`;

export const pipesTopic: Topic = {
  id: 10,
  slug: 'pipes',
  title: 'Pipes',
  part: 'components',
  outline: [
    'built-in',
    'params-chaining',
    'custom-pipe',
    'pure-vs-impure',
    'async-pipe',
    'pipe-vs-method',
    'pipe-vs-computed',
  ],
  lessons: [
    {
      slug: 'built-in',
      title: 'What is a pipe & built-in pipes',
      component: () => import('./built-in/built-in-demo'),
      notes: () => import('./built-in/notes.md'),
    },
    {
      slug: 'params-chaining',
      title: 'Pipe parameters & chaining',
      component: () => import('./params-chaining/params-chaining-demo'),
      notes: () => import('./params-chaining/notes.md'),
    },
    {
      slug: 'custom-pipe',
      title: 'Custom pipe',
      component: () => import('./custom-pipe/custom-pipe-demo'),
      notes: () => import('./custom-pipe/notes.md'),
      files: [`${FOLDER}/custom-pipe/truncate-pipe.ts`, `${FOLDER}/custom-pipe/time-ago-pipe.ts`],
    },
    {
      slug: 'pure-vs-impure',
      title: 'Pure vs impure pipes',
      component: () => import('./pure-vs-impure/pure-vs-impure-demo'),
      notes: () => import('./pure-vs-impure/notes.md'),
      files: [SEARCH, `${FOLDER}/pure-vs-impure/search-impure-pipe.ts`, ...COUNTER],
    },
    {
      slug: 'async-pipe',
      title: 'async pipe',
      component: () => import('./async-pipe/async-pipe-demo'),
      notes: () => import('./async-pipe/notes.md'),
    },
    {
      slug: 'pipe-vs-method',
      title: 'Pipe vs method call',
      component: () => import('./pipe-vs-method/pipe-vs-method-demo'),
      notes: () => import('./pipe-vs-method/notes.md'),
      files: [`${FOLDER}/pipe-vs-method/inr-pipe.ts`, ...COUNTER],
    },
    {
      slug: 'pipe-vs-computed',
      title: 'Pipe vs computed()',
      component: () => import('./pipe-vs-computed/pipe-vs-computed-demo'),
      notes: () => import('./pipe-vs-computed/notes.md'),
      files: [SEARCH, ...COUNTER],
    },
  ],
};
