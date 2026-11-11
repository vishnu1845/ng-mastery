import { Topic } from '@core/models/topic.model';

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
    { slug: 'built-in', title: 'What is a pipe & built-in pipes' },
    { slug: 'params-chaining', title: 'Pipe parameters & chaining' },
    { slug: 'custom-pipe', title: 'Custom pipe' },
    { slug: 'pure-vs-impure', title: 'Pure vs impure pipes' },
    { slug: 'async-pipe', title: 'async pipe' },
    { slug: 'pipe-vs-method', title: 'Pipe vs method call' },
    { slug: 'pipe-vs-computed', title: 'Pipe vs computed()' },
  ],
  content: () => import('./lessons'),
};
